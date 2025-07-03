import React from 'react';
import { useCart } from "./cart-functionality";

const OrderSummary: React.FC = () => {
    const { state } = useCart();

    return (
        <div className="col-span-1 border p-6 rounded-lg border-sunset-transparent">
            <button className="w-full border border-red-500 text-red-500 p-2 rounded-sm mb-4"
            style={{fontFamily: "Dosis, sans-serif", fontWeight: 500, fontStyle: "normal"}}>
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
                        <h2 className="font-bold mr-6" style={{fontFamily: "Dosis, sans-serif"}}>{item.name}</h2>
                        <p>Qty: {item.quantity}</p>
                      </div>
                      <p className="text-lg font-bold text-gray-400">
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
    )
}

export default OrderSummary;