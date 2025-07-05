import React from 'react';
import CategoryHeader from '../../components/categories/educational-books/CategoryHeader';
import SubcategoryCards from '../../components/categories/educational-books/SubcategoryCards';
import { useSubcategories } from '../../components/categories/hooks/useSubcategories';

const EducationalBooks: React.FC = () => {
  const { subcategories, loading, error } = useSubcategories('Educational Books');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-4">
      <CategoryHeader title="Educational Books" />
      <SubcategoryCards subcategories={subcategories} />
    </div>
  );
};

export default EducationalBooks;
