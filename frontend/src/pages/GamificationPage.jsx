import { useState } from "react";

const mockUser = {
  name: "Aman",
  role: "Student",
  points: 820,
  level: "Silver",
  streak: 7,
};

const badges = [
  {
    id: 1,
    title: "Attendance Pro",
    desc: "7-day attendance streak",
    earned: true,
    icon: "✅",
  },
  {
    id: 2,
    title: "Discussion Hero",
    desc: "Posted 10+ discussions",
    earned: true,
    icon: "💬",
  },
  {
    id: 3,
    title: "Hackathon Ready",
    desc: "Participated in a hackathon",
    earned: false,
    icon: "🚀",
  },
  {
    id: 4,
    title: "Campus Star",
    desc: "Top contributor this month",
    earned: false,
    icon: "⭐",
  },
];

export default function GamificationPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 py-20 px-6">
      {/* CENTERED CONTAINER */}
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-slate-50 mb-2">
          Gamified Engagement
        </h1>
        <p className="text-slate-400 mb-10">
          Earn rewards for attendance, participation, and collaboration.
        </p>

        {/* USER STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard title="Total Points" value={`${mockUser.points} XP`} />
          <StatCard title="Level" value={mockUser.level} />
          <StatCard title="Attendance Streak" value={`${mockUser.streak} days 🔥`} />
        </div>

        {/* BADGES SECTION */}
        <h2 className="text-2xl font-semibold text-slate-50 mb-6">
          Achievements & Badges
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`rounded-xl p-6 border ${
                b.earned
                  ? "bg-teal-400/10 border-teal-400/30"
                  : "bg-white/10 border-white/10"
              }`}
            >
              <div className="text-4xl mb-3">{b.icon}</div>
              <h3 className="text-lg font-semibold text-slate-50">
                {b.title}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {b.desc}
              </p>

              {b.earned ? (
                <span className="inline-block mt-3 text-xs text-teal-300 bg-teal-400/20 px-3 py-1 rounded-full">
                  Earned
                </span>
              ) : (
                <span className="inline-block mt-3 text-xs text-slate-400">
                  Locked
                </span>
              )}
            </div>
          ))}
        </div>

        {/* FUTURE ACTION */}
        <div className="mt-14 bg-white/10 p-6 rounded-xl border border-white/10">
          <h3 className="text-xl font-semibold text-slate-50 mb-2">
            How to Earn More Points?
          </h3>
          <ul className="list-disc list-inside text-slate-400 text-sm space-y-1">
            <li>Attend classes regularly</li>
            <li>Participate in discussions</li>
            <li>Join events & hackathons</li>
            <li>Help peers in collaboration forums</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- REUSABLE CARD ---------- */
function StatCard({ title, value }) {
  return (
    <div className="bg-white/10 border border-white/10 rounded-xl p-6">
      <p className="text-sm text-slate-400">{title}</p>
      <h2 className="text-2xl font-bold text-teal-300 mt-1">
        {value}
      </h2>
    </div>
  );
}