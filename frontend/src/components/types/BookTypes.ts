// Represents a single book (product) in the educational books section
export interface Book {
    id: string;
    name: string;
    price: number;
    cta?: string;
    oldPrice?: number;
    discount?: number;
    condition: "NEW" | "USED" | "USED_GOOD" | "USED_VERY_GOOD" | "USED_ACCEPTABLE";
    subject?: string;
    image: string;
    description: string;
    company: string;
    featured: boolean;
    bestseller: boolean;
    newarrival: boolean;
    promotion: boolean;
    wishlist: boolean;
    author?: Author;
    author_id?: string;
    publisher_id?: string;
    publisher?: Publisher;
    subcategory_id: string;
    subcategory: Subcategory;
    createdAt: string;
    updatedAt: string;
  }

  export interface BookFormData {
  name: string;
  price: string;
  cta?: string;
  oldPrice?: string;
  discount?: string;
  condition: "NEW" | "USED" | "USED_GOOD" | "USED_VERY_GOOD" | "USED_ACCEPTABLE";
  subject?: string;
  description: string;
  company: string;
  featured: boolean;
  bestseller: boolean;
  newarrival: boolean;
  promotion: boolean;
  wishlist: boolean;
  author_id?: string;
  publisher_id?: string;
  subcategory_id: string;
}

  // Props for BookForm component
export interface BookFormProps {
  book: Book | null;
  onClose: () => void;
  onSave: (bookData: Omit<Book, 'id' | 'createdAt' | 'updatedAt' | 'image' | 'author' | 'publisher' | 'subcategory'>, imageFile: File | null) => void;
  isSubmitting: boolean;
}

  // User details
  export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // Author details (optional)
  export interface Author {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // Publisher details (optional)
  export interface Publisher {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // Subcategory that a book belongs to
  export interface Subcategory {
    id: string;
    name: string;
    parent_id?: string;
    category_id: string;
    createdAt: string;
    updatedAt: string;
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
  
  // Mock Data (for Orders and Sales, as no backend endpoints were provided)
export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
  items: { bookId: string; title: string; quantity: number }[];
}

