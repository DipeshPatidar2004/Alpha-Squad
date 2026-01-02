// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ allowedRole }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");

  // not logged in at all
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // specific role required (student / faculty / admin)
  if (allowedRole && role !== allowedRole) {
    // role mismatch → redirect based on actual role
    if (role === "student") return <Navigate to="/dashboard" replace />;
    if (role === "faculty") return <Navigate to="/faculty-dashboard" replace />;
    // agar admin hai ya kuch aur:
    return <Navigate to="/" replace />;
  }

  // otherwise render nested route
  return <Outlet />;
}