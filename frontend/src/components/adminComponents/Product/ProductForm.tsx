import React, { useState } from "react";
import { useBookForm } from "./hooks/useBookForm";
import { BookFormFields } from "./forms/BookFormFields";
import { Book, BookFormData } from "../../types/BookTypes";

interface Props {
  book: Book | null;
  onSave: (data: BookFormData, imageFile: File | null) => Promise<void>;
  onClose: () => void;
  isSubmitting: boolean;
}

export default function BookForm({
  book,
  onSave,
  onClose,
  isSubmitting,
}: Props) {
  const {
    formData,
    handleChange,
    categories,
    filteredSubcategories,
    authors,
    publishers,
  } = useBookForm(
    book
      ? {
          ...book,
          price: book.price,
          oldPrice: book.oldPrice,
        }
      : undefined
  );

  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  setError(null)

  try {
       const imageFile = ((formData as any).image as File | null) ?? null;
      await onSave(formData, imageFile);
      console.log("Form data to be submitted:", formData);
    } catch (err: any) {
      console.error("Failed to save book:", err);
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong while saving the product."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <BookFormFields
        formData={formData}
        handleChange={handleChange}
        categories={categories}
        subcategories={filteredSubcategories}
        authors={authors}
        publishers={publishers}
      />

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-yellow-300 text-prussian-blue font-semibold hover:bg-yellow-100 px-4 py-2 rounded ${
            isSubmitting ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting
            ? book
              ? "Updating..."
              : "Adding..."
            : book
            ? "Update Product"
            : "Add Product"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="bg-white text-red-500 font-semibold px-4 py-2 rounded hover:bg-yellow-100 transition"
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
