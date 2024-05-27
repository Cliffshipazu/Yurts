const axios = require('axios');
const cheerio = require('cheerio');
const ytdl = require('ytdl-core');
const yts = require('yt-search');

const apiKeys = ['syugg'];

const status = {
  query: {
    creator: 'Cliff',
    status: false,
    msg: 'Missing \'q\' parameter!'
  },
  url: {
    creator: 'Cliff',
    status: false,
    msg: 'Missing \'url\' parameter!'
  },
  apiKey: {
    creator: 'Cliff',
    status: true,
    msg: 'Missing \'apikey\' parameter!'
  },
  invalidKey: {
    creator: 'Cliff',
    status: false,
    msg: 'ApiKey is invalid!'
  },
  invalidURL: {
    creator: 'Cliff',
    status: false,
    msg: 'URL is invalid'
  },
  error: {
    status: false,
    creator: 'Cliff',
    msg: 'Page Not Found!'
  }
};

exports.name = "/yta";
exports.index = async function (req, res) {
  const { url, apikey: apiKey } = req.query;
  if (!url) return res.json(status.url);
  if (!isYouTubeUrl(url)) return res.json(status.invalidURL);
  if (!apiKey) return res.json(status.apiKey);
  if (!apiKeys.includes(apiKey)) return res.json(status.invalidKey);
  try {
    const result = await ytmp3(url);
    res.json(result);
  } catch (error) {
    res.json({ error: error.message });
  }
};

async function ytmp3(url) {
  try {
    const { videoDetails } = await ytdl.getInfo(url, { lang: 'id' });
    const stream = ytdl(url, { filter: 'audioonly', quality: 140 });
    const chunks = [];

    stream.on('data', chunk => {
      chunks.push(chunk);
    });

    await new Promise((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', reject);
    });

    const buffer = Buffer.concat(chunks);

    const data = {
      meta: {
        title: videoDetails.title,
        channel: videoDetails.author.name,
        seconds: videoDetails.lengthSeconds,
        description: videoDetails.description,
        image: videoDetails.thumbnails.slice(-1)[0].url,
      },
      buffer,
      size: buffer.length,
    };
    return { creator: 'Cliff', status: true, data };
  } catch (error) {
    return { creator: 'Cliff', status: false };
  }
}

function isYouTubeUrl(url) {
  return /youtu(?:\.be|be\.com)/.test(url);
}

async function shorten(url) {
  try {
    const isUrl = /https?:\/\//.test(url);
    const link = isUrl ? await axios.get('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url)) : '';
    if (!link) return { creator: 'Cliff', status: false };
    return { creator: 'Cliff', status: true, data: { url: link } };
  } catch (error) {
    return { creator: 'Cliff', status: false };
  }
}

async function ytmp3(url) {
  try {
    const { videoDetails } = await ytdl.getInfo(url, { lang: 'id' });
    const stream = ytdl(url, { filter: 'audioonly', quality: 140 });
    const chunks = [];

    stream.on('data', chunk => {
      chunks.push(chunk);
    });

    await new Promise((resolve, reject) => {
      stream.on('end', resolve);
      stream.on('error', reject);
    });

    const buffer = Buffer.concat(chunks);

    const data = {
      meta: {
        title: videoDetails.title,
        channel: videoDetails.author.name,
        seconds: videoDetails.lengthSeconds,
        description: videoDetails.description,
        image: videoDetails.thumbnails.slice(-1)[0].url,
      },
      buffer,
      size: buffer.length,
    };
    return { creator: 'Cliff', status: true, data };
  } catch (error) {
    return { creator: 'Cliff', status: false };
  }
}
