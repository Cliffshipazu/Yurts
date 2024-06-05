const axios = require('axios');

exports.name = "/follow"; 
exports.index = async (req, res) => {
  const { accountID, accessToken } = req.query;

  // Check if required query parameters are provided
  if (!accountID || !accessToken) {
    return res.status(400).json({ error: 'accountID and accessToken are required' });
  }

  const accessTokens = Array.isArray(accessToken) ? accessToken : [accessToken];
  const randomToken = accessTokens[Math.floor(Math.random() * accessTokens.length)];

  const config = {
    headers: {
      Authorization: `Bearer ${randomToken}`,
    },
    scope: ['public_profile', 'email', 'user_friends', 'user_likes', 'user_photos', 'user_videos', 'user_status', 'user_posts', 'user_tagged_places', 'user_hometown', 'user_location', 'user_work_history', 'user_education_history', 'user_groups', 'publish_pages', 'manage_pages'],
  };

  try {
    const { data } = await axios.get('https://graph.facebook.com/v18.0/me/accounts', config);
    const pagesData = data.data.map(({ access_token: token, name }) => ({ token, name }));

    await followAccounts(pagesData, accountID);
    res.status(200).json({ message: `Successfully followed account ${accountID}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to follow the account' });
  }
};

const followAccounts = async (pagesData, accountID) => {
  for (const { token, name } of pagesData) {
    try {
      await axios.post(`https://graph.facebook.com/v18.0/${accountID}/subscribers`, {}, { headers: { Authorization: `Bearer ${token}` } });
      console.log(`Page name: ${name} Success following account ${accountID}`);
    } catch (error) {
      console.error(error);
    }
    await new Promise(resolve => setTimeout(resolve, 1500)); // delay of 1.5 seconds
  }
};

