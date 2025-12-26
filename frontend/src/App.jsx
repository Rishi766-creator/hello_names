import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000/api/names";

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
         {error && <p className="text-red-500 mb-2">{error}</p>}

      <ul className="text-left mt-4">
        {names.map((n, i) => (
          <li key={i} className="border-b py-1">
            {n} 
          </li>
        ))}
      </ul>
    </div>
  );
}
