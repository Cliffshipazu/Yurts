const axios = require('axios');

exports.name = "/conversation";
exports.index = async function (req, res) {
  const { message } = req.query;

  if (!message) {
    return res.status(400).json({ error: "Your question is missing." });
  }
  const options = {
    method: 'POST',
    url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'ec4a07939fmsh4daed89d45e8bccp165f71jsn06c493b781a9',
      'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
    },
    data: {
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      system_prompt: 'I am GPT-4 Turbo, a large language model created by Cliff Vincent.',
      temperature: 0.1,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256,
      web_access: false
    }
  };

  try {
    const response = await axios.request(options);
    const jsonResponse = (response.data);
    res.send(jsonResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error processing request' }); 
  }
};
