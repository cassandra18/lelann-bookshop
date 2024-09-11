import React from 'react';

const DeliveryOptions: React.FC = () => {
    return (
        <>
        <h1 className='text-3xl font-bold text-center mt-10 text-sunset'>Delivery Options</h1>
        <div className='flex justify-center gap-4 w-3/4 my-10 mx-auto'>
            {/* Free delivery */}
            <div  className='w-1/2 '>
                <img
                    src='/images/free-delivery.jpeg'
                    alt='Free delivery on orders above ksh 2000'
                    className='w-full h-32  rounded-lg shadow-lg'
                />
            </div>

            {/* Pick up  at Branch */}
            <div  className='w-1/2 '>
                <img
                    src='/images/pick-up.jpeg'
                    alt='Pick up at branch'
                    className='w-full h-32  rounded-lg shadow-lg'
                />
            </div>

             {/* Internationa delivery */}
             <div  className='w-1/2 '>
                <img
                    src='/images/international-delivery.jpeg'
                    alt='international delivery'
                    className='w-full h-32  rounded-lg shadow-lg'
                />
            </div>
        </div>

         <div className='border-b  border-b-yellow-200 mb-5 w-3/4 mx-auto opacity-20'>
        </div>

        </>
    )
}

export default DeliveryOptions;