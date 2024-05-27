const { spotify, spotifydl, facebook } = require('betabotz-tools');

exports.name = "/spotifydl"; 
exports.index = async (req, res) => {
    try {
        const title = req.query.title;
        if (!title) {
            return res.status(400).json({ error: 'Missing title of the song' });
        }

        const resultTitle = await spotify(title);

        if (!resultTitle || !resultTitle.result || resultTitle.result.data.length === 0) {
            return res.status(404).json({ error: 'Song not found' });
        }

        const songUrl = resultTitle.result.data[0].url;

        const downloadResult = await spotifydl(songUrl);
        res.json({ downloadUrl: downloadResult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
