const axios = require('axios');

exports.name = '/ai';
exports.index = async (req, res) => {
  const gptQuery = req.query.syugg;

  if (!gptQuery) {
    return res.status(400).json({ error: 'Missing query parameter: gpt-4o' });
  }

  const payload = {
    model: 'gpt-4o',
    messages: [
      {
        role: 'user',
        content: gptQuery
      }
    ],
    apikey: 'sk-41298a35571942deb480fb84aada3819'
  };

  try {
    const response = await axios.post('https://openai-api.replit.app/v1/chat/completions', payload);
    res.status(200).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
