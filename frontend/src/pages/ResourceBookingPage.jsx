import { useState, useEffect } from "react";
import { resources } from "../data/mockResources";
import { bookings as staticBookings } from "../data/mockBookings";

const STORAGE_KEY = "resourceDynamicBookings";

const currentUser = {
  name: "Coding Club",
  role: "club",
};

export default function ResourceBookingPage() {
  const [search, setSearch] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [duration, setDuration] = useState("");
  const [purpose, setPurpose] = useState("");

  // 🔹 sirf dynamic bookings (localStorage se)
  const [dynamicBookings, setDynamicBookings] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          /* ignore parse error */
        }
      }
    }
    return []; // start empty
  });

  // 🔁 sync dynamic bookings to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dynamicBookings));
  }, [dynamicBookings]);

  // ✅ Static + Dynamic merge
  const allBookings = [...staticBookings, ...dynamicBookings];

  const filteredResources = resources.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.type.toLowerCase().includes(search.toLowerCase()) ||
      r.location.toLowerCase().includes(search.toLowerCase())
  );

  const getBookingsForResource = (resourceId) =>
    allBookings.filter((b) => b.resourceId === resourceId);

  // ✅ ADD dynamic booking
  const handleBook = () => {
    if (!selectedResource) return;

    const newBooking = {
      id: Date.now(),
      resourceId: selectedResource.id,
      duration,
      purpose,
      bookedBy: currentUser.name,
      role: currentUser.role,
      isDynamic: true,
    };

    setDynamicBookings((prev) => [...prev, newBooking]);

    alert(
      `✅ Booked!\n${selectedResource.name}\nDuration: ${duration}\nPurpose: ${purpose}`
    );
    setSelectedResource(null);
    setDuration("");
    setPurpose("");
  };

  // ❌ REMOVE sirf dynamic booking
  const handleCancelBooking = (bookingId) => {
    setDynamicBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 pt-20 px-6 flex flex-col items-center">
      {/* 🏷 Page Title */}
      <h1 className="text-4xl font-bold text-white mb-4 text-center">
        Resource Booking System
      </h1>
      <p className="text-slate-400 mb-8 text-center max-w-xl">
        Reserve campus facilities like labs, seminar halls, courts and
        classrooms based on availability.
      </p>

      {/* 🔍 Centered Search Bar */}
      <input
        placeholder="Search by resource, type or location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-lg px-4 py-2 mb-10 bg-slate-800 border border-slate-700 text-center rounded-lg"
      />

      {/* 📦 RESOURCES GRID — CENTERED */}
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl justify-items-center">
        {filteredResources.map((r) => {
          const bookingsForThis = getBookingsForResource(r.id);
          const allowed = r.allowedRoles.includes(currentUser.role);

          // static + dynamic ko split kar rahe hain
          const staticForThis = bookingsForThis.filter((b) => !b.isDynamic);
          const dynamicForThis = bookingsForThis.filter((b) => b.isDynamic);

          const hasAnyBooking = bookingsForThis.length > 0;

          return (
            <div
              key={r.id}
              className="w-full max-w-md bg-white/10 border border-white/10 rounded-xl p-6 text-center"
            >
              <span className="text-teal-400 text-sm">{r.type}</span>
              <h2 className="text-xl font-semibold text-white mt-1">
                {r.name}
              </h2>
              <p className="text-slate-400 mb-3">📍 {r.location}</p>

              {/* STATUS CHIP */}
              {hasAnyBooking ? (
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm mb-2 inline-block">
                  {bookingsForThis.length} booking(s)
                </span>
              ) : (
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm mb-2 inline-block">
                  Available
                </span>
              )}

              {/* STATIC BOOKINGS (3 seed wali yaha show hongi) */}
              {staticForThis.length > 0 && (
                <div className="mt-2 text-left text-xs bg-slate-900/60 rounded-lg p-2">
                  <p className="text-slate-400 mb-1 font-semibold">
                    Static Bookings:
                  </p>
                  {staticForThis.map((b) => (
                    <div key={b.id} className="text-slate-300 mb-1">
                      <div>🕒 {b.startTime} – {b.endTime}</div>
                      <div>
                        👤 {b.bookedBy} ({b.role})
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* DYNAMIC BOOKINGS (LOCALSTORAGE WALI) */}
              {dynamicForThis.length > 0 && (
                <div className="mt-2 text-left text-xs bg-slate-900/60 rounded-lg p-2">
                  <p className="text-teal-300 mb-1 font-semibold">
                    Your Dynamic Bookings:
                  </p>
                  {dynamicForThis.map((b) => (
                    <div
                      key={b.id}
                      className="flex items-start justify-between gap-2 mb-1"
                    >
                      <div className="text-slate-200">
                        <div>⏱ {b.duration}</div>
                        {b.purpose && (
                          <div className="text-[11px] text-slate-400">
                            🎯 {b.purpose}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleCancelBooking(b.id)}
                        className="text-[10px] px-2 py-1 rounded-full border border-red-400 text-red-300 hover:bg-red-500/10"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* ACTION BUTTON → dynamic add */}
              <button
                onClick={() => setSelectedResource(r)}
                disabled={!allowed}
                className={`mt-4 w-full py-2 rounded-lg font-semibold ${
                  allowed
                    ? "bg-teal-400 text-slate-900"
                    : "bg-slate-700 text-slate-400 cursor-not-allowed"
                }`}
              >
                {allowed ? "Add Booking" : "Not Allowed"}
              </button>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      {selectedResource && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md text-center">
            <h2 className="text-xl font-bold mb-4">
              Add Booking – {selectedResource.name}
            </h2>

            <input
              placeholder="Purpose"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full mb-3 p-2 bg-slate-900 border border-slate-700 rounded text-center"
            />

            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 mb-4 bg-slate-900 border border-slate-700 rounded text-center"
            >
              <option value="">Select duration</option>
              <option>1 Hour</option>
              <option>2 Hours</option>
              <option>Half Day</option>
              <option>Full Day</option>
            </select>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setSelectedResource(null);
                  setDuration("");
                  setPurpose("");
                }}
                className="px-4 py-2 bg-slate-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleBook}
                disabled={!duration || !purpose}
                className="px-4 py-2 bg-teal-400 text-slate-900 rounded disabled:opacity-60"
              >
                Add Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}