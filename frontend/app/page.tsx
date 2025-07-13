'use client';

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center justify-between font-sans text-gray-800">
      {/* Menubar */}
      <header className="w-full flex justify-end items-center gap-6 px-8 py-4 bg-white/60 backdrop-blur-sm shadow-md">
        <Link
          href="/authorization/login"
          className="text-sm sm:text-base text-gray-700 hover:text-indigo-600 transition"
        >
          Login
        </Link>
        <Link
          href="/authorization/register"
          className="text-sm sm:text-base text-gray-700 hover:text-indigo-600 transition"
        >
          Register
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow text-center px-6 gap-10">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
          WELCOME TO OUR UNIVERSITY
        </h1>

        <Image
          src="/university.svg"
          alt="University Illustration"
          width={250}
          height={250}
          className="dark:invert"
        />

        <Link
          href="/authorization/login"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white px-6 py-3 rounded-full text-lg shadow-md transition-all"
        >
          Get Started
        </Link>
      </main>

      {/* Footer */}
      <footer className="text-sm py-4 text-gray-500">
        © {new Date().getFullYear()} Stitch University. All rights reserved.
      </footer>
    </div>
  );
}
