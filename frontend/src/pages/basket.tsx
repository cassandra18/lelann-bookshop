import React from 'react';
import { useCart } from '../components/cart-functionality';
import { Link } from 'react-router-dom';

const  Basket: React.FC = () => {
    const { state, dispatch } = useCart();

    if (state.items.length === 0) {
        return <h2>Your cart is empty</h2>;
    }

    // Remove item from cart
    const handleRemoveItem = (id: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };


    return (
        <div className='max-w-4xl mx-auto p-4'>
            <h1 className='text-3xl font-bold text-sunset mb-4'>Checkout</h1>
            <div className='mt-4'>
                {state.items.map((item) => (
                    <div key={item.id} className='flex items-center justify-between border-b border-sunset-transparent py-2'>
                        <img src={item.image} alt={item.name} className='w-16 h-16 object-cover mr-6' />
                        <div className='flex-grow'>
                            <h2 className='text-lg font-bold'>{item.name}</h2>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <p className='text-lg font-bold text-slate-400 mr-6'>KES {item.price * item.quantity}</p>
                        <button onClick={() => handleRemoveItem(item.id)} className='text-red-500 hover:text-red-700 font-bold'>Remove</button>
                    </div>
                ))}
            </div>
            <div className='mt-4 text-right'>
                <h2 className='text-lg font-bold'>Total: KES {state.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h2>
                <Link to='/checkout/'>
                <button className='bg-sunset text-prussian-blue py-2 px-4 rounded mt-4'>Proceed to checkout</button>
                </Link>
            </div>
        </div>
    );
}

export default Basket;