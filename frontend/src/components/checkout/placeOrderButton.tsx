import React from "react";

interface PlaceOrderButtonProps {
  onClick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const PlaceOrderButton: React.FC<PlaceOrderButtonProps> = ({
  onClick,
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`w-full bg-gradient-to-r from-yellow-200 to-yellow-400 
        text-slate-900 font-extrabold py-3 rounded-xl shadow-lg tracking-wide
        transition transform hover:scale-105
        ${
          loading || disabled
            ? "opacity-60 cursor-not-allowed"
            : "hover:from-yellow-300 hover:to-yellow-500"
        }`}
    >
      {loading ? "Processing..." : "Make Payment"}
    </button>
  );
};

export default PlaceOrderButton;
