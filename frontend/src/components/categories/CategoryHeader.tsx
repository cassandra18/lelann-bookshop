import React from 'react';

interface CategoryHeaderProps {
  title: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title}) => {
  return (
    <div className="w-full text-center py-3">
      <h1 className="md:text-4xl text-2xl font-bold text-yellow-300">
        📚 {title}
      </h1>
    </div>
  );
};

export default CategoryHeader;
