const express = require('express');
const router = express.Router();
const { createPayment, verifyPayment } = require('../controllers/paystackPaymentController');

router.post('/initialize-payment', createPayment);
router.post('/verify-payment', verifyPayment);

module.exports = router;