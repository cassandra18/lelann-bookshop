const axios = require('axios');

//Initialize payment
const createPayment = async (req, res) => {
    const { amount, email } = req.body;
    
    if (!amount || !email) {
        return res.status(400).json({ success: false, message: 'Missing amount or email' });
    }

    try {
        // Make a POST request to paystack's /transaction/initialize endpoint
        const response = await axios.post(
            'https://api.paystack.co/transaction/initialize',
            {
                amount: amount * 100, // amount in kobo
                email: email,
                currency: 'KES', 
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            },
        );

        const paymentData = response.data;

        if(paymentData.data.status === 'success') {
            // send the paystack transaction reference and URL to the frontend
            res.status(200).json({
                success: true,
                message: 'Payment request created successfully',
                authorization_url: paymentData.data.authorization_url,
                reference: paymentData.data.reference,
            });
        } else {
            res.status(400).json({ success: false, message: 'Payment request creation failed' });
        }
    } catch (error) {
        console.error('Error creating payment:', error);

        res.status(500).json({ success: false, message: 'Error creating payment' });
    }
};

const verifyPayment = async (req, res) => {
    const { reference } = req.body;
    
    try {
        const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        const paymentData = response.data;

        if (paymentData.status === 'success') {
            // Handle successful payment
            console.log('Payment verified:', paymentData);
            res.status(200).json({ message: 'Payment verified' });

        } else {
            // Handle failed payment
            console.log('Payment verification failed:', paymentData);

            res.status(400).json({ message: 'Payment verification failed' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);

        res.status(500).json({ success: false, message: 'Error verifying payment' });
    }
};

module.exports = { createPayment, verifyPayment } ;