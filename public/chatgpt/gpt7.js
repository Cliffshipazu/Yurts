const deku = require('deku-ai');

exports.name = "/chat";
exports.index = async function (req, res) {
    const prompt = req.query.prompt || '';
    const version = req.query.version || '';
    if (!prompt) {
        return res.status(400).json({ error: "missing prompt and version parameters/query." });
    }
    try {
        const response = await chat(prompt, version);
        res.json({ deku: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function chat(prompt, version) {
    const response = await deku.chat({
        prompt: prompt,
        version: version // v3-turbo, v4, v4-32k, gemini
    });
    return response;
}
