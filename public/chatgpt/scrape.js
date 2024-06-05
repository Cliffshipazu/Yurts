const axios = require('axios');

exports.name = '/scrapper';
exports.index = async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const response = await axios.post(
      'https://realtime.oxylabs.io/v1/queries',
      {
        'source': 'universal',
        'url': url,
        'geo_location': 'United States'
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        auth: {
          username: 'cliff_7BHNp',
          password: 'TR3MjxaagRgEaE'
        }
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
};
