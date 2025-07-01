import { useState } from "react";
import { createAuthor } from "../api/authorAPI";


interface AuthorFormProps {
  onAuthorAdded?: () => void;
}


export default function AuthorForm({ onAuthorAdded }: AuthorFormProps) {
  const [newAuthor, setNewAuthor] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAddAuthor = async () => {
    setMessage("");
    setError("");

    if (!newAuthor.trim()) {
      setError("Author name cannot be empty.");
      return;
    }

    try {
      const result = await createAuthor({ name: newAuthor });
      setMessage(`✅ Author "${result.name}" created successfully.`);
      setNewAuthor("");

      // Refresh parent list
      if (onAuthorAdded) onAuthorAdded();
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "An unexpected error occurred.";
      setError(msg);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold text-yellow-300 mb-4">➕ Add New Author</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter author name"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
          className="flex-1 px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        <button
          onClick={handleAddAuthor}
          className="bg-yellow-300 text-black px-4 py-2 rounded font-semibold hover:bg-yellow-400"
        >
          Add
        </button>
      </div>

      {message && <p className="text-green-400 mt-2">{message}</p>}
      {error && <p className="text-red-400 mt-2">{error}</p>}
    </div>
  );
}