import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---------------------- UI CARDS ---------------------- */
const StatCard = ({ s }) => (
  <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center backdrop-blur-sm shadow-lg">
    <div className="text-4xl font-bold text-teal-300 mb-2">{s.value}</div>
    <div className="text-slate-300">{s.label}</div>
  </div>
);

const FeatureCard = ({ f }) => (
  <div className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-sm shadow-lg text-center hover:-translate-y-1 transition">
    <div className="text-4xl mb-4">{f.icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{f.title}</h3>
    <p className="text-slate-300 text-sm">{f.desc}</p>
  </div>
);

const BenefitCard = ({ b }) => (
  <div className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-sm shadow-lg text-center">
    <div className="text-4xl mb-4">{b.icon}</div>
    <h3 className="text-xl font-semibold text-white mb-2">{b.title}</h3>
    <p className="text-slate-300">{b.desc}</p>
  </div>
);

/* ---------------------- MAIN PAGE ---------------------- */
export default function EduForAllPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [now, setNow] = useState(new Date());
  const [showDemoPopup, setShowDemoPopup] = useState(false);

  /* ---------- DATA ---------- */
  const stats = [
    { label: "Active Students", value: "12K+" },
    { label: "Faculty Members", value: "650+" },
    { label: "Campus Events", value: "120+" },
    { label: "Resources Managed", value: "3K+" },
  ];

  // ✅ DIRECTLY FROM PROBLEM STATEMENT
 const features = [
  {
    icon: "👤",
    title: "Role-Based Profiles",
    desc: "Separate dashboards for students, faculty, and administrators with controlled access.",
  },
  {
    icon: "🔔",
    title: "Real-Time Notifications",
    desc: "Instant alerts for announcements, deadlines, exams, and campus events.",
  },
  {
    icon: "📅",
    title: "Integrated Campus Calendar",
    desc: "Classes, exams, activities & reminders in a single synchronized calendar.",
  },
  {
    icon: "✅",
    title: "Proxy-Free Attendance",
    desc: "Secure attendance using QR code, geo-fencing, or device-based verification to eliminate proxy.",
  },
  {
    icon: "📚",
    title: "Resource Booking System",
    desc: "Check availability and reserve library books, labs, or study rooms in real time.",
  },
  {
    icon: "💬",
    title: "Campus Collaboration",
    desc: "Discussion forums, group chats, and project matchmaking for assignments and hackathons.",
  },
  {
    icon: "📰",
    title: "Campus Live Feed",
    desc: "Live posts and updates from student clubs, faculty, and campus communities.",
  },
  {
    icon: "🏆",
    title: "Gamified Engagement",
    desc: "Earn badges and points for attendance, participation, and collaboration.",
  },
  {
  icon: "🤖",
  title: "AI Campus Assistant",
  desc: "Chatbot to answer student queries, guide navigation, explain schedules, and provide instant campus support.",
},
  
];


  const benefits = [
    {
      icon: "🎓",
      title: "Students",
      desc: "One app for schedules, alerts, collaboration, and academic resources.",
    },
    {
      icon: "👨‍🏫",
      title: "Faculty",
      desc: "Manage classes, communicate updates, and track student engagement easily.",
    },
    {
      icon: "🏫",
      title: "Administration",
      desc: "Centralized announcements, scheduling, and resource optimization.",
    },
    {
      icon: "📊",
      title: "Data-Driven Campus",
      desc: "Analytics-ready foundation for future scalability and insights.",
    },
  ];

  /* ---------- EFFECTS ---------- */
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const simulateProgress = () => {
    setProgress(0);
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(id);
          return 100;
        }
        return p + 10;
      });
    }, 200);
  };

  /* ---------- UI ---------- */
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="bg-gradient-to-br from-sky-500/20 to-teal-600/20 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          EduMantra

        </h1>

        <p className="text-lg md:text-xl text-slate-300 mt-4 mb-8 max-w-3xl mx-auto">
          A unified digital campus platform connecting students, faculty, and administrators eliminating information gaps and improving academic efficiency.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-3 rounded-full bg-teal-400 text-slate-900 font-semibold hover:bg-teal-300 transition"
          >
            Open Dashboard
          </button>

          <button
            onClick={() => setShowDemoPopup(true)}
            className="px-8 py-3 rounded-full border-2 border-teal-400 text-teal-300 hover:bg-teal-400/20 transition"
          >
            Watch Demo
          </button>
        </div>
      </section>

      {/* ---------------- STATS ---------------- */}
      <section className="py-16 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <StatCard key={i} s={s} />
          ))}
        </div>
      </section>

      {/* ---------------- FEATURES ---------------- */}
      <section className="py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Campus Connect – Core Features
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <FeatureCard key={i} f={f} />
          ))}
        </div>
      </section>

      {/* ---------------- BENEFITS ---------------- */}
      <section className="py-20 px-6 bg-slate-900/60">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Who Benefits?
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <BenefitCard key={i} b={b} />
          ))}
        </div>
      </section>

      {/* ---------------- DEMO SECTION ---------------- */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-white/10 border border-white/20 rounded-xl p-8">
          <div className="flex justify-between mb-4">
            <span className="font-semibold text-white">
              Resource Sync Demo
            </span>
            <span className="text-sm text-slate-400 font-mono">
              {now.toLocaleTimeString()}
            </span>
          </div>

          <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-teal-300 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-sm text-slate-300 mb-4">
            Simulating real-time resource booking & notification sync
          </p>

          <button
            onClick={simulateProgress}
            className="px-6 py-2 rounded-full bg-teal-400 text-slate-900 font-semibold hover:bg-teal-300 transition"
          >
            Simulate Sync
          </button>
        </div>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      {/* ---------------- FOOTER ---------------- */}
<footer className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-t border-white/10">
  <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-400">

    {/* LEFT */}
    <div>
      <h3 className="text-xl font-bold text-teal-300 mb-2">
        EduMantra
      </h3>
      <p className="text-sm leading-relaxed">
        A unified digital campus platform empowering students, faculty, and
        administrators through transparency, collaboration, and real-time
        connectivity.
      </p>
    </div>

    {/* CENTER */}
    <div>
      <h4 className="text-white font-semibold mb-3">References</h4>
      <ul className="text-sm space-y-2">
        <li>• Smart Campus Digitalization</li>
        <li>• NEP 2020 – Education Technology</li>
        <li>• Open Source Web Standards</li>
        <li>• MongoDB Atlas & Cloud Architecture</li>
      </ul>
    </div>

    {/* RIGHT */}
    <div>
      <h4 className="text-white font-semibold mb-3">Project Info</h4>
      <p className="text-sm">
        Academic Project
        <br />
        Shri Vaishnav Vidyapeeth Vishwavidyalaya
      </p>

      <p className="mt-3 text-sm text-teal-300 font-semibold">
        Developed by Alpha Squad
      </p>
    </div>
  </div>

  {/* BOTTOM BAR */}
  <div className="border-t border-white/10 py-4 text-center text-sm text-slate-500">
    © {new Date().getFullYear()} EduMantra. All rights reserved.
  </div>
</footer>


      {/* ---------------- DEMO POPUP ---------------- */}
      {showDemoPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-white/20 p-8 rounded-xl text-center max-w-sm">
            <h2 className="text-2xl font-bold text-teal-300 mb-3">
              Demo Video Coming Soon 🚀
            </h2>
            <p className="text-slate-300 mb-6">
              This demo showcases live notifications, booking, and collaboration
              features using mock data.
            </p>
            <button
              onClick={() => setShowDemoPopup(false)}
              className="px-6 py-2 bg-teal-400 text-slate-900 rounded-full font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
