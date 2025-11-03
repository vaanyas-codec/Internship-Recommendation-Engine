'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InternshipsPage() {
    const [activeTab, setActiveTab] = useState<'browse' | 'applied'>('browse');
    const [resume, setResume] = useState<File | null>(null);
    const [resumeName, setResumeName] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [newSkill, setNewSkill] = useState('');
    const [applied, setApplied] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const internships = [
        {
            id: '1',
            role: 'Software Engineering Intern',
            company: 'TechNova',
            location: 'Remote',
            stipend: '₹15,000/month',
            duration: '3 Months',
            description:
                'Work on frontend components and APIs for a cloud-based dashboard using React and Node.js.',
        },
        {
            id: '2',
            role: 'Data Science Intern',
            company: 'DataWave',
            location: 'Pune',
            stipend: '₹12,000/month',
            duration: '2 Months',
            description:
                'Assist in data cleaning, visualization, and building predictive models using Python and TensorFlow.',
        },
        {
            id: '3',
            role: 'Product Design Intern',
            company: 'UXify',
            location: 'Hybrid (Bangalore)',
            stipend: '₹10,000/month',
            duration: '3 Months',
            description:
                'Design intuitive UI/UX for web and mobile apps. Work closely with developers to refine user experience.',
        },
    ];

    const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/pdf') {
            setResume(file);
            setResumeName(file.name);
        } else {
            alert('Please upload a PDF file only.');
        }
    };

    const handleAddSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill('');
        }
    };

    const handleApply = (id: string) => {
        if (!resume) {
            alert('Please upload your resume before applying.');
            return;
        }
        if (!linkedin) {
            alert('Please add your LinkedIn profile link.');
            return;
        }
        setApplied([...applied, id]);
    };

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Internship Opportunities</h1>

            {/* Profile Input Section */}
            <div className="bg-white border rounded-lg shadow-sm p-6 mb-10">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">Your Profile</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Resume Upload */}
                    <div>
                        <p className="text-sm text-slate-600 mb-2">Upload Resume (PDF)</p>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf"
                            onChange={handleResumeUpload}
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="border px-4 py-2 rounded-md hover:bg-slate-50 text-sm"
                        >
                            {resume ? 'Change Resume' : 'Upload Resume'}
                        </button>
                        {resumeName && (
                            <p className="text-sm text-green-600 mt-2">✓ {resumeName} uploaded</p>
                        )}
                    </div>

                    {/* LinkedIn */}
                    <div>
                        <p className="text-sm text-slate-600 mb-2">LinkedIn Profile</p>
                        <input
                            type="url"
                            value={linkedin}
                            onChange={(e) => setLinkedin(e.target.value)}
                            placeholder="https://linkedin.com/in/yourname"
                            className="w-full border rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Skills */}
                    <div>
                        <p className="text-sm text-slate-600 mb-2">Skills</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Add a skill"
                                className="flex-1 border rounded-md px-3 py-2 text-sm"
                            />
                            <button
                                type="button"
                                onClick={handleAddSkill}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b mb-8">
                <button
                    onClick={() => setActiveTab('browse')}
                    className={`pb-2 text-sm font-medium ${activeTab === 'browse'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-slate-600 hover:text-blue-600'
                        }`}
                >
                    Browse Internships
                </button>
                <button
                    onClick={() => setActiveTab('applied')}
                    className={`pb-2 text-sm font-medium ${activeTab === 'applied'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-slate-600 hover:text-blue-600'
                        }`}
                >
                    My Applications
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'browse' ? (
                    <motion.div
                        key="browse"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {internships.map((internship) => (
                            <div
                                key={internship.id}
                                className="bg-white border rounded-lg shadow-sm p-6 hover:shadow-md transition"
                            >
                                <h3 className="text-lg font-semibold text-slate-800 mb-1">
                                    {internship.role}
                                </h3>
                                <p className="text-sm text-slate-600 mb-2">{internship.company}</p>
                                <p className="text-xs text-slate-500 mb-4">
                                    {internship.location} • {internship.duration} • {internship.stipend}
                                </p>
                                <p className="text-sm text-slate-700 mb-4">
                                    {internship.description}
                                </p>
                                <button
                                    onClick={() => handleApply(internship.id)}
                                    disabled={applied.includes(internship.id)}
                                    className={`w-full px-4 py-2 rounded-md text-sm font-medium transition ${applied.includes(internship.id)
                                            ? 'bg-green-100 text-green-700 cursor-default'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    {applied.includes(internship.id) ? 'Applied' : 'Apply'}
                                </button>
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="applied"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {applied.length === 0 ? (
                            <p className="text-slate-600">You haven’t applied to any internships yet.</p>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {internships
                                    .filter((i) => applied.includes(i.id))
                                    .map((i) => (
                                        <div
                                            key={i.id}
                                            className="bg-white border rounded-lg shadow-sm p-6 hover:shadow-md transition"
                                        >
                                            <h3 className="text-lg font-semibold text-slate-800 mb-1">
                                                {i.role}
                                            </h3>
                                            <p className="text-sm text-slate-600 mb-2">{i.company}</p>
                                            <p className="text-xs text-slate-500 mb-4">
                                                {i.location} • {i.duration} • {i.stipend}
                                            </p>
                                            <p className="text-sm text-slate-700 mb-4">{i.description}</p>
                                            <p className="text-green-700 text-sm font-medium">Status: Applied</p>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
