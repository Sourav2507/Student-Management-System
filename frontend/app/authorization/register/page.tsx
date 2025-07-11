'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Field {
  label: string;
  placeholder: string;
  type?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState('');
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const commonFields: Field[] = [
    { label: 'Name', placeholder: 'Enter your full name' },
    { label: 'Username', placeholder: 'Choose a unique username' },
    { label: 'Email', placeholder: 'Enter your email address' },
    { label: 'Password', placeholder: 'Create a strong password', type: 'password' },
  ];

  const studentFields: Field[] = [
    { label: 'Roll Number', placeholder: 'Enter your roll number' },
    { label: 'Branch', placeholder: 'Enter your branch' },
    { label: 'Semester', placeholder: 'Enter your semester' },
  ];

  const facultyFields: Field[] = [
    { label: 'Faculty ID', placeholder: 'Enter your faculty ID' },
    { label: 'Designation', placeholder: 'Enter your designation' },
  ];

  const selectedRoleFields =
    role === 'student' ? studentFields : role === 'faculty' ? facultyFields : [];

  const combinedFields = [...commonFields, ...selectedRoleFields];

  const firstColumnFields = combinedFields.filter((_, index) => index % 2 === 0);
  const secondColumnFields = combinedFields.filter((_, index) => index % 2 !== 0);

  const handleRegister = async () => {
    if (!role) return alert('Please select a role');

    const payload = { ...formData, role };

    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Registration successful!');
      router.push('/authorization/login');
    } else {
      alert(data.error || 'Registration failed');
    }
  };

  const handleInputChange = (label: string, value: string) => {
    const key = label.toLowerCase().replace(/\s/g, '');
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans text-sm">
      <div className="w-full max-w-4xl">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10 mx-6">
          <h2 className="text-[#101418] text-[22px] font-bold leading-tight text-center pb-3">
            Register
          </h2>

          {/* Role Selection */}
          <div className="pb-6">
            <p className="text-[#101418] font-medium pb-2">Role</p>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  className="form-radio text-blue-600"
                  checked={role === 'student'}
                  onChange={() => setRole('student')}
                />
                <span className="text-[#101418]">Student</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="faculty"
                  className="form-radio text-blue-600"
                  checked={role === 'faculty'}
                  onChange={() => setRole('faculty')}
                />
                <span className="text-[#101418]">Faculty</span>
              </label>
            </div>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              {firstColumnFields.map((field, idx) => (
                <label key={idx} className="flex flex-col">
                  <p className="text-[#101418] font-medium pb-1">{field.label}</p>
                  <input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(field.label, e.target.value)}
                    className="form-input rounded-xl border border-[#d4dbe2] bg-gray-50 p-3 placeholder:text-[#5c728a]"
                  />
                </label>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {secondColumnFields.map((field, idx) => (
                <label key={idx} className="flex flex-col">
                  <p className="text-[#101418] font-medium pb-1">{field.label}</p>
                  <input
                    type={field.type || 'text'}
                    placeholder={field.placeholder}
                    onChange={(e) => handleInputChange(field.label, e.target.value)}
                    className="form-input rounded-xl border border-[#d4dbe2] bg-gray-50 p-3 placeholder:text-[#5c728a]"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              onClick={handleRegister}
              className="w-full max-w-[480px] rounded-xl h-12 px-6 bg-[#5e92c9] text-white font-bold"
            >
              Register
            </button>
          </div>

          {/* Login Redirect */}
          <div className="text-center pt-4">
            <p className="text-[#101418]">
              Already a user?{' '}
              <Link href="/authorization/login" className="text-blue-600 underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
