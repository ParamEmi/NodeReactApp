const authService = require("../../services/auth.services");
const _ = require("lodash");
const {
  generateToken,
  comparePassword,
  verifyJWT,
} = require("../../helpers/helper");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { pick } = require("lodash");

const { sendForgotPasswordMail } = require("../../helpers/helper");

const signin = async (req, res) => {
  // console.log(req._user);
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
      if (user.role !== 1) {
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
      res.status(200).json({
        message: "Logged In",
        data: {
          user: user,
          token: token,
        },
      });
    } else {
      res.status(206).json({
        message: "Invalid username/password",
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
    const { email, password } = req.body;
    const user = await authService.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email Already Exists",
      });
    }
    console.log(password);
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
        return res.status(201).json({
          success: true,
          message: "Registered successfully",
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

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    let result1 = await authService.findOne({ email });
    if (!result1) {
      return res.status(200).send({
        message: "Email does not exist please enter correct email",
        code: 404,
      });
    } else if (result1.role !== 1) {
      return res.status(200).json({
        message: "Email does not exists",
      });
    } else {
      const token = await generateToken(result1);
      const expireToken = Date.now() + 36000000;
      await sendForgotPasswordMail({
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
      const users = decodedData.data;
      if (users) {
        await authService.find({ resetLink: resetLink });
        try {
          if (!users) {
            return res.status(500).json({
              message: "User with this email does not Exists",
            });
          }
          let salt = await bcrypt.genSalt(10);
          bcrypt.hash(password.toString(), 10, async (err, hash) => {
            let decodedData = verifyJWT(resetLink);
            try {
              const obj = {
                password: hash,
              };
              let userid = decodedData.data._id;
              console.log(obj, "obj");
              const user = await authService.updateone(userid, obj);
              console.log(user, "user");
              return res.status(201).json({
                success: true,
                message: "Password Changed Successfully",
                data: user,
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
          message: "Incorrect token or it is expired!",
        });
      }
    } else {
      if (err || !user) {
        return res.status(500).json({
          error: " error!",
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

const changePassword = async (req, res) => {
  const user = await authService.findRole1();
  let decoded = user;
  try {
    if (!req.body.oldPassword && !req.body.newpassword) {
      return res.send({
        status: 500,
        message: "Input can't be empty",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.oldPassword,
      decoded.password
    );

    if (decoded && validPassword) {
      const _id = decoded._id;
      const password = await bcrypt.hash(req.body.newpassword, 10);
      const payload = { password: password };
      const data = await authService.update({ _id: _id }, payload);

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

const editprofile = async (req, res) => {
  const conditions = {
    _id: req.params.id,
  };
  let data = pick(req.body, ["firstName", "lastName", "email"]);
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


module.exports = {
  signin,
  signup,
  forgotPassword,
  resetPassword,
  changePassword,
  editprofile,
  getUser,
};
