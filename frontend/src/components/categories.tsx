import React from "react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  image: string;
  title: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ image, title, link }) => (
  <Link to={link}>
    <div className="border rounded-md shadow-lg bg-white  text-oxford-blue overflow-hidden w-28 md:w-28 lg:w-36 flex flex-col justify-between ml-1 lg:ml-2">
      <img
        src={image}
        alt={title}
        className="w-full h-32 md:h-28 lg:h-36 object-cover"
      />
      <div className="text-center bg-gray-400 p-2 md:p-2 lg:p-4">
        <h2 className="text-sm text-white lg:text-md font-semibold">{title}</h2>
      </div>
    </div>
  </Link>
);

const Categories: React.FC = () => {
  const categories = [
    { title: 'Stationaries', image: '/images/stationaries.jpeg', link: '/stationaries' },
    { title: 'School Books', image: '/images/educational-books.jpeg', link: '/school-books' },
    { title: 'Other books', image: '/images/other-books.jpeg', link: '/other-books' },
    { title: 'Art Supplies', image: '/images/art-supplies.jpeg', link: '/art-supplies' },
    { title: 'Toys & games', image: '/images/toys.jpeg', link: '/toys-games' },
    { title: 'Electronics', image: '/images/electronics.jpeg', link: '/electronics' },
    { title: 'Uniforms', image: '/images/uniforms.jpeg', link: '/uniforms' },
  ];

  return (
    <>
      <h1 className="text-4xl font-bold text-center mt-10 text-sunset">
        Shop by Category
      </h1>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-1 mt-10  mb-10">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              image={category.image}
              link={category.link}
            />
          ))}
        </div>
      </div>
      <div className="border-b  border-b-yellow-200 mb-5 w-3/4 mx-auto opacity-20"></div>
    </>
  );
};

export default Categories;
