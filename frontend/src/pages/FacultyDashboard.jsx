import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const notificationRef = useRef(null);

  // Notification state
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingList, setLoadingList] = useState(false);

  /* ---------------- FETCH NOTIFICATIONS ---------------- */
  const fetchNotifications = async () => {
    try {
      setLoadingList(true);
      const res = await fetch(`${API_BASE}/api/notifications/list`);
      const data = await res.json();
      if (res.ok && data.success) {
        setNotifications(data.notes || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  /* ---------------- CREATE NOTIFICATION ---------------- */
  const handleCreateNotification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch(`${API_BASE}/api/notifications/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          message,
          createdBy: localStorage.getItem("userName") || "Faculty",
          roleAllowed: "student",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed");
      }

      setTitle("");
      setMessage("");
      setStatus("✅ Notification sent!");
      fetchNotifications();
    } catch (err) {
      setStatus(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE NOTIFICATION ---------------- */
  const handleDeleteNotification = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/notifications/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error("Failed");
      }

      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- SCROLL TO ANNOUNCEMENTS ---------------- */
  const scrollToAnnouncements = () => {
    notificationRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 px-6 py-14">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-2">
          Faculty Dashboard
        </h1>
        <p className="text-slate-400">
          Manage classes, attendance, announcements, and student engagement.
        </p>
      </div>

      {/* DASHBOARD GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <DashboardCard
          icon="📅"
          title="Class Schedule"
          desc="Create and manage class timetable."
          color="from-sky-500 to-blue-600"
          onClick={() => navigate("/faculty/add-schedule")}
        />

        <DashboardCard
          icon="✅"
          title="Proxy-Free Attendance"
          desc="Mark attendance using secure verification."
          color="from-emerald-500 to-teal-600"
          onClick={() => navigate("/teacher-attendance")}
        />

        <DashboardCard
          icon="📢"
          title="Announcements"
          desc="Post announcements for students."
          color="from-rose-500 to-pink-600"
          onClick={scrollToAnnouncements}
        />

        <DashboardCard
          icon="📊"
          title="Student Performance"
          desc="View analytics with demo data."
          color="from-indigo-500 to-purple-600"
          onClick={() => navigate("/faculty/student-performance")}
        />

        <DashboardCard
          icon="💬"
          title="Discussions & Queries"
          desc="Forums, chats, and project collaboration."
          color="from-amber-500 to-orange-600"
          onClick={() => navigate("/collaboration")}
        />

        <DashboardCard
          icon="📰"
          title="Campus Live Feed"
          desc="Campus-wide updates and events."
          color="from-cyan-500 to-sky-600"
          onClick={() => navigate("/live-feed")}
        />
      </div>

      {/* ANNOUNCEMENTS SECTION */}
      <div
        ref={notificationRef}
        className="max-w-3xl mx-auto mt-16 bg-white/5 border border-white/10 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-semibold mb-4">🔔 Real-Time Notifications</h2>

        {status && <p className="text-sm text-teal-300 mb-3">{status}</p>}

        <form onSubmit={handleCreateNotification} className="space-y-4 mb-6">
          <input
            required
            placeholder="Notification title"
            className="w-full p-3 rounded bg-slate-900 border border-white/15"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            required
            rows={3}
            placeholder="Message"
            className="w-full p-3 rounded bg-slate-900 border border-white/15"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            disabled={loading}
            className="px-6 py-2 rounded-xl bg-teal-400 text-slate-900 font-semibold hover:bg-teal-300"
          >
            {loading ? "Sending..." : "Send Notification"}
          </button>
        </form>

        {loadingList && <p className="text-sm">Loading...</p>}
        {notifications.length === 0 && !loadingList && (
          <p className="text-sm text-slate-400">No notifications yet.</p>
        )}

        <div className="space-y-2">
          {notifications.map((n) => (
            <div
              key={n._id}
              className="flex justify-between items-start bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3"
            >
              <div>
                <p className="font-semibold text-teal-300">{n.title}</p>
                <p className="text-sm text-slate-200">{n.message}</p>
              </div>
              <button
                onClick={() => handleDeleteNotification(n._id)}
                className="text-xs border border-red-400 text-red-300 px-3 py-1 rounded-full"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------------- CARD COMPONENT ---------------- */

const DashboardCard = ({ icon, title, desc, color, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-7 shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all"
  >
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${color} mb-4`}
    >
      {icon}
    </div>
    <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
    <p className="text-sm text-slate-300">{desc}</p>
  </div>
);

export default FacultyDashboard;
