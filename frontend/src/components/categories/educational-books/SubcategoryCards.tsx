import React from 'react';
import { Link } from 'react-router-dom';

interface Subcategory {
  id: string;
  name: string;
}

interface SubcategoryCardsProps {
  subcategories: Subcategory[];
}

const pastelColors = [
  'bg-rose-200',
  'bg-emerald-200',
  'bg-indigo-200',
  'bg-yellow-200',
  'bg-cyan-200',
];

const SubcategoryCards: React.FC<SubcategoryCardsProps> = ({ subcategories }) => {
  return (
    <div className="py-4">
      <h2 className="md:text-2xl text-xl font-semibold text-pink-200 mb-4 text-center">
        Browse by Subcategory
      </h2>

      <div className="flex overflow-x-auto gap-4 pb-2 px-1 hide-scrollbar">
        {subcategories.map((sub, index) => (
          <Link
            key={sub.id}
            to={`/subcategories/${sub.id}`}
            className={`min-w-[250px] ${pastelColors[index % pastelColors.length]} hover:brightness-105 text-gray-900 rounded-xl md:p-3 p-1 shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-[1.02]`}
          >
            <h3 className="text-base font-bold mb-1 group-hover:underline">
              {sub.name}
            </h3>
            <p className="text-xs text-gray-800 group-hover:text-gray-900">
              View books in this subcategory →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryCards;
