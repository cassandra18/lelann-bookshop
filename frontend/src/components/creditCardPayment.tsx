import React from 'react';


interface PaystackTransaction {
    status: string;
    message: string;
    reference: string;
    amount: number;
    currency: string;
    // Add any other properties that you expect from the transaction object
  }
  
const KCBPayment: React.FC = () => {
  const handlePaystackPayment = () => {
    const paymentData = {
      email: 'customer@example.com', // Replace with customer's email
      amount: 39000, // Amount in kobo (39000 kobo = 390 NGN)
      currency: 'NGN',
    };

    const paystack = window.PaystackPop; // No TypeScript error here
    paystack.newTransaction({
      key: 'YOUR_PAYSTACK_PUBLIC_KEY',
      email: paymentData.email,
      amount: paymentData.amount,
      currency: paymentData.currency,
      onSuccess: (transaction: PaystackTransaction) => {
        // Handle successful payment
        console.log('Payment successful:', transaction);
        alert(`Payment successful! Transaction ID: ${transaction.reference}`);
      },
      onCancel: () => {
        // Handle payment cancellation
        alert('Payment was cancelled');
      },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md border">
        <h2 className="text-xl font-bold mb-4">Pay with Credit or Debit Card using Paystack</h2>
        <p className="font-semibold mb-1">Order Number: 839593</p>
        <p className="font-semibold mb-4">Order Amount: KES 39,000</p>
        <p className="text-gray-400 mb-4">
          Enter your details below, and we will request payment.
        </p>

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

export default KCBPayment;
