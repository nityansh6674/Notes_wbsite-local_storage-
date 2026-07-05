import React, { useState, useEffect } from "react";

const App = () => {
  const [head, setHead] = useState("");
  const [desc, setDesc] = useState("");

  // Load notes from localStorage on first render
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // Save notes whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!head.trim() || !desc.trim()) return;

    setNotes([...notes, { head, desc }]);

    setHead("");
    setDesc("");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

        {/* Left Section */}
        <div className="flex-1 bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-8">
            📝 New Note
          </h1>

          <form onSubmit={submitHandler} className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Enter Note Title..."
              value={head}
              onChange={(e) => setHead(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-5 py-4 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder="Write your note..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full h-56 rounded-xl border border-slate-300 px-5 py-4 text-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 w-fit shadow-lg hover:scale-105"
            >
              ➕ Add Note
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-8">
            📚 Recent Notes
          </h1>

          {notes.length === 0 ? (
            <div className="flex items-center justify-center h-96 text-slate-500 text-xl">
              No notes yet...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto pr-2">
              {notes.map((note, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 p-6 border border-slate-200"
                >
                  <h2 className="text-2xl font-bold text-slate-800 mb-4 wrap-break-words">
                    {note.head}
                  </h2>

                  <p className="text-slate-600 leading-7 wrap-break-word">
                    {note.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default App;