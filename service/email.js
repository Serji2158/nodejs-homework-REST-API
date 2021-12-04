const sgMail = require("@sendgrid/mail");
const Mailgen = require("mailgen");
require("dotenv").config();

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;

  createTemplate(verifyToken, name) {
    // Configure mailgen by setting a theme and your product info
    const mailGenerator = new this.#GenerateTemplate({
      theme: "default",
      product: {
        // Appears in header & footer of e-mails
        name: "Contact Storage",
        link: "https://localhost:3000/",
        // Optional product logo
        // logo: 'https://mailgen.js/img/logo.png'
      },
    });
    const template = {
      body: {
        name,
        intro:
          "Welcome to Contact Storage We're very excited to have you on board.",
        action: {
          instructions:
            "To get started with Contact Storage, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `http://localhost:3000/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    const emailBody = mailGenerator.generate(template);
    return emailBody;
  }

  async sendEmail(verifyToken, email) {
    const emailBody = this.createTemplate(verifyToken);
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email, // Change to your recipient
      from: "sergey.tyschenko@gmail.com", // Change to your verified sender
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: emailBody,
    };
    console.log(msg);
    try {
      await this.#sender.send(msg);
    } catch (e) {
      console.log(e.response.body.errors);
    }
  }
}

module.exports = EmailService;
