const cherrio = require("cheerio");
const axios = require("axios");
exports.name = '/tempmail/gen'; exports.index =  async (req, res) => {

  try {
    const response = await axios.get('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1');
    const email = response.data[0];
    res.json({ email });
  } catch (error) {
    console.error('Error generating random email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};