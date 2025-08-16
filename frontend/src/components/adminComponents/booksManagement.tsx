import React from "react";
import { Book } from "../types/BookTypes";
import ProductList from "./Product/ProductList";

type BooksManagementProps = {
  books: Book[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
};

const BooksManagement: React.FC<BooksManagementProps> = ({
  books,
  loading,
  onAdd,
  onEdit,
  onDelete,
}) => (
  <ProductList
    products={books}
    loading={loading}
    onAdd={onAdd}
    onEdit={onEdit}
    onDelete={onDelete}
  />
);

export default BooksManagement;