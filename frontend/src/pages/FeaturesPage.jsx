import { useNavigate, Link } from "react-router-dom";

/* ---------------- FEATURES DATA ---------------- */
const features = [
  {
    icon: "👤",
    title: "Role-Based Profiles",
    desc: "Different access for students, faculty, and administrators.",
  },
  {
    icon: "✅",
    title: "Proxy-Free Attendance",
    desc: "Secure and fraud-proof attendance system.",
    path: "/student-attendance",
  },
  {
    icon: "🔔",
    title: "Real-Time Notifications",
    desc: "Instant alerts for important campus updates.",
    path: "/notifications",
  },
  {
    icon: "📅",
    title: "Integrated Campus Calendar",
    desc: "All schedules in one smart calendar.",
    path: "/calendar",
  },
  {
    icon: "🤖",
    title: "AI Campus Chatbot",
    desc: "Instant answers to campus-related queries.",
    path: "/chatbot",
  },
  {
    icon: "📚",
    title: "Resource Booking System",
    desc: "Reserve campus resources easily.",
    path: "/resource-booking",
  },
  {
    icon: "💬",
    title: "Campus Collaboration",
    desc: "Forums, group chats, and hackathon collaboration.",
    path: "/campus-collaboration",
  },
  {
    icon: "📰",
    title: "Campus Live Feed",
    desc: "Stay updated with campus life.",
    path: "/live-feed",
  },
  {
    icon: "🏆",
    title: "Gamified Engagement",
    desc: "Earn rewards for participation and attendance.",
    path: "/gamification",
  },
];

export default function FeaturesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 pt-20 px-6">
      {/* HEADER */}
      <h1 className="text-center text-4xl font-bold text-slate-50 mb-12">
        Campus Connect – Features
      </h1>

      {/* FEATURE GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            onClick={() => f.path && navigate(f.path)}
            className={`
              bg-white/10 border border-white/10 rounded-xl p-8 shadow-md 
              transition-all duration-300 
              hover:bg-white/5 hover:scale-[1.04] hover:shadow-xl
              ${f.path ? "cursor-pointer hover:border-teal-400/50" : ""}
            `}
          >
            <div className="text-6xl mb-4">{f.icon}</div>
            <h2 className="text-xl font-semibold text-white mb-2">
              {f.title}
            </h2>
            <p className="text-slate-300 text-sm">{f.desc}</p>

            {/* small hint */}
            {f.path && (
              <p className="mt-3 text-xs text-teal-300">
                Click to open →
              </p>
            )}
          </div>
        ))}
      </div>

      {/* BACK BUTTON */}
     <div className="max-w-7xl mx-auto flex justify-center mt-16 pb-24">
  <Link
    to="/"
    className="
      inline-flex items-center gap-2
      px-7 py-3
      rounded-full
      bg-slate-900/80
      border border-teal-400/40
      text-teal-300 font-medium
      backdrop-blur-md
      shadow-lg
      hover:bg-teal-400 hover:text-slate-900
      hover:scale-105
      transition-all duration-300
    "
  >
    ← Back to Home
  </Link>
</div>


    </div>
  );
}
