import { useState, useEffect } from "react";
import { createSubcategory, fetchCategories } from "../api/entityAPI";

export default function SubcategoryForm() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch {
        setError("Failed to load categories");
      }
    };
    loadCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const result = await createSubcategory({ name, categoryId });

      if (result.error || result.message?.toLowerCase().includes("error")) {
        setError(result.message || "Failed to create subcategory.");
      } else {
        setMessage(result.message || "Subcategory created successfully.");
        setName("");
        setCategoryId("");
      }
    } catch {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-xl w-full max-w-md bg-white shadow"
    >
      <h2 className="text-xl font-semibold">Add Subcategory</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter subcategory name"
        className="border p-2 rounded w-full"
        required
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="border p-2 rounded w-full"
        required
      >
        <option value="">Select a category</option>
        {categories.map((cat: any) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Add Subcategory
      </button>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
