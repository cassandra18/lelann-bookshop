import React from "react";
import { Link, useParams } from "react-router-dom";

interface Subcategory {
  id: string;
  name: string;
  category_id: string;
}

interface Props {
  subcategories: Subcategory[];
}

const FiltersSidebar: React.FC<Props> = ({ subcategories }) => {
  const { subcategoryId } = useParams<{ subcategoryId: string }>();

  return (
    <div className="w-1/4 pl-4 border-r border-gray-200">
      <h2 className="text-2xl font-bold mt-14 mb-6">Categories</h2>
      <ul className="space-y-2">
        <li>
          <Link to="/educational-books" className={!subcategoryId ? "text-yellow-500" : ""}>
            All Books
          </Link>
        </li>
        {subcategories.map((sub) => (
          <li key={sub.id}>
            <Link
              to={`/educational-books/${sub.id}`}
              className={subcategoryId === sub.id ? "text-yellow-500" : ""}
            >
              {sub.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FiltersSidebar;
