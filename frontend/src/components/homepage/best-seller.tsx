import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface BestSellerCardProps {
  image: string;
  name: string;
  author: { name: string };
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
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
      ease: "easeOut",
    },
  }),
};

const BestSellerCard: React.FC<BestSellerCardProps & { index: number }> = ({
  image,
  name,
  author,
  price,
  rating,
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
        <p className="text-sm text-gray-500">{author.name}</p>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {description || "One of our most popular picks!"}
        </p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-prussian-blue text-base md:text-lg font-semibold">KES {price}</p>
          <div className="text-yellow-400 font-semibold text-sm flex items-center">
            {rating} <span className="ml-1">&#9733;</span>
          </div>
        </div>
      </div>
      <button className="mt-4 bg-yellow-100 hover:bg-yellow-300 text-prussian-blue px-4 py-2 rounded-full font-medium transition duration-300 w-full">
        {cta}
      </button>
    </div>
  </motion.div>
);

const BestSeller: React.FC = () => {
  const [bestSellers, setBestSellers] = useState<BestSellerCardProps[]>([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products?bestseller=true");
        setBestSellers(response.data);
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <section className="py-10 px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-yellow-300 mb-6">🔥 Best Sellers</h1>
        <p className="text-white text-md md:text-lg">
          Shop the books our customers can't get enough of! These best sellers are flying off the shelves.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {bestSellers.map((product, index) => (
          <BestSellerCard
            key={product.name}
            index={index}
            name={product.name}
            author={product.author}
            price={product.price}
            image={product.image}
            rating={product.rating}
            cta={product.cta}
            description={product.description}
          />
        ))}
      </div>
  </section>
  );
};

export default BestSeller;
