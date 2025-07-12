'use client';

const mockMarks = [
  { subject: 'Maths', marks: 88 },
  { subject: 'Physics', marks: 92 },
  { subject: 'CSE', marks: 85 },
];

export default function ViewMarks() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Marks</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Subject</th>
            <th className="border px-4 py-2">Marks</th>
          </tr>
        </thead>
        <tbody>
          {mockMarks.map((mark, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{mark.subject}</td>
              <td className="border px-4 py-2">{mark.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
