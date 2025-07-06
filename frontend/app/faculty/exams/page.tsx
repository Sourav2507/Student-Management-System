'use client';

import Link from 'next/link';

export default function ExamsPage() {
  return (
    <div className="min-h-screen w-full flex font-sans bg-gray-50 text-[#101419] px-4 sm:px-8">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAIM7alxQo3-x76vT-GQK0mJcEuf1TrMoxJUZbRRjPmUXCkBZYuIJhfUZeYl7C0JzrpVdrFHc6Jn4s-onl3FGp5axVBTJWfY9igaY_qgoh0Js8faOic1wqRvSm_fb371BspK0EsDFe-vezLCCdAmUJh53HymqlV0Fas7e8HwUnrhaCxDnC67rsF1Ys1KEs-aXMfgSDgTr7RA2zUtxG1Nc99Q1veRPddG2pcDt8Mm2bKRr1T2NDbEp3oUxyaw1E3evHt-SUFU1Q3BTk')",
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
                item.href === '/faculty/exams'
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
          <h1 className="text-3xl font-bold">Create Exam</h1>
        </div>

        <div className="max-w-xl space-y-6">
          <div>
            <label className="block font-medium mb-2">Exam Title</label>
            <input
              type="text"
              placeholder="Enter exam title"
              className="w-full rounded-xl border border-[#d3dbe4] bg-gray-50 p-4 focus:outline-none focus:ring-0 text-sm"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Course</label>
            <select className="w-full rounded-xl border border-[#d3dbe4] bg-gray-50 p-4 focus:outline-none focus:ring-0 text-sm">
              <option value="">Select Course</option>
              <option value="two">Course 2</option>
              <option value="three">Course 3</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">Date</label>
            <input
              type="date"
              className="w-full rounded-xl border border-[#d3dbe4] bg-gray-50 p-4 focus:outline-none focus:ring-0 text-sm"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-2">Start Time</label>
              <input
                type="time"
                className="w-full rounded-xl border border-[#d3dbe4] bg-gray-50 p-4 focus:outline-none focus:ring-0 text-sm"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-2">End Time</label>
              <input
                type="time"
                className="w-full rounded-xl border border-[#d3dbe4] bg-gray-50 p-4 focus:outline-none focus:ring-0 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Instructions</label>
            <textarea
              placeholder="Enter exam instructions"
              className="w-full rounded-xl border border-[#d3dbe4] bg-gray-50 p-4 focus:outline-none focus:ring-0 text-sm min-h-[120px]"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button className="rounded-full bg-[#d2e2f3] px-6 py-2 font-bold text-sm text-[#101419] hover:scale-105 transition">
              Create Exam
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
