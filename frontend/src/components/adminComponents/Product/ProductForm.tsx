import React from "react";
import { useBookForm } from "./hooks/useBookForm";
import { BookFormFields } from "./forms/BookFormFields";
import { Book, BookFormData } from "../../types/BookTypes";

interface Props {
  book: Book | null;
  onSave: (data: BookFormData, imageFile: File | null) => Promise<void>;
  onClose: () => void;
  isSubmitting: boolean;
}

export default function BookForm({ book, onSave, onClose, isSubmitting }: Props) {
  const {
    formData,
    handleChange,
    categories,
    filteredSubcategories,
  } = useBookForm(
      book
    ? {
        ...book,
        price: book.price.toString(),
        oldPrice: book.oldPrice?.toString(),
        discount: book.discount?.toString(),
      }
    : undefined
);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imageFile = (formData as any).image as File | null ?? null;
    await onSave(formData, imageFile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <BookFormFields
        formData={formData}
        handleChange={handleChange}
        categories={categories}
        subcategories={filteredSubcategories}
      />

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {book ? "Update Book" : "Add Book"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
