import React from 'react';
import { useCart } from './cart-functionality';

const Checkout: React.FC = () => {
    const { state } = useCart();

    if (state.items.length === 0) {
        return <h2>Your cart is empty</h2>;
    }
    console.log(state.items);
    console.log(state.items.map(item => item.image));

    return (
        <div className='max-w-4xl mx-auto p-4'>
            <h1 className='text-3xl font-bold text-sunset mb-4'>Checkout</h1>
            <div className='mt-4'>
                {state.items.map((item) => (
                    <div key={item.id} className='flex items-center justify-between border-b border-sunset-transparent py-2'>
                        <img src={item.image} alt={item.name} className='w-16 h-16 object-cover' />
                        <div className='flex-grow'>
                            <h2 className='text-lg font-bold'>{item.name}</h2>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <p className='text-lg font-bold text-slate-400'>KES {item.price * item.quantity}</p>
                    </div>
                ))}
            </div>
            <div className='mt-4 text-right'>
                <h2 className='text-lg font-bold'>Total: KES {state.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h2>
                <button className='bg-sunset text-white py-2 px-4 rounded mt-4'>Proceed to checkout</button>
            </div>
        </div>
    );
}

export default Checkout;