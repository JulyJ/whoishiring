// @ts-check
const { test, expect } = require('@playwright/test');
const { checkRecord, insertRecord } = require('./mongo-connect.js');

const url = process.env.THREAD_URL || 'https://news.ycombinator.com/item?id=40224213';

test.describe('Get Thread Items', () => {
  test('Load Thread Page and Get the Data', async ({ page }) => {
    // Navigate to the thread page
    await page.goto(url);
    await expect(page).toHaveTitle(/Ask HN: Who is hiring?/);

    // Get the post title
    const postTitleElement = await page.locator('.titleline');
    let title = await postTitleElement.textContent();
    if (!title) {
      title = 'unidentified title';
    }

    // Get the post elements
    await page.waitForSelector('tbody');
    const posts = await page.$$('.default:near(td.ind[indent="0"])');
    
    // Process each post
    // let i = 0
    for (const post of posts) {

      const id_href = await post.evaluate(element => (element.querySelector('span.age a')?.getAttribute('href') || '').trim());
      const id = id_href.match(/\d+/)?.[0];
      
      
      // If the post already exists, continue to the next one
      if (id && await checkRecord(id)) {
          continue;
          }

      const text = await post.evaluate(element => element.children[2].textContent?.trim());
      const author = await post.evaluate(element => (element.querySelector('a.hnuser')?.textContent || '').trim());
      const date = await post.evaluate(element => (element.querySelector('span.age')?.getAttribute('title') || '').trim());
      const hasRemote = /remote/i.test(text || '');
      const hasQA = /qa/i.test(text || '')
                    || /quality/i.test(text || '')
                    || /sdet/i.test(text || '');
      const hasFrontend = /frontend/i.test(text || '') 
                        || /front-end/i.test(text || '')
                        || /front end/i.test(text || '');
      
      const hrefs = await post.evaluate(element => Array.from(element.children[2].querySelectorAll('a'), a => a.href));
      let urls = [];
      for (const href of hrefs) {
        if (href) {
          urls.push(href.trim());
        }
      }
    
    //   if (i >= 3) break;


      // Insert the post details into the database
      if (text) {
        insertRecord({
        // console.log({
          id,
          title,
          date,
          author,
          text,
          urls,
          hasRemote,
          hasQA,
          hasFrontend,
        });
        // i++;
      }
    }
  });
});
