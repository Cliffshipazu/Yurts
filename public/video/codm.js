const fs = require("fs");
const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

exports.name = '/codm'; 
exports.index = async (req, res) => {
  try {
    const file = await fs.readFileSync(
      path.join(__dirname, "/video.json"),
      "utf-8" // Remove the comma here
    );
    const links = JSON.parse(file);

    const link = links.video[Math.floor(Math.random() * links.video.length)];

    let response = await axios.get(`https://www.tikwm.com/api/?url=${link}`);
    const video = response.data.data.play;
    const username = response.data.data.author.unique_id;
    const nickname = response.data.data.author.nickname;
    const title = response.data.data.title || "No title";
    var totalvids = links.video.length;
    res.json({
      url: video,
      username: username,
      nickname: nickname,
      title: title,
      totalvids: totalvids,
    });
  } catch (error) {
    console.error(error);
    res.json({ error: "error fetching codm api\n\n" + error });
  }
};
