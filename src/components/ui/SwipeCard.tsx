'use client';

import React, { useState } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { FiX, FiCheck, FiChevronDown, FiChevronUp, FiGithub, FiLinkedin, FiTwitter, FiGlobe, FiFileText, FiDownload } from 'react-icons/fi';
import { CandidateProfile, CompanyProfile } from '../../types/profile';

interface SwipeCardProps {
  type: 'job' | 'candidate';
  onSwipe: (direction: 'left' | 'right') => void;
  profile: CandidateProfile | CompanyProfile;
}

export default function SwipeCard({ type, onSwipe, profile }: SwipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();

  const handleDragEnd = async (event: any, info: PanInfo) => {
    const swipe = info.offset.x;
    const threshold = 100;

    if (Math.abs(swipe) > threshold) {
      await controls.start({
        x: swipe * 2,
        opacity: 0,
        transition: { duration: 0.2 }
      });
      onSwipe(swipe > 0 ? 'right' : 'left');
      controls.set({ x: 0, opacity: 1 });
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
      className={`bg-gray-800 rounded-xl overflow-hidden shadow-xl transition-all duration-300 ${
        isExpanded ? 'min-h-[500px]' : 'h-[400px]'
      }`}
    >
      <div className="relative h-48 bg-gradient-to-b from-gray-700 to-gray-800">
        {type === 'candidate' && (profile as CandidateProfile).videoIntro && (
          <div className="absolute inset-0 flex items-center justify-center">
            <video
              className="w-full h-full object-cover"
              poster={(profile as CandidateProfile).videoIntro?.thumbnail}
              controls
            >
              <source src={(profile as CandidateProfile).videoIntro?.url} type="video/mp4" />
            </video>
          </div>
        )}
        <img
          src={type === 'job' ? (profile as CompanyProfile).logo : (profile as CandidateProfile).avatar}
          alt={profile.name}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-gray-800"
        />
      </div>

      <div className="px-6 pt-16 pb-4">
        <h2 className="text-2xl font-bold text-center mb-1">{profile.name}</h2>
        <p className="text-gray-400 text-center mb-4">
          {type === 'job' ? (profile as CompanyProfile).industry : (profile as CandidateProfile).title}
        </p>
        <p className="text-gray-300 text-center mb-4">{profile.location}</p>

        <div className="flex justify-center space-x-4 mb-4">
          {profile.socialLinks?.github && (
            <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FiGithub className="w-6 h-6" />
            </a>
          )}
          {profile.socialLinks?.linkedin && (
            <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FiLinkedin className="w-6 h-6" />
            </a>
          )}
          {profile.socialLinks?.twitter && (
            <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FiTwitter className="w-6 h-6" />
            </a>
          )}
          {profile.socialLinks?.website && (
            <a href={profile.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FiGlobe className="w-6 h-6" />
            </a>
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center text-gray-400 hover:text-white"
        >
          {isExpanded ? <FiChevronUp className="w-6 h-6" /> : <FiChevronDown className="w-6 h-6" />}
        </button>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <p className="text-gray-300 mb-4">
              {type === 'job' 
                ? (profile as CompanyProfile).description 
                : (profile as CandidateProfile).bio
              }
            </p>

            {type === 'candidate' && (
              <>
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(profile as CandidateProfile).skills.map((skill) => (
                    <span key={skill} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>

                {(profile as CandidateProfile).resume && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Resume</h3>
                    <a 
                      href={(profile as CandidateProfile).resume!.url}
                      download
                      className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                    >
                      <FiDownload className="w-5 h-5" />
                      <span>Download Resume</span>
                    </a>
                  </div>
                )}

                {(profile as CandidateProfile).projects && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Projects</h3>
                    {(profile as CandidateProfile).projects?.map((project) => (
                      <div key={project.name} className="mb-4">
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-gray-400">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="bg-gray-700 px-2 py-0.5 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {type === 'job' && (profile as CompanyProfile).teamHighlights && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Team Highlights</h3>
                {(profile as CompanyProfile).teamHighlights?.map((member) => (
                  <div key={member.name} className="flex items-center space-x-4 mb-4">
                    <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-gray-400 text-sm">{member.role}</p>
                      <p className="text-gray-300 text-sm italic mt-1">"{member.quote}"</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
        <button
          onClick={() => onSwipe('left')}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full"
        >
          <FiX className="w-6 h-6" />
        </button>
        <button
          onClick={() => onSwipe('right')}
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full"
        >
          <FiCheck className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
} 