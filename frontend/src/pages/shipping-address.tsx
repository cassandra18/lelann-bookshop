import React, { useState, useEffect } from "react";
import { useCart } from "../components/cart-functionality";
import { useNavigate } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { FaLocationArrow } from "react-icons/fa";
import OrderSummary from "../components/orderSummary";

interface Store {
  id: number;
  name: string;
  address: string;
}

const storeLocations: Store[] = [
  {
    id: 1,
    name: "Lelann Chokaa",
    address: "Kang'undo Road, Chokaa Town, Embakasi East, Nairobi, Kenya",
  },
  {
    id: 2,
    name: "Lelann Kericho",
    address: "Kericho Town, Kericho, Kenya",
  },
];

const ShippingAddress: React.FC = () => {
  const { state } = useCart();
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "deliver" | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    phone: "",
    kraPin: "",
  })

  // Effect to retrieve phone number from localStorage on component mount
  useEffect(() => {
    const savedPhone = localStorage.getItem("userPhoneNumber");
    if (savedPhone) {
      setDeliveryDetails((prev) => ({
        ...prev,
        phone: savedPhone,
      }));
    }
  }, []);

  const handleStoreSelect = (store: Store) => {
    setSelectedStore(store);
  };

  const navigate = useNavigate();

  const handleContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("userPhoneNumber", deliveryDetails.phone);
    
    navigate("/checkout/confirmation",  { state: { items: state.items, deliveryDetails } });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliveryDetails((prev) => {
      const newDetails = {
        ...prev,
        [name]: value,
      };

      // Save the phone number to localStorage whenever it changes
      if (name === "phone") {
        localStorage.setItem("userPhoneNumber", value);
      }

      return newDetails;
    });
  };

  return (
    <div className="flex justify-center py-10 gap-8">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-sunset">Where should we deliver to?</h1>
        <div className="border p-2 rounded-sm border-sunset-transparent flex items-center">
          <input
            type="radio"
            id="pick-up"
            name="delivery-option"
            value="pickup"
            checked={deliveryOption === "pickup"}
            onChange={() => {
              setDeliveryOption((prev) => {
              if (prev === "pickup") {
                setSelectedStore(null); // Clear selected store when unselecting "pickup"
                return null;
              }
              return "pickup";
            })}}
          />
          <label htmlFor="pick-up" className="ml-5 flex items-center gap-3"
          style={{ fontFamily: "Dosis, sans-serif", fontWeight: 500, fontStyle: "normal" }}>
            <FaLocationArrow className="w-5 h-5" /> Pickup from our store
          </label>
        </div>

        {deliveryOption === "pickup" && (
          <div className="mt-4 border border-sunset-transparent  rounded-md p-4 transition-all">
            <h2 className="text-xl font-bold mb-2 text-sunset">Choose a store</h2>
            <div className="grid grid-cols-1 gap-4 mb-4">
              {storeLocations.map((store) => (
                <div key={store.id} className="border p-4 rounded-md">
                  <h3 className="font-bold">{store.name}</h3>
                  <p>{store.address}</p>
                  <button
                    className={`mt-2 ${
                      selectedStore?.id === store.id
                        ? "bg-green-500 text-white"
                        : "bg-blue-500 text-white"
                    } p-2 rounded`}
                    onClick={() => handleStoreSelect(store)}
                  >
                    {selectedStore?.id === store.id ? "Selected" : "Select store"}
                  </button>
                </div>
              ))}
            </div>

            {selectedStore && (
              <div>
                <h2 className="text-xl font-bold mb-2 text-sunset">Who will collect the order?</h2>
                <form onSubmit={handleContinue}>
                  <div className="mb-4">
                    <label className="block mb-1">KRA PIN *</label>
                    <input type="text" name="kraPin" value={deliveryDetails.kraPin} onChange={handleInputChange}
                    className="w-full p-2 border border-sunset-transparent  bg-gray-800 rounded focus:outline-none"
                    pattern="[A-Z]\d{8}[A-Z]"
                    title="KRA PIN should start with a capital letter, followed by 8 digits, and end with a capital letter"
                    placeholder="e.g A12345678Z"
                    required/>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">First and Last name *</label>
                    <input type="text" name="name" value={deliveryDetails.name} onChange={handleInputChange}
                    className="w-full p-2 border border-sunset-transparent  bg-gray-800 rounded focus:outline-none"
                    required 
                    pattern="[A-Za-z\s]+"
                    minLength={2}
                    maxLength={50}
                    title="Name should contain letters only and be between 2 and 50 charaters long."
                    placeholder="e.g,  John Doe"/>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Phone number *</label>
                    <input type="text" name="phone" value={deliveryDetails.phone} onChange={handleInputChange}
                    className="w-full p-2 border border-sunset-transparent  bg-gray-800 rounded focus:outline-none"
                    required 
                    pattern="(07|01)\d{8}"
                    title="Phone number should start with '07' or '01' and be 10 digits long (e.g, 0712345678 or 0112345678)"
                    maxLength={10}
                    placeholder="e.g 0113120575"/>
                  </div>
                  <button type="submit" className="bg-blue-500 text-white p-2 rounded">Continue</button>
                </form>
              </div>
            )}
          </div>
        )}

        <div className="border p-2 rounded-sm border-sunset-transparent mt-6 flex items-center">
          <input
            type="radio"
            id="deliver"
            name="delivery-option"
            value="deliver"
            checked={deliveryOption === "deliver"}
            onChange={() => setDeliveryOption("deliver")}
          />
          <label htmlFor="deliver" className="ml-5 flex items-center gap-3"
          style={{ fontFamily: "Dosis, sans-serif", fontWeight: 500, fontStyle: "normal" }}>
            <TbTruckDelivery className="w-8 h-8"/>Deliver to my address
          </label>
        </div>
      </div>

      {/* Order Summary Section */}
      <OrderSummary/>
    </div>
  );
};

export default ShippingAddress;
