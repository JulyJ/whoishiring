import axios from "axios";
import { TgBotConsumer } from "./consumer";

require("dotenv").config();

function formatMessage(job: any) {
    const date = `<b>Date:</b> ${job.date}\n`;
    const title = job.title ? `<b>Title:</b> ${job.title}\n\n` : "";
    const company = job.company ? `<b>Company:</b> ${job.company}\n\n` : "";
    let description = job.jobDescription ? `<b>Description:</b> ${job.jobDescription}\n\n` : "";
    description
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    const urls = job.urls ? `<b>URLs:</b> ${job.urls.join("\n")}\n\n` : "";

    const remote = job.hasRemote ? "✅" : "❌";
    const qa = job.hasQA ? "✅" : "❌";
    const frontend = job.hasFrontend ? "✅" : "❌";

    const tags = `<b>Tags:</b> ${job.tags.join(", ")}\n`;

    return `${date}${company}${title}${description}${urls}${tags}
🌐 Remote: ${remote}
🧪 QA: ${qa}
🖥️ Front-end: ${frontend}`;
}

async function sendMessage(botToken: string, chatId: string, job: any) {
    try {
        const payload = {
            chat_id: chatId,
            text: formatMessage(job),
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
    const processMessage = async (message: any) => {
        console.log("Processing Message:", message);
        await sendMessage(
            process.env.TELEGRAM_BOT_TOKEN as string,
            process.env.TELEGRAM_CHAT_ID as string,
            message || {},
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
