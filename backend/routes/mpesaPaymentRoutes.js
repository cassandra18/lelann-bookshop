const express = require('express');
const router = express.Router();
const { mpesaPay, mpesaCallback, createAccessToken } = require('../controllers/mpesaPaymentController');

router.post('/stkpush', mpesaPay);
router.post('/callback', mpesaCallback);

module.exports = router;
