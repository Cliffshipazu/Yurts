const axios = require("axios");

exports.name = "/stalk";
exports.index = async function (req, res) {
  let uid = req.body.uid;

  if (!uid) {
    return res.status(400).json({ error: "missing uid token parameters" });
  }

  const headers = {
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
    accept: "application/json, text/plain, */*",
  };

  var token = `${global.config.fbstalk}`;

  const avatar = `https://graph.facebook.com/${uid}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

  try {
    const response = await axios.get(
      `https://graph.facebook.com/${uid}?fields=id,is_verified,cover,created_time,work,hometown,username,link,name,locale,location,about,website,birthday,gender,relationship_status,significant_other,quotes,first_name,subscribers.limit(0)&access_token=${token}`,
      { headers },
    );

    const data = response.data;

    const id = data.id || "No ID available";
    const name = data.name || "No name available";
    const link = data.link || "No link available";
    const relationship =
      data.relationship_status || "No relationship status available";
    const love = data.significant_other
      ? data.significant_other.name
      : "No significant other";
    const gender = data.gender || "No gender specified";
    const create = data.created_time || "No creation time available";
    const username = data.username || "No username available";
    const hometown = data.hometown
      ? data.hometown.name
      : "No hometown available";
    const location = data.location
      ? data.location.name
      : "No location available";
    const birthday = data.birthday || "No birthday available";
    const work = data.work ? data.work.name : "No workplace available";
    const about = data.about || "No about available";
    const locale = data.locale || "No locale available";
    const verified = data.is_verified ? "Verified" : "Not verified";
    const cover = data.cover ? data.cover.source : "No cover available";
    const followers = data.subscribers
      ? data.subscribers.summary.total_count
      : "No follower count available";

    res.json({
      id,
      name,
      link,
      relationship,
      love,
      gender,
      create,
      username,
      hometown,
      location,
      birthday,
      work,
      about,
      locale,
      verified,
      cover,
      followers,
      avatar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};