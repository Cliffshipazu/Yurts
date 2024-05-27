const axios = require('axios');

const apiKey = 'acc7c3fb55cbffb1effa0012ee6dbbb7.Rep5YolmSVpgfw8N';
const baseUrl = 'https://open.bigmodel.cn/api/paas/v4/';

const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json'
};

exports.name = '/glm/gpt9/x1';
exports.index = async (req, res) => {
    const searchQuery = req.query.search;

    if (!searchQuery) {
        return res.status(400).json({ nakalimutan_mo: 'Missing search query parameter' });
    }

    const data = {
        model: 'glm-4',
        messages: [
            { role: 'system', content: 'You are a smart and creative novelist' },
            { role: 'user', content: searchQuery }
        ],
        top_p: 0.7,
        temperature: 0.9
    };

    try {
        const response = await axios.post(`${baseUrl}chat/completions`, data, { headers });
        res.status(200).json( response.data.choices[0].message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ content: 'An error occurred' });
    }
};
