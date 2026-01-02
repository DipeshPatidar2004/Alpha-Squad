import { useState } from "react";

const mockEvents = [
  {
    id: 1,
    title: "DBMS Lecture",
    date: "2025-02-10",
    time: "10:00 AM",
    type: "Class",
    role: "student",
  },
  {
    id: 2,
    title: "Mid-Sem Exam",
    date: "2025-02-15",
    time: "9:00 AM",
    type: "Exam",
    role: "student",
  },
  {
    id: 3,
    title: "AI Club Hackathon",
    date: "2025-02-18",
    time: "11:00 AM",
    type: "Event",
    role: "all",
  },
  {
    id: 4,
    title: "Faculty Meeting",
    date: "2025-02-12",
    time: "2:00 PM",
    type: "Meeting",
    role: "faculty",
  },
];

export default function CampusCalendarPage() {
  const [selectedDate, setSelectedDate] = useState("");

  const filteredEvents = selectedDate
    ? mockEvents.filter((e) => e.date === selectedDate)
    : mockEvents;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 py-20 px-6">
      {/* ✅ CENTERED CONTAINER */}
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <h1 className="text-4xl font-bold text-slate-50 mb-2">
          Integrated Campus Calendar
        </h1>
        <p className="text-slate-400 mb-8">
          All your classes, exams, and campus events in one place.
        </p>

        {/* DATE PICKER */}
        <div className="bg-white/10 p-6 rounded-xl mb-8">
          <label className="block text-sm text-slate-400 mb-2">
            Filter by date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-slate-800 border border-white/10 p-3 rounded-lg text-slate-200"
          />
        </div>

        {/* EVENTS LIST */}
        <div className="space-y-4">
          {filteredEvents.length === 0 && (
            <p className="text-slate-400">No events for this date.</p>
          )}

          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white/10 border border-white/10 rounded-xl p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold text-slate-50">
                  {event.title}
                </h2>
                <p className="text-sm text-slate-400">
                  {event.date} • {event.time}
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 text-xs rounded-full 
                  ${
                    event.type === "Exam"
                      ? "bg-red-400/20 text-red-300"
                      : event.type === "Class"
                      ? "bg-teal-400/20 text-teal-300"
                      : "bg-indigo-400/20 text-indigo-300"
                  }`}
                >
                  {event.type}
                </span>
              </div>

              {/* MOCK REMINDER */}
              <button
                className="text-sm px-4 py-2 rounded-lg border border-teal-400 text-teal-300 hover:bg-teal-400/10"
              >
                Set Reminder
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}