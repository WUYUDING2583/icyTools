const { startBrowser, openNewPage } = require("../browserHelper");

const URLS = {
  NFT_DETAIL: "https://icy.tools/collections",
};

async function getNFTLast24HoursData(address) {
  const [page, browser] = await openNewPage(`${URLS.NFT_DETAIL}/${address}`);
  await page.waitForSelector("#__next");
  const collectionLinks = await getCollectionLink(page);
  const [volume, sales, floorPrice, average] = await getData(page);
  await page.close();
  await browser.close();
  return {
    links: collectionLinks,
    "24HRVolume": {
      value: volume[0],
      increaseRatio: volume[1],
    },
    "24HRSales": {
      value: sales[0],
      increaseRatio: sales[1],
    },
    salesFloor: {
      value: floorPrice[0],
      increaseRatio: floorPrice[1],
    },
    "24HRAverage": {
      value: average[0],
      increaseRatio: average[1],
    },
  };
}

async function getCollectionLink(page) {
  await page.waitForSelector(
    ".font-body.font-semibold.antialiased.text-sm.text-darker"
  );
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

async function getData(page) {
  await page.waitForSelector(".grid.auto-rows-min.auto-cols-min.grid-cols-2");
  const data = await page.$$eval(
    ".grid.auto-rows-min.auto-cols-min.grid-cols-2",
    (els) =>
      els.map((el) => {
        const text = el.querySelector("div>h3").textContent;
        const percentageDOM = el.querySelector("div>div>span");
        return [
          text.includes("Ξ") ? text.slice(2) : text,
          `${percentageDOM.className.includes("red") ? "-" : ""}${
            percentageDOM.textContent
          }`,
        ];
      })
  );
  return data;
}

module.exports = {
  getNFTLast24HoursData,
};
