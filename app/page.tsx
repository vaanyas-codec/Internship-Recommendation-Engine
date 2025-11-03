'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaFilePdf, FaLinkedin, FaCheck } from 'react-icons/fa';

type Tab = 'recommendations' | 'applications';

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
  domain: string;
  duration: string;
  stipend: string;
  location: string;
  matchScore: number;
  requiredSkills: string[];
  minCGPA?: number;
}

export default function Page() {
  // ---------- student state ----------
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

  // ---------- UI state ----------
  const [tab, setTab] = useState<Tab>('recommendations');
  const [appliedIds, setAppliedIds] = useState<number[]>([]);
  const [showResumeModal, setShowResumeModal] = useState(false);

  // ---------- large list of internships ----------
  const internships: Internship[] = [
    // Technical
    { id: 1, title: 'Software Engineering Intern', company: 'TechNova Labs', domain: 'Software', duration: '3 Months', stipend: '₹15,000/month', location: 'Pune', matchScore: 96, requiredSkills: ['React', 'TypeScript', 'Git'], minCGPA: 7 },
    { id: 2, title: 'Full Stack Intern', company: 'WebWorks', domain: 'Software', duration: '4 Months', stipend: '₹18,000/month', location: 'Bengaluru', matchScore: 91, requiredSkills: ['Node.js', 'React', 'Postgres'], minCGPA: 7 },
    { id: 3, title: 'Mobile Developer Intern', company: 'AppCraft', domain: 'Software', duration: '3 Months', stipend: '₹14,000/month', location: 'Mumbai', matchScore: 85, requiredSkills: ['Flutter', 'Dart'], minCGPA: 6.5 },
    { id: 4, title: 'AI/ML Research Intern', company: 'NeuralNext AI', domain: 'AI/ML', duration: '6 Months', stipend: '₹25,000/month', location: 'Remote', matchScore: 98, requiredSkills: ['TensorFlow', 'PyTorch', 'ML'], minCGPA: 8 },
    { id: 5, title: 'Data Analyst Intern', company: 'InsightIQ Analytics', domain: 'Data', duration: '4 Months', stipend: '₹18,000/month', location: 'Bengaluru', matchScore: 90, requiredSkills: ['Python', 'SQL', 'PowerBI'], minCGPA: 7 },
    { id: 6, title: 'Computer Vision Intern', company: 'Visionary Labs', domain: 'AI/ML', duration: '5 Months', stipend: '₹22,000/month', location: 'Hyderabad', matchScore: 92, requiredSkills: ['OpenCV', 'PyTorch', 'CNNs'], minCGPA: 7.5 },
    { id: 7, title: 'DevOps Intern', company: 'Cloud Systems', domain: 'Cloud', duration: '5 Months', stipend: '₹20,000/month', location: 'Remote', matchScore: 89, requiredSkills: ['Docker', 'Kubernetes', 'Linux'], minCGPA: 7.2 },
    { id: 8, title: 'Cloud Engineering Intern', company: 'SkyNet Cloud', domain: 'Cloud', duration: '4 Months', stipend: '₹17,000/month', location: 'Delhi', matchScore: 87, requiredSkills: ['AWS', 'Docker', 'Terraform'], minCGPA: 7 },

    // Non-technical / cross-functional
    { id: 9, title: 'UI/UX Design Intern', company: 'PixelCraft Studio', domain: 'Design', duration: '3 Months', stipend: '₹10,000/month', location: 'Hyderabad', matchScore: 84, requiredSkills: ['Figma', 'Prototyping'], minCGPA: 6 },
    { id: 10, title: 'Product Management Intern', company: 'Prodigy Products', domain: 'Product', duration: '3 Months', stipend: '₹15,000/month', location: 'Bengaluru', matchScore: 82, requiredSkills: ['Roadmaps', 'User Research'], minCGPA: 7 },
    { id: 11, title: 'Marketing & Growth Intern', company: 'BrandVerse', domain: 'Marketing', duration: '2 Months', stipend: '₹12,000/month', location: 'Mumbai', matchScore: 80, requiredSkills: ['SEO', 'Content', 'Analytics'], minCGPA: 6 },
    { id: 12, title: 'Business Analyst Intern', company: 'ConsultEdge', domain: 'Business', duration: '3 Months', stipend: '₹13,000/month', location: 'Chennai', matchScore: 86, requiredSkills: ['Excel', 'SQL', 'Reporting'], minCGPA: 7 },
    { id: 13, title: 'Sales & BD Intern', company: 'NextWave Ventures', domain: 'Sales', duration: '3 Months', stipend: '₹14,000/month', location: 'Chennai', matchScore: 79, requiredSkills: ['CRM', 'Pitching'], minCGPA: 6 },
    { id: 14, title: 'Cybersecurity Intern', company: 'SecuGuard Solutions', domain: 'Security', duration: '5 Months', stipend: '₹22,000/month', location: 'Remote', matchScore: 91, requiredSkills: ['Linux', 'PenTesting', 'Networking'], minCGPA: 7.5 },
    { id: 15, title: 'QA Automation Intern', company: 'QualityWorks', domain: 'QA', duration: '3 Months', stipend: '₹13,000/month', location: 'Pune', matchScore: 83, requiredSkills: ['Selenium', 'JS', 'Testing'], minCGPA: 6.5 },

    // More domain diversification
    { id: 16, title: 'Cloud Security Intern', company: 'GuardCloud', domain: 'Security', duration: '4 Months', stipend: '₹19,000/month', location: 'Bengaluru', matchScore: 88, requiredSkills: ['AWS', 'IAM', 'Security'], minCGPA: 7 },
    { id: 17, title: 'Research Intern (NLP)', company: 'LangAI Labs', domain: 'AI/ML', duration: '6 Months', stipend: '₹24,000/month', location: 'Remote', matchScore: 94, requiredSkills: ['NLP', 'Transformers', 'Python'], minCGPA: 8 },
    { id: 18, title: 'Backend Developer Intern', company: 'DataStream', domain: 'Software', duration: '4 Months', stipend: '₹16,000/month', location: 'Mumbai', matchScore: 88, requiredSkills: ['Node.js', 'Express', 'MongoDB'], minCGPA: 7 },
    { id: 19, title: 'Data Engineering Intern', company: 'PipeLine Inc', domain: 'Data', duration: '5 Months', stipend: '₹21,000/month', location: 'Bengaluru', matchScore: 90, requiredSkills: ['Spark', 'Python', 'ETL'], minCGPA: 7.5 },
    { id: 20, title: 'Computer Graphics Intern', company: 'RenderWorks', domain: 'Graphics', duration: '3 Months', stipend: '₹11,000/month', location: 'Chennai', matchScore: 78, requiredSkills: ['OpenGL', 'C++'], minCGPA: 6 }
  ];

  // ---------- helper functions ----------
  const handleStudentChange = (field: keyof StudentData, value: string | File | null) => {
    setStudent(prev => ({ ...prev, [field]: value } as StudentData));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Please upload PDF only.');
        return;
      }
      handleStudentChange('resume', file);
    }
  };

  const handleApply = (internId: number) => {
    // require resume and email & name
    if (!student.resume) {
      alert('Please upload your resume (PDF) before applying.');
      return;
    }
    if (!student.name || !student.email) {
      alert('Please provide your name and email in the profile section.');
      return;
    }
    if (!appliedIds.includes(internId)) {
      setAppliedIds(prev => [...prev, internId]);
    }
  };

  // list of applied internships for My Applications tab
  const appliedList = internships.filter(i => appliedIds.includes(i.id));

  // ---------- small UI helpers ----------
  const niceNumber = (n?: number) => (n === undefined ? '-' : n.toString());

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-2 rounded-xl text-white">
              <FaFilePdf className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-indigo-600">Intern Connect</div>
              <div className="text-xs text-gray-500 -mt-0.5">Find. Apply. Track.</div>
            </div>
          </div>

          <nav className="flex items-center gap-6">
            <a href="#home" className="text-sm hover:text-indigo-600">Home</a>
            <a href="#about" className="text-sm hover:text-indigo-600">About</a>
            <a href="#contact" className="text-sm hover:text-indigo-600">Contact</a>
            <a href="#internships" className="text-sm hover:text-indigo-600 font-medium">Get Started</a>
            <a href="#login" className="text-sm border px-3 py-2 rounded-lg hover:bg-gray-50">Login / Register</a>
          </nav>
        </div>
      </header>

      {/* HERO / LANDING */}
      <section id="home" className="pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl font-bold text-indigo-700 leading-tight"
          >
            Discover Internships Tailored to Your Skills
          </motion.h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Intern Connect recommends internships based on your profile, lets you upload your resume (PDF), link your LinkedIn, and apply — all in a polished, simple interface.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a href="#internships" className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700">Get Started</a>
            <a href="#about" className="text-indigo-600 px-4 py-3 rounded-xl border border-indigo-100">Learn More</a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-12">
        <div className="max-w-5xl mx-auto px-6 bg-white rounded-2xl p-10 shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">About Intern Connect</h2>
          <p className="text-gray-600">
            We connect students with internships from top companies and startups. Our simple yet powerful matching highlights roles that suit your skills and academic profile and provides a one-click application flow with resume preview and tracking.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl p-8 shadow">
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-gray-600 mb-4">Questions or feedback? Drop us a message.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thanks — we will get back to you.'); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="border rounded p-2" placeholder="Your name" />
                <input className="border rounded p-2" placeholder="Your email" type="email" />
                <textarea className="border rounded p-2 md:col-span-2" placeholder="Your message" rows={4} />
              </div>
              <div className="mt-4">
                <button type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded-lg">Send</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* MAIN - Internships & Profile */}
      <section id="internships" className="py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* PROFILE & UPLOAD (left column) */}
          <aside className="lg:col-span-1 bg-white rounded-2xl p-6 shadow">
            <h4 className="text-lg font-semibold mb-4">Your Profile</h4>

            <div className="space-y-3">
              <input
                value={student.name}
                onChange={e => handleStudentChange('name', e.target.value)}
                placeholder="Full name"
                className="w-full border px-3 py-2 rounded-lg"
              />
              <input
                value={student.email}
                onChange={e => handleStudentChange('email', e.target.value)}
                placeholder="Email"
                className="w-full border px-3 py-2 rounded-lg"
                type="email"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={student.branch}
                  onChange={e => handleStudentChange('branch', e.target.value)}
                  placeholder="Branch"
                  className="border px-3 py-2 rounded-lg"
                />
                <input
                  value={student.cgpa}
                  onChange={e => handleStudentChange('cgpa', e.target.value)}
                  placeholder="CGPA"
                  className="border px-3 py-2 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  value={student.year}
                  onChange={e => handleStudentChange('year', e.target.value)}
                  placeholder="Year"
                  className="border px-3 py-2 rounded-lg"
                />
                <div className="flex items-center gap-2">
                  <FaLinkedin className="text-indigo-600" />
                  <input
                    value={student.linkedin}
                    onChange={e => handleStudentChange('linkedin', e.target.value)}
                    placeholder="LinkedIn profile URL"
                    className="border px-3 py-2 rounded-lg flex-1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload Resume (PDF)</label>
                <input type="file" accept=".pdf" onChange={handleResumeUpload} className="w-full" />
                {student.resume && (
                  <div className="mt-2 flex items-center justify-between gap-2 text-sm text-green-700">
                    <div className="flex items-center gap-2">
                      <FaFilePdf /> <span>{student.resume.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setShowResumeModal(true)} className="text-indigo-600 underline text-sm">View Resume</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3">
                <button
                  onClick={() => { setTab('recommendations'); window.scrollTo({ top: document.getElementById('internships')?.offsetTop ?? 0, behavior: 'smooth' }); }}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg"
                >
                  Find Internships
                </button>
              </div>
            </div>
          </aside>

          {/* RECOMMENDATIONS (center & right columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTab('recommendations')}
                className={`px-4 py-2 rounded-full ${tab === 'recommendations' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Internship Recommendations
              </button>
              <button
                onClick={() => setTab('applications')}
                className={`px-4 py-2 rounded-full ${tab === 'applications' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                My Applications ({appliedIds.length})
              </button>
            </div>

            {tab === 'recommendations' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {internships.map(intern => (
                  <article key={intern.id} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{intern.title}</h3>
                        <p className="text-sm text-gray-600">{intern.company}</p>
                      </div>
                      <div className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                        {intern.matchScore}% Match
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-600 flex gap-4 items-center">
                      <div className="flex items-center gap-2"><FaMapMarkerAlt /> <span>{intern.location}</span></div>
                      <div className="flex items-center gap-2"><FaClock /> <span>{intern.duration}</span></div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {intern.requiredSkills.map((s, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-md">{s}</span>
                      ))}
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={() => handleApply(intern.id)}
                        disabled={appliedIds.includes(intern.id)}
                        className={`w-full py-2 rounded-lg text-white font-semibold ${appliedIds.includes(intern.id) ? 'bg-green-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                      >
                        {appliedIds.includes(intern.id) ? (<><FaCheck className="inline mr-2" /> Applied</>) : 'Apply Now'}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div>
                {appliedList.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 shadow text-center text-gray-600">You haven't applied to any internships yet.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {appliedList.map(intern => (
                      <div key={intern.id} className="bg-white p-6 rounded-2xl shadow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{intern.title}</h3>
                            <p className="text-sm text-gray-600">{intern.company}</p>
                          </div>
                          <div className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Applied</div>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">
                          <div className="flex items-center gap-2"><FaMapMarkerAlt /> {intern.location}</div>
                          <div className="flex items-center gap-2 mt-2"><FaClock /> {intern.duration}</div>
                        </div>
                        <div className="mt-3 text-sm text-gray-700">Match: {intern.matchScore}%</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* RESUME PREVIEW MODAL */}
      {showResumeModal && student.resume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="bg-white rounded-2xl w-full max-w-4xl p-4 relative shadow-2xl">
            <button onClick={() => setShowResumeModal(false)} className="absolute top-4 right-4 text-gray-600">Close</button>
            <h4 className="text-lg font-semibold mb-3">Resume Preview</h4>
            <div className="h-[70vh] border rounded overflow-hidden">
              <iframe
                title="resume-preview"
                src={URL.createObjectURL(student.resume)}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-12 py-8 text-center text-gray-600">
        © {new Date().getFullYear()} Intern Connect — Built with care for students.
      </footer>
    </div>
  );
}
