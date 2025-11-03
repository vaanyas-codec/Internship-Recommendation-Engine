'use client';

import React from 'react';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-slate-900 font-inter">
        <header className="bg-white border-b sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="bg-blue-600 text-white rounded-md px-2 py-1 text-sm font-bold">
                  IC
                </div>
                <div>
                  <h1 className="text-lg font-semibold">Intern Connect</h1>
                  <p className="text-xs text-slate-500 -mt-0.5">Find • Apply • Track</p>
                </div>
              </div>
            </Link>

            <nav className="flex items-center gap-6 text-sm">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <Link href="/about" className="hover:text-blue-600">About</Link>
              <Link href="/internships" className="hover:text-blue-600 font-medium">Internships</Link>
              <Link href="/contact" className="hover:text-blue-600">Contact</Link>
              <div>
                <Link href="/login" className="px-4 py-2 border rounded-md hover:bg-slate-50">Login</Link>
                <Link href="/register" className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Register</Link>
              </div>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-16 bg-white border-t">
          <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Intern Connect — Built for students ·
            <a href="#" className="text-blue-600"> Privacy</a> ·
            <a href="#" className="text-blue-600"> Terms</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
import { Inter } from 'next/font/google';
