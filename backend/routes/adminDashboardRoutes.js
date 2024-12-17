const express = require("express");
const router = express.Router();
const { adminDashboard } = require("../controllers/userDashboardController");
const { authorize } = require("../middleware/authorizeRole");

router.get("/", authorize(["admin"]), adminDashboard);
