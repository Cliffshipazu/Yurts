const axios = require('axios');

exports.name = '/access-token';
exports.index = async (req, res, next) => {
  try {
    const cookie = req.headers.cookie;
    const accessToken = await getAccessToken(cookie);
    if (accessToken) {
      res.status(200).json({ accessToken });
    } else {
      res.status(404).json({ error: 'Access token not found' });
    }
  } catch (error) {
    console.error('Error fetching access token:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

async function getAccessToken(cookie) {
  try {
    const headers = {
      'authority': 'business.facebook.com',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
      'cache-control': 'max-age=0',
      'cookie': cookie,
      'referer': 'https://www.facebook.com/',
      'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'same-origin',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
    };
    const response = await axios.get('https://business.facebook.com/content_management', { headers });
    const token = response.data.match(/"accessToken":\s*"([^"]+)"/);
    if (token && token[1]) {
      const accessToken = token[1];
      return accessToken;
    }
  } catch (error) {
    console.error('Error fetching access token:', error);
    return;
  }
}
