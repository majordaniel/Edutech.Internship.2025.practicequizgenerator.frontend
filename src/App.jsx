import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/login.jsx";
import Register from "./pages/auth/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Router>
      <Routes>
        {/* Default redirect */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
          }
        />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
