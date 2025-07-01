import { useState } from "react";
import { createPublisher } from "../api/publisherAPI";

interface PublisherFormProps {
  onPublisherAdded?: () => void;
}

export default function PublisherForm({ onPublisherAdded }: PublisherFormProps) {
  const [newPublisher, setNewPublisher] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAddPublisher = async () => {
    setMessage("");
    setError("");

    if (!newPublisher.trim()) {
      setError("Publisher name cannot be empty.");
      return;
    }

    try {
      const result = await createPublisher({ name: newPublisher });
      setMessage(`✅ Publisher "${result.name}" created successfully.`);
      setNewPublisher("");

      // Notify parent
      if (onPublisherAdded) onPublisherAdded();
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "An unexpected error occurred.";
      setError(msg);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold text-yellow-300 mb-4">🏢 Add New Publisher</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter publisher name"
          value={newPublisher}
          onChange={(e) => setNewPublisher(e.target.value)}
          className="flex-1 px-4 py-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        <button
          onClick={handleAddPublisher}
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
