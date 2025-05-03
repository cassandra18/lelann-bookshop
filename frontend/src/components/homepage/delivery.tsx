import React, { useEffect, useRef } from 'react';
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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ left: 0, behavior: 'auto' });
  }, []);

  return (
    <section className="relative bg-[#1e87b5] py-20 overflow-hidden text-white">
      {/* Top wave */}
      <div className="absolute top-0 left-0 w-full">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full">
          <path
            fill="#001D29"
            d="M0,64L80,64C160,64,320,64,480,53.3C640,43,800,21,960,21.3C1120,21,1280,43,1360,53.3L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-yellow-300 mb-6"
      >
        🚚 Delivery Options
      </motion.h1>

      <p className="text-center text-gray-300 text-lg mb-12 max-w-2xl mx-auto px-4">
        Choose the delivery method that best suits your needs. We offer flexible and reliable options to ensure your orders reach you smoothly.
      </p>

      <div
        ref={scrollRef}
        className="overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth snap-x snap-mandatory px-4"
      >
        <div className="flex gap-6 w-max md:justify-center md:w-full py-6 mb-3">
          {deliveryData.map((option, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md border border-yellow-200/20 rounded-3xl shadow-2xl hover:shadow-yellow-200/20 transition-all duration-300 w-72 flex-shrink-0 snap-start"
            >
              <img
                src={option.image}
                alt={option.alt}
                className="w-full h-48 object-cover rounded-t-3xl"
              />
              <div className="p-5 text-center">
                <h2 className="text-xl font-bold text-yellow-300 mb-2">{option.title}</h2>
                <p className="text-gray-200 text-sm leading-relaxed">{option.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
{/* Bottom wave */}
<div className="absolute bottom-0 left-0 w-full leading-none">
  <svg
    className="w-full h-[100px]"
    viewBox="0 0 1440 100"
    preserveAspectRatio="none"
  >
    <path
      fill="#001D29"
      d="M0,100 C480,0 960,100 1440,0 L1440,100 L0,100 Z"
    />
  </svg>
</div>

    </section>
  );
};

export default DeliveryOptions;
