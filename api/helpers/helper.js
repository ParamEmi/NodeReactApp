const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../settings/auth");
const nodemailer = require("nodemailer");
const CONFIG = require("../config.json");

const generateToken = (data) => {
  const payload = {
    data,
    iat: Math.floor(Date.now() / 1000) - 30,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60 * 24,
  };
  try {
    const token = jwt.sign(payload, CONFIG.FRONTEND_JWT_SECRET);
    return token;
  } catch (err) {
    return false;
  }
};

const generateTokenForUSer = (data) => {
  const payload = {
    data,
    iat: Math.floor(Date.now() / 1000) - 30,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60 * 24,
  };
  try {
    const token = jwt.sign(payload, CONFIG.FRONTEND_USER_JWT_SECRET);
    return token;
  } catch (err) {
    return false;
  }
};

const verifyJWT = (resetToken) => {
  try {
    const legit = jwt.verify(resetToken, CONFIG.FRONTEND_JWT_SECRET);
    return legit;
  } catch (err) {
    return false;
  }
};
const comparePassword = async (password, enteredPassword) => {
  const valid = await bcrypt.compare(password, enteredPassword);
  if (valid) {
    return true;
  }
  return false;
};

const transporter = nodemailer.createTransport({
  TLS: true,
  port: 587,
  host: CONFIG.MAILER_HOST,
  auth: {
    user: CONFIG.MAILER_EMAIL,
    pass: CONFIG.MAILER_PASSWORD,
  },
});

const sendForgotPasswordMail = async (values) => {
  const { token, email } = values;
  let mailOptions = {
    from: CONFIG.MAILER_EMAIL,
    to: email,
    subject: "Forgot Password",
    text: "Node.js testing mail for GeeksforGeeks",
    html: ` <a>please Click here  to reset your password</a>
    
    <a href = ${CONFIG.CLIENT_URL}/resetPassword/${token}>Click Here</a>
    `,
  };

  transporter.sendMail(mailOptions, (error, result) => {
    if (result) {
      console.log(result);
    } else {
      console.log("That's error!", error);
    }
  });
};

const sendForgotPasswordMailForFrontend = async (values) => {
  const { token, email } = values;
  let mailOptions = {
    from: CONFIG.MAILER_EMAIL,
    to: email,
    subject: "Forgot Password",
    text: "Node.js testing mail for GeeksforGeeks",
    html: ` <a>please Click here  to reset your password</a>
    
    <a href = ${CONFIG.CLIENT_URL_FRONT}/resetPassword/${token}>Click Here</a>
    `,
  };

  transporter.sendMail(mailOptions, (error, result) => {
    if (result) {
      console.log(result);
    } else {
      console.log("That's error frontend", error);
    }
  });
};

const sendMailForUser = async (values) => {
  const { token, email, password } = values;
  let mailOptions = {
    from: CONFIG.MAILER_EMAIL,
    to: email,
    subject: "Login Details",
    text: "Node.js testing mail for GeeksforGeeks CLICK HERE TO LOGIN",
    html: `<a></a>
    <p>Email: ${email} </p>
    <p>Password: ${password}</p>
    <a href = ${CONFIG.FRONT_BASE_URL}>Please click here  to login</a>
    `,
    attachments: [
      {
        filename: "personal Budget Performa.csv",
        path: "./personal Budget Performa.csv",
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, result) => {
    if (result) {
      console.log(result);
    } else {
      console.log(error);
    }
  });
};
module.exports = {
  verifyJWT,
  generateToken,
  comparePassword,
  sendForgotPasswordMail,
  generateTokenForUSer,
  sendForgotPasswordMailForFrontend,
  sendMailForUser,
};
