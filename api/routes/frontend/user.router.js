const express = require("express");
const router = express.Router();
const userController = require("../../controllers/frontend/user.controller");

router.post("/create", userController.createUser);
router.get("/get/:pageNo/:limit", userController.getUser);
router.put("/edit/:id", userController.UserEdit);
router.delete("/remove/:id", userController.userDelete);
router.get("/search/:pageNo/:limit/:text", userController.UserSearch);
router.put("/loginStatus", userController.loginStatusUpdate);
module.exports = router;
