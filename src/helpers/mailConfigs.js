const nodemailer = require('nodemailer');
const dotenv = require('dotenv');


const transporter = nodemailer.transporter({
    service: 'gmail',
    auth: {
        user: process.env.SEND_EMAIL,
        auth: process.env.EMAIL_PASS
    }
});

module.exports = transporter