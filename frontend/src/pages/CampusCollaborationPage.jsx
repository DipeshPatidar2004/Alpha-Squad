import { useState, useEffect } from "react";

/* ---------- ANONYMOUS USER ---------- */
const getAnonUser = () => {
  let user = localStorage.getItem("anon_user");
  if (!user) {
    user = "User-" + Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem("anon_user", user);
  }
  return user;
};

/* ---------- DUMMY DATA ---------- */
const initialDummyDiscussions = [
  {
    id: 1,
    title: "Anyone up for DBMS revision?",
    author: "User-2314",
    tags: ["DBMS", "Exam", "Help"],
    replies: [
      { id: 11, text: "Let’s revise normalization tonight.", author: "User-8732" },
      { id: 12, text: "Count me in, ER diagrams confuse me.", author: "User-1109" },
    ],
  },
  {
    id: 2,
    title: "Looking for teammates for Smart India Hackathon",
    author: "User-4419",
    tags: ["Hackathon", "SIH", "Team"],
    replies: [
      { id: 21, text: "Frontend dev here (React + Tailwind).", author: "User-9921" },
      { id: 22, text: "Backend Node.js + Mongo 🙋‍♂️", author: "User-3045" },
    ],
  },
  {
    id: 3,
    title: "Any OS short notes available?",
    author: "User-7830",
    tags: ["OS", "Notes"],
    replies: [
      { id: 31, text: "I can share scheduling algorithms PDF.", author: "User-5541" },
    ],
  },
  {
    id: 4,
    title: "Mini-project ideas for 3rd semester?",
    author: "User-6502",
    tags: ["Project", "Ideas"],
    replies: [],
  },
  {
    id: 5,
    title: "DSA practice group @9PM daily",
    author: "User-1287",
    tags: ["DSA", "Coding"],
    replies: [
      { id: 51, text: "I’m in! LeetCode grind 💪", author: "User-8721" },
      { id: 52, text: "Can we include GFG problems?", author: "User-9304" },
    ],
  },
];

/* ---------- MAIN COMPONENT ---------- */
export default function CampusCollaborationPage() {
  const [postText, setPostText] = useState("");
  const [replyBox, setReplyBox] = useState(null);
  const [replyText, setReplyText] = useState("");

  const [discussions, setDiscussions] = useState(() => {
    const saved = localStorage.getItem("campus_discussions");
    return saved ? JSON.parse(saved) : initialDummyDiscussions;
  });

  /* ---------- PERSIST DATA ---------- */
  useEffect(() => {
    localStorage.setItem(
      "campus_discussions",
      JSON.stringify(discussions)
    );
  }, [discussions]);

  /* ---------- ADD POST ---------- */
  const addPost = () => {
    if (!postText.trim()) return;

    const newPost = {
      id: Date.now(),
      title: postText,
      author: getAnonUser(),
      tags: ["Discussion"],
      replies: [],
    };

    setDiscussions([newPost, ...discussions]);
    setPostText("");
  };

  /* ---------- ADD REPLY ---------- */
  const addReply = (id) => {
    if (!replyText.trim()) return;

    setDiscussions((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              replies: [
                ...d.replies,
                {
                  id: Date.now(),
                  text: replyText,
                  author: getAnonUser(),
                },
              ],
            }
          : d
      )
    );

    setReplyText("");
    setReplyBox(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-200 py-20 px-6">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-extrabold text-white mb-2">
          Campus Collaboration
        </h1>
        <p className="text-slate-400 mb-10">
          Discussion forums, group chats, and project matchmaking for assignments and hackathons.
        </p>

        {/* CREATE POST */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 mb-10 border border-white/10">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Start a discussion or look for teammates..."
            className="w-full bg-slate-800 border border-white/10 rounded-xl p-4 text-slate-200 resize-none"
            rows={3}
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={addPost}
              className="px-6 py-2 bg-teal-400 text-slate-900 font-semibold rounded-xl hover:bg-teal-300 transition"
            >
              Post
            </button>
          </div>
        </div>

        {/* DISCUSSIONS */}
        {discussions.map((d) => (
          <div
            key={d.id}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white/10"
          >
            <h2 className="text-xl font-semibold text-white">
              {d.title}
            </h2>

            <p className="text-slate-400 text-sm mt-1">
              Posted by {d.author}
            </p>

            {/* TAGS */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {d.tags.map((t, i) => (
                <span
                  key={i}
                  className="text-xs bg-teal-400/20 text-teal-300 px-3 py-1 rounded-full"
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* ACTION */}
            <button
              onClick={() => setReplyBox(replyBox === d.id ? null : d.id)}
              className="mt-4 text-sm text-slate-400 hover:text-teal-300 transition"
            >
              💬 Reply ({d.replies.length})
            </button>

            {/* REPLIES */}
            {replyBox === d.id && (
              <div className="mt-4 border-t border-white/10 pt-4">
                {d.replies.map((r) => (
                  <div
                    key={r.id}
                    className="bg-slate-800/60 p-3 rounded-lg mb-2 text-sm"
                  >
                    <span className="text-teal-300 font-semibold">
                      {r.author}:
                    </span>{" "}
                    {r.text}
                  </div>
                ))}

                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  rows={2}
                  className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-slate-200 mt-2"
                />

                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => addReply(d.id)}
                    className="px-4 py-1.5 bg-teal-400 text-slate-900 rounded-lg text-sm font-semibold hover:bg-teal-300"
                  >
                    Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
