'use client';

import React, { useState } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { FiX, FiCheck, FiChevronDown, FiChevronUp, FiMapPin, FiBriefcase, FiAward } from 'react-icons/fi';
import type { CandidateProfile, CompanyProfile } from '../../types';

interface SwipeCardProps {
  type: 'job' | 'candidate';
  profile: CandidateProfile | CompanyProfile;
  onSwipe: (direction: 'left' | 'right') => void;
}

export default function SwipeCard({ type, profile, onSwipe }: SwipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const controls = useAnimation();

  const handleDragEnd = async (event: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(velocity) >= 500 || Math.abs(offset) >= 100) {
      const direction = offset > 0 ? 'right' : 'left';
      setSwipeDirection(direction);
      await controls.start({
        x: direction === 'right' ? 1000 : -1000,
        opacity: 0,
        rotate: direction === 'right' ? 20 : -20,
        transition: { duration: 0.2 }
      });
      onSwipe(direction);
    } else {
      controls.start({ x: 0, opacity: 1, rotate: 0 });
    }
  };

  const handleDrag = (event: any, info: PanInfo) => {
    const offset = info.offset.x;
    const direction = offset > 0 ? 'right' : 'left';
    setSwipeDirection(Math.abs(offset) > 50 ? direction : null);
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      animate={controls}
      className="absolute inset-0"
      style={{ perspective: 1000 }}
    >
      <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
        isExpanded ? 'min-h-[600px]' : 'h-[500px]'
      }`}>
        {/* Background Image with Gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 hover:scale-105"
          style={{ backgroundImage: `url(${type === 'job' ? (profile as CompanyProfile).logo : (profile as CandidateProfile).avatar})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black" />

        {/* Swipe Indicators */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          swipeDirection === 'right' ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="bg-green-500/80 backdrop-blur-sm text-white px-6 py-3 rounded-lg text-2xl font-bold rotate-12">
            LIKE
          </div>
        </div>
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          swipeDirection === 'left' ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="bg-red-500/80 backdrop-blur-sm text-white px-6 py-3 rounded-lg text-2xl font-bold -rotate-12">
            PASS
          </div>
        </div>

        {/* Match Badge */}
        <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium shadow-lg">
          {(profile as any).matchPercentage}% Match
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-3xl font-bold text-white mb-2">
            {type === 'job' ? (profile as CompanyProfile).name : (profile as CandidateProfile).name}
          </h3>
          <div className="space-y-3 mb-4">
            <div className="flex items-center text-white/90">
              <FiBriefcase className="w-5 h-5 mr-2" />
              <span>{type === 'job' ? (profile as CompanyProfile).industry : (profile as CandidateProfile).title}</span>
            </div>
            <div className="flex items-center text-white/90">
              <FiMapPin className="w-5 h-5 mr-2" />
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(type === 'job' ? (profile as CompanyProfile).techStack : (profile as CandidateProfile).skills).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-white/90 text-sm hover:bg-white/20 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Expandable Content */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0 }}
            className="overflow-hidden"
          >
            <div className="text-white/90 space-y-4 pt-4">
              <p>{type === 'job' ? (profile as CompanyProfile).description : (profile as CandidateProfile).bio}</p>
              {type === 'candidate' && (profile as CandidateProfile).workExperience && (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <FiAward className="w-5 h-5 mr-2" />
                    Experience
                  </h4>
                  {(profile as CandidateProfile).workExperience?.map((exp, index) => (
                    <div key={index} className="ml-7 mb-2">
                      <div className="font-medium">{exp.role} at {exp.company}</div>
                      <div className="text-sm text-white/70">{exp.duration}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Expand Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center mt-4 text-white/80 hover:text-white transition-colors"
          >
            {isExpanded ? <FiChevronUp className="w-6 h-6" /> : <FiChevronDown className="w-6 h-6" />}
          </button>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSwipe('left')}
              className="p-4 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition-colors"
            >
              <FiX size={24} className="text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSwipe('right')}
              className="p-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition-colors"
            >
              <FiCheck size={24} className="text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 