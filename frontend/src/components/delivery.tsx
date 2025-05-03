import React from 'react';
import { motion } from 'framer-motion';

const deliveryData = [
  {
    title: 'Free Delivery',
    description: 'Enjoy free delivery on all orders above Ksh 2000. Convenient, fast, and at no extra cost!',
    image: '/images/free-delivery.jpeg',
    alt: 'Free delivery on orders above Ksh 2000',
  },
  {
    title: 'Pick Up at Branch',
    description: 'Order online and pick up your package at any of our convenient branch locations.',
    image: '/images/pick-up.jpeg',
    alt: 'Pick up at branch',
  },
  {
    title: 'International Delivery',
    description: 'We deliver worldwide! Get your items wherever you are across the globe.',
    image: '/images/international-delivery.jpeg',
    alt: 'International delivery',
  },
];

const DeliveryOptions: React.FC = () => {
  return (
    <>
      <h1 className='text-3xl md:text-4xl font-bold text-center mt-16 mb-6 text-sunset'>
        🚚 Delivery Options
      </h1>
      <p className='text-center text-gray-200 text-lg mb-10 max-w-2xl mx-auto px-1'>
        Choose the delivery method that best suits your needs. We offer flexible and reliable options to ensure your orders reach you smoothly.
      </p>

      {/* Scrollable cards on small screens */}
      <div className='overflow-x-auto px-4 mb-16 overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory'>
        <div className='flex gap-6 w-max md:justify-center md:w-full py-3'>
          {deliveryData.map((option, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className='bg-white w-72 flex-shrink-0 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-yellow-100'
            >
              <img
                src={option.image}
                alt={option.alt}
                className='w-full h-48 object-cover'
              />
              <div className='p-4 text-center'>
                <h2 className='text-xl font-semibold text-sunset-dark mb-2'>{option.title}</h2>
                <p className='text-gray-600 text-sm'>{option.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DeliveryOptions;
