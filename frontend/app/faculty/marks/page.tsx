'use client';

import Link from 'next/link';

export default function MarksPage() {
  return (
    <div className="min-h-screen w-full flex font-sans bg-gray-50 text-[#101419] px-4 sm:px-8">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAmCL20iF57Ik-oUKyggp6Kx65VzYooA2IMr0EIOqkAspC9bxMMqMxiqnmNZ8Lm63OQ35IEXg2X25mqb90x1afzmMKkHq7IIFBVWVOt68r8MBVuheNVGgS7t_ofHZO97Qs73E-tQZ8TkJNNAf9Z-VtupWsTEEEPJ_TRsfTRQBgWMyZ9vR2tA8VzhFvE2KEpDluNyepXCSHK8MI8gmZfvJigGpHTLud-2EfErUC4wP30M3q9d7OQf4gN_6adbvTzN8jxh7ayd7HwCmA')",
            }}
          ></div>
          <h1 className="text-lg font-semibold">Faculty Panel</h1>
        </div>
        <nav className="flex flex-col gap-2">
          {[
            { label: 'Dashboard', icon: '🏠', href: '/faculty/dashboard' },
            { label: 'Add Attendance', icon: '📋', href: '/faculty/attendance' },
            { label: 'Create Exams', icon: '🗓️', href: '/faculty/exams' },
            { label: 'View Submissions', icon: '📑', href: '/faculty/submissions' },
            { label: 'Add Announcements', icon: '📢', href: '/faculty/announcements' },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                item.href === '/faculty/marks' ? 'bg-gray-100' : 'hover:bg-gray-100 hover:scale-[1.02]'} `}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Add / Update Marks</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mb-6">
          {['Course', 'Semester', 'Section'].map((label, i) => (
            <div key={i} className="flex flex-col">
              <label className="text-base font-medium pb-2">{label}</label>
              <select
                className="form-input w-full rounded-xl border border-[#d3dbe4] bg-gray-50 px-4 py-3 text-base placeholder:text-[#58728d] text-[#101419] focus:outline-none focus:ring-0 transition"
              >
                <option value="">Select {label}</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </select>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-[#d3dbe4] bg-gray-50">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-gray-50">
                {['Roll No', 'Name', 'Marks'].map((col, i) => (
                  <th key={i} className="px-4 py-3 text-[#101419] font-medium w-1/3">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['101', 'Liam Carter', '85'],
                ['102', 'Olivia Bennett', '92'],
                ['103', 'Noah Thompson', '78'],
                ['104', 'Ava Harper', '88'],
                ['105', 'Ethan Parker', '95'],
              ].map((row, i) => (
                <tr key={i} className="border-t border-[#d3dbe4] hover:bg-white transition">
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-2 text-[#58728d]">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button className="rounded-full bg-[#d2e2f3] px-6 py-2 font-bold text-sm text-[#101419] hover:scale-105 transition">Save</button>
          <button className="rounded-full bg-[#e9edf1] px-6 py-2 font-bold text-sm text-[#101419] hover:scale-105 transition">Clear</button>
        </div>
      </main>
    </div>
  );
}