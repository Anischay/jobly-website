'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiSearch, FiVideo, FiMessageSquare } from 'react-icons/fi';
import Countdown from '../components/ui/Countdown';

const steps = [
  {
    title: 'Create Your Profile',
    description: 'Set up your professional profile or company page with all the important details.',
    icon: FiSearch,
  },
  {
    title: 'Add Video Introduction',
    description: 'Stand out with a personal video introduction that showcases your personality.',
    icon: FiVideo,
  },
  {
    title: 'Start Matching',
    description: 'Use our AI-powered matching system to find the perfect fit.',
    icon: FiMessageSquare,
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 md:p-8 text-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/80" />
      </div>
      
      <div className="relative z-10 space-y-12 max-w-4xl mt-16">
        {/* Main Headline */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
              Revolutionizing
            </span>
            <br />
            <span className="text-white">Tech Recruitment</span>
          </h1>
        </motion.div>
        
        {/* Countdown Section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
            Launching April 7th, 2024 🚀
          </h2>
          <div className="flex justify-center">
            <Countdown />
          </div>
        </motion.div>

        {/* Value Proposition */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white">
            Find Your Perfect{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-600">
              Match
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join our exclusive platform where top tech talent meets innovative companies.
            Experience the future of tech recruitment.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex justify-center"
        >
          <Link
            href="/early-access"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-violet-600 text-white rounded-full font-medium hover:bg-violet-700 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] backdrop-blur-xl"
          >
            <span className="relative z-10">Get Early Access</span>
            <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
          </Link>
        </motion.div>

        {/* How it Works Section */}
        <motion.div 
          className="mt-32 space-y-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2 }}
                className="group bg-black/30 backdrop-blur-xl p-8 rounded-2xl border border-white/10 hover:border-violet-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,58,237,0.2)]"
              >
                <step.icon className="w-10 h-10 text-violet-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div 
          className="flex flex-wrap justify-center gap-8 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-500" />
            Smart Matching Algorithm
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-500" />
            Video Introductions
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-500" />
            Real-time Chat
          </div>
        </motion.div>
      </div>
    </main>
  );
} 