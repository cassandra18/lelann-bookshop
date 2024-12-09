const axios = require('axios');
const { saveTransaction } = require('../mongoose/db');

// Get access token
const createAccessToken = async () => {
    
    try {
        const consumerKey = process.env.MPESA_CONSUMER_KEY;
        const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
        const credentials = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');


        const response = await axios.get(
            'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            {
                headers: {
                    Authorization: `Basic ${credentials}`,
                },
            }
        )
        
        console.log('Access Token Response:', response.data);

        return response.data.access_token;

    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
};

// Lipa Na M-Pesa Online Payment API
const lipaNaMpesaOnline = async (req, res) => {
    const { phone, amount } = req.body;

    // Validate input
    if (!phone || !amount) {
        return res.status(400).json({ error: 'Phone and amount are required' });
    }

    try {
        // Generate timestamp
        const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
        
        // Generate password
        const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');
    
        // Get access token
        const accessToken = await createAccessToken();

        // Prepare payload
        const payload = {
            BusinessShortCode: process.env.MPESA_SHORTCODE,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: amount,
            PartyA: phone.startsWith('254') ? phone : `254${phone.slice(1)}`,
            PartyB: process.env.MPESA_SHORTCODE,
            PhoneNumber: phone.startsWith('254') ? phone : `254${phone.slice(1)}`,
            CallBackURL: process.env.MPESA_CALLBACK_URL,
            AccountReference: 'Payment',
            TransactionDesc: 'Payment for services',
        };

        // Make STK Push request
        const response = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', 
            payload, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
            }
        );

        // Process successful response
        if (response.data.ResponseCode === '0') {
            const transactionData = {
                MerchantRequestId: response.data.MerchantRequestID,
                CheckoutRequestId: response.data.CheckoutRequestID,
                ResultCode: response.data.ResponseCode,
                ResultDesc: response.data.ResponseDescription,
            };

            return res.status(200).json({ 
                message: 'Payment initiated successfully', 
                data: transactionData 
            });
        } else {
            return res.status(400).json({ 
                message: 'Payment initiation failed', 
                error: response.data.ResponseDescription 
            });
        }
    } catch (error) {
        console.error('STK Push Error:', error.response ? error.response.data : error.message);
        
        return res.status(500).json({
            error: 'An error occurred while processing the payment',
            details: error.message
        });
    }
};

// Mpesa payment route
const mpesaPay = async (req, res) => {
    try {
        const { phone, amount } = req.body;

        // Validate input
        if (!phone || !amount) {
            return res.status(400).json({ error: 'Phone and amount are required' });
        }

        // correct phone number format
        const formattedPhone = phone.startsWith('254') ? phone : `254${phone.slice(1)}`;
        
        // initiate STK Push
        const mpesaResponse = await initiateSTKPush(formattedPhone, amount);

        res.status(200).json({ message: 'Payment initiated successfully', data: mpesaResponse });
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred while processing your request. Please try again later.',
            details: error.message,
        });
    }
};

const mpesaCallback = async (req, res) => {
    // try {
    //     const callbackData = req.body;

    //     console.log('M-Pesa callback received:', JSON.stringify(callbackData, null, 2));

    //     // Safaricom sends the callback data in `Body.stkCallback`
    //     const { Body } = callbackData;
    //     if (Body && Body.stkCallback) {
    //         const { stkCallback } = Body;
    //         const { ResultCode, ResultDesc, CallbackMetadata } = stkCallback;

    //         if (ResultCode === 0) {
    //             // Payment was successful
    //             if (CallbackMetadata && CallbackMetadata.Item) {
    //                 const metadata = CallbackMetadata.Item;
    //                 const transactionData = metadata.reduce((acc, item) => {
    //                     acc[item.Name] = item.Value;
    //                     return acc;
    //                 }, {});

    //                 console.log('Payment successful:', transactionData);

    //                 // TODO: Save transactionData to database
    //             } else {
    //                 console.log('Payment successful but no metadata provided.');
    //             }
    //             // TODO: Save transactionData to database
    //         } else {
    //             // Payment failed
    //             console.log('Payment failed:', ResultDesc);
    //             // TODO: Handle failed payment scenario
    //         }
    //     }

    //     // Acknowledge the callback
    //     res.status(200).send('Callback received');
    // } catch (error) {
    //     console.error('Error handling M-Pesa callback:', error);
    //     res.status(500).send('Internal Server Error');
    // }

    const data = req.body.Body.stkCallback;
  const transaction = {
    MerchantRequestID: data.MerchantRequestID,
    CheckoutRequestID: data.CheckoutRequestID,
    ResultCode: data.ResultCode,
    ResultDesc: data.ResultDesc,
    Amount: data.CallbackMetadata?.Item[0].Value,
    MpesaReceiptNumber: data.CallbackMetadata?.Item[1].Value,
    Balance: data.CallbackMetadata?.Item[2].Value,
    TransactionDate: data.CallbackMetadata?.Item[3].Value,
    PhoneNumber: data.CallbackMetadata?.Item[4].Value,
  };
};

module.exports = { lipaNaMpesaOnline, mpesaPay, mpesaCallback,createAccessToken };