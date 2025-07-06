'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-sans text-sm">
      <div className="w-full max-w-md px-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-10">
          <h2 className="text-[#101418] text-[22px] font-bold leading-tight text-center pb-3">
            Login
          </h2>

          <div className="flex flex-col gap-4">
            <label className="flex flex-col">
              <p className="text-[#101418] font-medium pb-1">Username</p>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="form-input rounded-xl border border-[#d4dbe2] bg-gray-50 p-3 placeholder:text-[#5c728a]"
              />
            </label>

            <label className="flex flex-col">
              <p className="text-[#101418] font-medium pb-1">Password</p>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="form-input rounded-xl border border-[#d4dbe2] bg-gray-50 p-3 placeholder:text-[#5c728a]"
              />
            </label>
          </div>

          <div className="flex justify-center pt-6">
            <button className="w-full rounded-xl h-12 px-6 bg-[#5e92c9] text-white font-bold">
              Login
            </button>
          </div>

          <div className="text-center pt-4">
            <p className="text-[#101418]">
              New here?{' '}
              <Link href="/authorization/register" className="text-blue-600 underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
