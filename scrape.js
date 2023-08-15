const puppeteer = require('puppeteer');

exports.scrapeTwitter = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://twitter.com/stockNews', {
    waitUntil: 'networkidle2',
  });
  await page.waitForTimeout(3000);
  
  const tweets = await page.evaluate(() => document.body.innerText);

  await browser.close();
  
  return tweets;
};
