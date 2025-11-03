'use client';

import React, { useState } from 'react';
import { Briefcase, GraduationCap, Search, Code, TrendingUp, User, LogOut, FileText, X, Check, Clock } from 'lucide-react';
import Image from 'next/image';

interface StudentData {
  name: string;
  email: string;
  cgpa: string;
  branch: string;
  year: string;
  skills: string[];
}

interface Internship {
  id: number;
  type: string;
  title: string;
  company: string;
  requiredSkills: string[];
  minCGPA: number;
  stipend: string;
  duration: string;
  location: string;
  matchScore?: number;
  matchingSkills?: string[];
}

interface Application extends Internship {
  appliedDate: string;
  status: string;
  coverLetter: string;
  availability: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [appliedInternships, setAppliedInternships] = useState<Application[]>([]);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    availability: ''
  });

  const [studentData, setStudentData] = useState<StudentData>({
    name: '',
    email: '',
    cgpa: '',
    branch: 'CS (AI-DS)',
    year: '2',
    skills: []
  });
  const [skillInput, setSkillInput] = useState('');
  const [recommendations, setRecommendations] = useState<Internship[]>([]);

  const branches = ['CS (AI-DS)', 'Computer Science', 'Information Technology', 'Electronics', 'Mechanical'];
  const years = ['1', '2', '3', '4'];

  const sampleInternships: Internship[] = [
    {
      id: 1,
      type: 'technical',
      title: 'Software Development Intern',
      company: 'Tech Corp',
      requiredSkills: ['C++', 'Python', 'Data Structures'],
      minCGPA: 7.0,
      stipend: '₹15,000/month',
      duration: '3 months',
      location: 'Bangalore'
    },
    {
      id: 2,
      type: 'technical',
      title: 'AI/ML Research Intern',
      company: 'AI Innovations',
      requiredSkills: ['Python', 'Machine Learning', 'TensorFlow'],
      minCGPA: 7.5,
      stipend: '₹20,000/month',
      duration: '6 months',
      location: 'Hyderabad'
    },
    {
      id: 3,
      type: 'technical',
      title: 'Full Stack Developer Intern',
      company: 'Web Solutions Inc',
      requiredSkills: ['React', 'Node.js', 'MongoDB'],
      minCGPA: 7.0,
      stipend: '₹18,000/month',
      duration: '4 months',
      location: 'Pune'
    },
    {
      id: 4,
      type: 'business',
      title: 'Business Analytics Intern',
      company: 'Consulting Firm',
      requiredSkills: ['Excel', 'Data Analysis', 'Communication'],
      minCGPA: 8.0,
      stipend: '₹12,000/month',
      duration: '3 months',
      location: 'Mumbai'
    },
    {
      id: 5,
      type: 'technical',
      title: 'DevOps Intern',
      company: 'Cloud Systems',
      requiredSkills: ['Docker', 'Kubernetes', 'Linux'],
      minCGPA: 7.2,
      stipend: '₹16,000/month',
      duration: '5 months',
      location: 'Remote'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStudentData(prev => ({ ...prev, [name]: value }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !studentData.skills.includes(skillInput.trim())) {
      setStudentData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setStudentData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const calculateMatchScore = (internship: Internship): number => {
    let score = 0;
    const cgpaFloat = parseFloat(studentData.cgpa);

    if (cgpaFloat >= internship.minCGPA) {
      score += 40;
    }

    const matchingSkills = internship.requiredSkills.filter(skill =>
      studentData.skills.some(studentSkill =>
        studentSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(studentSkill.toLowerCase())
      )
    );

    const skillMatchPercentage = (matchingSkills.length / internship.requiredSkills.length) * 60;
    score += skillMatchPercentage;

    return Math.round(score);
  };

  const generateRecommendations = () => {
    if (!studentData.name || !studentData.email || !studentData.cgpa || studentData.skills.length === 0) {
      alert('Please fill in all fields and add at least one skill!');
      return;
    }

    setIsLoggedIn(true);
    const matches = sampleInternships
      .map(internship => ({
        ...internship,
        matchScore: calculateMatchScore(internship),
        matchingSkills: internship.requiredSkills.filter(skill =>
          studentData.skills.some(studentSkill =>
            studentSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(studentSkill.toLowerCase())
          )
        )
      }))
      .filter(internship => (internship.matchScore ?? 0) >= 30)
      .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0));

    setRecommendations(matches);
    setActiveTab('recommendations');
  };

  const handleApplyClick = (internship: Internship) => {
    setSelectedInternship(internship);
    setShowApplicationModal(true);
    setApplicationData({ coverLetter: '', availability: '' });
  };

  const submitApplication = () => {
    if (!applicationData.coverLetter || !applicationData.availability || !selectedInternship) {
      alert('Please fill in all required fields');
      return;
    }

    const newApplication: Application = {
      ...selectedInternship,
      appliedDate: new Date().toLocaleDateString(),
      status: 'pending',
      coverLetter: applicationData.coverLetter,
      availability: applicationData.availability
    };

    setAppliedInternships([...appliedInternships, newApplication]);
    setShowApplicationModal(false);
    alert('Application submitted successfully!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('home');
    setAppliedInternships([]);
    setRecommendations([]);
    setStudentData({
      name: '',
      email: '',
      cgpa: '',
      branch: 'CS (AI-DS)',
      year: '2',
      skills: []
    });
    setShowProfileMenu(false);
  };

  const isAlreadyApplied = (internshipId: number): boolean => {
    return appliedInternships.some(app => app.id === internshipId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
              <Image src="/logo.png" alt="Intern Connect logo" width={40} height={40} className="object-contain" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Intern Connect
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => setActiveTab('home')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'home' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-indigo-50'
                      }`}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'profile' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-indigo-50'
                      }`}
                  >
                    Get Started
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setActiveTab('recommendations')}
                    className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'recommendations' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-indigo-50'
                      }`}
                  >
                    Browse
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition"
                    >
                      <User className="w-4 h-4" />
                      <span className="font-medium">{studentData.name.split(' ')[0]}</span>
                    </button>
                    {showProfileMenu && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                        <button
                          onClick={() => {
                            setActiveTab('my-profile');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-indigo-50 flex items-center space-x-2 text-gray-700"
                        >
                          <User className="w-4 h-4" />
                          <span>My Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            setActiveTab('applications');
                            setShowProfileMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-indigo-50 flex items-center space-x-2 text-gray-700"
                        >
                          <FileText className="w-4 h-4" />
                          <span>My Applications ({appliedInternships.length})</span>
                        </button>
                        <hr className="my-2" />
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center space-x-2 text-red-600"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {activeTab === 'home' && (
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-gray-900 mb-6">
              Find Your <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Dream Internship</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              AI-powered recommendations tailored to your skills, CGPA, and career goals.
            </p>
            <button
              onClick={() => setActiveTab('profile')}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Get Started Free
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition border border-gray-100">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Smart Matching</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI analyzes your profile and matches you with internships that align with your skills.
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition border border-gray-100">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Skill-Based</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized recommendations based on your technical expertise and academic performance.
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition border border-gray-100">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Top Companies</h3>
              <p className="text-gray-600 leading-relaxed">
                Access opportunities from leading tech companies and innovative startups.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10 border border-gray-100">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Create Your Profile</h2>
            <p className="text-gray-600 mb-8">Tell us about yourself to get personalized recommendations</p>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={studentData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={studentData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">CGPA *</label>
                  <input
                    type="number"
                    name="cgpa"
                    value={studentData.cgpa}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    max="10"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="8.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Year</label>
                  <select
                    name="year"
                    value={studentData.year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>Year {year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Branch</label>
                  <select
                    name="branch"
                    value={studentData.branch}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  >
                    {branches.map(branch => (
                      <option key={branch} value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Skills *</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="e.g., Python, React"
                  />
                  <button
                    onClick={addSkill}
                    className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition font-medium"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {studentData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 px-4 py-2 rounded-full text-sm flex items-center gap-2 border border-indigo-200"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-indigo-500 hover:text-indigo-700 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={generateRecommendations}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 text-lg"
              >
                <Search className="w-5 h-5" />
                Find My Perfect Internships
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Recommended For You</h2>
            <p className="text-gray-600">Based on your skills and profile</p>
          </div>

          {recommendations.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-16 text-center border border-gray-100">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-4">No matching internships found.</p>
              <button
                onClick={() => setActiveTab('profile')}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition font-medium"
              >
                Update Profile
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {recommendations.map((internship) => (
                <div
                  key={internship.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{internship.title}</h3>
                      <p className="text-gray-600 font-medium">{internship.company}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-bold ${(internship.matchScore ?? 0) >= 70 ? 'bg-green-100 text-green-700' :
                        (internship.matchScore ?? 0) >= 50 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                      }`}>
                      {internship.matchScore}% Match
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-xs text-gray-600 mb-1">Stipend</p>
                      <p className="font-semibold text-gray-900">{internship.stipend}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-xs text-gray-600 mb-1">Duration</p>
                      <p className="font-semibold text-gray-900">{internship.duration}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-xs text-gray-600 mb-1">Location</p>
                      <p className="font-semibold text-gray-900">{internship.location}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-xs text-gray-600 mb-1">Min CGPA</p>
                      <p className="font-semibold text-gray-900">{internship.minCGPA}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {internship.requiredSkills.map((skill, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${internship.matchingSkills?.includes(skill)
                              ? 'bg-green-100 text-green-700 border border-green-200'
                              : 'bg-gray-100 text-gray-600 border border-gray-200'
                            }`}
                        >
                          {internship.matchingSkills?.includes(skill) && '✓ '}
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => isAlreadyApplied(internship.id) ? undefined : handleApplyClick(internship)}
                    disabled={isAlreadyApplied(internship.id)}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${isAlreadyApplied(internship.id)
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:shadow-lg hover:scale-[1.02]'
                      }`}
                  >
                    {isAlreadyApplied(internship.id) ? (
                      <>
                        <Check className="w-5 h-5" />
                        Applied
                      </>
                    ) : (
                      'Apply Now'
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'my-profile' && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-10 border border-gray-100">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h2>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
                  <p className="text-sm text-gray-600 mb-1">Full Name</p>
                  <p className="text-lg font-semibold text-gray-900">{studentData.name}</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="text-lg font-semibold text-gray-900">{studentData.email}</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
                  <p className="text-sm text-gray-600 mb-1">CGPA</p>
                  <p className="text-lg font-semibold text-gray-900">{studentData.cgpa} / 10.0</p>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
                  <p className="text-sm text-gray-600 mb-1">Year & Branch</p>
                  <p className="text-lg font-semibold text-gray-900">Year {studentData.year} - {studentData.branch}</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
                <p className="text-sm text-gray-600 mb-3">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {studentData.skills.map((skill, index) => (
                    <span key={index} className="bg-white text-indigo-700 px-4 py-2 rounded-full text-sm font-medium border border-indigo-200">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setActiveTab('profile')}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">My Applications</h2>

          {appliedInternships.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-16 text-center border border-gray-100">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600 mb-4">No applications yet</p>
              <button
                onClick={() => setActiveTab('recommendations')}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition font-medium"
              >
                Browse Internships
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {appliedInternships.map((application) => (
                <div
                  key={application.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{application.title}</h3>
                      <p className="text-gray-600">{application.company}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
                      <Clock className="w-4 h-4" />
                      Pending
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Applied On</p>
                      <p className="font-semibold text-gray-900">{application.appliedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Match Score</p>
                      <p className="font-semibold text-gray-900">{application.matchScore}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold text-gray-900">{application.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Duration</p>
                      <p className="font-semibold text-gray-900">{application.duration}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-sm text-gray-600 mb-1">Availability</p>
                    <p className="text-gray-900">{application.availability}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showApplicationModal && selectedInternship && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedInternship.title}</h3>
                <p className="text-gray-600">{selectedInternship.company}</p>
              </div>
              <button
                onClick={() => setShowApplicationModal(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Stipend</p>
                    <p className="font-semibold text-gray-900">{selectedInternship.stipend}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-900">{selectedInternship.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Location</p>
                    <p className="font-semibold text-gray-900">{selectedInternship.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Match Score</p>
                    <p className="font-semibold text-gray-900">{selectedInternship.matchScore}%</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Letter *
                </label>
                <textarea
                  value={applicationData.coverLetter}
                  onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                  placeholder="Tell us why you're a great fit..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  When can you start? *
                </label>
                <input
                  type="text"
                  value={applicationData.availability}
                  onChange={(e) => setApplicationData({ ...applicationData, availability: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="e.g., Immediately / After 2 weeks"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowApplicationModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={submitApplication}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition font-semibold"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}