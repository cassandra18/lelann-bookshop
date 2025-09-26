import React from "react";
import { useCart } from "../components/cart-functionality";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2 } from "lucide-react"; // modern icons

const Basket: React.FC = () => {
  const { state, dispatch } = useCart();

  // If the cart is empty
  if (state.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h2 className="text-2xl sm:text-3xl text-yellow-400 font-bold mb-6 animate-pulse">
          Your cart is empty 🛒
        </h2>
        <Link
          to="/"
          className="bg-gradient-to-r from-yellow-300 to-yellow-500 text-slate-900 px-6 py-3 rounded-xl font-bold shadow-md hover:from-yellow-400 hover:to-yellow-600 transition-transform transform hover:scale-105"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  // Remove item
  const handleRemoveItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // Subtotal
  const subtotal = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#ffea00] mb-10 text-center">
          Your Order Summary
        </h1>

        {/* Cart items */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-2xl">
          {state.items.map((item) => (
            <div
              key={item.productId}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 mb-4 bg-slate-700/50 rounded-xl hover:shadow-lg hover:scale-[1.01] transition-transform"
            >
              {/* Item details */}
              <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl shadow-md hover:scale-105 transition"
                />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-white">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-300 mt-1">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>

              {/* Price + Remove */}
              <div className="flex items-center justify-between w-full sm:w-auto">
                <p className="text-lg font-bold text-yellow-300">
                  KES {item.price * item.quantity}
                </p>
                <button
                  onClick={() => handleRemoveItem(item.productId)}
                  className="ml-6 text-red-500 hover:text-red-400 transition"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}

          {/* Order Summary */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            {/* Subtotal */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-300">
                Subtotal
              </span>
              <span className="text-xl font-bold text-gray-200">
                KES {subtotal.toFixed(2)}
              </span>
            </div>

            {/* Delivery Fee Note */}
            <div className="bg-slate-700/40 border border-pink-500/40 text-pink-400 text-sm rounded-lg p-3 mb-5 flex items-start gap-2">
              <span role="img" aria-label="truck">
                🚚
              </span>
              <p>
                Delivery fee will be{" "}
                <span className="font-semibold">calculated at checkout</span>
                based on your location.
              </p>
            </div>

            {/* Checkout Button */}
            <Link to="/checkout">
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-200 to-yellow-300 text-slate-900 py-3 rounded-xl font-extrabold text-lg shadow-lg tracking-wide hover:from-yellow-300 hover:to-yellow-400 transition transform hover:scale-105">
                <ShoppingCart className="w-6 h-6" />
                Proceed to Checkout
              </button>
            </Link>

            {/* Continue Shopping */}
            <Link
              to="/"
              className="block mt-4 text-sm text-gray-400 hover:text-yellow-300 text-center"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
