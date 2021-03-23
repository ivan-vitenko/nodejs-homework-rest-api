const Mailgen = require('mailgen');
const sgMail = require('@sendgrid/mail');
const config = require('../config/email.json');
require('dotenv').config();

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;

  constructor(env) {
    switch (env) {
      case 'development':
        this.link = config.dev;
        break;

      case 'production':
        this.link = config.prod;
        break;

      default:
        this.link = config.dev;
        break;
    }
  }

  #createTemplate(verifyToken, name = 'Guest') {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'neopolitan',
      product: {
        // Appears in header & footer of e-mails
        name: 'Phonebook',
        link: this.link,
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
      },
    });

    const template = {
      body: {
        name,
        intro: 'Це інтро',
        action: {
          instructions: 'Для завершення реєстрації натисніть на кнопку:',
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Confirm your account',
            link: `${this.link}/api/users/auth/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    return mailGenerator.generate(template);
  }

  async sendEmail(verifyToken, email, name) {
    const emailBody = this.#createTemplate(verifyToken, name);
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: 'no-reply@vi-phonebook.com', // Use the email address or domain you verified above
      subject: 'Підтвердження реєстрації',
      //   text: 'and easy to do anywhere, even with Node.js',
      html: emailBody,
    };
    //ES6
    await this.#sender.send(msg);
  }
}

module.exports = EmailService;
