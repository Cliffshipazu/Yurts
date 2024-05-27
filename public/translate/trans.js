const axios = require('axios');

exports.name = '/translate'; exports.index = async (req, res) => {
    try {
        const text = req.query.text;
        const langCode = req.query.lang;

        if (!text || !langCode) {
            return res.status(400).json({ error: 'Text and language code are required.' });
        }

        const response = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${langCode}&dt=t&q=${encodeURIComponent(text)}`);
        const translatedText = response.data[0][0][0];

        res.json({ translatedText });
    } catch (error) {
        console.error("Error translating text:", error);
        res.status(500).json({ error: 'Something went wrong.' });
    }
};