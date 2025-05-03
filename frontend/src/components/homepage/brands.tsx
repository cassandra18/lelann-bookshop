import React from 'react';
import { motion } from 'framer-motion';

interface BrandCardProps {
  image: string;
}

const BrandCard: React.FC<BrandCardProps> = ({ image }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center p-2 bg-white/10 backdrop-blur-md rounded-xl shadow-sm border border-white/10 transition-transform"
  >
    <img src={image} alt="brand" className="max-h-full max-w-full object-contain" />
  </motion.div>
);

const Brands: React.FC = () => {
  const brands = [
    { image: '/images/mng.png' },
    { image: '/images/kartasi.png' },
    { image: '/images/crayola.png' },
    { image: '/images/pelikan.png' },
    { image: '/images/guaca.png' },
    { image: '/images/oxford.png' },
    { image: '/images/bic.png' },
    { image: '/images/mentor.png' },
    { image: '/images/spotlight.png' },
    { image: '/images/ladybird.png' },
    { image: '/images/queenex.png' },
  ];

  return (
    <section className="relative bg-[#00293B] text-white overflow-hidden py-20 px-4">
      {/* Wavy Top SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180" style={{ height: '80px' }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#CCE3EB" d="M0,32 C360,0 1080,80 1440,32 L1440,80 L0,80 Z" />
        </svg>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold text-center text-yellow-300 mb-8">
        🤝 Trusted Brands
      </h1>

      <p className="text-center text-gray-300 mb-12 max-w-xl mx-auto">
        Lelann proudly partners with globally trusted and loved brands to bring you the best in books, art supplies, stationery, and more.
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-6 justify-items-center max-w-7xl mx-auto">
        {brands.map((brand, idx) => (
          <BrandCard key={idx} image={brand.image} />
        ))}
      </div>
    </section>
  );
};

export default Brands;
