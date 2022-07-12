const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const DIR = "./uploads/csv";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
    console.log(DIR, "in the dir");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
});

const usersController = require("../../controllers/admin/users.controller");
router.post("/import", upload.single("csvfile"), usersController.onImport);
router.get("/getRejects", usersController.getRejects);
router.post("/create", usersController.createUser);
router.get("/get/:pageNo/:limit", usersController.getAllUsers);
router.delete("/removeById/:id", usersController.deleteUser);
router.put("/edit/:id", usersController.UsersEdit);
router.get("/search/:pageNo/:limit/:text", usersController.UserSearch);
router.put("/statusChange/:id/:status", usersController.usersStatus);
router.get("/getAllUserOnly", usersController.getAllUsersOnly);
module.exports = router;
