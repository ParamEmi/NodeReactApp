const express = require("express");
const router = express.Router();

const businessServiceController = require("../../controllers/admin/businessService.controller");

router.post("/create", businessServiceController.Create);
router.get("/search/:pageNo/:limit/:text", businessServiceController.Search);

// router.get("/getAll", blogController.getAll);
// router.get("/getAll/:_id/:pageNo/:limit", blogController.getAllCategory);
router.get("/get/:pageNo/:limit", businessServiceController.getWithPagination);
router.get("/byTypeId/:id", businessServiceController.getServiceByTypeId);
router.get("/getByUserId/:id", businessServiceController.getByUserId);
router.put("/edit/:id", businessServiceController.serviceEdit);
router.delete("/remove/:id", businessServiceController.ServiceDelete);

module.exports = router;
