// src/components/Layout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Layout() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState("");

  // localStorage -> state sync + "auth-changed" event listen
  useEffect(() => {
    const syncAuth = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const storedRole = localStorage.getItem("role");
      const storedName = localStorage.getItem("userName") || "";

      setIsLoggedIn(loggedIn);
      setRole(storedRole);
      setUserName(storedName);
    };

    syncAuth();
    window.addEventListener("auth-changed", syncAuth);

    return () => window.removeEventListener("auth-changed", syncAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");

    setIsLoggedIn(false);
    setRole(null);
    setUserName("");

    window.dispatchEvent(new Event("auth-changed"));
    navigate("/login");
  };

  const initial = userName?.trim()?.charAt(0)?.toUpperCase() || "S";

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {/* ✅ NAVBAR */}
      <header className="fixed top-0 inset-x-0 z-50 bg-slate-900/90 backdrop-blur-lg border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h2
            className="text-2xl font-bold text-teal-300 cursor-pointer"
            onClick={() => navigate("/")}
          >
            EduMantra
          </h2>

          <div className="hidden md:flex items-center gap-6">

          <button
            onClick={() => navigate("/")}
            className="hover:text-teal-300 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/features")}
            className="hover:text-teal-300 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
          >
            Features
          </button>

          <button
            onClick={() => navigate("/benefits")}
            className="hover:text-teal-300 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
          >
            Benefits
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="hover:text-teal-300 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200"
          >
            Dashboard
          </button>
            {isLoggedIn ? (
              <>
              {role === "student" && (
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-teal-400 text-slate-900 flex items-center justify-center font-bold shadow-md border border-white/20 cursor-pointer">
                      {initial}
                    </div>

                    <span className="text-sm text-teal-200 font-medium">
                      {userName || "Student"}
                    </span>
                  </div>
                )}
                {role === "faculty" && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-400 text-slate-900 flex items-center justify-center font-bold shadow-md border border-white/20 cursor-pointer">
                        {initial}
                      </div>
                      <span className="text-sm text-indigo-200 font-medium">
                        {userName || "Faculty"}
                      </span>
                    </div>
                  )}
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 text-xs border border-red-400 text-red-300 rounded-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-1.5 border border-teal-400 text-teal-300 rounded-full"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-1.5 bg-teal-400 text-slate-900 rounded-full font-semibold"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* ✅ PAGE CONTENT */}
      <main className="pt-24">
        <Outlet />
      </main>
    </div>
  );
}