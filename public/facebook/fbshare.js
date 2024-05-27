const axios = require("axios");

exports.name = "/fbshare";
exports.index = async function (req, res) {
  const link = req.query.link;
  const token = req.query.token;
  const amounts = req.query.amount;
  const speed = req.query.speed;

  if (!link || !token || !amounts || !speed) {
    return res.status(400).json({
      error: "🔴 Missing input!, Link, token, amount, and speed are required!!",
    });
  }

  const shareCount = parseInt(amounts);
  const timeInterval = parseInt(speed);
  const deleteAfter = 60 * 60;

  let sharedCount = 0;
  let timer = null;

  try {
    const a = await axios.get(
      `https://graph.facebook.com/me?access_token=${token}`
    );
    if (a.data.error) {
      return res.status(401).json({ error: "Invalid access token" });
    }
  } catch (error) {
    return res.status(401).json({ error: "Invalid access token" });
  }

  async function sharePost() {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/me/feed?access_token=${token}&fields=id&limit=1&published=0`,
        {
          link: link,
          privacy: { value: "SELF" },
          no_story: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      sharedCount++;
      const postId = response?.data?.id;

      if (sharedCount === shareCount) {
        clearInterval(timer);
        console.log("Finished sharing posts.");

        if (postId) {
          setTimeout(() => {
            deletePost(postId);
          }, deleteAfter * 1000);
        }
      }
    } catch (error) {
      console.error(`Failed to share post because ${error.response.data}`);
    }
  }

  async function deletePost(postId) {
    try {
      await axios.delete(
        `https://graph.facebook.com/${postId}?access_token=${token}`
      );
      console.log(`Post deleted: ${postId}`);
    } catch (error) {
      console.error("Failed to delete post:", error.response.data);
    }
  }

  timer = setInterval(sharePost, timeInterval);

  setTimeout(() => {
    clearInterval(timer);
    console.log("Loop stopped.");
  }, shareCount * timeInterval);

  res.json({
    text: `Post share success here's some info of your shareboost: Speed of Sharing: ${speed}\n\nAmount: ${amounts}\n\nFb-post-link: ${link}\n\nDate and Time of Sharing: ${new Date().toISOString()}`,
  });
};
