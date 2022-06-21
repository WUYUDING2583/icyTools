const axios = require("axios");

function getNFTInfoApi(name) {
  return axios.get(`https://api.icy.tools/_legacy/search?q=${name}`);
}

module.exports = {
  getNFTInfoApi,
};
