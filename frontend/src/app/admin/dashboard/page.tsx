export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><a href="/admin/users">User Management</a></li>
        <li><a href="/admin/courses">Manage Courses</a></li>
        <li><a href="/admin/logs">View Logs</a></li>
        <li><a href="/admin/analytics">Analytics</a></li>
      </ul>
    </div>
  );
}



// src/app/admin/page.tsx
export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatBox label="Total Students" value="1,250" />
        <StatBox label="Active Courses" value="15" />
        <StatBox label="Recent Enrollments" value="30" />
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#f1f4f4] p-6 rounded-xl">
      <p className="text-base font-medium">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
