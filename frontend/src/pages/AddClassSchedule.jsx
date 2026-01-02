import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const AddClassSchedule = () => {
  const [subject, setSubject] = useState("");
  const [day, setDay] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [room, setRoom] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!subject || !day || !startTime || !endTime || !room) {
      setStatus("error");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/class-schedule/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({
          subject,
          day,
          startTime,
          endTime,
          room,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to add schedule");
      }

      setStatus("success");
      setSubject("");
      setDay("");
      setStartTime("");
      setEndTime("");
      setRoom("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950
                    px-4">

      <div className="w-full max-w-xl bg-white/5 backdrop-blur-xl
                      border border-white/10 rounded-3xl shadow-2xl p-8">

        {/* HEADER */}
        <div className="mb-8 flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center 
                          rounded-xl bg-teal-500/20 text-2xl">
            📅
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              Add Class Schedule
            </h1>
            <p className="text-sm text-slate-400">
              Create lectures, labs, and class timings
            </p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Subject Name"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900
                       border border-white/10 text-white
                       focus:outline-none focus:border-teal-400"
          />

          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900
                       border border-white/10 text-white
                       focus:outline-none focus:border-teal-400"
          >
            <option value="">Select Day</option>
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-900
                         border border-white/10 text-white"
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-900
                         border border-white/10 text-white"
            />
          </div>

          <input
            type="text"
            placeholder="Room / Lab"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-900
                       border border-white/10 text-white"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-3 rounded-2xl 
                       bg-teal-400 text-slate-900 font-semibold
                       hover:bg-teal-300 transition
                       disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Schedule"}
          </button>

          {/* STATUS */}
          {status === "success" && (
            <p className="mt-4 text-sm text-green-400 flex items-center gap-2">
              ✅ Class schedule added successfully
            </p>
          )}

          {status === "error" && (
            <p className="mt-4 text-sm text-red-400 flex items-center gap-2">
              ❌ Error adding schedule
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddClassSchedule;
