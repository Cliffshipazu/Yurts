const axios = require("axios");
exports.name = '/tikdl';
exports.index = async(req, res, next) => {
  const link = req.query.link;
  if (!link) {
    res.json({ error: "Please provide a TikTok video link." });
  } else {
    try {
      const response = await axios.post("https://www.tikwm.com/api/?hd=1", {
        url: link,
      });
      const username = response.data.data.author.unique_id;
      const url = response.data.data.play;
      const nickname = response.data.data.author.nickname;
      const title = response.data.data.title;
      const like = response.data.data.digg_count;
      const comment = response.data.data.comment_count;
const views = response.data.data.play_count;
const uid = response.data.data.author.id;

      res.json({
        username: username,
        nickname: nickname,
        url: url,
        title: title,
        like: like,
        comment: comment,
        views: views,
        uid: uid,
      });
      console.log(response.data);
    } catch (error) {
      // handle error
      console.error(error);
      res.json({error: "An error occured while processing your request"})
    }
  }
};