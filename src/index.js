// const startBrowser = require("./browser");
// const scraperController = require("./pageController");

const { getNFTLast24HoursData } = require("./scraper/getNFTLast24HoursData");
const { getNFTAddress } = require("./toolsSlice");

// //Start the browser and create a browser instance
// let browserInstance = startBrowser();

// // Pass the browser instance to the scraper controller
// scraperController(browserInstance);
const NFT_NAME = "The High Society NFTCollection";

(async () => {
  const address = await getNFTAddress(NFT_NAME);
  if (address) {
    const last24HoursData = await getNFTLast24HoursData(address);
    console.log(last24HoursData);
  }
})();
