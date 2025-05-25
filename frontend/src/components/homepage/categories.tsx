import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface CategoryCardProps {
  image: string;
  title: string;
  link: string;
  emoji: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, link, emoji }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <Link to={link}>
      <div className="overflow-hidden rounded-2xl shadow-xl bg-white text-center w-36 md:w-40 lg:w-48 transform transition duration-300 hover:shadow-2xl">
        <img src={image} alt={title} className="w-full h-32 md:h-36 lg:h-40 object-cover" />
        <div className="bg-yellow-100 text-slate-700 p-2 lg:p-3">
          <h2 className="font-semibold text-sm md:text-base">
            {emoji} {title}
          </h2>
        </div>
      </div>
    </Link>
  </motion.div>
);

const Categories: React.FC = () => {
  const categories = [
    { title: 'Stationaries', emoji: '✏️', image: '/images/stationaries.jpeg', link: '/stationaries' },
    { title: 'Educational Books', emoji: '📚', image: '/images/educational-books.jpeg', link: '/educational-books' },
    { title: 'Other Books', emoji: '📖', image: '/images/other-books.jpeg', link: '/other-books' },
    { title: 'Art Supplies', emoji: '🎨', image: '/images/art-supplies.jpeg', link: '/art-supplies' },
    { title: 'Toys & Games', emoji: '🧸', image: '/images/toys.jpeg', link: '/toys-games' },
    { title: 'Electronics', emoji: '🔌', image: '/images/electronics.jpeg', link: '/electronics' },
  ];

  return (
    <>
      <motion.h1 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6 }}
      className="text-3xl md:text-5xl font-bold text-center my-10 text-yellow-300">🛍️ Shop by Category</motion.h1>

      <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-white max-w-xl mx-auto my-4 px-4"
        >
          Browse our wide range of products tailored for school, art, play, and tech—organized into easy-to-shop categories.
        </motion.p>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 my-10">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              image={category.image}
              link={category.link}
              emoji={category.emoji}
            />
          ))}
        </div>
      </div>
  </>
  );
};

export default Categories;
