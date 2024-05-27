const fs = require("fs");
const request = require('request');

exports.name = '/imgur2';
exports.index = async (req, res, next) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    var link = req.query.link;
    if (!link) return res.json({ error: 'Missing link data to initiate the program' });

    try {
        const { path, type } = await dl(link);

        var options = {
            method: 'POST', // Changed method to POST for Imgur upload
            url: 'https://api.imgur.com/3/image', // Corrected Imgur upload endpoint URL
            headers: {
                Authorization: 'Client-ID c76eb7edd1459f3'
            }
        };

        options.formData = type == "video" ? { 'video': fs.createReadStream(path) } : { 'image': fs.createReadStream(path) };

        request(options, function (error, response) {
            if (error) {
                return res.json({ error: 'An error occurred with your link' });
            }

            var upload = JSON.parse(response.body);

            fs.unlinkSync(path);

            res.json({
                uploaded: {
                    status: 'success',
                    image: upload.data.link
                }
            });
        });
    } catch (error) {
        res.json({ error: 'An error occurred while processing your request' });
    }
};

async function dl(url) {
    return new Promise((resolve, reject) => {
        let path;
        request(url)
            .on('response', function (response) {
                const ext = response.headers['content-type'].split('/')[1];
                path = __dirname + `/cache/${Date.now()}.${ext}`;
                response
                    .pipe(fs.createWriteStream(path))
                    .on('finish', () => {
                        resolve({ path, type: response.headers['content-type'].split('/')[0] });
                    });
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}
