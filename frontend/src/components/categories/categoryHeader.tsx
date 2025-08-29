import React from 'react';

interface CategoryHeaderProps {
  title: string;
  emoji: string;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title, emoji }) => {
  return (
    <div className="w-full text-center py-3">
      <h1 className="md:text-4xl text-2xl font-bold text-yellow-300">
        {emoji} {title}
      </h1>
    </div>
  );
};

export default CategoryHeader;