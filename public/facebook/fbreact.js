const axios = require('axios');

exports.name = "/boostReaction";
exports.index = async function (req, res) {
    try {
        const { cookie, link, reaction } = req.query;
        const validReactions = ['like', 'haha', 'sad', 'angry', 'love', 'care'];
        if (!cookie || !link || !reaction || !validReactions.includes(reaction)) {
            throw new Error('Invalid request parameters');
        }

        const response = await axios.get(`https://fbpython.click/android_get_react?cookie=${cookie}&link=${link}&reaction=${reaction}`);

        res.json({ success: true, message: 'Reaction boosted successfully', data: response.data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
