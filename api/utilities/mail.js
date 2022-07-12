var nodemailer = require("nodemailer");
const CONFIG = require("../config.json");

module.exports.sendMailer = (data) => {
  var transporter = nodemailer.createTransport({
    TLS: true,
    port: 587,
    host: CONFIG.MAILER_HOST,
    auth: {
      user: CONFIG.MAILER_EMAIL,
      pass: CONFIG.MAILER_PASSWORD,
    },
  });

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: CONFIG.SMTP_FROM_EMAIL, //sender address
    to: data.email, //list of receivers
    subject: data.subject, // Subject line
    text: "", // plaintext body
    html: data.body, // html body
  };
  // console.log("jkjk",mailOptions)
  // console.log("process.env.MAILER_HOST",process.env.MAILER_HOST)
  // console.log("process.env.MAILER_EMAIL",process.env.MAILER_EMAIL)
  // console.log("process.env.MAILER_PASSWORD",process.env.MAILER_PASSWORD)
  // console.log("process.env.SMTP_FROM_EMAIL",process.env.SMTP_FROM_EMAIL)
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log("error===", error);
    }
    console.log("Message sent: " + info.messageId);
  });
};
