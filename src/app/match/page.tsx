'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeCard from '../../components/ui/SwipeCard';
import FilterPanel, { FilterOptions } from '../../components/ui/FilterPanel';
import { FiToggleLeft, FiToggleRight, FiBell, FiFilter } from 'react-icons/fi';
import type { CandidateProfile, CompanyProfile } from '../../types/profile';

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions | null>(null);
  const [filteredProfiles, setFilteredProfiles] = useState({
    candidates: sampleCandidates,
    companies: sampleCompanies,
  });

  const handleApplyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters);
    
    // Filter candidates
    const filteredCandidates = sampleCandidates.filter(candidate => {
      const locationMatch = !filters.location || 
        candidate.location.toLowerCase().includes(filters.location.toLowerCase());
      
      const skillsMatch = filters.skills.length === 0 || 
        filters.skills.every(skill => 
          candidate.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
        );

      // Add more filtering logic here

      return locationMatch && skillsMatch;
    });

    // Filter companies
    const filteredCompanies = sampleCompanies.filter(company => {
      const locationMatch = !filters.location || 
        company.location.toLowerCase().includes(filters.location.toLowerCase());
      
      const skillsMatch = filters.skills.length === 0 || 
        filters.skills.every(skill => 
          company.techStack.some(s => s.toLowerCase().includes(skill.toLowerCase()))
        );

      // Add more filtering logic here

      return locationMatch && skillsMatch;
    });

    setFilteredProfiles({
      candidates: filteredCandidates,
      companies: filteredCompanies,
    });
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    const message = direction === 'right' 
      ? `You liked ${showingJobs ? filteredProfiles.companies[0].name : filteredProfiles.candidates[0].name}!`
      : `You passed on ${showingJobs ? filteredProfiles.companies[0].name : filteredProfiles.candidates[0].name}`;
    
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
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className={`text-gray-400 hover:text-white transition-colors ${activeFilters ? 'text-violet-500' : ''}`}
            >
              <FiFilter className="w-6 h-6" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <FiBell className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* No Results Message */}
        {((showingJobs && filteredProfiles.companies.length === 0) || 
          (!showingJobs && filteredProfiles.candidates.length === 0)) && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No matches found with current filters.
              <button
                onClick={() => setActiveFilters(null)}
                className="text-violet-500 hover:text-violet-400 ml-2"
              >
                Clear filters
              </button>
            </p>
          </div>
        )}

        {/* Cards */}
        <AnimatePresence mode="wait">
          {((showingJobs && filteredProfiles.companies.length > 0) || 
            (!showingJobs && filteredProfiles.candidates.length > 0)) && (
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
                profile={showingJobs ? filteredProfiles.companies[0] : filteredProfiles.candidates[0]}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Panel */}
        <FilterPanel
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApplyFilters={handleApplyFilters}
        />

        {/* Notifications */}
        <AnimatePresence>
          {notifications.map((notification, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-4 right-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg"
            >
              {notification}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 