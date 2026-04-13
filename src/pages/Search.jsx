import { useState } from "react";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!prompt.trim()) return;
    if (!token) return navigate("/login");
    setLoading(true);
    setSearched(false);
    const res = await api.match(prompt);
    setResults(res.matches || []);
    setLoading(false);
    setSearched(true);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold text-indigo-600 text-center">Find a Peer</h2>
      <p className="text-center text-gray-500 mt-2 mb-8">
        Describe what you want to learn and we'll match you with the right student
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="e.g. I want to learn machine learning and Python"
          className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {loading && <p className="text-center text-gray-400">Finding your best matches...</p>}

        {searched && results.length === 0 && (
          <p className="text-center text-gray-400">No matches found. Try a different topic.</p>
        )}

        {results.map((r, i) => (
          <div key={i} className="p-5 bg-white rounded-2xl shadow flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-800 text-lg">{r.name}</p>
              <p className="text-sm text-indigo-600 mt-1">
                Can teach: <span className="font-medium">{r.matched_skill}</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Match score: {(r.score * 100).toFixed(0)}%
              </p>
            </div>

            <a
              href={`tel:${r.contact}`}
              className="text-sm px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
            >
              {r.contact}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}