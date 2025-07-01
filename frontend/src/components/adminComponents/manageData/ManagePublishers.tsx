import { useEffect, useState } from "react";
import {
  fetchPublishers,
  deletePublisher,
  Publisher,
} from "../api/publisherAPI";
import PublisherForm from "../forms/Publisher";

const ManagePublishers = () => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPublishers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchPublishers();
      setPublishers(data);
    } catch (err: any) {
      setError(err.message || "Failed to load publishers.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePublisher = async (id: string) => {
    try {
      await deletePublisher(id);
      setPublishers((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete publisher.");
    }
  };

  useEffect(() => {
    loadPublishers();
  }, []);

  return (
    <div className="space-y-6">
      {/* Form to Add Publisher */}
      <PublisherForm onPublisherAdded={loadPublishers} />

      {/* List of Publishers */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-yellow-300 mb-4">
          🏢 Publisher List
        </h2>

        {loading ? (
          <p className="text-white">Loading publishers...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : publishers.length === 0 ? (
          <p className="text-white">No publishers added yet.</p>
        ) : (
          <table className="w-full text-left table-auto text-white">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="p-2">#</th>
                <th className="p-2">Name</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {publishers.map((publisher, index) => (
                <tr
                  key={publisher.id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{publisher.name}</td>
                  <td className="p-2 space-x-2">
                    <button className="text-yellow-300 hover:text-yellow-400">✏️</button>
                    <button
                      onClick={() => handleDeletePublisher(publisher.id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManagePublishers;
