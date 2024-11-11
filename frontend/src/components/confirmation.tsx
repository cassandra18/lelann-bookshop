import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CartItem } from "./cart-functionality";
import { Link } from "react-router-dom";

const Confirmation: React.FC = () => {
  const [selectedPayment, setSelectedPayment] = useState<string>("mpesa");
  const navigate = useNavigate();
  const location = useLocation();
  const deliveryDetails = location.state?.deliveryDetails || {};

  //Get cart items from location state
  const cartItems = location.state?.items || [];
  console.log("Cart itens in confirmation:", cartItems);

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(event.target.value);
  };

  const handlePlaceOrder = () => {
    // Redirect based on selected payment method
    switch (selectedPayment) {
      case "mpesa":
        navigate("/checkout/mpesa");
        break;
      case "kcb":
        navigate("/checkout/kcb");
        break;
      case "card":
        navigate("/checkout/credit-card", {
          state: {  totalAmount },
        });
        break;
      case "giftcard":
        navigate("/checkout/gift-card");
        break;
      default:
        alert("Please select a payment method");
    }
  };

  //Calculate total order amount
  const totalAmount = cartItems.reduce(
    (acc: number, item: CartItem) =>
      acc + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Payment Section */}
        <div className="p-6 border border-sunset-transparent rounded">
          <h2 className="text-2xl font-bold mb-4 text-sunset">Pay with</h2>
          <div className="space-y-4">
            {[
              {
                label: "Credit or debit using KCB",
                value: "kcb",
                logo: "/images/kcb-logo.svg",
              },
              {
                label: "Safaricom M-Pesa",
                value: "mpesa",
                logo: "/images/mpesalogo.png",
              },
              {
                label: "Credit or debit card",
                value: "card",
                logo: "/images/credit-card.png",
              },
              {
                label: "Our digital gift card",
                value: "giftcard",
                logo: "/images/giftcard.png",
              },
            ].map((option) => (
              <div
                key={option.value}
                className="flex items-center gap-4 p-3 border rounded"
              >
                <input
                  type="radio"
                  id={option.value}
                  name="payment"
                  value={option.value}
                  checked={selectedPayment === option.value}
                  onChange={handlePaymentChange}
                  className="h-5 w-5"
                />
                <img
                  src={option.logo}
                  alt={option.label}
                  className="h-8 w-auto"
                />
                <label htmlFor={option.value} className="flex-1">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Place Order Section */}
        <div className="p-6 border border-sunset-transparent rounded">
          <h2 className="text-2xl font-bold mb-4 text-sunset">Place order</h2>
          <p className="text-lg mb-4 font-bold">
            Your order total is {totalAmount.toLocaleString()}.
          </p>
          <p className="text-md mb-4">
            Select a payment method, and then place your order.
          </p>
          <p className="text-sm mb-4">
            By placing an order you agree to the{" "}
            <a href="#" className="text-blue-500 underline">
              terms and conditions
            </a>
            .
          </p>
          <button
            className="w-full bg-purple-500 text-white py-2 rounded"
            onClick={handlePlaceOrder}
          >
            Place order
          </button>
        </div>
      </div>

      {/* Order Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        {/* Order Contents */}
        <div className="p-6 border border-sunset-transparent rounded">
          <h2 className="text-2xl font-bold mb-4 text-sunset">
            Order contents
          </h2>
          <table className="w-full border-t border-gray-300">
            <thead>
              <tr>
                <th className="text-left p-2 font-medium">Item</th>
                <th className="text-left p-2 font-medium">Quantity</th>
                <th className="text-left p-2 font-medium">Sub-total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: CartItem) => (
                <tr key={item.id} className="border-b border-gray-300">
                  <td className="p-2 flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 object-cover mr-4"
                    />
                    <div>
                      <div>
                        <Link
                          to={`/otherbooks/${item.id}`}
                          className="text-blue-600 underline"
                        >
                          {item.name}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2 font-bold">
                    KES {item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-300">
                <td className="p-2 font-bold">Basket total:</td>
                <td></td>
                <td className="p-2 font-bold">
                  KES {totalAmount.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Delivery:</td>
                <td></td>
                <td className="p-2">KES 0</td>
              </tr>
              <tr>
                <td className="p-2 font-bold">Order total:</td>
                <td></td>
                <td className="p-2 font-bold">
                  KES {totalAmount.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Delivery Address */}
        <div className="p-6 border border-sunset-transparent rounded">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-sunset">Delivery address</h2>
            <a href="#" className="text-blue-600 underline text-sm">
              Edit
            </a>
          </div>
          <p className="mb-2">
            <strong className="text-lg text-bold mr-2">Collect from:</strong>{" "}
            {deliveryDetails.name || "No name provided"}
          </p>
          <p className="mb-2">
            <strong className="text-lg text-bold">Contact:</strong>
          </p>
          <div className="ml-9">
            <p>Phone: {deliveryDetails.phone || "No phone provided"}</p>
            <p>
              Email: {deliveryDetails.email || "cassandralelei013@gmail.com"}
            </p>
          </div>
          <p className="mt-4">
            <strong className="text-lg text-bold mr-2">KRA PIN:</strong>{" "}
            {deliveryDetails.kraPin || "No KRA PIN provided"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
