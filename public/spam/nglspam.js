const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

exports.name = "/nglspam"; 
exports.index = async (req, res) => {
    const { nglusername, message, amount } = req.query;

    if (!nglusername || !message || !amount) {
        return res.status(400).json({ error: "Invalid command format. Please use /nglspam?nglusername=[username]&message=[message]&amount=[amount]" });
    }

    try {
        const uuid = uuidv4();
        const headers = {
            'referer': `https://ngl.link/${nglusername}`,
            'accept-language': 'tr-TR,tr;q=0.9,en-US;q=0.8,en;q=0.7',
        };

        const data = {
            'username': nglusername,
            'question': message,
            'deviceId': "ea356443-ab18-4a49-b590-bd8f96b994ee",
            'gameSlug': '',
            'referrer': '',
        };

        let value = 0;
        for (let i = 0; i < amount; i++) {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Delay 2 seconds
            await axios.post('https://ngl.link/api/submit', data, { headers });
            value += 1;
            console.log(`[+] Send => ${value}`);
        }

        res.status(200).json({ message: `Successfully sent ${amount} message(s) to ${nglusername} through ngl.link.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while sending the message through ngl.link." });
    }
};
