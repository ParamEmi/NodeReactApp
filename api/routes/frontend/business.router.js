const express = require("express");
const router = express.Router();
const businessController = require("../../controllers/frontend/business.controller");

// router.post("/create", businessController.createBusinessType);
router.get("/getAll", businessController.getAllbussTypes);
// router.get("/getBussiness", businessController.getBusinessByUser);

module.exports = router;
