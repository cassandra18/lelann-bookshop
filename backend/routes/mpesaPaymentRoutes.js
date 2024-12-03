const express = require('express');
const router = express.Router();
const { lipaNaMpesaOnline, mpesaCallback, getAccessToken }= require('../controllers/mpesaPaymentController');

router.get('/get-access-token', getAccessToken);
router.post('/stkpush', lipaNaMpesaOnline);
router.post('/callback', mpesaCallback);

module.exports = router;