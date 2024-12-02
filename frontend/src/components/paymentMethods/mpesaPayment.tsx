import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";


const MPesaPayment: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalAmount } = location.state || {};


  if (!totalAmount) {
    alert('Amount is missing, please go back to the order summary.');
    navigate('/order-summary');
    return null;
  }
  useEffect(() => {
    // Fetch the phone number from localStorage
    const storedPhoneNumber = localStorage.getItem('userPhoneNumber');
      if (storedPhoneNumber) {
      setPhoneNumber(storedPhoneNumber);
    }
  }, [totalAmount]);
  
  const handlePayment = async () => {
    setLoading(true);
    setPaymentStatus('');

    try {
      const response = await axios.post('http://localhost:5000/api/mpesa/lipa-na-mpesa', {
        phone: phoneNumber,
        amount: totalAmount,
        callbackUrl: ' https://0763-102-0-16-186.ngrok-free.app/api/mpesa/callback',
      });

      if (response.data && response.data.errorMessage) {
        setPaymentStatus(`Error: ${response.data.errorMessage}`);
      } else {
        setPaymentStatus('Payment request sent. Please check your M-Pesa app.');
      }
    } catch (error) {
      console.error('Error during payment request:', error);
      setPaymentStatus('An error occurred while processing your payment request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start justify-center mt-20 h-screen">
      <div className="p-8 rounded-lg w-full max-w-md border">
        <h2 className="text-xl font-bold mb-4 text-sunset">Pay with Safaricom M-Pesa on your phone.</h2>
        <p className="font-semibold mb-1 text-lg">Order Amount: KES {totalAmount.toLocaleString()}</p>
        <p className="text-gray-400 mb-4">
          Enter your M-Pesa phone number below and we will make a request for payment to your phone. 
          You will be prompted for your M-Pesa PIN on your phone.
        </p>
        <label htmlFor="mpesaPhone" className="block font-semibold mb-2">M-Pesa Phone Number:</label>
        <input
          type="text"
          id="mpesaPhone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-purple-500 bg-transparent"
        />
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800"
        >
          {loading ? 'Processing...' : 'Pay'}
        </button>

        {paymentStatus && (
          <p className="mt-4 text-sm text-gray-700">{paymentStatus}</p>
        )}

        <p className="mt-4 text-sm text-gray-400">
          Or <a href="#" className="text-purple-500 underline">view instructions</a> to pay manually via M-Pesa.
        </p>
      </div>
    </div>
  );
};

export default MPesaPayment;
