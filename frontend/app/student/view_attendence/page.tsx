'use client';

const attendance = [
  { date: '2025-07-01', status: 'Present' },
  { date: '2025-07-02', status: 'Absent' },
  { date: '2025-07-03', status: 'Present' },
];

export default function ViewAttendance() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((entry, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{entry.date}</td>
              <td className="border px-4 py-2">{entry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
