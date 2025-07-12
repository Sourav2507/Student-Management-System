'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AnnouncementsPage() {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [audience, setAudience] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);        // Submit loader
  const [pageLoading, setPageLoading] = useState(true); // Page loader

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handlePublish = async () => {
    if (!title || !course || !audience || !message) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // ✅ Get logged-in user info
      const userRes = await fetch('http://localhost:5000/api/auth/whoami', {
        credentials: 'include',
      });
      const userData = await userRes.json();
      const postedBy = userData?.username || 'Unknown';

      // ✅ Send announcement with postedBy
      const res = await fetch('http://localhost:5000/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, course, audience, message, postedBy }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Announcement published successfully!');
        setTitle('');
        setCourse('');
        setAudience('');
        setMessage('');
      } else {
        alert(`❌ ${data.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error publishing announcement:', error);
      alert('Server error while publishing announcement');
    }

    setLoading(false);
  };


  const handleDiscard = () => {
    setTitle('');
    setCourse('');
    setAudience('');
    setMessage('');
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white flex-col gap-4">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-blue-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex font-sans bg-gray-50 text-[#101419] px-4 sm:px-8">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6OBx078F1XI9GOlQfqp3-JNb1XZrT7290xQl4YcM4dpk8RoDjQOpo3WvOd7mNFDqWl-OJ9Ney0i0v_XkFmzyRoVoWrYypePkKfUwRSv_yzUGI0zk9WzLq9cAtJHlgkCU9a8prlO337aoFWQ19wpGYDF9NF7-pFhe76nI0fZDge9SXiS9_SwuYqlwWIDT0cnwI9-5HXXBNPjeGgSH2B569W0AO3O_Dos9Ww8cN1GgI-X98OqHFZJZuFWiZW1KbEQp5zhqMv2AE72I')",
            }}
          ></div>
          <h1 className="text-lg font-semibold">Faculty Panel</h1>
        </div>
        <nav className="flex flex-col gap-2">
          {[
            { label: 'Dashboard', icon: '🏠', href: '/faculty/dashboard' },
            { label: 'Add/Update Marks', icon: '📝', href: '/faculty/marks' },
            { label: 'Add Attendance', icon: '📋', href: '/faculty/attendance' },
            { label: 'Create Exams', icon: '🗓️', href: '/faculty/exams' },
            { label: 'View Submissions', icon: '📑', href: '/faculty/submissions' },
            { label: 'Add Announcements', icon: '📢', href: '/faculty/announcements' },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${item.href === '/faculty/announcements'
                  ? 'bg-gray-100'
                  : 'hover:bg-gray-100 hover:scale-[1.02]'
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Add Announcement</h1>
        </div>

        <div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-[#d3dbe4] bg-gray-50 p-4 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Course</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full rounded-lg border border-[#d3dbe4] bg-gray-50 p-4 text-sm focus:outline-none"
            >
              <option value="">Select Course</option>
              <option value="Course 2">Course 2</option>
              <option value="Course 3">Course 3</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">Target Audience</label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full rounded-lg border border-[#d3dbe4] bg-gray-50 p-4 text-sm focus:outline-none"
            >
              <option value="">Select Audience</option>
              <option value="Year 2">Year 2</option>
              <option value="All Students">All Students</option>
            </select>
          </div>

          {/* Message content spans both columns */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-2">Message Content</label>
            <textarea
              placeholder="Enter message content"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-lg border border-[#d3dbe4] bg-gray-50 p-4 text-sm min-h-[120px] focus:outline-none"
            ></textarea>
          </div>

          {/* Buttons span both columns */}
          <div className="md:col-span-2 flex justify-end gap-3">
            <button
              onClick={handleDiscard}
              className="rounded-lg bg-[#e9edf1] px-6 py-2 font-bold text-sm text-[#101419] hover:scale-105 transition"
            >
              Discard
            </button>

            <button
              onClick={handlePublish}
              disabled={loading}
              className={`rounded-lg px-6 py-2 font-bold text-sm text-white transition ${loading ? 'bg-[#5a98d6] cursor-not-allowed' : 'bg-[#357dc9] hover:scale-105'
                }`}  >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Publishing...
                </div>
              ) : (
                'Publish'
              )}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
