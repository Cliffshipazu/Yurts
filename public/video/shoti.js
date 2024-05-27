const axios = require("axios");

exports.name = "/shoti";
exports.index = async (req, res) => {
  try {
    const response = await axios.post(
      `https://shoti-srv1.onrender.com/api/v1/get`,
      { apikey: "$shoti-1hg4gifgnlfdmeslom8" },
    );
    var username = response.data.data.user.username;
    var nickname = response.data.data.user.nickname;
    var title = response.data.data.title || "No title";
    var userid = response.data.data.userID;
  const url = response.data.data.url;
    res.json({code: "200", msg: "success", author: "Cliff", data: { url: url, username: username, nickname: nickname, title: title, userid: userid}})
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.json({code: "500", msg: "error fet hing shoti", data: error.message })
  }
};