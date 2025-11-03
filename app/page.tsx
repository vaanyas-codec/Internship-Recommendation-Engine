'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  FileText,
  Check,
  Clock,
  MapPin,
  Eye,
  X
} from 'lucide-react';

interface StudentData {
  name: string;
  email: string;
  cgpa: string;
  branch: string;
  year: string;
  skills: string[];
  linkedin: string;
  resume: File | null;
}

interface Internship {
  id: number;
  title: string;
  company: string;
  duration: string;
  stipend: string;
  location: string;
  matchScore: number;
  requiredSkills: string[];
}

export default function InternConnect() {
  const [student, setStudent] = useState<StudentData>({
    name: '',
    email: '',
    cgpa: '',
    branch: '',
    year: '',
    skills: [],
    linkedin: '',
    resume: null,
  });

  const [appliedInternships, setAppliedInternships] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'recommendations' | 'applications'>('recommendations');
  const [showResumeModal, setShowResumeModal] = useState(false);

  const internships: Internship[] = [
    {
      id: 1,
      title: 'Software Engineering Intern',
      company: 'TechNova Labs',
      duration: '3 Months',
      stipend: '₹15,000/month',
      location: 'Pune, India',
      matchScore: 92,
      requiredSkills: ['React', 'TypeScript', 'Git'],
    },
    {
      id: 2,
      title: 'Data Analyst Intern',
      company: 'InsightIQ Analytics',
      duration: '4 Months',
      stipend: '₹18,000/month',
      location: 'Bangalore, India',
      matchScore: 88,
      requiredSkills: ['Python', 'SQL', 'PowerBI'],
    },
    {
      id: 3,
      title: 'AI Research Intern',
      company: 'NeuralNext AI',
      duration: '6 Months',
      stipend: '₹20,000/month',
      location: 'Remote',
      matchScore: 95,
      requiredSkills: ['TensorFlow', 'PyTorch', 'Deep Learning'],
    },
    {
      id: 4,
      title: 'UI/UX Design Intern',
      company: 'PixelCraft Studio',
      duration: '3 Months',
      stipend: '₹10,000/month',
      location: 'Hyderabad, India',
      matchScore: 85,
      requiredSkills: ['Figma', 'Adobe XD', 'Prototyping'],
    },
    {
      id: 5,
      title: 'Marketing and Strategy Intern',
      company: 'BrandVerse',
      duration: '2 Months',
      stipend: '₹12,000/month',
      location: 'Mumbai, India',
      matchScore: 80,
      requiredSkills: ['SEO', 'Content Writing', 'Campaign Analysis'],
    },
    {
      id: 6,
      title: 'Cybersecurity Intern',
      company: 'SecuGuard Solutions',
      duration: '5 Months',
      stipend: '₹22,000/month',
      location: 'Remote',
      matchScore: 90,
      requiredSkills: ['Networking', 'Ethical Hacking', 'Linux'],
    },
    {
      id: 7,
      title: 'Cloud Engineering Intern',
      company: 'SkyNet Cloud',
      duration: '4 Months',
      stipend: '₹17,000/month',
      location: 'Delhi, India',
      matchScore: 89,
      requiredSkills: ['AWS', 'Docker', 'Kubernetes'],
    },
    {
      id: 8,
      title: 'Business Development Intern',
      company: 'NextWave Ventures',
      duration: '3 Months',
      stipend: '₹14,000/month',
      location: 'Chennai, India',
      matchScore: 83,
      requiredSkills: ['Sales', 'CRM Tools', 'Presentation Skills'],
    },
  ];

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type !== 'application/pdf') {
      alert('Please upload your resume in PDF format.');
      return;
    }
    setStudent({ ...student, resume: file });
  };

  const handleApply = (id: number) => {
    if (!student.resume) {
      alert('Please upload your resume before applying.');
      return;
    }
    setAppliedInternships((prev) => [...prev, id]);
  };

  const appliedList = internships.filter((i) => appliedInternships.includes(i.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex flex-col items-center py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-5xl border border-gray-100">
        <h1 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 flex items-center justify-center gap-3">
          <GraduationCap className="text-indigo-600" /> Intern Connect
        </h1>

        {/* ==== Profile Section ==== */}
        <section className="p-6 rounded-2xl border border-gray-200 bg-gray-50 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="email"
              placeholder="Email"
              value={student.email}
              onChange={(e) => setStudent({ ...student, email: e.target.value })}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Branch"
              value={student.branch}
              onChange={(e) => setStudent({ ...student, branch: e.target.value })}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="CGPA"
              value={student.cgpa}
              onChange={(e) => setStudent({ ...student, cgpa: e.target.value })}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Year of Study"
              value={student.year}
              onChange={(e) => setStudent({ ...student, year: e.target.value })}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="url"
              placeholder="LinkedIn Profile URL"
              value={student.linkedin}
              onChange={(e) => setStudent({ ...student, linkedin: e.target.value })}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Resume Upload */}
          <div className="mt-4 flex flex-col gap-2">
            <label className="block font-medium text-gray-700 mb-1">
              Upload Resume (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleResumeUpload}
              className="w-full border p-2 rounded-lg bg-white"
            />
            {student.resume && (
              <div className="flex items-center gap-3 text-sm text-green-600">
                <FileText size={16} /> {student.resume.name}
                <button
                  onClick={() => setShowResumeModal(true)}
                  className="text-indigo-600 underline text-xs flex items-center gap-1"
                >
                  <Eye size={12} /> View Resume
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-6 py-2 rounded-full font-semibold ${activeTab === 'recommendations'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600'
              }`}
          >
            Internship Recommendations
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-6 py-2 rounded-full font-semibold ${activeTab === 'applications'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600'
              }`}
          >
            My Applications
          </button>
        </div>

        {/* === Internships Section === */}
        {activeTab === 'recommendations' ? (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {internships.map((intern) => (
                <div
                  key={intern.id}
                  className="border border-gray-200 bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg text-gray-800">{intern.title}</h3>
                    <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                      {intern.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium mb-1">{intern.company}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin size={14} /> {intern.location}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock size={14} /> {intern.duration} • {intern.stipend}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {intern.requiredSkills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleApply(intern.id)}
                    disabled={appliedInternships.includes(intern.id)}
                    className={`mt-4 w-full py-2 rounded-lg text-white font-semibold transition-all ${appliedInternships.includes(intern.id)
                        ? 'bg-green-500 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                  >
                    {appliedInternships.includes(intern.id) ? (
                      <>
                        Applied <Check className="inline-block ml-1 w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Apply Now <Briefcase className="inline-block ml-1 w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section>
            {appliedList.length === 0 ? (
              <p className="text-center text-gray-500">You haven’t applied to any internships yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {appliedList.map((intern) => (
                  <div
                    key={intern.id}
                    className="border border-gray-200 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md"
                  >
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">{intern.title}</h3>
                    <p className="text-gray-600 font-medium">{intern.company}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin size={14} /> {intern.location}
                    </p>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock size={14} /> {intern.duration} • {intern.stipend}
                    </p>
                    <div className="mt-2 text-green-600 flex items-center gap-1">
                      <Check size={14} /> Applied Successfully
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

      {/* Resume Preview Modal */}
      {showResumeModal && student.resume && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 p-6 relative">
            <button
              onClick={() => setShowResumeModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="text-indigo-600" /> Resume Preview
            </h2>
            <iframe
              src={URL.createObjectURL(student.resume)}
              className="w-full h-[500px] border rounded-lg"
            ></iframe>
          </div>
        </div>
      )}

      <footer className="mt-10 text-gray-500 text-sm">
        © {new Date().getFullYear()} Intern Connect — Empowering Student Careers
      </footer>
    </div>
  );
}
