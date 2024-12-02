const axios = require('axios');

// Get access token
const getAccessToken = async () => {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const credentials = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');

    try {
        const response = await axios.get(
            'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            {
                headers: {
                    Authorization: `Basic ${credentials}`,
                },
            });

            console.log('Access Token Response:', response.data);
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error.response ? error.response.data : error.message);
        return null;
    }
};

// Lipa Na M-Pesa Online Payment API
const lipaNaMpesaOnline = async (phone, amount, callbackUrl) => {
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
    const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');
    const accessToken = await getAccessToken();

    const payload = {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: callbackUrl,
        AccountReference: 'Test',
        TransactionDesc: 'Test',
    };

    try {
        const response = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            payload,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            console.log('Payload:', payload);
            console.log('Headers:', {
                Authorization: `Bearer ${accessToken}`,
            });

        return response.data;
    } catch (error) {
        if (error.response) {
            // Log Safaricom's error response
            console.error('Error initiating M-Pesa payment:', error.response.data);
        } else {
            // Log other errors
            console.error('Error initiating M-Pesa payment:', error.message);
        }
        throw new Error('Failed to initiate M-Pesa payment.');
    }
};

const mpesaCallback = async (req, res) => {
    try {
        const callbackData = req.body;

        console.log('M-Pesa callback received:', JSON.stringify(callbackData, null, 2));

        // Safaricom sends the callback data in `Body.stkCallback`
        const { Body } = callbackData;
        if (Body && Body.stkCallback) {
            const { stkCallback } = Body;
            const { ResultCode, ResultDesc, CallbackMetadata } = stkCallback;

            if (ResultCode === 0) {
                // Payment was successful
                const metadata = CallbackMetadata.Item;
                const transactionData = metadata.reduce((acc, item) => {
                    acc[item.Name] = item.Value;
                    return acc;
                }, {});

                console.log('Payment successful:', transactionData);

                // TODO: Save transactionData to database
            } else {
                // Payment failed
                console.log('Payment failed:', ResultDesc);
                // TODO: Handle failed payment scenario
            }
        }

        // Acknowledge the callback
        res.status(200).send('Callback received');
    } catch (error) {
        console.error('Error handling M-Pesa callback:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { lipaNaMpesaOnline, mpesaCallback,getAccessToken };