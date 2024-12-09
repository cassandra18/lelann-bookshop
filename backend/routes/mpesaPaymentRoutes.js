const express = require('express');
const router = express.Router();
const { lipaNaMpesaOnline, mpesaCallback, createAccessToken, mpesaPay }= require('../controllers/mpesaPaymentController');

router.get('/get-access-token', createAccessToken);
router.post('/stkpush', createAccessToken, lipaNaMpesaOnline);
router.post('/pay', mpesaPay)
router.post('/callback', mpesaCallback);

module.exports = router;