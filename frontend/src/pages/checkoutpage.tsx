import React, { useState } from "react";
import { useCart } from "../components/cart-functionality";
import { useCheckout } from "../components/checkout/hooks/useCheckout";
import OrderSummary from "../components/checkout/orderSummary";
import DeliveryOptions from "../components/checkout/deliveryOptions";
import ShippingForm from "../components/checkout/shippingForm";
import PickUpForm from "../components/checkout/pickupForm";
import PaymentOptions from "../components/checkout/paymentOptions";
import PlaceOrderButton from "../components/checkout/placeOrderButton";

const CheckoutPage: React.FC = () => {
  const { state } = useCart();

  // states
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
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

  const { errors, isSubmitting, handleSubmit } = useCheckout(
    formData,
    state,
    deliveryOption,
    paymentMethod,
    deliveryFee
  );

  // handle input changes for forms
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          deliveryFee={deliveryFee ?? undefined}
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
              onDataChange={(data, fee) => {
                setFormData(data);
                setDeliveryFee(fee); // update fee
              }}
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
