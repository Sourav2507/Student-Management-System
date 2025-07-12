'use client';

export default function GpsAttendance() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">GPS Attendance</h2>
      <p>This feature will automatically record your location when marking attendance.</p>
      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        onClick={() => alert("Attendance marked with current GPS location.")}
      >
        Mark Attendance
      </button>
    </div>
  );
}
