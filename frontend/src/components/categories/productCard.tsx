import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCartIcon } from "@heroicons/react/24/outline"; 
import { useCart } from '../../components/cart-functionality';

interface BookCardProps {
  id: string;
  name: string;
  author?: { name: string } | null;
  price: number;
  oldPrice?: number | null;
  image: string;
  subcategoryId?: string;
}

const BookCard: React.FC<BookCardProps> = ({
  id,
  name,
  author,
  price,
  oldPrice,
  image,
}) => {
  const { dispatch } = useCart();
  const [count, setCount] = React.useState<number>(1);
  const hasDiscount = oldPrice && oldPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };

  const handleAddToCart = () => {
      dispatch({
          type: "ADD_ITEM",
          payload: { productId: id, name, price, quantity: count, image},
      });
      alert(`Added ${count} item(s) to basket`);
  }
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 flex flex-col h-100 shadow-lg">
      <Link to={`/product/${id}`}>
      <div className="relative h-56 p-3">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-xl"
          />
        {hasDiscount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-3">
        <h3 className="text-white font-semibold line-clamp-2">{name}</h3>
        {author?.name && (
          <p className="text-sm text-gray-400 mt-1">{author.name}</p>
        )}

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-base font-bold text-yellow-200">
              Ksh {price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                Ksh {oldPrice?.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        <div className="flex  items-center justify-between space-x-2 mt-2">
          <div className="flex items-center space-x-2 bg-gray-700 border border-gray-600 rounded-sm px-2 py-1">
            <span className="text-white">{count}</span>
            <div>
              <button
                onClick={handleDecrease}
                className="text-white text-lg font-bold w-3 h-3 flex items-center justify-center rounded-sm bg-gray-600 hover:bg-gray-500 hover:text-yellow-300"
                disabled={count === 1}
              >
                -
              </button>
              <button
                onClick={handleIncrease}
                className="text-white text-lg font-bold w-3 h-3 flex items-center justify-center rounded-sm mt-2 bg-gray-600 hover:bg-gray-500 hover:text-yellow-300"
              >
                +
              </button>
            </div>
          </div>
          {/* add to cart */}
          <button
            onClick={handleAddToCart}
            className="inline-flex items-center justify-center w-full text-prussian-blue bg-yellow-200 hover:bg-yellow-300 font-extrabold py-2 rounded-xl transition transform hover:scale-105 shadow-md"
          >
            <ShoppingCartIcon className="h- w-5 mr-2" />
          </button>
        </div>
      </div>
      </Link>
    </div>
  );
};

export default BookCard;
