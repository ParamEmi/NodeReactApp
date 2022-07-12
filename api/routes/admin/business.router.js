const express = require("express");
const router = express.Router();
const businessController = require("../../controllers/admin/business.controller");

router.post("/create", businessController.createBusinessType);
router.get("/getAll", businessController.getAllbussTypes);
router.delete("/delete/:id", businessController.Delete);
router.put("/edit/:id", businessController.Edit);
router.get("/get/:pageNo/:limit", businessController.getAllWithPagination);
router.get("/get/:id", businessController.getById);
router.get("/search/:pageNo/:limit/:text", businessController.Search);

module.exports = router;
