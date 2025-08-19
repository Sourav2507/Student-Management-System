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
interface Registration {
  _id: string;
  studentId: string;
  courseId: string;
}

export default function Exams() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [registeredCourses, setRegisteredCourses] = useState<Course[]>([]);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/whoami', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setStudentId(data._id))
      .catch(() => setStudentId(null));
  }, []);

  useEffect(() => {
    if (!studentId) return;
    fetch(`http://localhost:5000/api/registrations/student/${studentId}`, { credentials: 'include' })
      .then(res => res.json())
      .then(async data => {
        let courseIds: string[] = [];
        if (Array.isArray(data.courses)) {
          courseIds = data.courses.map((c: any) => typeof c === 'string' ? c : c.courseId ?? c._id);
        } else if (Array.isArray(data)) {
          courseIds = data.map((reg: Registration) => reg.courseId);
        }
        const coursesData = await fetch('http://localhost:5000/api/courses/all', { credentials: 'include' }).then(r => r.json());
        const allCourses: Course[] = coursesData.courses || [];
        const registered = allCourses.filter(c => courseIds.includes(c._id));
        setRegisteredCourses(registered);
      });
  }, [studentId]);

  useEffect(() => {
    fetch('http://localhost:5000/api/exams/all', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        const allExams = Array.isArray(data) ? data : data.exams || [];
        setExams(allExams);
      })
      .finally(() => setLoading(false));
  }, []);

  // Debug Output
  useEffect(() => {
    if (!loading) {
      console.log("Registered courses (titles):", registeredCourses.map(c => c.title.trim().toLowerCase()));
      console.log("Exams:", exams);
    }
  }, [registeredCourses, exams, loading]);

  // Helper: is exam currently live?
  const isExamLive = (exam: Exam) => {
    if (!exam.date || !exam.startTime || !exam.endTime) return false;
    const now = new Date();
    const start = new Date(`${exam.date}T${exam.startTime}`);
    const end = new Date(`${exam.date}T${exam.endTime}`);
    // Debugging time comparison:
    console.log("[EXAM LIVE CHECK]", {
      title: exam.title,
      subject: exam.subject,
      now: now.toISOString(),
      start: start.toISOString(),
      end: end.toISOString(),
      isLive: now >= start && now <= end
    });
    return now >= start && now <= end;
  };

  // Use lowercase and trimmed values for robust matching!
  const registeredCourseTitles = registeredCourses.map(c => c.title.trim().toLowerCase());
  // Show all exams for registered subjects (debug), not just live
  const matchingExams = exams.filter(
    exam => exam.subject && registeredCourseTitles.includes(exam.subject.trim().toLowerCase())
  );
  // To show only live exams, use:
  const filteredExams = matchingExams.filter(isExamLive);

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
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Active Exams for Your Registered Subjects</h1>

        {/* List registered course names */}
        {registeredCourses.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-purple-600">Your Registered Courses</h2>
            <ul className="list-disc pl-5 text-gray-800">
              {registeredCourses.map((course) => (
                <li key={course._id}>{course.title} ({course.code})</li>
              ))}
            </ul>
          </div>
        )}

        {/* Debugging Output */}
        <div className="mb-6 bg-purple-50 rounded p-4 text-xs text-gray-500">
          <h2 className="text-purple-600 font-semibold mb-2">Debug Data</h2>
          <pre>
Registered course titles (match): {JSON.stringify(registeredCourseTitles)}
Exams fetched: {JSON.stringify(exams, null, 2)}
Matching Exams: {JSON.stringify(matchingExams, null, 2)}
Live Exams: {JSON.stringify(filteredExams, null, 2)}
          </pre>
        </div>

        {filteredExams.length === 0 ? (
          <p className="text-gray-700 mt-4">
            No active exams for your registered subjects. Check back during your exam slots.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredExams.map((exam) => (
              <div
                key={exam._id}
                className="bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-300 hover:shadow-lg transition cursor-pointer hover:bg-purple-50"
                onClick={() => window.open(`/student/exams/${exam._id}`, '_blank')}
                tabIndex={0}
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
                <p className="text-green-600 text-sm mt-2 font-semibold">Click to Participate</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
