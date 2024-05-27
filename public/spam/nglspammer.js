exports.name = "/submit"; 
exports.index = async (req, res) => {
    const { username, message, count } = req.body;

    console.log(`Received request from ${username} with message: ${message} and count: ${count}`);

    try {
        const fetch = await import('node-fetch');
        const response = await fetch.default('https://ngl.link/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, message, count })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Response from external API:', data);
            res.status(200).json({ success: true, message: 'Data submitted successfully' });
        } else {
            throw new Error('Failed to submit data to external API');
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
