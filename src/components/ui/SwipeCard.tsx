'use client';

import React from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { FiX, FiCheck } from 'react-icons/fi';
import type { CandidateProfile, CompanyProfile } from '../../types';

interface SwipeCardProps {
  type: 'job' | 'candidate';
  profile: CandidateProfile | CompanyProfile;
  onSwipe: (direction: 'left' | 'right') => void;
}

export default function SwipeCard({ type, profile, onSwipe }: SwipeCardProps) {
  const controls = useAnimation();

  const handleDragEnd = async (event: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (Math.abs(velocity) >= 500 || Math.abs(offset) >= 100) {
      const direction = offset > 0 ? 'right' : 'left';
      await controls.start({
        x: direction === 'right' ? 1000 : -1000,
        opacity: 0,
        transition: { duration: 0.2 }
      });
      onSwipe(direction);
    } else {
      controls.start({ x: 0, opacity: 1 });
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      className="absolute inset-0"
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${type === 'job' ? (profile as CompanyProfile).logo : (profile as CandidateProfile).avatar})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black" />

        {/* Match Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent-purple/90 backdrop-blur text-white text-sm font-medium">
          {(profile as any).matchPercentage}% Match
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold text-white mb-2">
            {type === 'job' ? (profile as CompanyProfile).name : (profile as CandidateProfile).name}
          </h3>
          <p className="text-lg text-white/90 mb-1">
            {type === 'job' ? (profile as CompanyProfile).industry : (profile as CandidateProfile).title}
          </p>
          <p className="text-white/80 mb-4">
            {profile.location}
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(type === 'job' ? (profile as CompanyProfile).techStack : (profile as CandidateProfile).skills).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-white/90 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => onSwipe('left')}
              className="p-4 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition-colors"
            >
              <FiX size={24} className="text-white" />
            </button>
            <button
              onClick={() => onSwipe('right')}
              className="p-4 rounded-full bg-accent-purple hover:bg-accent-purple/80 transition-colors"
            >
              <FiCheck size={24} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 