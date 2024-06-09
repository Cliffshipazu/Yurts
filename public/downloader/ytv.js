const axios = require('axios');
const ytdl = require('ytdl-core');

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

exports.name = "/ytv";
exports.index = async function (req, res) {
  const { url, apikey: apiKey } = req.query;
  if (!url) return res.json(status.url);
  if (!isYouTubeUrl(url)) return res.json(status.invalidURL);
  if (!apiKey) return res.json(status.apiKey);
  if (!apiKeys.includes(apiKey)) return res.json(status.invalidKey);
  try {
    const result = await ytmp4(url);
    res.json(result);
  } catch (error) {
    res.json({ error: error.message });
  }
};

async function ytmp4(url) {
  try {
    const id = ytdl.getVideoID(url);
    const data = await ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`);
    const formats = ytdl.filterFormats(data.formats, 'audioandvideo');
    const video = formats.find(format => format.container === 'mp4' && format.hasAudio && format.hasVideo);

    if (!video) {
      throw new Error('No suitable video format found');
    }

    const title = data.videoDetails.title;
    const thumb = data.videoDetails.thumbnails[0].url;
    const channel = data.videoDetails.ownerChannelName;
    const views = data.videoDetails.viewCount;
    const published = data.videoDetails.publishDate;
    const duration = data.videoDetails.lengthSeconds;

    const result = {
      title,
      duration,
      thumb,
      channel,
      published,
      views,
      url: video.url // This URL might need authorization cookies
    };
    return { creator: 'Cliff', status: true, result };
  } catch (error) {
    return { creator: 'Cliff', status: false, message: error.message };
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
    return { creator: 'Cliff', status: true, data: { url: link.data } };
  } catch (error) {
    return { creator: 'Cliff', status: false };
  }
}