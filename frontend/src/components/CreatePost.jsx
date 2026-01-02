import { useState } from "react";

const CreatePost = ({ onPost }) => {
  const [text, setText] = useState("");

  const submit = () => {
    if (!text) return;

    onPost({
      author: "Faculty",
      title: "New Update",
      content: text,
      category: "Announcement",
      time: "Just now",
    });

    setText("");
  };

  return (
    <div className="bg-white/10 p-4 rounded-xl mb-6">
      <textarea
        placeholder="Post an update..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-slate-800 text-white p-2 rounded"
      />

      <button
        onClick={submit}
        className="mt-3 px-4 py-2 bg-teal-400 rounded font-semibold"
      >
        Post
      </button>
    </div>
  );
};

export default CreatePost;