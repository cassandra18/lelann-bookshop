import React, { useState } from 'react';
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useCart } from './cart-functionality';


interface ProductCardProps {
    id: string;
    price: number;
    name: string;
    image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image}) => {
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
      dispatch({
          type: "ADD_ITEM",
          payload: { id, name, price, quantity, image},
      });
      alert(`Added ${quantity} item(s) to basket`);
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleInquire = () => {
    window.open('https://wa.me/?text=I%20am%20interested%20in%20this%20product', '_blank');
  };

  return (
    <div className="border rounded-sm p-6  mx-auto text-center mb-20 lg:mb-auto lg:mt-20  ">
      <h2 className="text-2xl font-bold text-sunset mb-4">KES {price}</h2>
      <div className="mb-4">
        <label htmlFor="quantity" className="mr-2">Quantity</label>
        <select
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          className="p-2 border bg-slate-200 text-prussian-blue w-24 rounded"
        >
          {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAddToCart}
        className="bg-[#2c1e7b] text-white py-2 px-4 rounded w-full mb-4"
      >
        <div className='flex items-center justify-center gap-8'>
        <MdOutlineShoppingCart className='w-6 h-6' />Add to basket
        </div>
      
      </button>
      <button className="text-gray-300 underline mb-4">Add to wish list</button>
      <button
        onClick={handleInquire}
        className="bg-[#25D366] text-white py-2 px-4 rounded w-full mb-4"
      >
        <div className='flex items-center justify-center gap-6 '>
            <FaWhatsapp className='w-6 h-6 '/> Inquire on WhatsApp
        </div>
       
      </button>
      <div className="flex justify-center space-x-4 mt-4">
        <img src={'/images/mclogo.png'} alt="MasterCard" className="w-20" />
        <img src={'/images/visa.svg'} alt="Visa" className="w-16" />
        <img src={'/images/mpesalogo.png'} alt="M-Pesa" className="w-24 h-auto" />
      </div>
    </div>
  );
};

export default ProductCard;
