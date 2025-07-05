import React from 'react';
import { Link } from 'react-router-dom';

interface Subcategory {
  id: string;
  name: string;
}

interface SubcategoryCardsProps {
  subcategories: Subcategory[];
}

const SubcategoryCards: React.FC<SubcategoryCardsProps> = ({ subcategories }) => {
  return (
    <div className="py-6">
      <h2 className="text-xl font-semibold text-gray-100 mb-4">
        Browse by Subcategory
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {subcategories.map((sub) => (
          <Link
            key={sub.id}
            to={`/subcategories/${sub.id}`}
            className="group bg-yellow-300/90 hover:bg-yellow-400 text-gray-900 rounded-xl p-6 shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
          >
            <h3 className="text-lg font-bold mb-1 group-hover:underline">
              {sub.name}
            </h3>
            <p className="text-sm text-gray-800 group-hover:text-gray-900">
              View books in this subcategory →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryCards;
