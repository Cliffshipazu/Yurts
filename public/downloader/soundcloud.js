const axios = require('axios');
const cheerio = require('cheerio');
const request = require('request');

exports.name = "/soundcloud";
exports.index = async function (req, res) {
    try {
        const { url } = req.query;

        if (!url) {
            return res.status(400).json({ error: "URL is missing" });
        }

        const { data } = await axios.get('https://soundcloudmp3.org/id');
        const $ = cheerio.load(data);
        const token = $('form#conversionForm > input[type=hidden]').attr('value');

        const options = {
            method: 'POST',
            url: 'https://soundcloudmp3.org/converter',
            headers: {
                'content-type': 'application/x-www-form-urlencoded;',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
                'Cookie': data.headers['set-cookie'],
            },
            formData: {
                _token: token,
                url: url
            }
        };

        request(options, (error, response, body) => {
            if (error) {
                return res.status(500).json({ error: 'Failed to convert' });
            }

            const $get = cheerio.load(body);
            const result = {
                title: $get('#preview > div:nth-child(3) > p:nth-child(2)').text().replace('Title:', '').trim(),
                duration: $get('#preview > div:nth-child(3) > p:nth-child(3)').text().replace(/Length:|Minutes/g, '').trim(),
                quality: $get('#preview > div:nth-child(3) > p:nth-child(4)').text().replace('Quality:', '').trim(),
                thumbnail: $get('#preview > div:nth-child(3) > img').attr('src'),
                download: $get('#download-btn').attr('href')
            };

            res.json(result);
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
