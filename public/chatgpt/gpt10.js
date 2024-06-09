const axios = require('axios');

exports.name = "/yawa";
exports.index = async (req, res) => {
  const content = req.query.content;

  if (!content) {
    return res.status(400).json({ error: 'Content query parameter is required' });
  }

  const data = {
    "botId": "default",
    "customId": null,
    "session": "N/A",
    "chatId": "ilr3knl2dw",
    "contextId": 58,
    "messages": [
      {
        "id": "avdbheamn0s",
        "role": "assistant",
        "content": "Hi! How can I help you?",
        "who": "AI: ",
        "timestamp": 1711008543688
      }
    ],
    "newMessage": content,
    "newFileId": null,
    "stream": false
  };

  const url = "https://chatgpt4online.org/wp-json/mwai-ui/v1/chats/submit";
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': 'c0f4a0793c'
    }
  };

  try {
    const response = await axios.post(url, data, config);
    if (response.data.success) {
      return res.status(200).json({ reply: response.data.reply });
    } else {
      return res.status(500).json({ error: 'Failed to get a successful response from the GPT service' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
