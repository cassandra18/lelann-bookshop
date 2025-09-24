import React, { useState, useEffect } from "react";

interface PaymentOptionsProps {
  paymentMethod: "mpesa" | "card";
  setPaymentMethod: (method: "mpesa" | "card") => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  paymentMethod,
  setPaymentMethod,
}) => {
  const [selectedMethod, setSelectedMethod] = useState(paymentMethod);

  useEffect(() => {
    setSelectedMethod(paymentMethod);
  }, [paymentMethod]);

  const handleChange = (method: "mpesa" | "card") => {
    setSelectedMethod(method);
    setPaymentMethod(method);
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Payment Method
      </h2>
      <div className="space-y-3">
        {["mpesa", "card"].map((method) => (
          <label
            key={method}
            className="flex items-center gap-3 p-4 border border-gray-700 rounded-lg cursor-pointer transition"
          >
            <input
              type="radio"
              name="payment"
              value={method}
              checked={selectedMethod === method}
              onChange={() => handleChange(method as "mpesa" | "card")}
              className="accent-yellow-400"
            />
            <span className="text-gray-300 capitalize">{method}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentOptions;
