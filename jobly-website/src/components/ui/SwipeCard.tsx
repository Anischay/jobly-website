'use client';

import React, { useState } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { FiMapPin, FiBriefcase, FiAward, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Image from 'next/image';
import type { CandidateProfile, CompanyProfile, WorkExperience } from '../../types';

interface SwipeCardProps {
  type: 'job' | 'candidate';
  onSwipe: (direction: 'left' | 'right') => void;
  profile: CandidateProfile | CompanyProfile;
}

export default function SwipeCard({ type, onSwipe, profile }: SwipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const controls = useAnimation();

  const handleDragEnd = async (_event: unknown, info: PanInfo) => {
    const swipe = info.offset.x > 100 ? 'right' : info.offset.x < -100 ? 'left' : null;
    
    if (swipe) {
      setSwipeDirection(swipe);
      await controls.start({
        x: swipe === 'left' ? -500 : 500,
        opacity: 0,
        transition: { duration: 0.3 }
      });
      onSwipe(swipe);
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
      className="relative w-full aspect-[3/4] bg-gray-800 rounded-2xl overflow-hidden shadow-xl"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={type === 'job' ? (profile as CompanyProfile).logo : (profile as CandidateProfile).avatar}
          alt={profile.name}
          width={400}
          height={600}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80" />
      </div>

      {/* Swipe Indicators */}
      <motion.div
        className="absolute top-8 right-8 px-4 py-2 bg-green-500 text-white rounded-full font-semibold transform rotate-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: swipeDirection === 'right' ? 1 : 0 }}
      >
        LIKE
      </motion.div>
      <motion.div
        className="absolute top-8 left-8 px-4 py-2 bg-red-500 text-white rounded-full font-semibold transform -rotate-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: swipeDirection === 'left' ? 1 : 0 }}
      >
        PASS
      </motion.div>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
          <p className="text-lg text-white/90">
            {type === 'job' ? (profile as CompanyProfile).industry : (profile as CandidateProfile).title}
          </p>
          
          <div className="flex items-center gap-2 text-white/80">
            <FiMapPin className="w-4 h-4" />
            <span>{profile.location}</span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {(type === 'job' ? (profile as CompanyProfile).techStack : (profile as CandidateProfile).skills).map((skill: string) => (
              <span
                key={skill}
                className="px-3 py-1 bg-violet-600/30 text-violet-200 rounded-full text-sm"
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
            <div className="pt-4 space-y-4">
              <p className="text-white/80">{type === 'job' ? (profile as CompanyProfile).description : (profile as CandidateProfile).bio}</p>
              
              {type === 'candidate' && (profile as CandidateProfile).workExperience && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FiBriefcase className="w-5 h-5" />
                    Experience
                  </h3>
                  {(profile as CandidateProfile).workExperience?.map((exp: WorkExperience, index: number) => (
                    <div key={index} className="text-white/80">
                      <div className="font-medium">{exp.role} at {exp.company}</div>
                      <div className="text-sm">{exp.duration}</div>
                    </div>
                  ))}
                </div>
              )}

              {type === 'job' && (profile as CompanyProfile).culture && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <FiAward className="w-5 h-5" />
                    Culture & Benefits
                  </h3>
                  <div className="text-white/80">
                    <p>{(profile as CompanyProfile).culture.worklife}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(profile as CompanyProfile).culture.benefits.map((benefit: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-violet-600/30 text-violet-200 rounded-full text-sm"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <FiChevronUp className="w-5 h-5" />
              </>
            ) : (
              <>
                <span>Show More</span>
                <FiChevronDown className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
} 