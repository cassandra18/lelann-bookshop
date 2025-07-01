import { useState } from "react";
import { createAuthor } from "../api/entityAPI";

export default function AuthorForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const result = await createAuthor({ name });

      if (result.error || result.message?.toLowerCase().includes("error")) {
        setError(result.message || "Failed to create author.");
      } else {
        setMessage(result.message || "Author created successfully.");
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
      <h2 className="text-xl font-semibold">Add Author</h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter author name"
        className="border p-2 rounded w-full"
        required
      />

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Author
      </button>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
