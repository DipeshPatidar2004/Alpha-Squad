import { useState } from "react";

export default function TeacherAttendance() {
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const startAttendance = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "/api/attendance/start",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ durationSeconds: 30 }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to start");
      }

      setCode(data.code);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">
        Teacher Attendance Panel
      </h1>

      <button
        onClick={startAttendance}
        disabled={loading}
        className="px-6 py-3 rounded-full bg-teal-400 text-slate-900 font-semibold"
      >
        {loading ? "Starting..." : "Start Attendance"}
      </button>

      {code && (
        <div className="mt-6 text-center">
          <p className="text-slate-300">Share this code in class</p>
          <div className="text-5xl font-bold text-teal-300 mt-2">
            {code}
          </div>
          <p className="text-sm text-slate-400 mt-2">
            Valid for 30 seconds
          </p>
        </div>
      )}

      {error && (
        <p className="text-red-400 mt-4">{error}</p>
      )}
    </div>
  );
}
