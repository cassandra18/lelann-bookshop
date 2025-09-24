import React, { useState } from "react";
import { useCart } from "../components/cart-functionality";
import { ChevronDown, ChevronUp } from "lucide-react"; // icons

const Checkout: React.FC = () => {
  const { state } = useCart();
  const [deliveryOption, setDeliveryOption] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [showSummary, setShowSummary] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    apartment: "", // optional
    city: "",
    county: "",
    store: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on typing
  };

  // validate required fields
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (deliveryOption === "delivery") {
      if (!formData.street) newErrors.street = "Street address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.county) newErrors.county = "County is required";
    } else if (deliveryOption === "pickup") {
      if (!formData.store) newErrors.store = "Please select a store";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle submit
  const handleSubmit = async () => {
    if (!validateForm()) return;

    const subtotal = state.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const orderData = {
      deliveryOption,
      paymentMethod,
      ...formData,
      items: state.items,
      subtotal,
    };

    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    console.log("Order response:", data);
  };

  // subtotal
  const subtotal = state.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Order Summary Dropdown */}
        <div className="bg-slate-800 rounded-2xl shadow-lg mb-8">
          <button
            className="w-full flex justify-between items-center px-6 py-4 text-[#ffea00] font-bold text-lg"
            onClick={() => setShowSummary(!showSummary)}
          >
            <span>Order Summary</span>
            {showSummary ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {showSummary && (
            <div className="px-6 pb-6">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-3 border-b border-slate-700 pb-2"
                >
                  <span className="text-gray-300">
                    {item.name}{" "}
                    <span className="text-sm text-gray-400">
                      (x{item.quantity})
                    </span>
                  </span>
                  <span className="text-gray-200 font-semibold">
                    KES {item.price * item.quantity}
                  </span>
                </div>
              ))}

              {/* Subtotal */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-600">
                <span className="text-lg font-semibold text-gray-300">
                  Subtotal
                </span>
                <span className="text-xl font-bold text-gray-200">
                  KES {subtotal.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Checkout Form */}
        <div className="shadow-xl rounded-2xl p-6 md:p-10 border border-slate-700">
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
                {[
                  { name: "firstName", placeholder: "First name" },
                  { name: "lastName", placeholder: "Last name" },
                  { name: "phone", placeholder: "Phone number", full: true },
                  { name: "street", placeholder: "Street address", full: true },
                  { name: "apartment", placeholder: "Apartment / Suite (optional)", full: true },
                  { name: "city", placeholder: "City / Town" },
                  { name: "county", placeholder: "County" },
                ].map((field) => (
                  <div
                    key={field.name}
                    className={field.full ? "md:col-span-2" : ""}
                  >
                    <input
                      type="text"
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      className={`w-full border ${
                        errors[field.name]
                          ? "border-red-500"
                          : "border-slate-600"
                      } bg-slate-900 text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-yellow-400`}
                    />
                    {errors[field.name] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </form>
            </div>
          ) : (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-200 mb-3">
                Select Store for Pickup
              </h2>
              <select
                name="store"
                value={formData.store}
                onChange={handleChange}
                className={`w-full border ${
                  errors.store ? "border-red-500" : "border-slate-600"
                } bg-slate-900 text-gray-200 p-3 rounded-lg focus:ring-2 focus:ring-yellow-400`}
              >
                <option value="">-- Select Store --</option>
                <option>Nairobi - Chokaa-Njiru</option>
                <option>Nairobi - Kericho CBD</option>
              </select>
              {errors.store && (
                <p className="text-red-500 text-sm mt-1">{errors.store}</p>
              )}
            </div>
          )}

          {/* Payment Options */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-200 mb-3">
              Payment Method
            </h2>
            <div className="space-y-3">
              {["mpesa", "card"].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-3 p-4 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-700 transition"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                    className="accent-yellow-400"
                  />
                  <span className="text-gray-300 capitalize">{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-yellow-200 to-yellow-400 text-slate-900 font-extrabold py-3 rounded-xl shadow-lg tracking-wide hover:from-yellow-300 hover:to-yellow-500 transition transform hover:scale-105"
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
