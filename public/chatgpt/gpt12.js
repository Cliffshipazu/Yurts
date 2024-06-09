const axios = require('axios');

const url = 'https://free-api.cveoy.top/v3/completions';
const headers = {
  "Content-Type": "application/json",
};

function clean(q) {
  const ttr = "欢迎使用 公益站! 站长合作邮箱：wxgpt@qq.com";
  let cm = q.replace(ttr, '');
  let cM = cm.replace(/<[^>]*>/g, '');
  return cM.trim();
}

exports.name = '/google';
exports.index = async (req, res, next) => {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt query parameter is required' });
  }

  const data = { prompt };

  axios.post(url, data, { headers })
    .then(response => {
      const cleanedResponse = clean(response.data);
      res.status(200).json({ response: cleanedResponse });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing your request' });
    });
};
