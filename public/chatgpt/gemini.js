const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.name = '/gemini';
exports.index = async (req, res) => {
  const prompt = req.query.prompt;

  if (!prompt) {
    return res.status(400).json({ error: "missing prompt" });
  }

  const apikeys = [
    "AIzaSyCAC8wPyZKnzGpjs86KLfJMFhn36_yv9yU",
    "AIzaSyDpIa6zSLp-UpUBXwc-NDi_UUGweuK44V8",
    "AIzaSyDOTbcNbnIdOmh5VM09EbF-l1jcp5mFgR8",
    "AIzaSyBHu3Y0abwG8mK0ANGCM9AsL2FcZFkrOJ4",
    "AIzaSyACxtx0EQj8-YcA4VkqAOsMRNkwFNfrJ9U",
    "AIzaSyB9H4KBiyjMuvENJM9CJ4SpW2ysB78nDnc"
  ];

  async function run(prompt) {
    try {
      for (const apiKey of apikeys) {
        const genAI = new GoogleGenerativeAI(apiKey);

        const generationConfig = {
          stopSequences: ["red"],
          maxOutputTokens: 1024,
          temperature: 1,
          topP: 1,
          topK: 40,
        };
        const model = genAI.getGenerativeModel({
          model: "gemini-pro",
          generationConfig,
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        console.log(text);
        if (text) {
          return res.json({ success: text });
        }
      }
      res.json({ error: "Error na sya HAHAHA" });
    } catch (e) {
      console.log(e);
      res.json({ error: e.message });
    }
  }
  run(prompt);
};
