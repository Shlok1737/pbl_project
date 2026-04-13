import { HashRouter as BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

function Nav() {
  const { user } = useAuth();
  return (
    <nav style={{ padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e5e7eb" }}>
      <Link to="/" style={{ fontWeight: "bold", fontSize: "1.2rem", color: "#4f46e5", textDecoration: "none" }}>UniConnect</Link>
      <div style={{ display: "flex", gap: "20px" }}>
        {user ? (
          <>
            <Link to="/search" style={navLink}>Find Peers</Link>
            <Link to="/profile" style={navLink}>Profile</Link>
          </>
        ) : (
          <>
            <Link to="/login" style={navLink}>Login</Link>
            <Link to="/signup" style={navLink}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const navLink = { textDecoration: "none", color: "#374151", fontWeight: "500" };

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;