'use client';

export default function StudentDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      <ul className="space-y-3">
        <li>📄 Profile</li>
        <li>📊 View Marks</li>
        <li>📝 View Attendance</li>
        <li>📚 Exams</li>
        <li>📍 GPS Attendance</li>
      </ul>
    </div>
  );
}
