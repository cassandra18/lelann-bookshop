export interface SelectedFilters {
  author_ids?: string[];
  publisher_ids?: string[];
  subcategory_ids?: string[];
  search?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  company: string;
  condition: string;
  stock?: number;
  subject?: string;
  grade?: string;
  format?: string;
  isbn?: string;
  edition?: string;
  language?: string;
  pages?: number;
  yearPublished?: number;
  curriculum?: string;
  level?: string;
  availability?: boolean;
  rating?: number;
  featured: boolean;
  bestseller: boolean;
  newarrival: boolean;
  wishlist: boolean;
  promotion: boolean;
  oldPrice?: number;
  author?: {
    id: string;
    name: string;
  };
  publisher?: {
    id: string;
    name: string;
  };
  subcategory: {
    id: string;
    name: string;
  };
}

export interface FilterOptions {
  authors: { id: string; name: string }[];
  publishers: { id: string; name: string }[];
  subcategories: { id: string; name: string }[];
}

export interface ProductApiResponse {
  products: Product[];
  totalPages: number;
  totalProducts: number;
}

/**
 * Fetch books using selected filters and pagination.
 */
export const fetchProducts = async (
  category_id: string,
  filters: SelectedFilters = {},
  page: number = 1
): Promise<Product[]> => {
  const params = new URLSearchParams();
  params.append("category_id", category_id);
  params.append("page", page.toString());

  if (filters.author_ids) {
    filters.author_ids.forEach(id => params.append("author_id", id));
  }

  if (filters.publisher_ids) {
    filters.publisher_ids.forEach(id => params.append("publisher_id", id));
  }

  if (filters.subcategory_ids) {
    filters.subcategory_ids.forEach(id => params.append("subcategory_id", id));
  }

  if (filters.search) {
    params.append("search", filters.search);
  }

  const res = await fetch(`http://localhost:5000/api/products?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return await res.json();
};

/**
 * Fetch filter options (authors, publishers, subcategories) for a given category.
 */
export const fetchFilterOptions = async (
  category_id: string
): Promise<FilterOptions> => {
  const res = await fetch(`http://localhost:5000/api/filters?categoryId=${category_id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch filter options");
  }

  return await res.json();
};
