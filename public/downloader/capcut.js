const axios = require('axios'); // Import axios library

exports.name = "/capcut";
exports.index = async function (req, res) {
  const url = req.query.url;
  if (!url) return res.json(msg.paramurl);

  try {
    const data = await capcut(url);
    if (!data) {
      return res.json({ status: false, message: msg.nodata.message }); // Access message property of msg.nodata
    }

    res.json({
      status: true,
      creator: msg.nodata.creator, // Use msg.nodata.creator instead of author
      result: data
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function capcut(url) {
  try {
    const response = await axios.post("https://api.teknogram.id/v1/capcut", { url });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const author = 'cliff'; // Define author variable

const msg = {
  paramurl: {
    status: false,
    creator: author,
    message: 'Missing Parameter URL!'
  },
  paramquery: {
    status: false,
    creator: author,
    message: 'Missing Parameter Query!'
  },
  nodata: {
    status: false,
    creator: author,
    message: 'Data tidak ditemukan!' // Corrected the message in Indonesian
  }
};
