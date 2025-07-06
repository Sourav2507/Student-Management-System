'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Exam {
  _id: string;
  title: string;
  date: string;
  subject: string;
  department: string;
  semester: number;
  duration: string;
  totalMarks: number;
  instructions: string;
}

export default function ExamManagement() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [instructions, setInstructions] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: [''], correctOption: 0 },
  ]);

  useEffect(() => {
    setExams([
      {
        _id: '686aa2a1a322797abe63a1cc',
        title: 'Mid Term',
        date: '2025-07-15T00:00:00.000+00:00',
        subject: 'CS101',
        department: 'Computer Science',
        semester: 5,
        duration: '1h 0m',
        totalMarks: 2,
        instructions: 'NOOOO CHEATINGGG.',
      },
    ]);
  }, []);

  const calculateDuration = (start: string, end: string): string => {
    if (!start || !end) return '';
    const [sh, sm] = start.split(':').map(Number);
    const [eh, em] = end.split(':').map(Number);
    const totalMinutes = (eh * 60 + em) - (sh * 60 + sm);
    const hrs = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return `${hrs}h ${mins}m`;
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const updated = [...questions];
    if (field === 'question') updated[index].question = value;
    if (field === 'correctOption') updated[index].correctOption = Number(value);
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addOption = (index: number) => {
    const updated = [...questions];
    updated[index].options.push('');
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: [''], correctOption: 0 }]);
  };

  const handleFinalSubmit = async () => {
    if (questions.length < 1) {
      alert('Please add at least one question.');
      return;
    }

    const examData = {
      title,
      subject: course,
      department: 'Computer Science',
      semester: 5,
      date,
      duration: calculateDuration(startTime, endTime),
      instructions,
      totalMarks: questions.length,
      questions,
    };

    try {
      const res = await fetch('http://localhost:5000/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(examData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`✅ Exam with ${questions.length} question(s) submitted!`);
        setTitle('');
        setCourse('');
        setDate('');
        setStartTime('');
        setEndTime('');
        setInstructions('');
        setQuestions([{ question: '', options: [''], correctOption: 0 }]);
        setShowForm(false);
      } else {
        alert('❌ Failed to submit exam: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Error submitting exam.');
    }
  };

  return (
    <div className="min-h-screen w-full flex font-sans bg-white text-[#121717] px-4 sm:px-8">
      <aside className="w-72 min-h-screen border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBreH1rT7yO6QJye8Mv33l0HPptgroCYEv9wAIBQMJWndzu9mFPXp5RgVJ0EpC0W141Y34Nwp7m5-yaqlTajggTeT1KXGhWtm9oGDSSekaorSJyihbhhKPITW381P3ZgESZl60fu2QAjT2S9JPgBD_WwSz6AlfwWr0Lo7WpVIwTwfoA7vZbC5KJXVcGIJp6YBz0Se4XDZKbAFSIz8DVMhok9Iz7y7o5edlhjq-M6YIN7vPvutSIDAi0YP5NKuhsowAOXrqE2oH1cjsl')",
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
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${i === 0 ? 'bg-gray-100' : 'hover:bg-gray-100 hover:scale-[1.02]'
                } `}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Exams</h1>

        <div className="space-y-4 mb-6">
          {exams.map((exam) => (
            <div key={exam._id} className="border p-4 rounded-xl bg-white shadow-sm">
              <h2 className="text-xl font-bold mb-1">{exam.title}</h2>
              <p className="text-sm text-gray-600">
                {exam.subject} | {exam.department} | Semester {exam.semester}
              </p>
              <p className="text-sm text-gray-600">
                {new Date(exam.date).toLocaleDateString()} • {exam.duration} • {exam.totalMarks} Marks
              </p>
              <p className="text-sm mt-2 text-gray-500">Instructions: {exam.instructions}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium mb-6 hover:bg-blue-700"
        >
          {showForm ? 'Cancel' : '➕ Create New Exam'}
        </button>

        {showForm && (
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold mb-4">Create New Exam</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Exam Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 rounded" />
              <select value={course} onChange={(e) => setCourse(e.target.value)} className="border p-2 rounded">
                <option value="">Select Course</option>
                <option value="CS101">CS101 - Computer Science</option>
                <option value="MA101">MA101 - Calculus</option>
                <option value="PH101">PH101 - Physics</option>
              </select>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 rounded" />
              <div className="flex flex-col md:flex-row md:col-span-1 gap-4">
                <div className="flex flex-col flex-1">
                  <label className="text-sm text-gray-600 mb-1">Start Time</label>
                  <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="border p-2 rounded" />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="text-sm text-gray-600 mb-1">End Time</label>
                  <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="border p-2 rounded" />
                </div>
              </div>
              <textarea placeholder="Instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} className="border p-2 rounded col-span-2" />
            </div>

            <div className="mt-6 space-y-4">
              {questions.map((q, qi) => (
                <div key={qi} className="border p-4 rounded">
                  <input
                    className="w-full mb-2 p-2 border rounded"
                    placeholder={`Question ${qi + 1}`}
                    value={q.question}
                    onChange={(e) => handleQuestionChange(qi, 'question', e.target.value)}
                  />
                  {q.options.map((opt, oi) => (
                    <div key={oi} className="flex items-center gap-2 mb-2">
                      <input
                        className="flex-1 p-2 border rounded"
                        placeholder={`Option ${oi + 1}`}
                        value={opt}
                        onChange={(e) => handleOptionChange(qi, oi, e.target.value)}
                      />
                      <input
                        type="radio"
                        name={`correct-${qi}`}
                        checked={q.correctOption === oi}
                        onChange={() => handleQuestionChange(qi, 'correctOption', oi)}
                      />
                    </div>
                  ))}
                  <button onClick={() => addOption(qi)} className="text-sm text-blue-600 mt-2">➕ Add Option</button>
                </div>
              ))}
              <button onClick={addQuestion} className="text-sm text-blue-600">➕ Add Another Question</button>
            </div>

            <div className="mt-6 text-right">
              <button onClick={handleFinalSubmit} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                Submit Exam
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
