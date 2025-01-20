'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaHandshake, FaComments, FaClock, FaUsers, FaStar } from 'react-icons/fa';

export default function FeaturesPage() {
  const features = [
    {
      icon: <FaRobot className="w-16 h-16 text-blue-600" />,
      title: "AI-Powered Matchmaking",
      description: "Harness the power of AI to find candidates that perfectly align with your company's needs and culture."
    },
    {
      icon: <FaHandshake className="w-16 h-16 text-blue-600" />,
      title: "Project-Based Hiring",
      description: "Hire candidates for short-term collaborations to assess skills and compatibility before full-time commitment."
    },
    {
      icon: <FaComments className="w-16 h-16 text-blue-600" />,
      title: "Interactive Hiring",
      description: "Innovative features like informal meetups (coffee chats, lunch meetings) for meaningful connections."
    }
  ];

  const benefits = {
    companies: [
      "Save time with AI-powered matching",
      "Reduce hiring risks through trial periods",
      "Access to pre-screened talent pool",
      "Cultural fit assessment tools"
    ],
    candidates: [
      "Showcase skills beyond resumes",
      "Trial work opportunities",
      "Direct interaction with employers",
      "Culture-first approach to job matching"
    ]
  };

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          Platform Features
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Smart Matching Algorithm</h3>
            <p className="text-gray-300 mb-6">
              Our AI-powered matching system analyzes multiple factors including technical skills,
              experience, company culture, and career goals to create perfect matches.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                Skill-based matching
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                Culture fit analysis
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                Career path alignment
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Interactive Profiles</h3>
            <p className="text-gray-300 mb-6">
              Go beyond traditional resumes with rich multimedia profiles that showcase your
              personality and technical abilities.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                Video introductions
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                Project portfolios
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                Skill assessments
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Real-time Communication</h3>
            <p className="text-gray-300 mb-6">
              Connect instantly with your matches through our integrated communication platform.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                Instant messaging
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                Video calls
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                Interview scheduling
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Advanced Analytics</h3>
            <p className="text-gray-300 mb-6">
              Get insights into your matching performance and improve your chances of finding
              the perfect fit.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                Match analytics
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                Profile performance
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-violet-500" />
                Market insights
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 