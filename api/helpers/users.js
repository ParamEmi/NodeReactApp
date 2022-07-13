const UserModel = require("../models/user");
//const UserPasswordModel = require("../models/UserPassword");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mail = require("../utilities/mail");
const { find } = require("lodash");
const CONFIG = require("../config.json");

// const register = async (values) => {
//   let { email, first_name, last_name, password, role, status } = values;
//   try {
//     const userExist = await UserModel.findOne({ email });
//     if (userExist) throw Error("user with this email already exist");
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const user = await UserModel.create({
//       first_name,
//       last_name,
//       email,
//       password: hashedPassword,
//       role,
//       status,
//     });
//     if (user) {
//       await UserPasswordModel.create({ user_id: user._id, password: password });
//     }
//     return user;
//   } catch (error) {
//     throw error;
//   }
// };
const getUser = async (values) => {
  let { email, password } = values;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) throw Error("user not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw Error("wrong password");

    if (!user.status) throw Error("account is not activated yet !");

    return user;
  } catch (error) {
    throw error;
  }
};

const sendActivationMail = async (email) => {
  try {
    const token = jwt.sign({ email }, CONFIG.JWT_ACCOUNT_ACTIVATION);
    const emailData = {
      email,
      subject: `Account Invitation`,
      body: `
          <h1>Please use the following link to activate your account</h1>
          <p> <a href="${CONFIG.BASE_URL}/frontend/account/activate/${token}">Activate Account</a> </p>
          <hr />
          <p>This email may contain sensetive information</p>
          <p></p>
      `,
    };
    return mail.sendMailer(emailData);
  } catch (error) {
    throw error;
  }
};

const activateAccount = async (token) => {
  try {
    const decodedUser = jwt.verify(token, CONFIG.JWT_ACCOUNT_ACTIVATION);
    if (decodedUser) {
      const user = await UserModel.findOneAndUpdate(
        { email: decodedUser.email },
        { status: 1 }
      );
      return user;
    }
  } catch (error) {
    throw error;
  }
};

const forgetPassword = async (email) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw Error("User not found");
    }
    if (user.role == 1) {
      throw Error("User not found");
    }

    const token = jwt.sign({ email }, CONFIG.JWT_RESET_PASSWORD);

    const emailData = {
      email,
      subject: `Password Reset link`,
      body: `
                 <h1>Please use the following link to reset your password</h1>
                 <p> <a href="${CONFIG.FRONT_BASE_URL}/resetPassword/${token}">Reset Password</a> </p>
                 <hr />
                 <p>This email may contain sensetive information</p>
                 <p>${CONFIG.FRONT_BASE_URL}</p>
             `,
    };
    //
    const updatedUser = await user.updateOne({ pw_token: token });
    return await mail.sendMailer(emailData);
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (values) => {
  try {
    const { resetToken, password } = values;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (resetToken) {
      try {
        const decoded = await jwt.verify(resetToken, CONFIG.JWT_RESET_PASSWORD);
      } catch (err) {
        throw Error("password reset link is expired");
      }

      const findUser = await UserModel.findOne({ pw_token: resetToken });
      if (!findUser) throw Error("password is already changed");

      const recentPasswords = await UserPasswordModel.find({
        user_id: findUser._id,
      })
        .sort({ _id: -1 })
        .limit(3);
      let matchedPassword = find(recentPasswords, { password: password });
      if (matchedPassword)
        throw Error("Password should not be from last 3 passwords");

      UserModel.findOneAndUpdate(
        { pw_token: resetToken },
        {
          password: hashedPassword,
          pw_token: "",
        },
        async (err, user) => {
          if (err || !user) {
            throw Error(err);
          }
          if (user) {
            await UserPasswordModel.create({
              user_id: user._id,
              password: password,
            });
          }
          return user;
        }
      );
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  // register,
  getUser,
  sendActivationMail,
  activateAccount,
  forgetPassword,
  resetPassword,
};
