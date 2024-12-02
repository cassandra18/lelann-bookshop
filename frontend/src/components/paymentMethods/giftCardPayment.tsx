import React from 'react';

const GiftCardPayment: React.FC = () => {
  return (
    <div className="flex items-start justify-center mt-20 h-screen ">
      <div className=" p-8 rounded-lg  w-full max-w-md border">
        <h2 className="text-xl font-bold mb-4">Pay with a gift card.</h2>
        <p className="font-semibold mb-1">Order Number: 839593</p>
        <p className="font-semibold mb-4">Order Amount: KES 39,000</p>
        <p className="text-gray-300 mb-4">
          Enter your gift card code below and we will make a request for payment to your card.
        </p>
        <label htmlFor="giftCardCode" className="block font-semibold mb-2">Gift Card Code:</label>
        <input
          type="text"
          id="giftCardCode"
          defaultValue="GIFT-1234-5678-9012"
          className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-purple-500"
        />
        <button className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800">
          Pay
        </button>
        
      </div>
    </div>
  );
};

export default GiftCardPayment;