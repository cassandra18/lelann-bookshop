import { useState } from "react";
import { createEntity } from "../api/entityAPI";

interface CategoryFormProps {
  onCategoryAdded?: () => void;
}

export default function CategoryForm({ onCategoryAdded }: CategoryFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAddCategory = async () => {
    setMessage("");
    setError("");

    if (!name.trim()) {
      setError("Category name cannot be empty.");
      return;
    }

    try {
      const result = await createEntity("categories", { name });
      setMessage(`✅ Category "${result.name}" created successfully.`);
      setName("");
      if (onCategoryAdded) onCategoryAdded();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "An error occurred.");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold text-yellow-300 mb-4">➕ Add New Category</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-2 rounded bg-gray-900 text-white"
        />
        <button
          onClick={handleAddCategory}
          className="bg-yellow-300 text-black px-4 py-2 rounded font-semibold"
        >
          Add
        </button>
      </div>
      {message && <p className="text-green-400 mt-2">{message}</p>}
      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
}
