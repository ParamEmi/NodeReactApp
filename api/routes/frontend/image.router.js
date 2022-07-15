const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const DIR = "./uploads/images";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
    console.log(DIR, "in the dir");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
}
});

var upload = multer({
  storage: storage,
});


const imageController = require("../../controllers/frontend/image.controller");
router.post("/", upload.single("image"), imageController.uploadImage);
router.get("/",  imageController.getImage);
module.exports = router;
