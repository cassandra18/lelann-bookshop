import React, { useState } from "react";
import { useCart } from "../../components/cart-functionality";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";

interface ProductPageProps {
  book: {
    id: string;
    title: string;
    serial?: string;
    price: number;
    description?: string;
    image: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ book }) => {
  const { dispatch } = useCart();
  const [count, setCount] = useState<number>(1);

  const handleDecrease = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: book.id,
        name: book.title,
        price: book.price,
        quantity: count,
        image: book.image,
      },
    });
    alert(`Added ${count} item(s) to basket`);
  };

  const handleAddToWishlist = () => {
    alert("Added to wishlist!");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="bg-gray-100 rounded-2xl shadow-lg flex items-center justify-center">
        <img
          src={book.image}
          alt={book.title}
          className="rounded-2xl w-full h-[400px] object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
        {book.serial && (
          <p className="text-gray-500 text-sm">Serial: {book.serial}</p>
        )}
        {book.description && (
          <p className="text-lg text-gray-700">{book.description}</p>
        )}
        <p className="text-2xl font-extrabold text-yellow-600">
          Ksh {book.price.toFixed(2)}
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleDecrease}
            disabled={count === 1}
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-lg font-bold"
          >
            -
          </button>
          <span className="text-lg font-semibold">{count}</span>
          <button
            onClick={handleIncrease}
            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 text-lg font-bold"
          >
            +
          </button>
        </div>

        {/* Buttons */}
        <div className="flex space-x-3 mt-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-xl shadow-md"
          >
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            Add to Cart
          </button>

          <button
            onClick={handleAddToWishlist}
            className="px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-100"
          >
            <HeartIcon className="h-5 w-5 text-red-500" />
          </button>
        </div>

        {/* Payment Methods */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Payment Methods
          </h3>
          <div className="flex space-x-4">
            <img
              src="/images/visa.svg"
              alt="Visa"
              className="h-8"
            />
            <img
              src="/images/mastercard.svg"
              alt="Mastercard"
              className="h-8"
            />
            <img
              src="/images/mpesa.png"
              alt="M-Pesa"
              className="h-8"
            />
          </div>
        </div>

        {/* Delivery Options */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Delivery Options
          </h3>
          <ul className="list-disc pl-5 text-gray-700 text-sm space-y-1">
            <li>Same-day delivery within Nairobi</li>
            <li>2-3 business days outside Nairobi</li>
            <li>Pick up from selected outlets</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
