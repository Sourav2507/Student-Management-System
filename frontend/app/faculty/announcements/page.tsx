'use client';

import Link from 'next/link';

export default function AnnouncementsPage() {
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
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                item.href === '/faculty/announcements'
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

        <div className="max-w-xl space-y-6">
          <div>
            <label className="block font-medium mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter title"
              className="w-full rounded-lg border border-[#d3dbe4] bg-gray-50 p-4 focus:outline-none focus:ring-0 text-sm"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Course</label>
            <select className="w-full rounded-lg border border-[#d3dbe4] bg-gray-50 p-4 focus:outline-none focus:ring-0 text-sm">
              <option value="">Select Course</option>
              <option value="two">Course 2</option>
              <option value="three">Course 3</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">Target Audience</label>
            <select className="w-full rounded-lg border border-[#d3dbe4] bg-gray-50 p-4 focus:outline-none focus:ring-0 text-sm">
              <option value="">Select Audience</option>
              <option value="two">Year 2</option>
              <option value="three">All Students</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">Message Content</label>
            <textarea
              placeholder="Enter message content"
              className="w-full rounded-lg border border-[#d3dbe4] bg-gray-50 p-4 focus:outline-none focus:ring-0 text-sm min-h-[120px]"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3">
            <button className="rounded-lg bg-[#e9edf1] px-6 py-2 font-bold text-sm text-[#101419] hover:scale-105 transition">
              Discard
            </button>
            <button className="rounded-lg bg-[#357dc9] px-6 py-2 font-bold text-sm text-white hover:scale-105 transition">
              Publish
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}