const express = require('express');
const router = express.Router();
const { adminDashboard } = require('../controllers/adminDashboardController');
const { authorize } = require('../middleware/authorizeRole');


router.get('/', authorize(['admin']), adminDashboard);