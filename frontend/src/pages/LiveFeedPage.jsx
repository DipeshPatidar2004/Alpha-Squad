import { useState } from "react";

/* ---------------- INITIAL POSTS ---------------- */
const initialPosts = [
  {
    author: "Coding Club",
    role: "club",
    time: "1 hour ago",
    avatar: "https://i.pravatar.cc/100?img=12",
    title: "Hackathon Registrations Open 🚀",
    content: "Register before Friday! Limited seats available.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
    likes: 12,
    comments: ["Excited!", "Count me in 🔥"],
  },
  {
    author: "Prof. Anjana",
    role: "faculty",
    time: "3 hours ago",
    avatar: "https://i.pravatar.cc/100?img=32",
    title: "DBMS Test Update",
    content:
      "Tomorrow’s DBMS test will cover normalization and indexing. Be prepared!",
    image: null,
    likes: 21,
    comments: ["Thanks for the info!", "Noted ✅"],
  },
  {
    author: "AI Club",
    role: "club",
    time: "5 hours ago",
    avatar: "https://i.pravatar.cc/100?img=45",
    title: "Workshop on Generative AI 🤖",
    content:
      "Join us for a hands-on session on ChatGPT & AI tools this Saturday.",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e",
    likes: 35,
    comments: ["Sounds awesome!", "Registered 🎉"],
  },
  {
    author: "Administration",
    role: "admin",
    time: "Yesterday",
    avatar: "https://i.pravatar.cc/100?img=8",
    title: "Campus Notice",
    content:
      "University will remain closed on Monday due to maintenance work.",
    image: null,
    likes: 50,
    comments: ["Thanks for the update", "👍"],
  },
  {
    author: "Rahul",
    role: "student",
    time: "Yesterday",
    avatar: "https://i.pravatar.cc/100?img=18",
    title: "Need Teammates for Hackathon",
    content:
      "Looking for 2 frontend devs and 1 ML enthusiast. Anyone interested?",
    image: null,
    likes: 9,
    comments: ["DM sent!", "I’m interested"],
  },
  {
    author: "Sports Committee",
    role: "club",
    time: "2 days ago",
    avatar: "https://i.pravatar.cc/100?img=55",
    title: "Inter-College Football Match ⚽",
    content:
      "Trials begin next week. All football enthusiasts are welcome!",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2",
    likes: 18,
    comments: ["Let’s go!", "Finally 🔥"],
  },
  {
    author: "Placement Cell",
    role: "admin",
    time: "2 days ago",
    avatar: "https://i.pravatar.cc/100?img=60",
    title: "Internship Opportunity",
    content:
      "Infosys internship applications are now live on the portal.",
    image: null,
    likes: 42,
    comments: ["Applied ✅", "Thanks for sharing"],
  },
  {
    author: "Neha",
    role: "student",
    time: "3 days ago",
    avatar: "https://i.pravatar.cc/100?img=24",
    title: "Resource Booking Tip 💡",
    content:
      "Library study rooms get full fast—book them a day early!",
    image: null,
    likes: 15,
    comments: ["Helpful!", "Didn’t know this"],
  },
];

/* ---------------- ROLE BADGE ---------------- */
const RoleBadge = ({ role }) => {
  const colors = {
    student: "bg-sky-500",
    faculty: "bg-purple-500",
    club: "bg-orange-500",
    admin: "bg-rose-500",
  };

  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full text-white ${colors[role]}`}
    >
      {role.toUpperCase()}
    </span>
  );
};

export default function LiveFeedPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const role = localStorage.getItem("role") || "student";

  /* IMAGE UPLOAD (MOCK) */
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  /* ADD POST */
  const addPost = () => {
    if (!text.trim()) return;

    const newPost = {
      author:
        role === "club"
          ? "Coding Club"
          : role.charAt(0).toUpperCase() + role.slice(1),
      role,
      avatar: `https://i.pravatar.cc/100?u=${role}`,
      time: "Just now",
      title: "New Update",
      content: text.trim(),
      image: imagePreview,
      likes: 0,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setText("");
    setImagePreview(null);
  };

  /* LIKE */
  const handleLike = (index) => {
    setPosts(
      posts.map((p, i) =>
        i === index ? { ...p, likes: p.likes + 1 } : p
      )
    );
  };

  /* COMMENT */
  const addComment = (index, comment) => {
    if (!comment.trim()) return;

    setPosts(
      posts.map((p, i) =>
        i === index
          ? { ...p, comments: [...p.comments, comment] }
          : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 pt-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-12">
        Campus Live Feed
      </h1>

      <div className="flex justify-center">
        <div className="w-full max-w-3xl">

          {/* CREATE POST */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 mb-12 shadow-xl">
            <div className="flex gap-3 mb-4">
              <img
                src={`https://i.pravatar.cc/100?u=${role}`}
                className="w-12 h-12 rounded-full"
                alt="avatar"
              />

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share something with the campus..."
                className="flex-1 bg-slate-800 p-3 rounded-xl resize-none text-white"
              />
            </div>

            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="rounded-xl max-h-64 object-cover mb-4"
              />
            )}

            <div className="flex justify-between items-center">
              <label className="cursor-pointer text-teal-300 text-sm hover:underline">
                📷 Add Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImage}
                />
              </label>

              <button
                onClick={addPost}
                disabled={!text.trim()}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  text.trim()
                    ? "bg-teal-400 text-slate-900 hover:bg-teal-300"
                    : "bg-slate-700 text-slate-400 cursor-not-allowed"
                }`}
              >
                Post
              </button>
            </div>
          </div>

          {/* FEED */}
          <div className="space-y-10">
            {posts.map((post, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-lg"
              >
                <div className="flex items-center gap-4 p-5">
                  <img
                    src={post.avatar}
                    className="w-14 h-14 rounded-full"
                    alt="avatar"
                  />
                  <div className="flex-1">
                    <p className="font-semibold flex gap-2 items-center">
                      {post.author}
                      <RoleBadge role={post.role} />
                    </p>
                    <p className="text-xs text-slate-400">{post.time}</p>
                  </div>
                </div>

                <div className="px-6 pb-4">
                  <h3 className="font-semibold mb-1">{post.title}</h3>
                  <p className="text-slate-300 text-sm">{post.content}</p>
                </div>

                {post.image && (
                  <div className="px-4 pb-4">
                    <img
                      src={post.image}
                      className="w-full rounded-2xl object-cover"
                      alt="post"
                    />
                  </div>
                )}

                <div className="flex justify-around py-3 border-t border-white/10 text-sm">
                  <button onClick={() => handleLike(i)} className="hover:text-teal-300">
                    👍 Like ({post.likes})
                  </button>

                  <CommentBox
                    index={i}
                    comments={post.comments}
                    onAdd={addComment}
                  />

                  <button className="hover:text-teal-300">
                    🔁 Share
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

/* ---------------- COMMENT COMPONENT ---------------- */
function CommentBox({ index, comments, onAdd }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  return (
    <div>
      <button onClick={() => setOpen(!open)} className="hover:text-teal-300">
        💬 Comment ({comments.length})
      </button>

      {open && (
        <div className="bg-slate-800 p-3 rounded-xl mt-2">
          <div className="space-y-1 mb-2">
            {comments.map((c, i) => (
              <p key={i} className="text-slate-300 text-sm">
                • {c}
              </p>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-slate-700 p-2 rounded text-sm"
            />
            <button
              onClick={() => {
                onAdd(index, text);
                setText("");
              }}
              className="text-teal-300 font-semibold"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
