const { RsnChat } = require("rsnchat");
const rsnchat = new RsnChat("rsnai_C5Y6ZSoUt3LRAWopF6PQ2Uef");

exports.name = '/architecture';
exports.index = async (req, res) => {
  const query = req.query.ask;
  if (!query) {
    return res.status(400).json({ error: "Your questions is Missing." });
  }

  rsnchat.gpt(query).then((response) => {
    const jsonResponse = { architecture: response.message };
    res.json(jsonResponse);
  }).catch((error) => {
    res.status(500).json({ error: "An error occurred: " + error.message });
  });
};
