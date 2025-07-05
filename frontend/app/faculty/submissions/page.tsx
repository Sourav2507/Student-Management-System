'use client';

import Link from 'next/link';

export default function SubmissionsPage() {
  return (
    <div className="min-h-screen w-full flex font-sans bg-gray-50 text-[#101419] px-4 sm:px-8">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBGxK58by_lluTtj1soucSqa_epMI3Efd5pAVUQGZHgjpZ_Lq72wXDbTwPLGsUHX34lLtHCk_tts1gNMsn_BzE2unpRbXcDYCi1ePZYHHK8ZB0NfOr-RSysXSH9dSNDxGKSDgteKPEyyTDntePyZ--5oSSTn2H-J00_zWW6XOxoB9JZMo9g7qZR_3YAwKMsinKRUGE0cPYTrJuoBdcrh2GRih5jnQXyPHbl8mbdDwTOeC0Uohp4Ze7_tkDvQdh9StuzqcEJSzshLYA')",
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
                item.href === '/faculty/submissions'
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
          <h1 className="text-3xl font-bold">View Submissions</h1>
        </div>

        <div className="flex gap-3 flex-wrap mb-6">
          {["Course", "Exam", "Date"].map((label, i) => (
            <button
              key={i}
              className="flex h-8 items-center justify-center gap-x-2 rounded-full bg-[#e7edf4] pl-4 pr-2 text-sm font-medium text-[#0d141c]"
            >
              <span>{label}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
              </svg>
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border border-[#cedbe8] bg-slate-50">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left text-sm font-medium text-[#0d141c]">
                <th className="px-4 py-3 w-[200px]">Roll No</th>
                <th className="px-4 py-3 w-[200px]">Name</th>
                <th className="px-4 py-3 w-[160px]">Status</th>
                <th className="px-4 py-3 w-[160px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, i) => (
                <tr key={i} className="border-t border-[#cedbe8]">
                  <td className="px-4 py-2 text-sm text-[#49719c]">{101 + i}</td>
                  <td className="px-4 py-2 text-sm text-[#49719c]">Student {i + 1}</td>
                  <td className="px-4 py-2">
                    <button className="w-full rounded-full bg-[#e7edf4] h-8 px-4 text-sm font-medium text-[#0d141c]">
                      {i % 3 === 0 ? 'Not Submitted' : 'Submitted'}
                    </button>
                  </td>
                  <td className="px-4 py-2 text-sm font-bold text-[#49719c] tracking-[0.015em]">
                    View Submission
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
