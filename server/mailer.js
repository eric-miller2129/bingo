require('dotenv').config();

const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport');
const Email = require('email-templates');

const mgOptions = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
    }
};

const transport = mailgunTransport(mgOptions);

class EmailService {
    email = new Email({
        message: {
            from: '"LetsGo.bingo" <no-reply@letsgo.bingo>',
        },
        views: {
            root: __dirname,
        },
        transport: nodemailer.createTransport(transport),
        send: true,
        preview: false,
    });

    constructor() {
        this.emailClient = nodemailer.createTransport(transport);
    }

    sendGameCreated(to, slug) {
        return new Promise((resolve, reject) => {
            this.email.send({
                template: './emails/gameCreated',
                message: {
                    to,
                },
                locals: {
                    title: 'Congratulations!',
                    gameUrl: `${process.env.URL}/game/${slug}`,
                    controlUrl: `${process.env.URL}/control/${slug}`,
                },
            }).then(() => {
                resolve(true);
            }).catch((e) => {
                console.log(e);
                reject(e);
            });
        });
    }
}

module.exports = new EmailService();
