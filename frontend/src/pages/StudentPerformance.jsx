const mockStats = [
  {
    subject: "Mathematics",
    attendance: 88,
    engagement: 75,
  },
  {
    subject: "Physics",
    attendance: 92,
    engagement: 81,
  },
  {
    subject: "Computer Science",
    attendance: 96,
    engagement: 90,
  },
  {
    subject: "Electronics",
    attendance: 84,
    engagement: 70,
  },
];

const StudentPerformance = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 px-8 py-14">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-2 flex items-center gap-2">
          📊 Student Performance
        </h1>
        <p className="text-slate-400">
          Dummy analytics showing attendance & engagement insights.
        </p>
      </div>

      {/* PERFORMANCE CARDS */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

        {mockStats.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-4">
              📘 {item.subject}
            </h2>

            {/* Attendance */}
            <div className="mb-4">
              <p className="text-sm text-slate-400 mb-1">Attendance</p>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-emerald-400"
                  style={{ width: `${item.attendance}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {item.attendance}%
              </p>
            </div>

            {/* Engagement */}
            <div>
              <p className="text-sm text-slate-400 mb-1">Engagement</p>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-indigo-400"
                  style={{ width: `${item.engagement}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {item.engagement}%
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default StudentPerformance;
