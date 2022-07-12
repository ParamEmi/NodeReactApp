const authService = require("../../services/auth.services");
const _ = require("lodash");
const { pick } = require("lodash");
const {
  generateToken,
  comparePassword,
  verifyJWT,
} = require("../../helpers/helper");
const bcrypt = require("bcrypt");
const { sendForgotPasswordMailForFrontend } = require("../../helpers/helper");
const { sendActivationMail,activateAccount } = require("../../helpers/users")

const signin = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await authService.findOne({ email });
    if (user) {
      const validUser = await comparePassword(req.body.password, user.password);
      if (!validUser) {
        return res.status(203).json({
          message: "Invalid username/password",
        });
      }

      if(user.status !== 1)
      {
        sendActivationMail(email)
        return res.status(203).send({
          message: "Email is not verified, please check your email and verify!",
          status: 405,
        });
      }
      if (user.role !== 2) {
        return res.status(203).send({
          message: "Access denied!",
          status: 403,
        });
      }
      const token = await generateToken(user);
      if (!token) {
        return res.status(206).json({
          message: "Error in generating token",
        });
      }

      // const loginStatusResult = authService.updateLoginStatus(user);
      // if (loginStatusResult === 1) {
      res.status(200).json({
        message: "Logged In",
        data: {
          user: user,
          token: token,
        },
      });
    } else {
      res.status(206).json({
        message: "Email doesn't exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: {},
      success: false,
    });
  }
};

const signup = async (req, res) => {
  try {
    const {
      email,
      password,
      businessName,
      firstName,
      phone,
      mobile,
      state,
      businessType,
      reffered,
    } = req.body;
    const user = await authService.findOne({ email, isDeleted: false });
    if (user) {
      return res.status(400).json({
        message: "Email Already Exists",
      });
    }
    bcrypt.hash(password.toString(), 10, async (err, hash) => {
      try {
        if (err) {
          return res.status(400).json({
            error: "Something went wrong",
          });
        }
        const newUser = {
          ...req.body,
          password: hash,
        };

        const createdUser = await authService.post(newUser);
        sendActivationMail(email)
        return res.status(201).json({
          success: true,
          message: "Registered successfully, Please verify email!",
          data: createdUser,
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message,
          data: {},
          success: false,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      data: {},
      success: false,
    });
  }
};

const onActivateAccount = async (req, res) => {
  try {
    const user = await activateAccount(req.params.token);
    if (user)
      return res
        .status(200)
        .json({ status: 200, success: true, message: "Account activated successfully" });
  } catch (error) {
    return res.status(200).json({ status: 401, success: false, message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    let result1 = await authService.findOne({ email });

    if (!result1) {
      return res.status(200).send({
        message: "Email is not valid, please enter correct Email",
        code: 404,
      });
    } else if (result1.role !== 2) {
      return res.status(200).json({
        message: "Please enter the registered email adddress",
      });
    } else {
      const token = await generateToken(result1);
      const expireToken = Date.now() + 36000000;
      await sendForgotPasswordMailForFrontend({
        token: token,
        email: email,
      });

      return res.status(200).json({
        message: "Email sent successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

const resetPassword = async (req, res) => {
  const { resetLink, password } = req.body;
  try {
    if (resetLink) {
      let decodedData = verifyJWT(resetLink);
      const users = await authService.findOne(decodedData.data);

      if (users) {
        await authService.find({ resetLink: resetLink });
        try {
          if (!users) {
            return res.status(500).json({
              message: "User with this email doesn't Exists",
            });
          }
          let salt = await bcrypt.genSalt(10);
          bcrypt.hash(password.toString(), 10, async (err, hash) => {
            try {
              const obj = {
                password: hash,
              };
              user = _.extend(users, obj);

              user.save((err, result) => {
                if (err) {
                  return res.status(500).json({ error: err.message });
                } else {
                  return res
                    .status(200)
                    .json({ message: "Password Changed Successfully" });
                }
              });
            } catch (err) {
              return res.status(500).json({
                error: err.message,
              });
            }
          });
        } catch (error) {
          return res.status(500).json({
            error: error.message,
          });
        }
      } else {
        return res.status(500).json({
          message: "Incorrect token or it is expired!!!",
        });
      }
    } else {
      if (err || !user) {
        return res.status(500).json({
          error: " error!!!!!",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const editprofile = async (req, res) => {
  const conditions = {
    _id: req.params.id,
  };
  let data = pick(req.body, ["firstName", "email"]);
  try {
    let result = await authService.update(
      conditions,
      { $set: data },
      { fields: { _id: 1 }, new: true }
    );
    if (result) {
      return res.status(200).json({
        message: "User updated  successfully",
      });
    } else {
      return res.status(400).json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const condition = {
      _id: req.params.id,
    };

    let result = await authService.findOne(condition);
    if (!result) {
      return res.status(200).send({
        message: "User is not exists",
      });
    } else {
      return res.status(200).json({
        message: " Successfull",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

const changePassword = async (req, res) => {
  let decoded = req._user;
  const userPassword = await authService.findById(decoded);
  try {
    if (!req.body.oldPassword && !req.body.newpassword) {
      return res.send({
        status: 500,
        message: "Input can't be empty",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.oldPassword,
      userPassword.password
    );
    if (decoded && validPassword) {
      const _id = decoded._id;
      const password = await bcrypt.hash(req.body.newpassword, 10);
      const payload = { password: password };
      const data = await authService.update(decoded, payload);

      return res.status(200).send({
        statusCode: 200,
        message: "Password changed successfully",
      });
    } else {
      return res.status(200).json({
        statusCode: 400,

        message: "Old Password is not matched",
      });
    }
  } catch (error) {
    return res.status(200).send({ statusCode: 500, message: error.message });
  }
};

module.exports = {
  signin,
  signup,
  forgotPassword,
  resetPassword,
  changePassword,
  editprofile,
  getUser,
  onActivateAccount
};
