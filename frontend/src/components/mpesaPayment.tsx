import React from 'react';

const MPesaPayment: React.FC = () => {
  return (
    <div className="flex items-start justify-center mt-20 h-screen ">
      <div className=" p-8 rounded-lg  w-full max-w-md border">
        <h2 className="text-xl font-bold mb-4">Pay with Safaricom M-Pesa on your phone.</h2>
        <p className="font-semibold mb-1">Order Number: 839593</p>
        <p className="font-semibold mb-4">Order Amount: KES 39,000</p>
        <p className="text-gray-300 mb-4">
          Enter your M-Pesa phone number below and we will make a request for payment to your phone. 
          You will be prompted for your M-Pesa PIN on your phone.
        </p>
        <label htmlFor="mpesaPhone" className="block font-semibold mb-2">M-Pesa Phone Number:</label>
        <input
          type="text"
          id="mpesaPhone"
          defaultValue="+254113120575"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-purple-500"
        />
        <button className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800">
          Pay
        </button>
        <p className="mt-4  text-sm">
          Or <a href="#" className="text-blue-500 underline">view instructions</a> to pay manually via M-Pesa.
        </p>
      </div>
    </div>
  );
};

export default MPesaPayment;
