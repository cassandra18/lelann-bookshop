import React from 'react';
import { useCart } from '../components/cart-functionality';
import { Link } from 'react-router-dom';

const Basket: React.FC = () => {
  const { state, dispatch } = useCart();

  // If the cart is empty, show a friendly message and a link to shop.
  if (state.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl text-yellow-500 font-semibold mb-4 text-center">Your cart is empty! 🛒</h2>
        <Link to="/" className="text-slate-900 bg-yellow-400 px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition duration-300">
          Start Shopping
        </Link>
      </div>
    );
  }

  // Remove item from cart
  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  // Calculate the total price of all items
  const subtotal = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className='max-w-3xl mx-auto p-4 md:p-8 lg:p-12'>
      <h1 className='text-3xl sm:text-4xl font-extrabold text-yellow-300 mb-6 text-center'>Your Cart</h1>
      <div className='bg-slate-800 p-4 md:p-6 rounded-xl shadow-lg'>
        {/* Cart items list */}
        <div className='divide-y divide-gray-700'>
          {state.items.map((item) => (
            <div key={item.id} className='flex flex-col sm:flex-row items-start sm:items-center sm:justify-between py-4'>
              <div className='flex items-center mb-4 sm:mb-0 w-full sm:w-auto'>
                <img src={item.image} alt={item.name} className='w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md shadow-md mr-4 sm:mr-6' />
                <div className='flex-1'>
                  <h2 className='text-base md:text-lg font-semibold text-white md:mr-5'>{item.name}</h2>
                  <p className='text-sm text-gray-400 mt-1'>Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className='flex items-center justify-between w-full sm:w-auto mt-2 sm:mt-0'>
                <p className='text-base md:text-lg font-bold text-gray-400'>KES {item.price * item.quantity}</p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className='ml-6 text-red-500 hover:text-red-400 transition duration-300'
                  aria-label={`Remove ${item.name}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className='mt-6 pt-6 border-t border-gray-700 text-right'>
          <div className='flex justify-between items-center mb-4'>
            <span className='text-base md:text-lg font-semibold text-gray-300'>Subtotal</span>
            <span className='text-base md:text-xl font-bold text-gray-400'>KES {subtotal.toFixed(2)}</span>
          </div>
          
          <Link to='/checkout'>
            <button className='w-full bg-yellow-200 text-slate-900 py-3 rounded-lg font-extrabold text-lg tracking-wide hover:bg-yellow-300 transition duration-300 transform hover:scale-105'>
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Basket;