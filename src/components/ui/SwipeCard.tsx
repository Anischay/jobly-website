'use client';

import React, { useState } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { FiX, FiCheck, FiChevronDown, FiChevronUp, FiGithub, FiLinkedin, FiTwitter, FiGlobe, FiFileText } from 'react-icons/fi';
import { CandidateProfile, CompanyProfile } from '../../types/profile';
import PDFViewer from './PDFViewer';

interface SwipeCardProps {
  data: CandidateProfile | CompanyProfile;
  onSwipe: (direction: 'left' | 'right') => void;
  perspective: 'recruiter' | 'company';
}

export default function SwipeCard({ data, onSwipe, perspective }: SwipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const controls = useAnimation();

  const handleDragEnd = async (_: any, info: PanInfo) => {
    const swipeThreshold = 100;
    if (Math.abs(info.offset.x) > swipeThreshold) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      await controls.start({
        x: direction === 'right' ? 200 : -200,
        opacity: 0,
        transition: { duration: 0.3 }
      });
      onSwipe(direction);
    } else {
      controls.start({ x: 0, transition: { type: 'spring' } });
    }
  };

  const isCandidate = 'videoIntro' in data;
  const candidateData = isCandidate ? data as CandidateProfile : null;

  return (
    <>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        className={`w-full max-w-lg mx-auto bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl
                    ${isExpanded ? 'min-h-[500px]' : 'h-[500px]'} transition-all duration-500`}
      >
        {/* Main Card Content */}
        <div className="relative p-6 mt-16">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {candidateData?.resume && (
              <button
                onClick={() => setShowResume(true)}
                className="bg-violet-500/20 hover:bg-violet-500/30 text-violet-300 p-2 rounded-full transition-colors"
                title="View Resume"
              >
                <FiFileText size={20} />
              </button>
            )}
            <div className="bg-violet-500/20 px-3 py-1 rounded-full">
              <span className="text-violet-200 font-medium">{data.matchPercentage}% Match</span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <img
              src={isCandidate ? (data as CandidateProfile).avatar : (data as CompanyProfile).logo}
              alt={data.name}
              className="w-20 h-20 rounded-2xl object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-white">{data.name}</h3>
              <p className="text-gray-400">
                {isCandidate ? (data as CandidateProfile).title : (data as CompanyProfile).industry}
              </p>
              <p className="text-gray-500">{data.location}</p>
            </div>
          </div>

          <p className="text-gray-300 mb-6">{isCandidate ? (data as CandidateProfile).bio : (data as CompanyProfile).description}</p>

          {/* Skills/Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(isCandidate ? (data as CandidateProfile).skills : (data as CompanyProfile).techStack)?.map((skill, index) => (
              <span
                key={index}
                className="bg-violet-500/20 text-violet-200 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
          >
            {isExpanded ? (
              <>
                Show Less <FiChevronUp />
              </>
            ) : (
              <>
                Show More <FiChevronDown />
              </>
            )}
          </button>

          {/* Video Intro */}
          {(data as CandidateProfile).videoIntro && (
            <div className="rounded-xl overflow-hidden relative z-50">
              <video
                src={(data as CandidateProfile).videoIntro?.url}
                poster={(data as CandidateProfile).videoIntro?.thumbnail}
                controls
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="p-6 border-t border-white/10">
            {isCandidate ? (
              // Candidate Expanded Content
              <div className="space-y-8">
                {/* Video Intro */}
                {(data as CandidateProfile).videoIntro && (
                  <div className="rounded-xl overflow-hidden relative z-10">
                    <video
                      src={(data as CandidateProfile).videoIntro?.url}
                      poster={(data as CandidateProfile).videoIntro?.thumbnail}
                      controls
                      className="w-full"
                    />
                  </div>
                )}

                {/* Projects */}
                {(data as CandidateProfile).projects && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Projects</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(data as CandidateProfile).projects?.map(project => (
                        <div key={project.id} className="bg-white/5 rounded-xl p-4">
                          <h5 className="font-medium text-white mb-2">{project.title}</h5>
                          <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.technologies.map((tech, index) => (
                              <span key={index} className="text-xs text-violet-300">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-3">
                            {project.liveUrl && (
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" 
                                 className="text-violet-400 hover:text-violet-300">
                                <FiGlobe />
                              </a>
                            )}
                            {project.githubUrl && (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                 className="text-violet-400 hover:text-violet-300">
                                <FiGithub />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Work Experience */}
                {(data as CandidateProfile).workExperience && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Experience</h4>
                    <div className="space-y-4">
                      {(data as CandidateProfile).workExperience?.map((work, index) => (
                        <div key={index} className="bg-white/5 rounded-xl p-4">
                          <h5 className="font-medium text-white">{work.role}</h5>
                          <p className="text-violet-400">{work.company}</p>
                          <p className="text-gray-500 text-sm">{work.duration}</p>
                          <p className="text-gray-400 mt-2">{work.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Company Expanded Content
              <div className="space-y-8">
                {/* Culture */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Company Culture</h4>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-300 mb-4">{(data as CompanyProfile).culture.worklife}</p>
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-white mb-2">Values</h5>
                        <div className="flex flex-wrap gap-2">
                          {(data as CompanyProfile).culture.values.map((value, index) => (
                            <span key={index} className="bg-violet-500/20 text-violet-200 px-3 py-1 rounded-full text-sm">
                              {value}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-white mb-2">Benefits</h5>
                        <div className="flex flex-wrap gap-2">
                          {(data as CompanyProfile).culture.benefits.map((benefit, index) => (
                            <span key={index} className="bg-violet-500/20 text-violet-200 px-3 py-1 rounded-full text-sm">
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Highlights */}
                {(data as CompanyProfile).teamHighlights && (
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-4">Meet the Team</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(data as CompanyProfile).teamHighlights?.map((member, index) => (
                        <div key={index} className="bg-white/5 rounded-xl p-4">
                          <div className="flex items-center gap-3 mb-3">
                            {member.image && (
                              <img src={member.image} alt={member.name} className="w-12 h-12 rounded-full" />
                            )}
                            <div>
                              <h5 className="font-medium text-white">{member.name}</h5>
                              <p className="text-gray-400 text-sm">{member.role}</p>
                            </div>
                          </div>
                          <p className="text-gray-300 italic">"{member.quote}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Social Links */}
            {data.socialLinks && (
              <div className="flex gap-4 mt-6 pt-6 border-t border-white/10">
                {data.socialLinks.linkedin && (
                  <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                     className="text-violet-400 hover:text-violet-300">
                    <FiLinkedin size={20} />
                  </a>
                )}
                {data.socialLinks.github && (
                  <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer"
                     className="text-violet-400 hover:text-violet-300">
                    <FiGithub size={20} />
                  </a>
                )}
                {data.socialLinks.twitter && (
                  <a href={data.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                     className="text-violet-400 hover:text-violet-300">
                    <FiTwitter size={20} />
                  </a>
                )}
                {data.socialLinks.portfolio && (
                  <a href={data.socialLinks.portfolio} target="_blank" rel="noopener noreferrer"
                     className="text-violet-400 hover:text-violet-300">
                    <FiGlobe size={20} />
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        {/* Swipe Actions */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
          <button
            onClick={() => onSwipe('left')}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-500 p-4 rounded-full transition-colors"
          >
            <FiX size={24} />
          </button>
          <button
            onClick={() => onSwipe('right')}
            className="bg-green-500/20 hover:bg-green-500/30 text-green-500 p-4 rounded-full transition-colors"
          >
            <FiCheck size={24} />
          </button>
        </div>
      </motion.div>

      {/* PDF Viewer Modal */}
      {showResume && candidateData?.resume && (
        <PDFViewer
          url={candidateData.resume.url}
          fileName={candidateData.resume.fileName}
          onClose={() => setShowResume(false)}
        />
      )}
    </>
  );
} 