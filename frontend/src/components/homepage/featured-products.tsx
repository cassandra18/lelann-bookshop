import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

interface FeaturedProductCardProps {
  image: string;
  name: string;
  price: string;
  cta: string;
  description?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const FeaturedProductCard: React.FC<FeaturedProductCardProps & { index: number }> = ({
  image,
  name,
  price,
  cta,
  description,
  index,
}) => (
  <motion.div
    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] flex flex-col"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={cardVariants}
    custom={index}
  >
    <img
      src={image}
      alt={name}
      className="w-full mt-2 md:h-32 object-contain bg-white p-4"
    />
    <div className="p-4 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-lg font-semibold text-selective-yellow">{name}</h2>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {description || 'Explore our curated collection of top-selling and trending items.'}
        </p>
        <p className="text-prussian-blue text-base md:text-lg font-semibold mt-2">KES {price}</p>
      </div>
      <button className="mt-4 bg-yellow-100 hover:bg-yellow-300 text-prussian-blue px-4 py-2 rounded-full font-medium transition duration-300 w-full">
        {cta}
      </button>
    </div>
  </motion.div>
);

const FeaturedProducts: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProductCardProps[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products?featured=true');
        setFeaturedProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-yellow-300 mb-6">🌟 Featured Products</h1>
        <p className="text-white text-md md:text-lg">
          Discover our handpicked selection of popular items loved by our customers. Whether you're shopping for school, home, or creative projects, these featured products are a great place to start.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {featuredProducts.map((product, index) => (
          <FeaturedProductCard
            key={product.name}
            index={index}
            name={product.name}
            price={product.price}
            image={product.image}
            cta={product.cta}
            description={product.description}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
