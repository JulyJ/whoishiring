import { test, expect } from "@playwright/test";
import { checkRecord, insertRecord } from "@repo/mongo-service";

const DEBUG = false;

const url = process.env.THREAD_URL || "https://news.ycombinator.com/item?id=40563283";
const threadId = url.match(/\d+/)?.[0];

interface PostData {
    time: number;
    id?: string;
    threadId?: string;
    title: string;
    date?: string;
    author: string;
    text: string;
    urls: string[];
    hasRemote: boolean;
    hasQA: boolean;
    hasFrontend: boolean;
}

test.setTimeout(120000);
test.describe("Get Thread Items", () => {
    test("Load Thread Page and Get the Data", async ({ page }) => {
        // Navigate to the thread page
        await page.goto(url);
        await expect(page).toHaveTitle(/Ask HN: Who is hiring?/);

        // Get the post title
        const postTitleElement = await page.locator(".titleline");
        let title = await postTitleElement.textContent();
        if (!title) {
            title = "unidentified title";
        }

        // Get the post elements
        await page.waitForSelector("tbody");
        const posts = await page.$$('.default:near(td.ind[indent="0"])');

        // Process each post
        let cnt = 0;

        for (const post of posts) {
            const id_href = await post.evaluate((element) =>
                (element.querySelector("span.age a")?.getAttribute("href") || "").trim(),
            );
            const id = id_href.match(/\d+/)?.[0];

            // If the post already exists, continue to the next one
            if (!DEBUG) {
                if (id && (await checkRecord(id))) {
                    continue;
                }
            }

            const text = (
                await page.evaluate((post) => {
                    const childNodes = post.querySelector(".commtext")?.childNodes;
                    const textContents: string[] = [];
                    childNodes?.forEach((node: any) => {
                        const text = node.textContent?.trim();
                        if (text) {
                            textContents.push(text);
                        }
                    });
                    return textContents;
                }, post)
            ).join("\n");

            const author = await post.evaluate((element) =>
                (element.querySelector("a.hnuser")?.textContent || "").trim(),
            );
            const date = await post.evaluate((element) =>
                (element.querySelector("span.age")?.getAttribute("title") || "").trim(),
            );
            const hasRemote = /remote/i.test(text || "");
            const hasQA = /qa/i.test(text || "") || /quality/i.test(text || "") || /sdet/i.test(text || "");
            const hasFrontend =
                /frontend/i.test(text || "") || /front-end/i.test(text || "") || /front end/i.test(text || "");

            const hrefs = await post.evaluate((element) =>
                Array.from(element.children[2].querySelectorAll("a"), (a: any) => a.href),
            );
            const urls: string[] = [];
            for (const href of hrefs) {
                if (href) {
                    urls.push(href.trim());
                }
            }
            if (DEBUG) {
                if (cnt >= 3) break;
            }

            const data: PostData = {
                time: new Date().getTime(),
                id,
                threadId,
                title,
                date,
                author,
                text,
                urls,
                hasRemote,
                hasQA,
                hasFrontend,
            };

            // Insert the post details into the database
            if (data) {
                if (!DEBUG) {
                    insertRecord(data);
                } else {
                    console.log(data);
                }

                cnt++;
            }
        }
        console.log(`${cnt} new posts added to the database`);
    });
});
