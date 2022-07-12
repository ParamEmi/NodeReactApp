const express = require("express");

const authRouter = require("./auth.router");
const personal_budgets = require("./personalBudget.router");
const company_budget = require("./companyBudget.router");
const businessRouter = require("./business.router");

const { authMiddleware } = require("../../middlewares/frontend/authMiddleware");
const userRouter = require("./user.router");

const router = express.Router();

router.use("/", authRouter);

router.use("/business", businessRouter);

router.use("/personal", authMiddleware, personal_budgets);
router.use("/company", authMiddleware, company_budget);

router.use("/user", authMiddleware, userRouter);
//
module.exports = router;
