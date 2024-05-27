const axios = require("axios");

exports.name = "/jea"; 
exports.index = async function (req, res, next) {
  try {
    const ask = req.query.ask;

    const response = await axios.get(`https://lianeapi.onrender.com/@unregistered/api/jea`, {
      params: {
        key: "j86bwkwo-8hako-12C",
        query: ask,
      }
    });
    const result = response.data.message;
    res.json({
      message: `✨ Jea 
━━━━━━━━━━━━━━━
${result}`,
    });

  } catch (error) {
    console.error(error); 
    res.json({ error: "An error occurred while processing your request." });
  }
};