import { CalendarDays } from "lucide-react";

/* ---------------- dummy data ---------------- */
const scheduleData = [
  {
    day: "Monday",
    items: [
      { time: "9:00 – 10:00", subject: "Data Structures", type: "Lecture", room: "CS-101" },
      { time: "11:00 – 12:00", subject: "Operating Systems", type: "Lab", room: "Lab-2" },
    ],
  },
  {
    day: "Wednesday",
    items: [
      { time: "10:00 – 11:00", subject: "Database Management", type: "Lecture", room: "CS-203" },
    ],
  },
  {
    day: "Friday",
    items: [
      { time: "2:00 – 4:00", subject: "Software Engineering", type: "Practical", room: "Lab-1" },
    ],
  },
];

export default function MySchedule() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      
      {/* HEADER CARD (same as your image) */}
      <div className="bg-slate-700/70 rounded-2xl p-8 shadow-lg mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center">
            <CalendarDays className="text-white" size={26} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">My Schedule</h1>
            <p className="text-slate-300">
              View class timetable and exams.
            </p>
          </div>
        </div>
      </div>

      {/* TIMETABLE */}
      <div className="space-y-8">
        {scheduleData.map((day, index) => (
          <div
            key={index}
            className="bg-slate-800/60 border border-white/10 rounded-xl p-6"
          >
            <h2 className="text-xl font-semibold text-teal-300 mb-4">
              {day.day}
            </h2>

            <div className="space-y-4">
              {day.items.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3
                             bg-white/5 border border-white/10 rounded-lg p-4"
                >
                  <div>
                    <p className="text-white font-semibold">
                      {item.subject}
                    </p>
                    <p className="text-sm text-slate-400">
                      {item.type} • {item.room}
                    </p>
                  </div>

                  <span className="text-sm font-medium text-teal-300">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
