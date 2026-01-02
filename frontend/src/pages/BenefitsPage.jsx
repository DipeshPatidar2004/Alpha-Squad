import { useState } from "react";
import { Link } from "react-router-dom";

/* ---------------- BENEFITS DATA ---------------- */
const benefits = [
  {
    icon: "🎓",
    title: "Students",
    desc: "All campus life in one app.",
    details:
      "Students get access to schedules, proxy-free attendance, real-time notifications, bus routes, live campus feed, collaboration tools, and resource booking — reducing confusion and saving time.",
  },
  {
    icon: "👨‍🏫",
    title: "Faculty",
    desc: "Smarter teaching, less paperwork.",
    details:
      "Faculty members can mark secure attendance, manage course schedules, send announcements, track student participation, and collaborate with students using discussion forums and live updates.",
  },
  {
    icon: "🏛️",
    title: "Administration",
    desc: "Centralized campus management.",
    details:
      "Administrators can broadcast announcements, manage transport routes, optimize resource usage, oversee attendance integrity, and gain visibility across departments.",
  },
  {
    icon: "🚌",
    title: "Transport Users",
    desc: "Reliable campus commuting.",
    details:
      "Students and staff can view bus routes, stops, schedules, and live updates to ensure smooth daily commuting without delays or uncertainty.",
  },
  {
    icon: "🎭",
    title: "Clubs & Communities",
    desc: "Better visibility and engagement.",
    details:
      "Student clubs can post updates, announcements, event posters, and achievements on the live campus feed to reach more students effectively.",
  },
  {
    icon: "📊",
    title: "Institution Growth",
    desc: "Data-driven campus decisions.",
    details:
      "Campus Connect creates a foundation for analytics-driven insights on attendance, participation, transport usage, and resource optimization.",
  },
  {
    icon: "♿",
    title: "Accessibility & Inclusion",
    desc: "Designed for everyone.",
    details:
      "Supports dark mode, multilingual interfaces, simple navigation, and low-bandwidth performance to ensure accessibility for all campus users.",
  },
  {
    icon: "🚀",
    title: "Future Ready Platform",
    desc: "Scalable and extensible system.",
    details:
      "Built using modern web and mobile technologies with scope for PWA support, mobile apps, AI-based insights, and third-party integrations.",
  },
];

/* ---------------- COMPONENT ---------------- */
const BenefitsPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 pt-20 px-6">
      {/* Header */}
      <h1 className="text-center text-4xl font-bold text-slate-50 mb-6">
        Who Benefits from Campus Connect?
      </h1>

      <p className="text-center text-slate-400 max-w-3xl mx-auto mb-12">
        Campus Connect empowers every stakeholder in the university ecosystem
        by unifying information, improving communication, and boosting
        productivity.
      </p>

      {/* Benefits Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((b, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            className="bg-white/10 border border-white/10 rounded-xl p-8 shadow-lg cursor-pointer hover:bg-white/20 transition-all"
          >
            <div className="text-5xl mb-4">{b.icon}</div>
            <h2 className="text-xl font-semibold text-slate-50 mb-2">
              {b.title}
            </h2>
            <p className="text-slate-300">{b.desc}</p>

            {/* Expanded content */}
            {openIndex === i && (
              <div className="mt-4 p-4 bg-slate-800/60 border border-white/10 rounded-lg">
                <p className="text-slate-200 text-sm leading-relaxed">
                  {b.details}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="text-center mt-16">
        <Link
          to="/"
          className="px-6 py-2 bg-teal-400 text-slate-900 rounded-full font-semibold hover:bg-teal-300 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default BenefitsPage;
