import React, { useState } from "react";
import { useCart } from "../components/cart-functionality";
import { useNavigate } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { FaLocationArrow } from "react-icons/fa";

interface Store {
  id: number;
  name: string;
  address: string;
}

const storeLocations: Store[] = [
  {
    id: 1,
    name: "TBC Ruiru",
    address: "The Nord, Off Ruiru Kamiti Road, Ruiru Town, Kiambu, Kenya",
  },
  {
    id: 2,
    name: "TBC Kisumu",
    address: "United Mall, Off Jomo Kenyatta Highway, Kisumu, Kenya",
  },
  {
    id: 3,
    name: "TBC Nairobi",
    address: "Moi Avenue, Nairobi, Kenya",
  },
];

const ShippingAddress: React.FC = () => {
  const { state } = useCart();
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "deliver" | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const handleStoreSelect = (store: Store) => {
    setSelectedStore(store);
  };

  const navigate = useNavigate();

  const handleContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/checkout/confirmation");
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
            onChange={() => {setDeliveryOption((prev) => (prev === "pickup" ? null : "pickup"))
              
            }}
          />
          <label htmlFor="pick-up" className="ml-5 flex items-center gap-3"
          style={{ fontFamily: "Dosis, sans-serif", fontWeight: 500, fontStyle: "normal" }}>
            <FaLocationArrow className="w-5 h-5" /> Pickup from our store
          </label>
        </div>

        {deliveryOption === "pickup" && (
          <div className="mt-4 border rounded-md p-4 transition-all">
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
                    <label className="block mb-1">KRA PIN</label>
                    <input type="text" className="w-full p-2 border rounded" />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Name *</label>
                    <input type="text" className="w-full p-2 border rounded" required />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Phone number *</label>
                    <input type="text" className="w-full p-2 border rounded" required />
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
      <div className="w-full max-w-lg border mb-auto p-6 rounded-lg mt-12 border-sunset-transparent">
        <button
          className="w-full border border-red-500 text-red-500 p-2 rounded-sm mb-4"
          style={{
            fontFamily: "Dosis, sans-serif",
            fontWeight: 500,
            fontStyle: "normal",
          }}
        >
          Add a voucher code
        </button>
        <div className="border-t pt-4">
          <h2 className="text-2xl font-bold mb-4 text-sunset">Your order</h2>
          {state.items.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div>
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between mb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover"
                  />
                  <div className="flex-grow ml-4">
                    <h2 className="text-blue-600" style={{ fontFamily: "Dosis, sans-serif", fontWeight: 500 }}>
                      {item.name}
                    </h2>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <p className="text-lg font-bold">
                    KES {item.price * item.quantity}
                  </p>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-sunset">Total:</span>
                  <span className="text-lg font-bold">
                    KES{" "}
                    {state.items.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingAddress;
