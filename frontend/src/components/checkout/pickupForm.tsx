import React from "react";

export interface PickUpFormProps {
  formData: {
    firstName: string;
    lastName: string;
    phone: string;
    store: string;
  };
  errors: { [key: string]: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const PickUpForm: React.FC<PickUpFormProps> = ({ formData, errors, handleChange }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-200 mb-3">Pickup Details</h2>
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

        {/* Store / Pickup Location Dropdown */}
        <div className="md:col-span-2">
          <select
            name="store"
            value={formData.store}
            onChange={handleChange}
            className={`w-full border  ${
              errors.store ? "border-red-500" : "border-slate-600"
            } bg-slate-900 text-gray-200 p-3 rounded-lg `}
          >
            <option value="">-- Select Pickup Location --</option>
            <option value="Main Shop – Nairobi Chokaa-Njiru">Main Shop – Nairobi Chokaa - Njiru</option>
            <option value="Kericho CBD Store">Kericho CBD Store</option>
          </select>
          {errors.store && (
            <p className="text-red-500 text-sm mt-1">{errors.store}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default PickUpForm;
