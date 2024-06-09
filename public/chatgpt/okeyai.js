const https = require('https');

exports.name = '/okeyai';
exports.index = async (req, res, next) => {
    const message = req.query.message;

    if (!message) {
        return res.status(400).json({ error: 'Message query parameter is required' });
    }

    const url = "https://www.goody2.ai/send";
    const headers = {
        "authority": "www.goody2.ai",
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "text/plain",
        "origin": "https://www.goody2.ai",
        "referer": "https://www.goody2.ai/chat",
        "sec-ch-ua": '"Not-A.Brand";v="99", "Chromium";v="124"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
    };

    const data = JSON.stringify({
        message: message,
        debugParams: null
    });

    const options = {
        method: 'POST',
        headers: headers,
    };

    try {
        const response = await new Promise((resolve, reject) => {
            const req = https.request(url, options, (res) => {
                let body = '';

                res.on('data', (chunk) => {
                    body += chunk;
                });

                res.on('end', () => {
                    resolve({ statusCode: res.statusCode, body: body });
                });
            });

            req.on('error', (e) => {
                reject(e);
            });

            req.write(data);
            req.end();
        });

        if (response.statusCode < 200 || response.statusCode >= 300) {
            return res.status(response.statusCode).json({ error: response.body });
        }


        const plainTextContent = response.body
            .split('\n')
            .filter(line => line.startsWith('data: '))
            .map(line => JSON.parse(line.slice(6)).content)
            .join('');

const jsonResponse = { okeyai: plainTextContent };

        res.status(200).send(jsonResponse);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
