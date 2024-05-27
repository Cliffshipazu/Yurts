const cors = require("cors");
const axios = require("axios");

exports.name = "/anydownload";
exports.index = async function (req, res) {
  const link = "https://anydownloader.com/wp-json/aio-dl/video-data/";
  const { huys } = req.query;
  if (!huys) return res.json({ error: "No url provided" });
  try {
    const headers = {
      "Remote-Address": "[2606:4700:20::681a:898]:443",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    };
    const data = {
      url: encodeURI(huys),
      token: "3f0fdbdab754b8cb31a85e06c52b56ff3eb894406d13c8bd6b02f8110b7e3e8d",
    };
    const response = await axios.post(link, data, { headers });
    const url = response.data.medias[0].url;
    res.json({ url });
  } catch (e) {
    return res.json({ error: e.message });
  }
};
