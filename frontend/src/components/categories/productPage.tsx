import React, { useState } from "react";
import { useCart } from "../../components/cart-functionality";
import { ShoppingCartIcon, HeartIcon } from "@heroicons/react/24/outline";

interface ProductPageProps {
  book: {
    id: string;
    name: string;
    serial?: string;
    price: number;
    description?: string;
    image: string;
    author?: string | { name: string };
    publisher?: string | { name: string };
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ book }) => {
  const { dispatch } = useCart();
  const [count, setCount] = useState<number>(1);

  const handleDecrease = () => count > 1 && setCount(count - 1);
  const handleIncrease = () => setCount(count + 1);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: { id: book.id, name: book.name, price: book.price, quantity: count, image: book.image },
    });
    alert(`Added ${count} item(s) to basket`);
  };

  const handleAddToWishlist = () => alert("Added to wishlist!");

  return (
    <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-2 gap-10">
      {/* Product Image */}
      <div className="relative from-gray-100 to-gray-200 rounded-3xl shadow-lg flex items-center justify-center p-6">
        <img
          src={book.image}
          alt={book.name}
          className="rounded-2xl w-full h-[450px] object-contain transform transition duration-300 hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col space-y-6">
        <h1 className="text-4xl font-extrabold text-[#ffea00]">{book.name}</h1>

        {/* Author / Publisher */}
{(book.author || book.publisher) && (
  <div className="text-gray-400 text-sm space-y-1">
    {book.author && (
      <p>
        <span className="font-medium text-gray-300">Author:</span>{" "}
        {typeof book.author === "object" ? book.author.name : book.author}
      </p>
    )}
    {book.publisher && (
      <p>
        <span className="font-medium text-gray-300">Publisher:</span>{" "}
        {typeof book.publisher === "object" ? book.publisher.name : book.publisher}
      </p>
    )}
  </div>
)}


        {book.serial && <p className="text-gray-400 text-sm">Serial: {book.serial}</p>}
        {book.description && <p className="text-base text-gray-300 leading-relaxed">{book.description}</p>}
        <p className="text-3xl font-bold text-gray-300">Ksh {book.price.toFixed(2)}</p>

        {/* Quantity Selector */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleDecrease}
            disabled={count === 1}
            className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 disabled:opacity-40 transition"
          >
            -
          </button>
          <span className="text-lg font-semibold">{count}</span>
          <button
            onClick={handleIncrease}
            className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition"
          >
            +
          </button>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 inline-flex items-center justify-center bg-yellow-200 hover:bg-yellow-400 text-gray-900 font-bold py-3 rounded-full shadow-lg transition"
          >
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            Add to Cart
          </button>

          <button
            onClick={handleAddToWishlist}
            className="px-4 py-3 rounded-full border border-gray-600 hover:bg-gray-700 transition"
          >
            <HeartIcon className="h-5 w-5 text-red-500" />
          </button>
        </div>

        {/* Payment Methods */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
            Payment Methods
          </h3>
          <div className="flex space-x-4">
            <img src="/images/visa.svg" alt="Visa" className="h-8" />
            <img src="/images/mastercard.svg" alt="Mastercard" className="h-8" />
            <img src="/images/mpesalogo.png" alt="M-Pesa" className="h-8" />
          </div>
        </div>

        {/* Delivery Options */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
            Delivery Options
          </h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span>Same-day delivery within Nairobi</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span>2-3 business days outside Nairobi</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span>Pick up from selected outlets</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
