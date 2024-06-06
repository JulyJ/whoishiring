import axios from "axios";
import { TgBotConsumer } from "./consumer";
import { HnJobMessage } from "./models/hn-job-message";

require("dotenv").config();

function formatMessage(job: any, originalPost: HnJobMessage) {
    const ogText = originalPost.text.split("\n");
    const title = `<b>${ogText[0]}</b>\n\n`;
    const date = `<b>Date:</b> ${job.date}\n`;
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
        const payload = {
            chat_id: chatId,
            text: formatMessage(post, originalPost),
            parse_mode: "html", // html | markdown
        };

        console.log("Sending message:", payload);

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        return axios.post(url, payload);
    } catch (error) {
        console.error("API call failed:", error);
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

start();
