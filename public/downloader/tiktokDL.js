const Tiktok = require("@tobyg74/tiktok-api-dl");

const author = process.env.AUTHOR || "Cliff";

exports.name = "/api/tiktok";
exports.index = async function (req, res) {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({
      status: 400,
      message: "Input TikTok URL!"
    });
  }

  try {
    const data = await Tiktok(url, { version: "v2" });

    res.status(200).json({
      status: 200,
      author: author,
      result: data.result,
      message: err.message
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      author: author,
      message: err.message
    });
  }
};
