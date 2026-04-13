const BASE = "https://uniconnect-hpdc.onrender.com/api";

export const api = {
  register: (data) =>
    fetch(`${BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  login: (data) =>
    fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  getProfile: (token) =>
    fetch(`${BASE}/profile/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),

  updateProfile: (token, data) =>
    fetch(`${BASE}/profile/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((r) => r.json()),

  match: (prompt) =>
    fetch("https://uniconnect-matcher.onrender.com/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    }).then((r) => r.json()),
};