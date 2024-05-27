
const axios = require('axios');
const path = require('path');



const CODE_LLAMA_URL = 'https://api.deepinfra.com/v1/inference/meta-llama/Llama-2-70b-chat-hf';

exports.name = "/meta"; 
exports.index = async (req, res) => {
  try {
    const inputText = req.query.prompt;

    const params = {
      input: `[INST] ${inputText} [/INST]`,
      max_new_tokens: 1024,
      temperature: 0.4,
      top_p: 0.9,
      top_k: 0,
      repetition_penalty: 1.2,
      num_responses: 1,
      stream: false
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': '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' 
    };

    console.log('Request to Meta Llama API:', params); 

    const response = await axios.post(CODE_LLAMA_URL, params, { headers });

    console.log('Response from Meta Llama API:', response.data); 

    if (response.status === 200) {
      const result = response.data;
      const generatedText = result.results[0].generated_text;

      const finalResponse = `${generatedText}`;

      res.json({ finalResponse });
    } else {
      console.error('Error generating response. Meta Llama API status:', response.status);
      res.status(response.status).json({ error: 'Error generating response' });
    }
  } catch (error) {
    console.error('Internal server error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.toString() });
  }
};
