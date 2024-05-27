const { remini } = require("betabotz-tools");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
exports.name = "/remini"; exports.index =  async (req, res) => {
  try {
    const inputImage = req.query.input;

    if (!inputImage) {
      return res.status(400).send({ error: "Missing input image URL" });
    }

    const result = await remini(inputImage);
    const image = result.image_data;
    const filePath = path.join(__dirname, "cache", "remini.jpg");

    const response = await axios.get(image, { responseType: "arraybuffer" });
    fs.writeFileSync(filePath, response.data);

    res.sendFile(filePath);

  } catch (error) {
    console.error("Error calling Remini API:", error.message);
    res.status(error.response?.status || 500).send({
      error: "Internal Server Error",
      details: error.message,
    });
  }
};