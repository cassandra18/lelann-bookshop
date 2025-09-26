const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get access token
const createAccessToken = async () => {
  try {
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const credentials = Buffer.from(
      `${consumerKey}:${consumerSecret}`
    ).toString("base64");

    const response = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: { Authorization: `Basic ${credentials}` },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error getting access token:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// Initiate STK Push
const initiateSTKPush = async (orderId, phone, amount) => {
  try {
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);

    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const accessToken = await createAccessToken();

    const payload = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: orderId.toString(), // tie orderId to transaction
      TransactionDesc: "Order payment",
    };

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("STK Push Error:", error.response?.data || error.message);
    throw error;
  }
};

// Payment request route
const mpesaPay = async (req, res) => {
  try {
    const { orderId, phone, amount } = req.body;

    if (!orderId || !phone || !amount) {
      return res
        .status(400)
        .json({ error: "Order ID, phone and amount are required" });
    }

    // Format phone number correctly (Safaricom expects 254...)
    const formattedPhone = phone.startsWith("254")
      ? phone
      : `254${phone.slice(1)}`;

    const response = await initiateSTKPush(orderId, formattedPhone, amount);

    if (response.ResponseCode === "0") {
      return res.status(200).json({
        message: "📲 Payment initiated successfully. Check your phone.",
        data: response,
      });
    } else {
      return res.status(400).json({
        message: "❌ Payment initiation failed",
        error: response.ResponseDescription,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while processing your request.",
      details: error.message,
    });
  }
};

// Callback route
const mpesaCallback = async (req, res) => {
  try {
    const data = req.body.Body.stkCallback;

    const transaction = {
      MerchantRequestID: data.MerchantRequestID,
      CheckoutRequestID: data.CheckoutRequestID,
      ResultCode: data.ResultCode,
      ResultDesc: data.ResultDesc,
      Amount: data.CallbackMetadata?.Item.find(i => i.Name === "Amount")?.Value,
      MpesaReceiptNumber: data.CallbackMetadata?.Item.find(i => i.Name === "MpesaReceiptNumber")?.Value,
      TransactionDate: data.CallbackMetadata?.Item.find(i => i.Name === "TransactionDate")?.Value,
      PhoneNumber: data.CallbackMetadata?.Item.find(i => i.Name === "PhoneNumber")?.Value,
      AccountReference: data.CallbackMetadata?.Item.find(i => i.Name === "AccountReference")?.Value, // 👈 orderId
    };

    // Update order in Prisma (status: paid/failed)
    if (transaction.AccountReference) {
      await prisma.order.update({
        where: { id: parseInt(transaction.AccountReference) },
        data: {
          status: transaction.ResultCode === 0 ? "paid" : "failed",
          mpesaReceipt: transaction.MpesaReceiptNumber || null,
        },
      });
    }

    console.log("M-Pesa callback processed:", transaction);

    // Always respond 200 to Safaricom
    res.status(200).json({ message: "Callback received successfully" });
  } catch (error) {
    console.error("Callback Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { mpesaPay, mpesaCallback, createAccessToken };
