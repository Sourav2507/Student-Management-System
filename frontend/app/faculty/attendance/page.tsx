'use client';

import Link from 'next/link';

export default function AttendancePage() {
  return (
    <div className="min-h-screen w-full flex font-sans bg-slate-50 text-[#101419] px-4 sm:px-8">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFt1Ofl2ZMaZUDcEJTUFdG7i9GTqZBnaFp8crehjD2SgH92t7RrKbI3uhr5B0gHCLQ_4Si72ZhaAdMKXFh3iWpq0iKJAI-SzqSBZOO83iloIsG1PULAcFiB7xHCTWl1K9t6dfSWRizihaL2IuNYK7_zkKRNpk4Lge7aHM4yWOs0ba1TiviTuEm20L5RZ-gN9Us2hkgdIF9hha0fhktcT3XDZE0t5wgczLffGEgnokMjR5cGi8dSP4pp6LKtYE2462hXVFRCzYVJZ4')",
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
                item.href === '/faculty/attendance'
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
          <h1 className="text-3xl font-bold">Add Attendance</h1>
        </div>

        <div className="flex gap-3 flex-wrap mb-6">
          {["Course", "Date", "Section"].map((label, i) => (
            <button
              key={i}
              className="flex h-8 items-center justify-center gap-2 rounded-full bg-[#e7edf4] px-4 text-sm font-medium text-[#0d141c] hover:scale-[1.02] transition"
            >
              <span>{label}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
              </svg>
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-[#cedbe8] bg-slate-50">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-slate-50">
                {['Roll No', 'Name', 'Present/Absent'].map((col, i) => (
                  <th key={i} className="px-4 py-3 text-[#0d141c] font-medium w-1/3">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['101', 'Liam Carter', 'false'],
                ['102', 'Olivia Bennett', 'true'],
                ['103', 'Noah Harper', 'false'],
                ['104', 'Emma Hayes', 'true'],
                ['105', 'Jackson Reed', 'false'],
                ['106', 'Ava Morgan', 'true'],
                ['107', 'Aiden Foster', 'false'],
                ['108', 'Chloe Evans', 'true'],
                ['109', 'Lucas Parker', 'false'],
                ['110', 'Isabella Wright', 'true'],
              ].map((row, i) => (
                <tr key={i} className="border-t border-[#cedbe8] hover:bg-white transition">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2 text-[#49719c]">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button className="rounded-full bg-[#e7edf4] px-6 py-2 font-bold text-sm text-[#0d141c] hover:scale-105 transition">Mark All Present</button>
          <button className="rounded-full bg-[#3490f3] px-6 py-2 font-bold text-sm text-white hover:scale-105 transition">Submit Attendance</button>
        </div>
      </main>
    </div>
  );
}
