import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchNames = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setNames(data.names);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch names");
    }
  };

  useEffect(() => {
    fetchNames();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Name cannot be empty");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
      } else {
        setName("");
        fetchNames();
      }
    } catch (err) {
      setError("Failed to submit name");
    }

    setLoading(false);
  };

  const handleClearAll = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setNames([]);
      } else {
        setError("Failed to clear names");
      }
    } catch (err) {
      setError("Failed to clear names");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow text-center">
      <h1 className="text-2xl font-bold mb-4">Hello Names</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="border p-2 w-full mb-2 rounded"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full mb-2"
      >
        {loading ? "Adding..." : "Submit"}
      </button>

      <button
        onClick={handleClearAll}
        disabled={loading || names.length === 0}
        className="bg-red-500 text-white px-4 py-2 rounded w-full mb-2"
      >
        {loading ? "Processing..." : "Clear All"}
      </button>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <ul className="text-left mt-4">
        {names.map((n, i) => (
          <li key={i} className="border-b py-1 flex justify-between">
            <span>{n.name}</span>
            <span className="text-gray-500 text-sm">
              {new Date(n.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
