const axios = require('axios');
const fs = require('fs');

const fbWatchRegex = /https:\/\/www\.facebook\.com\/\S+/;

exports.name = "/downloadFacebook";
exports.index = async function (req, res) {
  const { url } = req.query;

  if (fbWatchRegex.test(url)) {
    try {
      const response1 = await axios({
        method: 'POST',
        url: 'https://snapsave.app/action.php?lang=ph',
        headers: {
          "accept": "*/*",
          "accept-language": "vi,en-US;q=0.9,en;q=0.8",
          "content-type": "multipart/form-data",
          "sec-ch-ua": "\"Chromium\";v=\"110\", \" Not A(Brand\";v=\"24\", \"Microsoft Edge\";v=\"110\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "Referer": "https://snapsave.app/ph",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        data: {
          url
        }
      });

      if (response1.data.success && response1.data.download && response1.data.download.length > 0) {
        const videoUrl = response1.data.download[0].url;
        const response2 = await axios({
          method: "GET",
          url: videoUrl,
          responseType: "stream"
        });
        const path = '/cache/fbdownloader.mp4'; // Changed path to use relative path

        if (response2.headers['content-length'] > 87031808) {
          return res.status(400).json({ error: "The file is too large, cannot be sent" });
        }

        response2.data.pipe(fs.createWriteStream(path));
        response2.data.on('end', async () => {
          const messageBody = `Download Url: ${videoUrl}`;
          res.status(200).json({ message: messageBody });
        });
      } else {
        res.status(400).json({ error: "Error downloading video" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ error: "Invalid Facebook watch URL" });
  }
};
