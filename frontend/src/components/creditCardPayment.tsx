import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CreditCardPayment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount } = location.state || {}; // Get totalAmount from location state
  const  userEmail  = localStorage.getItem("userEmail") || ""; 

  if (!totalAmount) {
    alert('Amount is missing, please go back to the order summary.');
    navigate('/order-summary');
    return null;
  }

  const handlePaystackPayment = async () => {
    try {
      const requestBody = {
        amount: totalAmount,
        email: userEmail,
      };

      // Send request to backend to create payment
      const response = await fetch('http://localhost:5000/api/paystack/initialize-payment', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
  
      if (data.success) {
        // Redirect the user to Paystack's payment page
        window.location.href = data.authorization_url;
      } else {
        alert('Payment creation failed');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('An error occurred');
    }
  };

  // Handle Payment verification once the user is redirected back from Paystack
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const reference = queryParams.get('reference');
    
    if (reference) {
      // Send request to backend to verify payment
      fetch('http://localhost:5000/api/paystackverify-payment', {
        method: 'POST',
        body: JSON.stringify({ reference }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert('Payment was successful');
            navigate('/order-success');  // Redirect to order success page
          } else {
            alert('Payment verification failed');
            navigate('/order-failure');  // Redirect to order failure page
          }
        })
        .catch(error => {
          console.error('Error verifying payment:', error);
          alert('An error occurred while verifying payment');
        });
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md border">
        <h2 className="text-xl font-bold mb-4">Pay with Credit or Debit Card using Paystack</h2>
        <p className="font-semibold mb-1">Order Amount: Ksh {totalAmount}</p>
        <button 
          onClick={handlePaystackPayment} 
          className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default CreditCardPayment;
