const { OpenAI } = require('openai');

const api = new OpenAI({
  baseURL: 'https://api.aimlapi.com',
  apiKey: 'b8e544a2f5ae452b895d5deeff25af96',
});

exports.name = '/ai';
exports.index = async (req, res) => {
  const openaiQuery = req.query.openai;

  if (!openaiQuery) {
    return res.status(400).json({ error: 'Missing "openai" query parameter' });
  }

  try {
    const result = await api.chat.completions.create({
      model: 'claude-3-sonnet-20240229',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant who knows everything.',
        },
        {
          role: 'user',
          content: openaiQuery,
        },
      ],
    });

    const message = result.choices[0].message.content;
    return res.status(200).json({ response: message });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
