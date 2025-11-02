'use client';

import React, { useState } from 'react';
import { Briefcase, GraduationCap, Search, Code, TrendingUp, Mail, User, Award } from 'lucide-react';

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

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
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

  const calculateMatchScore = (internship: Internship) => {
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
      .filter(internship => internship.matchScore! >= 30)
      .sort((a, b) => b.matchScore! - a.matchScore!);

    setRecommendations(matches);
    setActiveTab('recommendations');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Briefcase className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-800">InternMatch AI</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-4 py-2 rounded-lg transition ${activeTab === 'home'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-indigo-50'
                  }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-2 rounded-lg transition ${activeTab === 'profile'
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-indigo-50'
                  }`}
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Home Page */}
      {activeTab === 'home' && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Find Your Perfect Internship
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              AI-powered recommendations based on your skills and CGPA
            </p>
            <button
              onClick={() => setActiveTab('profile')}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
            >
              Get Started
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <GraduationCap className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
              <p className="text-gray-600">
                Our AI analyzes your profile and matches you with the most suitable internships
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Code className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Skill-Based</h3>
              <p className="text-gray-600">
                Get recommendations based on your technical skills and academic performance
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <TrendingUp className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Top Companies</h3>
              <p className="text-gray-600">
                Access internships from leading tech companies and startups
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Page */}
      {activeTab === 'profile' && (
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={studentData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={studentData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Award className="w-4 h-4 inline mr-2" />
                    CGPA
                  </label>
                  <input
                    type="number"
                    name="cgpa"
                    value={studentData.cgpa}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    max="10"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="8.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Year
                  </label>
                  <select
                    name="year"
                    value={studentData.year}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>Year {year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Branch
                </label>
                <select
                  name="branch"
                  value={studentData.branch}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Code className="w-4 h-4 inline mr-2" />
                  Skills
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Add a skill (e.g., Python, React)"
                  />
                  <button
                    onClick={addSkill}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {studentData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-indigo-500 hover:text-indigo-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={generateRecommendations}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Find Internships
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Page */}
      {activeTab === 'recommendations' && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Recommended Internships for You
          </h2>

          {recommendations.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-xl text-gray-600">
                No matching internships found. Try updating your profile or adding more skills.
              </p>
              <button
                onClick={() => setActiveTab('profile')}
                className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Update Profile
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {recommendations.map((internship) => (
                <div
                  key={internship.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{internship.title}</h3>
                      <p className="text-gray-600">{internship.company}</p>
                    </div>
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                      {internship.matchScore}% Match
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <p className="text-gray-700">
                      <span className="font-semibold">Stipend:</span> {internship.stipend}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Duration:</span> {internship.duration}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Location:</span> {internship.location}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Min CGPA:</span> {internship.minCGPA}
                    </p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {internship.requiredSkills.map((skill, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm ${internship.matchingSkills?.includes(skill)
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                            }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}