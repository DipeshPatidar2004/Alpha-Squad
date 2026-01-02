import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

/* ---------- STUDENT DASHBOARD ---------- */
const DashboardPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [error, setError] = useState("");

  // 🔔 Fetch notifications from backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoadingNotes(true);
        setError("");

        const res = await fetch(`/api/notifications/list`);
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to load notifications");
        }

        setNotifications(data.notes || []);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load notifications");
      } finally {
        setLoadingNotes(false);
      }
    };

    fetchNotifications();
  }, []);
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 px-8 py-14">
      <h1 className="text-4xl font-bold text-white mb-10">
        Student Dashboard
      </h1>
      {/* 🔔 REAL-TIME NOTIFICATIONS SECTION */}
      <div className="mb-10 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">🔔</span>
          <div>
            <h2 className="text-xl font-semibold text-white">
              Real-Time Notifications
            </h2>
            <p className="text-slate-400 text-sm">
              Alerts from your faculty and campus administration.
            </p>
          </div>
        </div>

        {loadingNotes && (
          <p className="text-slate-300 text-sm">Loading notifications...</p>
        )}

        {error && (
          <p className="text-red-400 text-sm mb-2">
            {error}
          </p>
        )}

        {!loadingNotes && !error && notifications.length === 0 && (
          <p className="text-slate-400 text-sm">
            No notifications yet. Stay tuned!
          </p>
        )}

        {/* Notifications list */}
        <div className="mt-3 space-y-3 max-h-64 overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div
              key={n._id}
              className="bg-slate-900/70 border border-white/10 rounded-xl px-4 py-3"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold text-teal-300 text-sm md:text-base">
                    {n.title}
                  </h3>
                  <p className="text-slate-200 text-sm mt-1">
                    {n.message}
                  </p>
                </div>
                <span className="text-[10px] md:text-xs text-slate-400 whitespace-nowrap">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* MY SCHEDULE */}
        <Card
          icon="📅"
          title="My Schedule"
          desc="View class timetable and exams."
          onClick={() => navigate("/schedule")}
        />

        {/* ✅ ATTENDANCE (CONNECTED) */}
        <Card
          icon="✅"
          title="Attendance"
          desc="Mark proxy-free attendance."
          onClick={() => navigate("/student-attendance")}
        />

        {/* CAMPUS LIVE FEED */}
        <Card
          icon="📰"
          title="Campus Live Feed"
          desc="See updates from clubs, faculty, and students."
          onClick={() => navigate("/live-feed")}
        />

      </div>
    </div>
  );
};

/* ---------- CARD COMPONENT ---------- */
const Card = ({ icon, title, desc, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white/10 border border-white/10 rounded-2xl p-6 shadow-lg
                transition-all cursor-pointer
                hover:-translate-y-2 hover:shadow-2xl hover:bg-white/20`}
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h2 className="text-xl font-semibold text-white mb-2">
      {title}
    </h2>
    <p className="text-slate-300">{desc}</p>
  </div>
);

export default DashboardPage;
