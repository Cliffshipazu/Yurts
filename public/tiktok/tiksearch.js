const axios = require("axios");

exports.name = "/tiksearch"; exports.index = async (req, res) => {
  try {
    const search = req.query.search;

    if (!search) {
      return res.json({ error: "Missing data to launch the program" });
    }

    const response = await axios.post("https://www.tikwm.com/api/feed/search", {
      keywords: search,
    });

    const data = response.data;

    if (data.data && data.data.videos && data.data.videos.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.data.videos.length);

      const randomVideo = data.data.videos[randomIndex];

      const result = {
        code: 0,

        msg: "success",

        processed_time: 0.9624,

        data: {
          videos: [randomVideo],
        },
      };

      return res.json(result);
    } else {
      return res.json({ error: "No videos found" });
    }
  } catch (error) {
    console.error(error);

    return res.status(500).json({ error: "Internal Server Error" });
  }
};