import { useEffect, useState } from "react";
import {
  fetchAuthors,
  deleteAuthor,
  Author,
} from "../api/authorAPI";
import AuthorForm from "../forms/Author";

const ManageAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadAuthors = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchAuthors();
      setAuthors(data);
    } catch (err: any) {
      setError(err.message || "Failed to load authors.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAuthor = async (id: string) => {
    try {
      await deleteAuthor(id);
      setAuthors((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      alert(err.message || "Failed to delete author.");
    }
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  return (
    <div className="space-y-6">
      {/* Form to Add Author */}
      <AuthorForm onAuthorAdded={loadAuthors} />

      {/* List of Authors */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-yellow-300 mb-4">
          📋 Author List
        </h2>

        {loading ? (
          <p className="text-white">Loading authors...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : authors.length === 0 ? (
          <p className="text-white">No authors added yet.</p>
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
              {authors.map((author, index) => (
                <tr
                  key={author.id}
                  className="border-b border-gray-700 hover:bg-gray-700"
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{author.name}</td>
                  <td className="p-2 space-x-2">
                    <button className="text-yellow-300 hover:text-yellow-400">✏️</button>
                    <button
                      onClick={() => handleDeleteAuthor(author.id)}
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

export default ManageAuthors;
