const express = require('express');
const bodyParser = require('body-parser');
const Africastalking = require('africastalking');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const africastalking = Africastalking({
    apiKey: process.env.API_KEY,
    username: process.env.USERNAME
});

const sms = africastalking.SMS;

app.post('/send-sms', async (req, res) => {
    const { phone, message } = req.body;
    try {
        const result = await sms.send({
            to: [phone],
            message: message,
            from: 'Quicktel'
        });
        res.json({ success: true, result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});