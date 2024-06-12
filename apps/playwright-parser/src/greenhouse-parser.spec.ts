import { test, expect } from "@playwright/test";
import { checkRecord, insertRecord } from "@repo/mongo-service";
import { sendMessage } from "@repo/tg-service";
import { sendMessageDiscord } from "@repo/discord-service";
import dotenv from "dotenv";
dotenv.config();
const DEBUG = false;

const url = process.env.GREENHOUSE_URL || "https://boards.greenhouse.io";
const company = process.env.GREENHOUSE_COMPANY || "reddit";
const collection = process.env.MONGODB_COLLECTION_GH || "";
const chatId = process.env.TELEGRAM_CHAT_ID || "";
const botToken = process.env.TELEGRAM_BOT_TOKEN || "";
const appToken = process.env.DISCORD_BOT_TOKEN || "";
const channelId = process.env.DISCORD_CHANNEL_ID || "";

interface PostData {
    time: number;
    id: string;
    title: string;
    location: string;
    job_url: string;
}

test.describe("Get QA Job Postings for Companies", () => {
    test("Load Board Page and Get the Data", async ({ page }) => {
        // Navigate to the job board page
        await page.goto(`${url}/${company}`);
        await expect(page).toHaveTitle(/Jobs at/);

        await page.waitForSelector(".accessible");
        const posts = await page.$$(".opening");
        let cnt = 0;

        for (const post of posts) {
            const title = await post.evaluate((element) => (element.children[0].textContent || "").trim());

            // Check QA jobs avialable
            if (title.match(/\b(QA)\b/gi)) {
                const id_href = await post.evaluate((element) =>
                    (element.children[0].getAttribute("href") || "").trim(),
                );
                const id = id_href.match(/\d+/)[0];
                // If the post already exists, continue to the next one
                if (!DEBUG) {
                    if (id && (await checkRecord(id, collection))) {
                        continue;
                    }
                    const job_url = `${url}${id_href}`;
                    const location = await post.evaluate((element) =>
                        element.querySelector(".location").textContent.trim(),
                    );

                    const data: PostData = {
                        time: new Date().getTime(),
                        id,
                        location,
                        title,
                        job_url,
                    };

                    insertRecord(data, collection);
                    cnt++;
                    await sendMessage(
                        botToken,
                        chatId,
                        `
            ${data.title}
            ${data.location}
            ${data.job_url}
          `,
                        `html`,
                    );
                    await sendMessageDiscord(
                        appToken,
                        channelId,
                        `${data.title}

${data.location}

${data.job_url}
                        `,
                    );
                }
            }
        }
        console.log(`${cnt} posts added `);
    });
});
