import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface NewArrivalCardProps {
  image: string;
  name: string;
  author: { name: string };
  price: number;
  oldPrice?: number;
  discount?: number;
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

const NewArrivalCard: React.FC<NewArrivalCardProps & { index: number }> = ({
  image,
  name,
  author,
  price,
  oldPrice,
  discount,
  cta,
  description,
  index,
}) => (
  <motion.div
    className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] flex flex-col"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={cardVariants}
    custom={index}
  >
    {discount && (
      <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
        {discount}% OFF
      </div>
    )}
    <img
      src={image}
      alt={name}
      className="w-full mt-2 md:h-32 object-contain bg-white p-4"
    />
    <div className="p-4 flex flex-col justify-between h-full">
      <div>
        <h2 className="text-lg font-semibold text-selective-yellow">{name}</h2>
        <p className="text-sm text-gray-500 mb-1">{author?.name}</p>
        <p className="text-sm text-gray-500 line-clamp-2">
          {description || "Discover our newest picks, just landed in our store."}
        </p>
        {oldPrice ? (
          <div className="mt-2">
            <p className="text-sm text-gray-400 line-through">KES {oldPrice}</p>
            <p className="text-prussian-blue text-base md:text-lg font-semibold">KES {price}</p>
          </div>
        ) : (
          <p className="text-prussian-blue text-base md:text-lg font-semibold mt-2">KES {price}</p>
        )}
      </div>
      <button className="mt-4 bg-yellow-100 hover:bg-yellow-300 text-prussian-blue px-4 py-2 rounded-full font-medium transition duration-300 w-full">
        {cta}
      </button>
    </div>
  </motion.div>
);

const NewArrival: React.FC = () => {
  const [newArrivals, setNewArrivals] = useState<NewArrivalCardProps[]>([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products?newarrival=true");
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  return (
    <section className="py-10 px-4">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-yellow-300 mb-6">✨ Exciting New Arrivals</h1>
        <p className="text-white text-md md:text-lg">
          Be the first to explore our freshest picks! These new arrivals are hot off the shelves and ready to inspire.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {newArrivals.map((product, index) => (
          <NewArrivalCard
            key={product.name}
            index={index}
            name={product.name}
            author={product.author}
            price={product.price}
            oldPrice={product.oldPrice}
            discount={product.discount}
            image={product.image}
            cta={product.cta}
            description={product.description}
          />
        ))}
      </div>
    </section>
  );
};

export default NewArrival;
