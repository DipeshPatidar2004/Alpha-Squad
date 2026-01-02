import { useState } from "react";

export default function StudentAttendance() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitAttendance = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch(
        "/api/attendance/mark",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setMessage(data.message);
      setCode("");
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">
        Student Attendance
      </h1>

      <form
        onSubmit={submitAttendance}
        className="bg-white/10 p-6 rounded-xl w-full max-w-sm"
      >
        <label className="block text-slate-300 mb-2">
          Enter Attendance Code
        </label>

       <input
  type="text"
  value={code}
  onChange={(e) => setCode(e.target.value.toUpperCase())}
  required
  className="w-full px-4 py-2 rounded-lg text-white placeholder-slate-300 bg-transparent mb-4"
  placeholder="Enter code (eg: AAFT)"
/>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg bg-teal-400 text-slate-900 font-semibold"
        >
          {loading ? "Submitting..." : "Mark Attendance"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-teal-300">{message}</p>
      )}

      {error && (
        <p className="mt-4 text-red-400">{error}</p>
      )}
    </div>
  );
}
