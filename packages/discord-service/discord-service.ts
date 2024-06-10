import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";

dotenv.config();

// Create a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

async function waitForReady(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
        client.once("ready", () => {
            console.log("Ready!");
            resolve();
        });

        client.login(token).catch(reject);
    });
}

export async function sendMessageDiscord(token: string, channelId: string, messageContent: string): Promise<void> {
    try {
        await waitForReady(token);

        const channel = client.channels.cache.get(channelId);

        if (channel?.isTextBased()) {
            await (channel as any).send(messageContent);
        } else {
            console.error("Channel not found or not a text channel.");
        }
    } catch (error) {
        console.error("Error sending message:", error);
    }
}
