// @ts-check
const { test, expect } = require('@playwright/test');
const { insertData, insertRecord } = require('./mongo-connect.js');

test.describe('Get Thread Items', () => {
  test('Load Thread Page and Get the Data', async ({ page }) => {
    await page.goto('https://news.ycombinator.com/item?id=36573871'); // TODO add finding thread

    // Expect a title to contain a Who is hiring.
    await expect(page).toHaveTitle(/Ask HN: Who is hiring?/);

    let postTitle = await (await page.locator('.titleline')).textContent()
    if (!postTitle) {
      postTitle = 'unidentified title';
    }
    await page.waitForSelector('tbody');

    const posts = await page.$$('.comment:near(td.ind[indent="0"])');
    
    // Retrieve and send the text content of the element to mongo
    for (const post of posts) {
      const textContent = await post.evaluate(element => element.textContent);
      if (textContent) {
        insertRecord({
          title: postTitle.trim(),
          post: textContent.trim(),
        })
      }
    }

  });
});