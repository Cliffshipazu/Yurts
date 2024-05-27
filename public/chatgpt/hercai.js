const { Hercai } = require("hercai");

const herc = new Hercai();

exports.name = '/hercai';
exports.index = async (req, res) => {
  const ask = req.query.ask;

  if (!ask) {
    return res.status(400).json({ error: "Please provide 'ask' parameter" });
  }

  try {
    const askLowerCase = ask.toLowerCase();
    const response = await herc.question({ model: "v3", content: askLowerCase });
    return res.json({ answer: response.reply });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
