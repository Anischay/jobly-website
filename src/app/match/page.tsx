'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeCard from '../../components/ui/SwipeCard';
import { FiToggleLeft, FiToggleRight, FiBell } from 'react-icons/fi';
import { CandidateProfile, CompanyProfile } from '../../types';

const sampleCandidates: CandidateProfile[] = [
  {
    name: "Sarah Chen",
    title: "Senior Full Stack Developer",
    avatar: "/avatars/sarah.jpg",
    location: "San Francisco, CA",
    bio: "Passionate about building scalable web applications with modern technologies. 5+ years of experience in full-stack development.",
    skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "GraphQL"],
    videoIntro: {
      url: "/videos/sarah-intro.mp4",
      thumbnail: "/videos/sarah-thumb.jpg"
    },
    resume: {
      url: "/resumes/sarah-chen-resume.pdf",
      preview: "/resumes/sarah-chen-preview.jpg"
    },
    projects: [
      {
        name: "E-commerce Platform",
        description: "Built a scalable e-commerce platform serving 100k+ users",
        technologies: ["React", "Node.js", "MongoDB"],
        link: "https://github.com/sarahchen/ecommerce"
      }
    ],
    workExperience: [
      {
        role: "Senior Developer",
        company: "TechCorp",
        duration: "2020-Present",
        description: "Leading a team of 5 developers, architecting cloud solutions"
      }
    ],
    socialLinks: {
      github: "https://github.com/sarahchen",
      linkedin: "https://linkedin.com/in/sarahchen",
      website: "https://sarahchen.dev"
    }
  }
];

const sampleCompanies: CompanyProfile[] = [
  {
    name: "Innovate AI",
    logo: "/logos/innovate-ai.svg",
    location: "San Francisco, CA",
    industry: "Artificial Intelligence",
    description: "We're revolutionizing the way businesses leverage AI technology. Join us in building the future of machine learning applications.",
    techStack: ["Python", "TensorFlow", "React", "AWS"],
    matchPercentage: 85,
    culture: {
      worklife: "We believe in flexible work hours and remote-first culture",
      values: ["Innovation", "Collaboration", "Growth Mindset"],
      benefits: ["Competitive Salary", "Health Insurance", "Learning Budget"]
    },
    teamHighlights: [
      {
        name: "John Smith",
        role: "Tech Lead",
        image: "/team/john.jpg",
        quote: "The best part about working here is the freedom to innovate and experiment."
      }
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/company/innovate-ai",
      twitter: "https://twitter.com/innovateai",
      website: "https://innovate-ai.com"
    }
  }
];

export default function MatchPage() {
  const [showingJobs, setShowingJobs] = useState(true);
  const [notifications, setNotifications] = useState<string[]>([]);

  const handleSwipe = (direction: 'left' | 'right') => {
    const message = direction === 'right' 
      ? `You liked ${showingJobs ? sampleCompanies[0].name : sampleCandidates[0].name}!`
      : `You passed on ${showingJobs ? sampleCompanies[0].name : sampleCandidates[0].name}`;
    
    setNotifications(prev => [...prev, message]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="max-w-md mx-auto relative">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setShowingJobs(!showingJobs)}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            {showingJobs ? (
              <>
                <FiToggleLeft className="w-6 h-6" />
                <span>Viewing Jobs</span>
              </>
            ) : (
              <>
                <FiToggleRight className="w-6 h-6" />
                <span>Viewing Candidates</span>
              </>
            )}
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <FiBell className="w-6 h-6" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={showingJobs ? 'jobs' : 'candidates'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SwipeCard
              type={showingJobs ? 'job' : 'candidate'}
              onSwipe={handleSwipe}
              profile={showingJobs ? sampleCompanies[0] : sampleCandidates[0]}
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {notifications.map((notification, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg"
            >
              {notification}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 