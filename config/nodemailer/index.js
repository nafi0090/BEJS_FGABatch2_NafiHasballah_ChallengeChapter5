const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nafihasbalah@gmail.com',
        pass: 'hkrloikjximsvnrs'
    }
});

module.exports = {transport};