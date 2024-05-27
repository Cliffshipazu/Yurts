const express = require('express');
const fs = require('fs').promises;
const { G4F } = require('g4f');
const path = require('path');

const router = express.Router();
const g4f = new G4F();

exports.name = '/izumi';
exports.index = async (req, res) => {
    const ask = req.query.ask;
    const id = req.query.id;

    if (!ask || !id) {
        return res.status(400).json({ error: 'Both "ask" and "id" parameters are required' });
    }

    let messages = [];

    let filePath = path.join(__dirname, `/data/${id}.json`);

    try {
        const data = await fs.readFile(filePath, 'utf8');
        messages = JSON.parse(data);
    } catch (error) {
        console.error("Error reading file:", error);

        messages = [{ role: "system", content: "You're a math teacher." }];
    }

    messages.push({ role: "user", content: ask });

    try {
        const response = await g4f.chatCompletion(messages);
        messages.push({ role: "assistant", content: response });

        await fs.writeFile(filePath, JSON.stringify(messages, null, 2));

        res.json({ eurix: response})
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};