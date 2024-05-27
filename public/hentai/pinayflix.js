const axios = require('axios');
const cheerio = require('cheerio');

async function searchPinayFlix(search) {
  try {
    const url = `https://pinayflix1.com/?s=${encodeURIComponent(search)}`;
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);
    const results = [];

    $('div.video-list-content > div').each((i, element) => {
      const title = $(element).find('img').attr('alt');
      const img = 'https:' + $(element).find('img').attr('data-src');
      const link = $(element).find('a').attr('href');
      results.push({ title, img, link });
    });

    return results;
  } catch (error) {
    throw new Error('Error searching PinayFlix');
  }
}

async function getEmbedURL(link) {
  try {
    const response = await axios.get(link);
    const $ = cheerio.load(response.data);
    const embedURL = $('meta[itemprop="embedURL"]').attr('content');
    return embedURL;
  } catch (error) {
    throw new Error('Error getting embed URL');
  }
}

async function fetchResults(search) {
  try {
    const results = await searchPinayFlix(search);

    const resultsWithEmbedURL = await Promise.all(results.map(async (item) => {
      const embedURL = await getEmbedURL(item.link);
      return { ...item, embedURL };
    }));

    return resultsWithEmbedURL;
  } catch (error) {
    throw new Error('Error fetching results');
  }
}

exports.name = '/api/pinayflex';
exports.index = async (req, res, next) => {
  const search = req.query.search;

  if (!search) {
    res.status(400).json({ error: "Not Found gar subukan mo ulit" });
  } else {
    try {
      const results = await fetchResults(search);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
