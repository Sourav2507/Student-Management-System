'use client';

import { useEffect, useState } from 'react';
import { Home, Book, CalendarCheck2, FileText, Layers } from 'lucide-react';
import Link from 'next/link';

interface Exam {
  _id: string;
  subject: string;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
}
interface Course {
  _id: string;
  code: string;
  title: string;
}

export default function Exams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [registeredSubjectNames, setRegisteredSubjectNames] = useState<string[]>([]);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Get logged-in student's ObjectId
  useEffect(() => {
    fetch('http://localhost:5000/api/auth/whoami', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setStudentId(data._id))
      .catch(() => setStudentId(null));
  }, []);

  // 2. Fetch the subject names (titles) of registered courses
  useEffect(() => {
    if (!studentId) return;
    fetch(`http://localhost:5000/api/registrations/student/${studentId}`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.courses) && data.courses.length > 0 && typeof data.courses[0].title === 'string') {
          setRegisteredSubjectNames(data.courses.map((c: Course) => c.title));
        } else if (Array.isArray(data.courses)) {
          fetch('http://localhost:5000/api/courses/all', { credentials: 'include' })
            .then(res2 => res2.json())
            .then(allData => {
              const allCourses: Course[] = allData.courses || [];
              const courseIds = data.courses.map((c: any) => typeof c === 'string' ? c : c._id);
              const subjectNames = allCourses.filter(c => courseIds.includes(c._id)).map(c => c.title);
              setRegisteredSubjectNames(subjectNames);
            });
        } else {
          setRegisteredSubjectNames([]);
        }
      });
  }, [studentId]);

  // 3. Fetch all exams
  useEffect(() => {
    fetch('http://localhost:5000/api/exams/all', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        const allExams = Array.isArray(data) ? data : data.exams || [];
        setExams(allExams);
      })
      .finally(() => setLoading(false));
  }, []);

  // 4. Filter exams: subject is in the student's registered subject names
  const filteredExams = exams.filter(
    exam => registeredSubjectNames.includes(exam.subject)
  );

  // Helper: is exam currently live?
  const isExamLive = (exam: Exam) => {
    if (!exam.date || !exam.startTime || !exam.endTime) return false;
    const now = new Date();
    const start = new Date(`${exam.date}T${exam.startTime}`);
    const end = new Date(`${exam.date}T${exam.endTime}`);
    return now >= start && now <= end;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white flex-col gap-4">
        <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-purple-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-pink-100 via-sky-100 to-purple-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-xl border-r border-gray-200 flex flex-col p-6 space-y-4">
        <h2 className="text-xl font-bold text-purple-700 mb-4">Student Menu</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/student/dashboard" className="flex items-center gap-2 hover:text-purple-600">
            <Home className="text-pink-500" /> Dashboard
          </Link>
          <Link href="/student/view_marks" className="flex items-center gap-2 hover:text-purple-600">
            <Book className="text-green-500" /> View Marks
          </Link>
          <Link href="/student/view_attendence" className="flex items-center gap-2 hover:text-purple-600">
            <CalendarCheck2 className="text-blue-500" /> Attendance
          </Link>
          <Link href="/student/exams" className="flex items-center gap-2 text-purple-600 font-semibold">
            <FileText className="text-orange-500" /> Exams
          </Link>
          <Link href="/student/register_course" className="flex items-center gap-2 text-black font-normal">
            <Layers className="text-indigo-500" /> Register Course
          </Link>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Your Upcoming Exams</h1>
        {filteredExams.length === 0 ? (
          <p className="text-gray-700 mt-4">No upcoming exams for your registered subjects.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredExams.map((exam) => {
              const live = isExamLive(exam);
              return (
                <div
                  key={exam._id}
                  className={`bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-300 hover:shadow-lg transition 
                    ${live ? "cursor-pointer hover:bg-purple-50" : "cursor-not-allowed opacity-70"}
                  `}
                  onClick={() => {
                    if (live) window.open(`/student/exams/${exam._id}`, '_blank');
                  }}
                  tabIndex={live ? 0 : -1}
                  aria-disabled={!live}
                  role="button"
                >
                  <h3 className="text-xl font-semibold text-purple-800">{exam.title}</h3>
                  <p className="text-gray-700 mt-2"><strong>Subject:</strong> {exam.subject}</p>
                  <p className="text-gray-700">
                    <strong>Date:</strong>{" "}
                    {exam.date ? new Date(exam.date).toLocaleDateString() : "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <strong>Time:</strong>{" "}
                    {exam.startTime && exam.endTime
                      ? `${exam.startTime} - ${exam.endTime}`
                      : "N/A"}
                  </p>
                  {live ? (
                    <p className="text-green-600 text-sm mt-2 font-semibold">Click to Participate</p>
                  ) : (
                    <p className="text-orange-600 text-sm mt-2">Exam not live at this time.</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
