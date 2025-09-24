import React, { useEffect, useState } from "react";
import { counties } from "../../assets/counties";

interface ShippingFormProps {
  formData: {
    firstName: string;
    lastName: string;
    phone: string;
    street: string;
    apartment: string;
    city: string;
    county: string;
  };
  errors: { [key: string]: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  subtotal: number;
  onDataChange: (formData: any, deliveryFee: number | null) => void;
}

const ShippingForm: React.FC<ShippingFormProps> = ({
  formData,
  errors,
  handleChange,
  subtotal,
  onDataChange,
}) => {
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);

  // calculate delivery fee when county changes
  useEffect(() => {
  if (!formData.county) {
    setDeliveryFee(null);
    onDataChange(formData, null);
    return;
  }

  const selectedCounty = counties.find((c) => c.name === formData.county);
  let fee = selectedCounty ? selectedCounty.fee : 0;

  // free delivery above 3000
  if (subtotal >= 3000) fee = 0;

  setDeliveryFee(fee);
  onDataChange(formData, fee);
}, [formData.county, subtotal]);


  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">
        Shipping Address
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: "firstName", placeholder: "First name" },
          { name: "lastName", placeholder: "Last name" },
          { name: "phone", placeholder: "Phone number", full: true },
        ].map((field) => (
          <div key={field.name} className={field.full ? "md:col-span-2" : ""}>
            <input
              type="text"
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name as keyof typeof formData]}
              onChange={handleChange}
              className={`w-full border ${
                errors[field.name] ? "border-red-500" : "border-slate-600"
              } bg-slate-900 text-gray-200 p-3 rounded-lg `}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}

        {/* County dropdown */}
        <div>
          <select
            name="county"
            value={formData.county}
            onChange={handleChange}
            className={`w-full border ${
              errors.county ? "border-red-500" : "border-slate-600"
            } bg-slate-900 text-gray-200 p-3 rounded-lg `}
          >
            <option value="">-- Select County --</option>
            {counties.map((county) => (
              <option key={county.name} value={county.name}>
                {county.name}
              </option>
            ))}
          </select>
          {errors.county && (
            <p className="text-red-500 text-sm mt-1">{errors.county}</p>
          )}
        </div>

        {/* City */}
        <div>
          <input
            type="text"
            name="city"
            placeholder="City / Town"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.county}
            className={`w-full border ${
              errors.city ? "border-red-500" : "border-slate-600"
            } bg-slate-900 text-gray-200 p-3 rounded-lg ${
              !formData.county ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        {/* Street & Apartment */}
        <div className="md:col-span-2">
          <input
            type="text"
            name="street"
            placeholder="Street address"
            value={formData.street}
            onChange={handleChange}
            className={`w-full border ${
              errors.street ? "border-red-500" : "border-slate-600"
            } bg-slate-900 text-gray-200 p-3 rounded-lg`}
          />
          {errors.street && (
            <p className="text-red-500 text-sm mt-1">{errors.street}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <input
            type="text"
            name="apartment"
            placeholder="Apartment / Suite (optional)"
            value={formData.apartment}
            onChange={handleChange}
            className="w-full border border-slate-600 bg-slate-900 text-gray-200 p-3 rounded-lg"
          />
        </div>
      </form>

      {/* Delivery Fee Notice */}
      <div className="mt-4 text-yellow-200 text-sm">
        {!formData.county
          ? "Delivery fee will be displayed in the order summary after you select your county."
          : deliveryFee === 0
          ? "Free delivery for orders above Ksh 3000!"
          : `Delivery fee: Ksh ${deliveryFee}`}
      </div>
    </div>
  );
};

export default ShippingForm;
