'use client';

import { useEffect, useMemo, useState } from 'react';
import { Home, Book, CalendarCheck2, FileText, Layers } from 'lucide-react';
import Link from 'next/link';

interface Attempt {
  _id: string;
  exam: string;
  score: number;
  submittedAt: string;
}

interface Exam {
  _id: string;
  title: string;
  subject: string;
  date: string;
}

interface MarksRow {
  examName: string;
  subject: string;
  marks: number;
  date: string;
}

export default function ViewMarks() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      // Fetch attempts
      const attRes = await fetch('http://localhost:5000/api/attempts/me', { credentials: 'include' });
      let attData = await attRes.json();
      // Ensure it's always an array
      attData = Array.isArray(attData) ? attData : [];
      setAttempts(attData);

      // Fetch all exams for details
      const exRes = await fetch('http://localhost:5000/api/exams/all', { credentials: 'include' });
      let exData = await exRes.json();
      const exList: Exam[] = Array.isArray(exData) ? exData : exData.exams || [];
      setExams(exList);

      setLoading(false);
    }
    fetchAll();
  }, []);

  // Join attempts <-> exams
  const marksWithMeta: MarksRow[] = useMemo(() => {
    if (!Array.isArray(attempts)) return [];
    return attempts.map(att => {
      const exam = exams.find(e => e._id === att.exam);
      return {
        examName: exam?.title || 'N/A',
        subject: exam?.subject || 'N/A',
        marks: att.score,
        date: exam?.date ? new Date(exam.date).toLocaleDateString() : ''
      };
    });
  }, [attempts, exams]);

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-sky-100 via-purple-100 to-pink-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-xl border-r border-gray-200 flex flex-col p-6 space-y-4">
        <h2 className="text-xl font-bold text-purple-700 mb-4">Student Menu</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/student/dashboard" className="flex items-center gap-2 hover:text-purple-600">
            <Home className="text-pink-500" /> Dashboard
          </Link>
          <Link href="/student/view_marks" className="flex items-center gap-2 text-purple-600 font-semibold">
            <Book className="text-green-500" /> View Marks
          </Link>
          <Link href="/student/view_attendence" className="flex items-center gap-2 hover:text-purple-600">
            <CalendarCheck2 className="text-blue-500" /> Attendance
          </Link>
          <Link href="/student/exams" className="flex items-center gap-2 hover:text-purple-600">
            <FileText className="text-orange-500" /> Exams
          </Link>
          <Link href="/student/register_course" className="flex items-center gap-2 text-black font-normal">
            <Layers className="text-indigo-500" /> Register Course
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Your Marks</h1>

        {/* Marks Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow p-4 mb-10">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-purple-100 text-purple-800">
                <th className="px-4 py-2 text-left">Exam Name</th>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Marks (%)</th>
                <th className="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {marksWithMeta.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{row.examName}</td>
                  <td className="px-4 py-2">{row.subject}</td>
                  <td className="px-4 py-2 text-blue-700 font-medium">{row.marks}</td>
                  <td className="px-4 py-2 text-gray-600">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {marksWithMeta.length === 0 && (
            <p className="text-center text-gray-600 py-6">No marks yet. Attempt your exams to see marks here.</p>
          )}
        </div>
      </main>
    </div>
  );
}
