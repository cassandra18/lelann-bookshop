export interface SelectedFilters {
  authorIds?: string[];
  publisherIds?: string[];
  subcategoryIds?: string[];
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
  discount?: number;
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
): Promise<ProductApiResponse> => {
  const params = new URLSearchParams();
  params.append("categoryId", category_id);
  params.append("page", page.toString());

  if (filters.authorIds) {
    filters.authorIds.forEach(id => params.append("authorIds", id));
  }

  if (filters.publisherIds) {
    filters.publisherIds.forEach(id => params.append("publisherIds", id));
  }

  if (filters.subcategoryIds) {
    filters.subcategoryIds.forEach(id => params.append("subcategoryIds", id));
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
