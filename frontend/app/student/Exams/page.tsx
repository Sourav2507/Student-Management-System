'use client';

const exams = [
  { subject: 'Maths', date: '2025-08-15', time: '10:00 AM' },
  { subject: 'CSE', date: '2025-08-17', time: '02:00 PM' },
];

export default function Exams() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upcoming Exams</h2>
      <ul className="space-y-3">
        {exams.map((exam, index) => (
          <li key={index} className="border p-3 rounded bg-gray-50 shadow-sm">
            <strong>{exam.subject}</strong> - {exam.date} at {exam.time}
          </li>
        ))}
      </ul>
    </div>
  );
}
