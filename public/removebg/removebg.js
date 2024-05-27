const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const { image } = require('image-downloader');

exports.name = "/removebg";
exports.index = async (req, res) => {
    try {
        const MtxApi = ["KW4FmGpWUC6a75gRp8C6n9pB"];
        const inputPath = path.resolve(__dirname, `cache`, `removebg.png`);
        const content = req.query.input;

        if (!content) {
            return res.json({ error: "missing image input" });
        }

        await image({
            url: content,
            dest: inputPath
        });

        const formData = new FormData();
        formData.append('size', 'auto');
        formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));

        const response = await axios({
            method: 'post',
            url: 'https://api.remove.bg/v1.0/removebg',
            data: formData,
            responseType: 'arraybuffer',
            headers: {
                ...formData.getHeaders(),
                'X-Api-Key': MtxApi[Math.floor(Math.random() * MtxApi.length)],
            },
            encoding: null
        });

        fs.writeFileSync(inputPath, response.data);

        res.sendFile(inputPath);
    } catch (error) {
        console.error('Error:', error.message);
        res.json({ error: "An error occurred while processing your request.." });
    }
};
