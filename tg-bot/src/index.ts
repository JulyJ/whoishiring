import axios from "axios";
import { TgBotConsumer } from "./consumer";
import { HnJobMessage } from "./models/hn-job-message";

require("dotenv").config();

async function sendMessage(botToken: string, chatId: string, message: string) {
    try {
        const payload = {
            chat_id: chatId,
            text: message,
            parse_mode: "html", // html | markdown
        };

        console.log("botToken:", botToken);

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

        return axios.post(url, payload);
    } catch (error) {
        console.error("API call failed:", error);
    }
}

async function start() {
    const processMessage = async (message: HnJobMessage) => {
        console.log("Processing Message:", message);
        await sendMessage(
            process.env.TELEGRAM_BOT_TOKEN as string,
            process.env.TELEGRAM_CHAT_ID as string,
            message.text,
        );
    };

    let jobConsumerOffset = process.env.JOBS_CONSUMER_OFFSET || "latest";
    const jobConsumer = new TgBotConsumer(
        process.env.KAFKA_BROKER_URI as string,
        process.env.KAFKA_TOPIC as string,
        processMessage,
        jobConsumerOffset,
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
