import { useState } from "react";
import { createOrder } from "../services/orderService";
import { triggerMpesaPayment } from "../services/paymentService";

export const useCheckout = (formData: any, state: any, deliveryOption: string, paymentMethod: string, deliveryFee: number | null = null) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);

  const orderData = {
    deliveryOption,
    paymentMethod,
    deliveryFee,
    ...formData,
    items: state.items.map((item: any) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    })),
  };

    try {
      const order = await createOrder(orderData);

      if (paymentMethod === "mpesa") {
        await triggerMpesaPayment(order.id, order.total, formData.phone);
        alert("📲 Please check your phone and enter M-Pesa PIN to complete payment");
      } else {
        alert("✅ Order placed successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { errors, isSubmitting, handleSubmit };
};
