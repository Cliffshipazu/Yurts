const axios = require('axios');

exports.name = "/gpt11";
exports.index = async (req, res) => {
    const userQuestion = req.query.ask;

    if (!userQuestion) {
        return res.status(400).json({ error: 'Query parameter "ask" is required' });
    }

    const headers = {
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36",
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Origin": "https://www.globalgpt.nspiketech.com",
        "Referer": "https://www.globalgpt.nspiketech.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site"
    };

    const postUrl = "https://swiftmodel.azurewebsites.net/api/ChatTrigger";
    const postData = {
        "name": [
            { "role": "user", "content": userQuestion }
        ]
    };

    try {
        const postResponse = await axios.post(postUrl, postData, { headers });
        const responseContent = postResponse.data['message']['content'];
        res.status(200).json({ response: responseContent });
    } catch (error) {
        if (error.response) {
            res.status(500).json({ error: 'External API error', details: error.response.data });
        } else if (error.request) {
            
            res.status(500).json({ error: 'No response from external API' });
        } else {
            res.status(500).json({ error: 'Request setup error', details: error.message });
        }
    }
};
