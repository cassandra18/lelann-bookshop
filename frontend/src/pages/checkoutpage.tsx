import React, { useState } from "react";

const Checkout: React.FC = () => {
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto  shadow-xl rounded-2xl p-6 md:p-10 border border-slate-700">
        {/* Heading */}
        <h1 className="text-2xl md:text-4xl font-bold text-[#ffea00] mb-6 text-center">
          Checkout
        </h1>

        {/* Delivery Options */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-200 mb-3">
            Delivery Options
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700 transition">
              <input
                type="radio"
                name="delivery"
                value="delivery"
                checked={deliveryOption === "delivery"}
                onChange={() => setDeliveryOption("delivery")}
                className="accent-yellow-300"
              />
              <span className="text-gray-300">Deliver to my address</span>
            </label>
            <label className="flex items-center gap-3 p-4 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700 transition">
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={deliveryOption === "pickup"}
                onChange={() => setDeliveryOption("pickup")}
                className="accent-yellow-300"
              />
              <span className="text-gray-300">Pick up at the store</span>
            </label>
          </div>
        </div>

        {/* Shipping / Pickup Info */}
        {deliveryOption === "delivery" ? (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-200 mb-3">
              Shipping Address
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First name" className="border border-slate-600 bg-slate-900 text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-yellow-400" />
              <input type="text" placeholder="Last name" className="border border-slate-600 bg-slate-900 text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-yellow-400" />
              <input type="text" placeholder="Phone number" className="border border-slate-600 bg-slate-900 text-gray-200 p-3 rounded-lg md:col-span-2 focus:ring-2 focus:ring-yellow-400" />
              <input type="text" placeholder="Street address" className="border border-slate-600 bg-slate-900 text-gray-200 p-3 rounded-lg md:col-span-2 focus:ring-2 focus:ring-yellow-400" />
              <input type="text" placeholder="City / Town" className="border border-slate-600 bg-slate-900 text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-yellow-400" />
              <input type="text" placeholder="County" className="border border-slate-600 bg-slate-900 text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-yellow-400" />
            </form>
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-200 mb-3">
              Select Store for Pickup
            </h2>
            <select className="w-full border border-slate-600 bg-slate-900 text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-yellow-400">
              <option>Nairobi - Chokaa-Njiru</option>
              <option>Nairobi - Kericho CBD</option>
            </select>
          </div>
        )}

        {/* Payment Options */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-200 mb-3">
            Payment Method
          </h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700 transition">
              <input
                type="radio"
                name="payment"
                value="mpesa"
                checked={paymentMethod === "mpesa"}
                onChange={() => setPaymentMethod("mpesa")}
                className="accent-yellow-400"
              />
              <span className="text-gray-300">M-Pesa</span>
            </label>
            <label className="flex items-center gap-3 p-4 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700 transition">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="accent-yellow-400"
              />
              <span className="text-gray-300">Credit / Debit Card</span>
            </label>
          </div>
        </div>

        {/* Place Order Button */}
        <button className="w-full bg-gradient-to-r from-yellow-200 to-yellow-400 text-slate-900 font-extrabold py-3 rounded-xl shadow-lg tracking-wide hover:from-yellow-300 hover:to-yellow-500 transition transform hover:scale-105">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
