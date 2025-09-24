import React, { useState, useEffect } from "react";

interface DeliveryOptionsProps {
  deliveryOption: "delivery" | "pickup";
  setDeliveryOption: (option: "delivery" | "pickup") => void;
}

const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  deliveryOption,
  setDeliveryOption,
}) => {
  const [selectedOption, setSelectedOption] = useState<"delivery" | "pickup">(deliveryOption);

  useEffect(() => {
    setSelectedOption(deliveryOption);
  }, [deliveryOption]);

  const handleChange = (option: "delivery" | "pickup") => {
    setSelectedOption(option);
    setDeliveryOption(option);
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Delivery Options
      </h2>
      <div className="space-y-3">
        {/* Deliver to address */}
        <label
          className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition
            ${
              selectedOption === "delivery"
                ? "border-yellow-400 bg-slate-700"
                : "border-slate-600 hover:bg-slate-700"
            }`}
        >
          <input
            type="radio"
            name="deliveryOption"
            value="delivery"
            checked={selectedOption === "delivery"}
            onChange={() => handleChange("delivery")}
            className="accent-yellow-300"
          />
          <span className="text-gray-300">Deliver to my address</span>
        </label>

        {/* Pick up at store */}
        <label
          className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition
            ${
              selectedOption === "pickup"
                ? "border-yellow-400 bg-slate-700"
                : "border-slate-600 hover:bg-slate-700"
            }`}
        >
          <input
            type="radio"
            name="deliveryOption"
            value="pickup"
            checked={selectedOption === "pickup"}
            onChange={() => handleChange("pickup")}
            className="accent-yellow-300"
          />
          <span className="text-gray-300">Pick up at the store</span>
        </label>
      </div>
    </div>
  );
};

export default DeliveryOptions;
