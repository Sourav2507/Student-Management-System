'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Question {
  question: string;
  options: string[];
  correctOption: number;
}

interface Exam {
  _id: string;
  title: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  questions: Question[];
}

interface Attempt {
  attempted: boolean;
  score: number;
  answers: number[];
  submittedAt: string;
}

export default function ExamAttemptPage() {
  const { examId } = useParams();
  const [exam, setExam] = useState<Exam | null>(null);
  const [attempt, setAttempt] = useState<Attempt | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // 1. Fetch exam
      const examRes = await fetch(`http://localhost:5000/api/exams/${examId}`, { credentials: 'include' });
      const examData = await examRes.json();
      setExam(examData);

      // 2. Fetch attempt
      const attemptRes = await fetch(`http://localhost:5000/api/attempts/${examId}/me`, { credentials: 'include' });
      if (attemptRes.ok) {
        const attData = await attemptRes.json();
        setAttempt(attData);
      }
      setLoading(false);
    }
    fetchData();
  }, [examId]);

  useEffect(() => {
    if (!attempt?.attempted) {
      const handler = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = "Exam is going on. Leaving midway will be considered submitted.";
        return e.returnValue;
      };
      window.addEventListener("beforeunload", handler);
      return () => window.removeEventListener("beforeunload", handler);
    }
  }, [attempt]);

  function examIsLive(): boolean {
    if (!exam) return false;
    const now = new Date();
    const start = new Date(`${exam.date}T${exam.startTime}`);
    const end = new Date(`${exam.date}T${exam.endTime}`);
    return now >= start && now <= end;
  }

  const selectAnswer = (qIdx: number, oIdx: number) => {
    if (attempt?.attempted) return;
    setAnswers(prev => {
      const arr = [...prev];
      arr[qIdx] = oIdx;
      return arr;
    });
  };

  const handleSubmit = async () => {
    if (!exam) return;
    setSubmitting(true);

    // Calculate score
    let correct = 0;
    exam.questions.forEach((q, i) => {
      if (answers[i] === q.correctOption) correct++;
    });
    const score = (correct / exam.questions.length) * 100;

    // POST only if not already attempted
    const res = await fetch(`http://localhost:5000/api/attempts/${exam._id}/submit`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ answers, score }),
    });
    if (res.ok) {
      setAttempt({ attempted: true, score, answers, submittedAt: new Date().toISOString() });
      window.onbeforeunload = null;
      alert(`Submitted! Your score: ${score}`);
    } else {
      alert("Already attempted or error, cannot resubmit.");
    }
    setSubmitting(false);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!exam) return <div className="p-6">Exam not found.</div>;
  if (attempt?.attempted) {
    return (
      <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded shadow">
        <h2 className="text-2xl mb-4">{exam.title}</h2>
        <p className="mb-2"><b>Subject:</b> {exam.subject}</p>
        <p className="mb-2"><b>Your Score:</b> {attempt.score}%</p>
        <p className="mb-2 text-green-600">You have already attempted and cannot reattempt this exam.</p>
      </div>
    );
  }
  if (!examIsLive()) {
    return <div className="max-w-2xl mx-auto mt-8 p-6 text-red-500 font-bold">This exam is not open now. You can participate only between {exam.startTime} and {exam.endTime} on {new Date(exam.date).toLocaleDateString()}</div>;
  }
  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">{exam.title}</h2>
      <p className="mb-2"><b>Subject:</b> {exam.subject}</p>
      <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
        {exam.questions.map((q, qIdx) => (
          <div key={qIdx} className="mb-6">
            <p className="mb-2 font-medium">{qIdx + 1}. {q.question}</p>
            {q.options.map((option, oIdx) => (
              <label key={oIdx} className="flex items-center gap-2 mb-1 cursor-pointer">
                <input
                  type="radio"
                  name={`q${qIdx}`}
                  checked={answers[qIdx] === oIdx}
                  onChange={() => selectAnswer(qIdx, oIdx)}
                  required
                  disabled={submitting}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" disabled={submitting} className="bg-purple-600 text-white py-2 px-6 rounded font-bold hover:bg-purple-700">
          Submit Exam
        </button>
      </form>
      <p className="text-red-600 mt-4 text-sm">After Completion of the exam please click Submit to mark your Attendance</p>
    </div>
  );
}
