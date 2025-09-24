import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
interface OrderSummaryProps {
  items: { id: string; name: string; price: number; quantity: number }[];
  subtotal: number;
  deliveryFee?: number | null; // allow null
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  deliveryFee,
}) => {
  const [showSummary, setShowSummary] = useState(true);

  const total = deliveryFee != null ? subtotal + deliveryFee : subtotal;

  return (
    <div className="bg-slate-800 rounded-2xl shadow-lg mb-8">
      <button
        className="w-full flex justify-between items-center px-6 py-4 text-[#ffea00] font-bold text-lg"
        onClick={() => setShowSummary(!showSummary)}
      >
        <span>Order Summary</span>
        {showSummary ? <ChevronUp /> : <ChevronDown />}
      </button>

      {showSummary && (
        <div className="px-6 pb-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-3 border-b border-slate-700 pb-2"
            >
              <span className="text-gray-300">
                {item.name}{" "}
                <span className="text-sm text-gray-400">(x{item.quantity})</span>
              </span>
              <span className="text-gray-200 font-semibold">
                KES {item.price * item.quantity}
              </span>
            </div>
          ))}

          {/* Subtotal */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-semibold text-gray-300">Subtotal</span>
            <span className="text-gray-200">KES {subtotal.toFixed(2)}</span>
          </div>

          {/* Delivery Fee */}
          {deliveryFee != null ? (
            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-semibold text-gray-300">
                Delivery Fee
              </span>
              <span className="text-gray-200">
                {deliveryFee === 0 ? "Free" : `KES ${deliveryFee.toFixed(2)}`}
              </span>
            </div>
          ) : (
            <p className="mt-3 text-sm text-yellow-300">
              🚚 Select your county to see delivery charges.
            </p>
          )}

          {/* Total */}
          {deliveryFee != null && (
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-600">
              <span className="text-lg font-bold text-gray-300">Total</span>
              <span className="text-xl font-bold text-[#ffea00]">
                KES {total.toFixed(2)}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderSummary;