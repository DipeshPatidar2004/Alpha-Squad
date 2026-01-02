// src/pages/RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Create Firebase user
      const cred = await createUserWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

      // 2️⃣ Set display name
      await updateProfile(cred.user, {
        displayName: name,
      });

      // 3️⃣ Store role in Firestore
      await setDoc(doc(db, "users", cred.user.uid), {
        name,
        email,
        role,
        createdAt: new Date(),
      });

      // 4️⃣ Redirect
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="bg-white/10 p-8 rounded-xl w-full max-w-md"
      >
        <h1 className="text-3xl text-white font-bold mb-4">
          Create an Account
        </h1>

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-3 p-3 rounded bg-slate-800 text-white"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 p-3 rounded bg-slate-800 text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-3 p-3 rounded bg-slate-800 text-white"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-4 p-3 rounded bg-slate-800 text-white"
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
        </select>

        <button
          disabled={loading}
          className="w-full bg-teal-400 text-black py-3 rounded font-semibold"
        >
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
    </div>
  );
}
