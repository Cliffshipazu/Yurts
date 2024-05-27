const axios = require('axios');
const { URLSearchParams } = require('url');

function genRndmIdempotencyKey() {
  let chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 17; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

function genRndmID() {
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 7; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

exports.name = '/blackbox';
exports.index = async (req, res) => {
 const ask = req.query.ask;

  if (!ask) {
    return res.status(400).json({ error: 'Missing ask parameter' });
  }
  try {
    const sessionIdRes = await axios.get('https://www.blackbox.ai/');
    const sessionId = sessionIdRes.headers['set-cookie'][0].split(';')[0];
    const intercomPingRes = await axios.post('https://api-iam.intercom.io/messenger/web/ping',
      new URLSearchParams({
        'app_id': 'jlmqxicb',
        'v': '3',
        'g': 'e6f90c749d7765f3b1bbc8b97fa507e4875bf321',
        's': sessionId,
        'r': '',
        'platform': 'mobile_web',
        'installation_type': 'js-snippet',
        'Idempotency-Key': genRndmIdempotencyKey(),
        'internal': '{}',
        'is_intersection_booted': 'false',
        'page_title': 'Chat Blackbox: AI Code Generation, Code Chat, Code Search - Blackbox',
        'user_active_company_id': 'undefined',
        'user_data': '{}',
        'source': 'apiUpdate',
        'sampling': 'false',
        'referer': 'https://www.blackbox.ai/'
      })
    );

    const user = genRndmID();
    const chatReq = {
      'messages': [
        {
          'id': user,
          'content': ask,
          'role': 'user'
        }
      ],
      'id': user,
      'previewToken': null,
      'userId': intercomPingRes.data.user.anonymous_id,
      'codeModelMode': false,
      'agentMode': {},
      'trendingAgentMode': {},
      'isMicMode': false,
      'isChromeExt': false,
      'githubToken': null,
      'clickedAnswer2': false,
      'clickedAnswer3': false,
      'visitFromURL': false
    };

    const chatRes = await axios.post('https://www.blackbox.ai/api/chat', chatReq);
    const cleanResponse = chatRes.data.replace(/\$@\$v=v1\.13\$@\$(.*?)\]/g, '').trim(); 

    res.send({ Response: cleanResponse });
  } catch (error) {
    res.status(500).send({ "error": error.message });
  }
};
