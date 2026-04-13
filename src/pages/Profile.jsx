import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [contact, setContact] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return navigate("/login");
    api.getProfile(token).then((data) => {
      setProfile(data);
      setContact(data.contact || "");
      setSkills(data.skills || []);
    });
  }, [token]);

  const addSkill = () => {
    const trimmed = newSkill.trim().toLowerCase();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill) => setSkills(skills.filter((s) => s !== skill));

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    await api.updateProfile(token, { contact, skills });
    setSaving(false);
    setMessage("Profile saved!");
    setTimeout(() => setMessage(""), 3000);
  };

  if (!profile) return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-600">My Profile</h2>
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="text-sm text-gray-400 hover:text-red-500 transition"
        >
          Logout
        </button>
      </div>

      <p className="text-lg font-semibold text-gray-700">{profile.name}</p>
      <p className="text-sm text-gray-400 mb-6">{profile.email}</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Contact Number</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="e.g. +91 9876543210"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Skills I Can Teach</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill()}
              placeholder="e.g. machine learning"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={addSkill}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
              >
                {skill}
                <button onClick={() => removeSkill(skill)} className="ml-1 text-indigo-400 hover:text-red-500">✕</button>
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>

        {message && <p className="text-center text-emerald-600 text-sm">{message}</p>}

        <button
          onClick={() => navigate("/search")}
          className="w-full py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition"
        >
          Find a Peer to Learn From →
        </button>
      </div>
    </div>
  );
}