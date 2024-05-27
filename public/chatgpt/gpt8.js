const cheerio = require('cheerio');

async function ChatGpt(you_qus) {
  let baseURL = "https://free-api.cveoy.top/";

  const fetch = (await import('node-fetch')).default;

  try {
    const response = await fetch(baseURL + "v3/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "origin": "https://ai1.chagpt.fun",
        "Referer": baseURL
      },
      body: JSON.stringify({
        prompt: you_qus
      })
    });

    let data = await response.text();
    // Remove <br/><br/> and the Chinese text
    data = data.replace(/<br>\/\n\n\/<br\/><br\/>/g, '').replace(/欢迎使用公益站! 站长合作邮箱：wxgpt@qq.com<br\/>/g, '');
    return data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

exports.name = '/gpt8/gptfun';
exports.index = async (req, res) => {
  const { question } = req.query;

  if (!question) {
    return res.status(400).json({ error: "Missing 'question' query parameter" });
  }

  try {
    const response = await ChatGpt(question);
    return res.status(200).json({ gptfun: response });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}; 
