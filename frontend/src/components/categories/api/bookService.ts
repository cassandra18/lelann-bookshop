export interface SelectedFilters {
  [key: string]: string[] | string | undefined;
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

export interface FetchProductsResponse {
  products: Product[];
  totalProducts: number;
  totalPages: number;
  currentPage: number;
}

export interface FilterOptionGroup {
  id: string;
  name: string;
}

export interface FilterOptions {
  [key: string]: FilterOptionGroup[];
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
  params.append("category_id", category_id);
  params.append("page", page.toString());

  for (const key in filters) {
    const value = filters[key];
    if (value) {
      if (Array.isArray(value)) {
        // Handle array values (e.g., subcategory_ids)
        value.forEach(item => params.append(key, item));
      } else {
        // Handle single string values (e.g., search)
        params.append(key, value);
      }
    }
  }

  const res = await fetch(`http://localhost:5000/api/products?${params.toString()}`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return await res.json();
};

// Fetch available filter options for a given category
export const fetchFilterOptions = async (
  category_id: string
): Promise<FilterOptions> => {
  const res = await fetch(`http://localhost:5000/api/filters?categoryId=${category_id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch filter options");
  }

  return await res.json();
};

export const fetchCategoryIdByName = async (categoryName: string): Promise<string | null> => {
  const res = await fetch(`http://localhost:5000/api/categories?name=${encodeURIComponent(categoryName)}`);
  
  if (!res.ok) {
    console.error("Failed to fetch category ID:", res.statusText);
    return null;
  }
  
  const data = await res.json();
  return data.id || null;
};