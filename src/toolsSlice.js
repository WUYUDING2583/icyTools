const { get } = require("lodash");
const { getNFTInfoApi } = require("./toolsApi");

async function getNFTInfo(nftName) {
  const response = await getNFTInfoApi(nftName);
  const nftInfo = get(response, "data.data").filter(
    ({ name }) => name == nftName
  )[0];
  return nftInfo;
}

async function getNFTAddress(nftName) {
  const info = await getNFTInfo(nftName);
  return info?.address;
}

module.exports = {
  getNFTAddress,
};
