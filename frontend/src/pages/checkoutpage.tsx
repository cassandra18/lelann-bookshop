import React, { useState } from "react";
import { useCart } from "../components/cart-functionality";
import OrderSummary from "../components/checkout/orderSummary";
import DeliveryOptions from "../components/checkout/deliveryOptions";
import ShippingForm from "../components/checkout/shippingForm";
import PickUpForm from "../components/checkout/pickupForm";
import PaymentOptions from "../components/checkout/paymentOptions";
import PlaceOrderButton from "../components/checkout/placeOrderButton";

const CheckoutPage: React.FC = () => {
  const { state } = useCart();

  // states
  const [deliveryOption, setDeliveryOption] = useState<"delivery" | "pickup">(
    "delivery"
  );
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "card">("mpesa");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    street: "",
    apartment: "",
    city: "",
    county: "",
    store: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle input changes for forms
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // validation
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

  // submit handler
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

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

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      console.log("Order response:", data);
      alert("✅ Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("❌ Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Order Summary */}
        <OrderSummary
          items={state.items}
          subtotal={state.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          )}
        />

        {/* Checkout Form Container */}
        <div className="shadow-xl rounded-2xl p-6 md:p-10 border border-slate-700">
          <h1 className="text-2xl md:text-4xl font-bold text-[#ffea00] mb-6 text-center">
            Checkout
          </h1>

          {/* Delivery Options */}
          <DeliveryOptions
            deliveryOption={deliveryOption}
            setDeliveryOption={setDeliveryOption}
          />

          {/* Conditional Shipping or Pickup Form */}
          {deliveryOption === "delivery" ? (
            <ShippingForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              subtotal={state.items.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
              onDataChange={setFormData}
            />
          ) : (
            <PickUpForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
            />
          )}

          {/* Payment Options */}
          <PaymentOptions
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />

          {/* Place Order Button */}
          <PlaceOrderButton onClick={handleSubmit} loading={isSubmitting} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
