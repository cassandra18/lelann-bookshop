// Represents a single book (product) in the educational books section
export interface Book {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    discount?: number;
    condition: "NEW" | "USED" | "USED_GOOD" | "USED_VERY_GOOD" | "USED_ACCEPTABLE";
    subject?: string;
    image: string;
    description: string;
    featured: boolean;
    bestseller: boolean;
    newarrival: boolean;
    promotion: boolean;
    author?: Author;
    publisher?: Publisher;
    subcategory: Subcategory;
  }
  
  // Author details (optional)
  export interface Author {
    id: string;
    name: string;
    email: string;
  }
  
  // Publisher details (optional)
  export interface Publisher {
    id: string;
    name: string;
    email: string;
  }
  
  // Subcategory that a book belongs to
  export interface Subcategory {
    id: string;
    name: string;
  }
  
  // Filters that can be applied by the user
  export interface BookFilters {
    subcategoryIds?: string[];
    condition?: Book["condition"][];
    subject?: string;
    authorIds?: string[];
    publisherIds?: string[];
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
    bestseller?: boolean;
    newarrival?: boolean;
    promotion?: boolean;
    searchTerm?: string;
  }
  
  // API response with pagination
  export interface PaginatedBooksResponse {
    books: Book[];
    total: number;
    page: number;
    totalPages: number;
  }
  