// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Firebase Auth login
      const cred = await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      // 2️⃣ Get user profile from Firestore
      const userRef = doc(db, "users", cred.user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        throw new Error("User profile not found");
      }

      const userData = snap.data();

      // 3️⃣ Save auth state
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", userData.role);
      localStorage.setItem("userName", userData.name || "");

      window.dispatchEvent(new Event("auth-changed"));

      // 4️⃣ Redirect by role
      if (userData.role === "student") {
        navigate("/dashboard");
      } else if (userData.role === "faculty") {
        navigate("/faculty-dashboard");
      } else if (userData.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("LOGIN ERROR =>", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="max-w-md w-full bg-white/10 border border-white/20 rounded-2xl p-8 shadow-xl backdrop-blur-lg"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Campus Connect Login
        </h1>

        <p className="text-center text-slate-400 mb-6">
          Login using verified account
        </p>

        {error && (
          <p className="text-red-400 text-center mb-4">{error}</p>
        )}

        <input
          type="email"
          placeholder="University Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg bg-slate-800 text-white outline-none border border-white/10 focus:border-teal-400"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-3 rounded-lg bg-slate-800 text-white outline-none border border-white/10 focus:border-teal-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-teal-400 text-slate-900 font-semibold hover:bg-teal-300 transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-6 text-slate-400">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-teal-300 hover:underline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
