const { startBrowser, openNewPage } = require("./browserHelper");

const URLS = {
  NFT_DETAIL: "https://icy.tools/collections",
};

async function getNFTLast24HoursData(address) {
  const [page, browser] = await openNewPage(`${URLS.NFT_DETAIL}/${address}`);
  await page.waitForSelector("#__next");
  const collectionLinks = await getCollectionLink(page);
  console.log(collectionLinks);

  await page.close();
  await browser.close();
}
async function getCollectionLink(page) {
  const collectionLinks = await page.$$eval(
    ".font-body.font-semibold.antialiased.text-sm.text-darker",
    (titles) =>
      Array.from(
        titles
          .filter((title) => title.textContent === "Collection info")[0]
          .nextElementSibling.querySelectorAll("button")
      ).map((button) => button.querySelector("a").href)
  );
  return collectionLinks;
}
// const scraperObject = {
// url: "https://icy.tools/",
// async scraper(browser) {
//   let page = await browser.newPage();
//   console.log(`Navigating to ${this.url}...`);
//   // Navigate to the selected page
//   await page.goto(this.url);

//   await page.waitForSelector("#__next");
//   const hambugerButton = await page.$("#headlessui-disclosure-button-1");
//   hambugerButton.click();
//   await page.$eval(
//     "input[placeholder=Search for collections or wallets...]",
//     (el) => (el.value = "the high society")
//   );
// let scrapedData = [];
// // Wait for the required DOM to be rendered
// async function scrapeCurrentPage() {
//   await page.waitForSelector(".page_inner");
//   // Get the link to all the required books
//   let urls = await page.$$eval("section ol > li", (links) => {
//     // Make sure the book to be scraped is in stock
//     links = links.filter(
//       (link) =>
//         link.querySelector(".instock.availability > i").textContent !==
//         "In stock"
//     );
//     // Extract the links from the data
//     links = links.map((el) => el.querySelector("h3 > a").href);
//     return links;
//   });
//   // Loop through each of those links, open a new page instance and get the relevant data from them
//   let pagePromise = (link) =>
//     new Promise(async (resolve, reject) => {
//       let dataObj = {};
//       let newPage = await browser.newPage();
//       await newPage.goto(link);
//       dataObj["bookTitle"] = await newPage.$eval(
//         ".product_main > h1",
//         (text) => text.textContent
//       );
//       dataObj["bookPrice"] = await newPage.$eval(
//         ".price_color",
//         (text) => text.textContent
//       );
//       dataObj["noAvailable"] = await newPage.$eval(
//         ".instock.availability",
//         (text) => {
//           // Strip new line and tab spaces
//           text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
//           // Get the number of stock available
//           let regexp = /^.*\((.*)\).*$/i;
//           let stockAvailable = regexp.exec(text)[1].split(" ")[0];
//           return stockAvailable;
//         }
//       );
//       dataObj["imageUrl"] = await newPage.$eval(
//         "#product_gallery img",
//         (img) => img.src
//       );
//       dataObj["bookDescription"] = await newPage.$eval(
//         "#product_description",
//         (div) => div.nextSibling.nextSibling.textContent
//       );
//       dataObj["upc"] = await newPage.$eval(
//         ".table.table-striped > tbody > tr > td",
//         (table) => table.textContent
//       );
//       resolve(dataObj);
//       await newPage.close();
//     });

//   for (link in urls) {
//     let currentPageData = await pagePromise(urls[link]);
//     scrapedData.push(currentPageData);
//     // console.log(currentPageData);
//   }
//   // When all the data on this page is done, click the next button and start the scraping of the next page
//   // You are going to check if this button exist first, so you know if there really is a next page.
//   let nextButtonExist = false;
//   try {
//     const nextButton = await page.$eval(".next > a", (a) => a.textContent);
//     nextButtonExist = true;
//   } catch (err) {
//     nextButtonExist = false;
//   }
//   if (nextButtonExist) {
//     await page.click(".next > a");
//     return scrapeCurrentPage(); // Call this function recursively
//   }
//   await page.close();
//   return scrapedData;
// }
// let data = await scrapeCurrentPage();
// console.log(data);
// return data;
//   },
// };

module.exports = {
  getNFTLast24HoursData,
};
