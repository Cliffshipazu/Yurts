const axios = require("axios");
exports.name = '/chesca'; exports.index = async (req, res) => {
  try {
    const question = req.query.ask;

    const response = await axios.get('https://lianeapi.onrender.com/@LianeAPI_Reworks/api/chesca1', {
      params: {
        key: "j86bwkwo-8hako-12C",
        query: question,
      }
    });

    res.json({ message: response.data.message });


  } catch (error) {
    res.status(500).json({ error: error.message });
console.log(error);
  }
};