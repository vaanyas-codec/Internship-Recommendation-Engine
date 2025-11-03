'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight">
            Find the perfect internship — <br />
            <span className="text-blue-600">faster and smarter.</span>
          </h1>
          <p className="mt-5 text-lg text-slate-600 max-w-2xl">
            Intern Connect recommends internships tailored to your profile. Upload your resume, link your LinkedIn, and track every application — all in one place.
          </p>

          <div className="mt-8 flex gap-4">
            <Link href="/internships" className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition">
              Browse Internships
            </Link>
            <Link href="/register" className="px-6 py-3 border border-slate-300 rounded-md hover:bg-slate-100 transition">
              Join Now
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 w-full"
        >
          <div className="bg-white rounded-2xl shadow-lg border p-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Why Intern Connect?</h2>
            <ul className="space-y-3 text-slate-600">
              <li>• Smart internship recommendations based on your CGPA & skills</li>
              <li>• Upload and preview your resume in PDF format</li>
              <li>• Track your applications in the “My Applications” tab</li>
              <li>• Clean, professional interface with an intuitive design</li>
            </ul>
            <div className="mt-6">
              <Link href="/internships" className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Get Started
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
