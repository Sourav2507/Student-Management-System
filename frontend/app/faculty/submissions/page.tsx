'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Attempt {
  _id: string;
  student: {
    _id: string;
    roll: string;
    name: string;
  };
  exam: {
    _id: string;
    title: string;
    subject: string;
    date: string;
  };
  score?: number;
  submittedAt: string;
}

export default function SubmissionsPage() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubmissions() {
      const res = await fetch('http://localhost:5000/api/attempts/faculty_submissions', { credentials: 'include' });
      const data = await res.json();
      setAttempts(Array.isArray(data) ? data : []);
      setLoading(false);
    }
    fetchSubmissions();
  }, []);

  return (
    <div className="min-h-screen w-full flex font-sans bg-gray-50 text-[#101419] px-4 sm:px-8">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBGxK58by_luTtj1soucSqa_epMI3Efd5pAVUQGZHgjpZ_Lq72wXDbTwPLGsUHX34lLtHCk_tts1gNMsn_BzE2unpRbXcDYCi1ePZYHHK8ZB0NfOr-RSysXSH9dSNDxGKSDgteKPEyyTDntePyZ--5oSSTn2H-J00_zWW6XOxoB9JZMo9g7qZR_3YAwKMsinKRUGE0cPYTrJuoBdcrh2GRih5jnQXyPHbl8mbdDwTOeC0Uohp4Ze7_tkDvQdh9StuzqcEJSzshLYA')",
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

        <div className="overflow-hidden rounded-xl border border-[#cedbe8] bg-slate-50">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 text-left text-sm font-medium text-[#0d141c]">
                <th className="px-4 py-3">Exam Name</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Student Roll</th>
                <th className="px-4 py-3">Student Name</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Score (%)</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {!loading && attempts.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-500">
                    No submissions yet.
                  </td>
                </tr>
              )}
              {attempts.map((att) => (
                <tr key={att._id} className="border-t border-[#cedbe8]">
                  <td className="px-4 py-2 text-sm text-[#49719c]">{att.exam?.title || "N/A"}</td>
                  <td className="px-4 py-2 text-sm text-[#49719c]">{att.exam?.subject || "N/A"}</td>
                  <td className="px-4 py-2 text-sm">{att.student?.roll || "N/A"}</td>
                  <td className="px-4 py-2 text-sm">{att.student?.name || "N/A"}</td>
                  <td className="px-4 py-2 text-sm">{att.exam?.date ? new Date(att.exam.date).toLocaleDateString() : ""}</td>
                  <td className="px-4 py-2">
                    <span className="w-full rounded-full bg-[#e7edf4] h-8 px-4 text-sm font-medium text-[#0d141c]">
                      {att.score !== undefined ? 'Submitted' : 'Not Submitted'}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm text-blue-600 font-bold">
                    {att.score !== undefined ? `${att.score}` : '-'}
                  </td>
                  <td className="px-4 py-2 text-sm font-bold text-[#49719c] tracking-[0.015em]">
                    <button className="hover:underline">View Submission</button>
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
