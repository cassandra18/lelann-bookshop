import React from "react";
import { useCart } from "../components/cart-functionality";

const ShippingAddress: React.FC = () => {
    const { state } = useCart();

    return (
        <div  className="flex justify-center py-10 gap-8">
            <div>
            <h1>Where should we deliver to?</h1>
            <div>
                <input type="radio" id="pick-up" name="delivery-option" value="pickup" />
                <label htmlFor="pick-up" className="ml-2">Pickup from our store</label>
            </div>
            <div>
                <input type="radio" id="deliver" name="delivery-option" value="deliver" />
                <label htmlFor="deliver" className="ml-2">Deliver to my address</label>
            </div>
            </div>

                     {/* Order Summary Section */}
          <div className="col-span-1 border p-6 rounded-lg">
            <button className="w-full border border-red-500 text-red-500 p-2 rounded-md mb-4">
              Add a voucher code
            </button>
            <div className="border-t pt-4">
              <h2 className="text-2xl font-bold mb-4">Your order</h2>
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
                        <h2 className="font-bold">{item.name}</h2>
                        <p>Qty: {item.quantity}</p>
                      </div>
                      <p className="text-lg font-bold">
                        KES {item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Total:</span>
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
}

export default ShippingAddress;
