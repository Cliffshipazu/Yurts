const unirest = require("unirest");
const cheerio = require("cheerio");

const getImagesData = (query) => {
  const selectRandom = () => {
    const userAgents = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
    ];
    const randomNumber = Math.floor(Math.random() * userAgents.length);
    return userAgents[randomNumber];
  };
  const user_agent = selectRandom();
  const header = {
    "User-Agent": user_agent,
  };
  return unirest
    .get(
      `https://www.google.com/search?q=${query}&hl=en&oq=${query}&tbm=isch&asearch=ichunk&async=_id:rg_s,_pms:s,_fmt:pc&sourceid=chrome&ie=UTF-8`
    )
    .headers(header)
    .then((response) => {
      const $ = cheerio.load(response.body);

      const originalUrls = [];
      $("div.rg_bx").each((i, el) => {
        const json_string = $(el).find(".rg_meta").text();
        const originalUrl = JSON.parse(json_string).ou;
        originalUrls.push(originalUrl);
      });

      return originalUrls;
    });
};

exports.name = '/imagesearch'; 
exports.index = async (req, res) => {
  try {
      const query = req.query.q; 
      getImagesData(query)
        .then((originalUrls) => {
          const data = {
            status: "200\n\n\n",
            developer: "CLIFF\n\n ",
            data: originalUrls,
          };
          res.json(data);
        })
        .catch((error) => {
          console.error('Error fetching data from Google Images:', error.message);
          res.status(500).json({ error: 'Error fetching data from Google Images' });
        });
  } catch (error) {
    console.error('Error in image search:', error.message);
    res.status(500).json({ error: 'Error in image search' });
  }
};
