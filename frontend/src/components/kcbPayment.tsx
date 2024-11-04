import React from 'react';
import CountrySelector from './countrySelector';

const KCBPayment: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md border">
        <h2 className="text-xl font-bold mb-4">Pay with Credit or Debit Card using KCB</h2>
        <p className="font-semibold mb-1">Order Number: 839593</p>
        <p className="font-semibold mb-4">Order Amount: KES 39,000</p>
        <p className="text-gray-400 mb-4">
          Enter your details below, and we will request payment.
        </p>

        <form>
          <label htmlFor="firstName" className="block font-semibold mb-2">First Name</label>
          <input
            type="text"
            id="firstName"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-purple-500"
          />

          <label htmlFor="lastName" className="block font-semibold mb-2">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-purple-500"
          />

          <label htmlFor="email" className="block font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-purple-500"
          />

          <label htmlFor="billingAddress" className="block font-semibold mb-2">Billing Address</label>
          <input
            type="text"
            id="billingAddress"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-purple-500"
          />

          <label htmlFor="billingCity" className="block font-semibold mb-2">Billing City</label>
          <input
            type="text"
            id="billingCity"
            placeholder="Enter your city"
            className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:border-purple-500"
          />

          <label htmlFor="billingCountry" className="block font-semibold mb-2">Billing Country</label>
          <CountrySelector /> 

          <button className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800">
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default KCBPayment;
