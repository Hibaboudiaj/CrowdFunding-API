const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const { invest } = require("../controllers/investment.controller");

router.post("/", protect, authorize("investor"), invest);

module.exports = router;