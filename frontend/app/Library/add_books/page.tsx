'use client';

import { useState } from 'react';

export default function AddBooks() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Book added:\nTitle: ${title}\nAuthor: ${author}`);
    setTitle('');
    setAuthor('');
  };

  return (
    <div
      className="flex min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#edf2f7] text-[#101419]"
      style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}
    >
      {/* Sidebar */}
      <div className="w-64 p-6 flex flex-col gap-4 bg-white shadow-md">
        <h2 className="text-2xl font-bold pb-4">Library Dashboard</h2>
        {[
          { label: "Add Books", icon: "📘", bg: "bg-blue-100" },
          { label: "Download Books", icon: "⬇️", bg: "bg-green-100" },
          { label: "View Borrowed Books", icon: "🔍", bg: "bg-yellow-100" },
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${item.bg}`}>
              <span>{item.icon}</span>
            </div>
            <p className="text-base font-medium">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 py-10">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl border border-[#d3dbe4] p-8">
          <h1 className="text-3xl font-semibold mb-6 text-center">Add New Book</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[#4a5568] mb-1">Book Title</label>
              <input
                type="text"
                placeholder="Enter book title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 rounded-lg p-3 transition"
                required
              />
            </div>
            <div>
              <label className="block text-[#4a5568] mb-1">Author</label>
              <input
                type="text"
                placeholder="Enter author's name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full border border-gray-300 focus:ring-2 focus:ring-green-400 rounded-lg p-3 transition"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow hover:from-blue-600 hover:to-indigo-700 transition"
            >
              ➕ Add Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
