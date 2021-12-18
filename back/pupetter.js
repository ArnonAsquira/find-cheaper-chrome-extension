const puppeteer = require("puppeteer");

async function searchProduct(name, bestRated) {
  // browser configuration
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--incognito"],
  });
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  // searching for "zap" in google
  await page.goto(
    "https://www.google.com/search?q=%D7%96%D7%90%D7%A4&oq=%D7%96%D7%90%D7%A4&aqs=chrome.0.69i59l2j69i61l3.772j0j1&sourceid=chrome&ie=UTF-8"
  );
  // entering the "zap" website
  await Promise.all([
    page.click(
      "#rso > div:nth-child(1) > div > div > div > div > div > div.yuRUbf > a"
    ),
    page.waitForNavigation({ waitUntil: "networkidle2" }),
  ]);
  // typing the desired product name
  await page.click("#select2-keyword-container");
  await page.type(
    "body > span > span > span.select2-search.select2-search--dropdown > input",
    name
  );
  // waiting for two seconds before pressing enter, must have some delay after typing
  await page.waitForTimeout(2000),
    await Promise.all([
      page.keyboard.press("Enter"),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);
  await Promise.all([
    page.click(".blue-style"),
    page.waitForNavigation({ waitUntil: "networkidle2" }),
  ]);
  // clicking the sort by rating only if the best rated option is truthy
  if (bestRated) {
    await page.click("#hl_OrderByStoreRate");
  }
  let productLink;
  // extracting the specific url for the desired product
  try {
    productLink = await page.evaluate(() => {
      const cheapesResault = document.querySelector(".hl_ProductTitle");
      console.log(document.querySelector(".hl_ProductTitle"));
      console.log(cheapesResault.getAttribute("href") || "couldnt find it");
      return cheapesResault.getAttribute("href");
    });
  } catch (err) {
    console.log(err);
  }
  await browser.close();
  return productLink;
}

module.exports = {
  searchProduct,
};
