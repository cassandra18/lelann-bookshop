import { useState } from "react";
import { createCategory } from "../api/index";

export default function CategoryForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const result = await createCategory({ name });

      if (result.error || result.message?.toLowerCase().includes("error")) {
        setError(result.message || "Failed to create category.");
      } else {
        setMessage(result.message || "Category created successfully.");
        setName("");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-xl w-full max-w-md bg-white shadow"
    >
      <h2 className="text-xl font-semibold">Add Category</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter category name"
        className="border p-2 rounded w-full"
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Category
      </button>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
