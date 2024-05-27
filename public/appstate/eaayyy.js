const request = require("request");

exports.name = '/eaaay/api';
exports.index = async (req, res, next) => {
  const user = req.query.user;
  const pass = req.query.pass;
  const api_url = "https://b-api.facebook.com/method/auth.login";
  const nigga = "6628568379|c1e620fa708a1d5696fb991c1bde5662"; // Not sure what this is for, but keep it if needed

  if (!user || !pass) {
    return res.send({ message: "Both username and password are required" });
  }

  const params = {
    format: "json",
    device_id: "yrcyg4m1-o7m5-pghw-atiu-n04mh4nlka6n",
    email: user,
    password: pass,
    locale: "en_US",
    method: "auth.login",
    access_token: nigga,
  };

  request.get({ url: api_url, qs: params }, (error, response, body) => {
    if (error) {
      return res.send({ message: "Internal server error" });
    }
    const resJson = JSON.parse(body);

    if (resJson.access_token) {
      return res.send({ eaaaay_token: resJson.access_token });
    } else {
      return res.send({ message: "Wrong Credentials" });
    }
  });
};
