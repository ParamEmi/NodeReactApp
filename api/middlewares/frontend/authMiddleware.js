const jwt = require("jsonwebtoken");
// models
const CONFIG = require("../../config.json");
const signupService = require("../../services/auth.services");
const usersService = require("../../services/users.services");

exports.authMiddleware = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer") ||
    !req.headers.authorization.split(" ")[1]
  ) {
    return res.status(401).json({
      success: false,
      message: "Please provide the token",
    });
  }
  const accessToken = req.headers.authorization.split(" ")[1];
  console.log(accessToken, "acc");
  try {
    const decoded = jwt.verify(accessToken, CONFIG.FRONTEND_JWT_SECRET);
    console.log(decoded, "decoded");
    let userId = decoded.data._id;
    console.log(userId, "userId");
    req._user = userId;
    return next();
  } catch (error) {
    return res.status(200).json({ success: false, message: error.message });
  }
};
