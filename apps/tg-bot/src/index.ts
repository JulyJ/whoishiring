import { TgBotConsumer } from "./consumer.js";
import { HnJobMessage } from "./models/hn-job-message.js";
import { sendMessage as tgSendMessage } from "@repo/tg-service";
import dotenv from "dotenv";
import { init as sentryInit } from "@sentry/node";

dotenv.config();

function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns 0-indexed month
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}/${month}/${day} ${hours}:${minutes}`;
}

function formatMessage(job: any, originalPost: HnJobMessage) {
    const ogText = originalPost.text.split("\n");
    const title = `<b>${ogText[0]}</b>\n\n`;
    const date = `<b>Date:</b> ${formatDate(job.date)}\n`;
    const company = job.company ? `<b>Company:</b> ${job.company}\n\n` : "";

    const urls = job.urls ? `<b>URLs:</b> ${job.urls.join("\n")}\n\n` : "";

    const tags = `<b>Tags:</b> ${job.tags.join(", ")}\n`;

    const remote = job.hasRemote ? "✅" : "❌";
    const qa = job.hasQA ? "✅" : "❌";
    const frontend = job.hasFrontend ? "✅" : "❌";

    let description = ogText.slice(1).join("\n");
    description
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    description = `<b>Description:</b> ${description}\n\n`;

    return `${title}${date}${company}${urls}${tags}
🌐 Remote: ${remote}
🧪 QA: ${qa}
🖥️ Front-end: ${frontend}

${description}`;
}

async function sendMessage(botToken: string, chatId: string, post: any, originalPost: HnJobMessage) {
    try {
        const formattedMessage = formatMessage(post, originalPost);

        console.log("Sending message:", formattedMessage);

        tgSendMessage(botToken, chatId, formattedMessage);
    } catch (error) {
        console.error("[TgBot] Failed to send a message:", error);
    }
}

async function start() {
    const processMessage = async (message: any, originalPost: any) => {
        console.log("Processing Message:", message);
        await sendMessage(
            process.env.TELEGRAM_BOT_TOKEN as string,
            process.env.TELEGRAM_CHAT_ID as string,
            message || {},
            originalPost,
        );
    };

    const jobConsumer = new TgBotConsumer(
        process.env.KAFKA_BROKER_URI as string,
        process.env.KAFKA_TOPIC as string,
        processMessage,
        process.env.JOBS_CONSUMER_OFFSET,
    );

    process.on("SIGINT", async () => {
        console.log("Closing app...");
        try {
            await jobConsumer.disconnect();
        } catch (err) {
            console.error("Error during cleanup:", err);
            process.exit(1);
        } finally {
            console.log("Cleanup finished. Exiting");
            process.exit(0);
        }
    });

    await jobConsumer.connect();
}

sentryInit({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
});

start();
