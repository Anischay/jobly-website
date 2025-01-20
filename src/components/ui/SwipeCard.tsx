'use client';

import React, { useState } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { FiX, FiCheck, FiChevronDown, FiChevronUp, FiGithub, FiLinkedin, FiTwitter, FiGlobe, FiFileText } from 'react-icons/fi';
import { CandidateProfile, CompanyProfile } from '../../types/profile';
import PDFViewer from './PDFViewer';

interface SwipeCardProps {
  type: 'job' | 'candidate';
  onSwipe: (direction: 'left' | 'right') => void;
}

const sampleCandidates: CandidateProfile[] = [
  {
    name: "Sarah Chen",
    title: "Senior Full Stack Developer",
    avatar: "/avatars/sarah.jpg",
    location: "San Francisco, CA",
    bio: "Passionate about building scalable web applications with modern technologies. 8+ years of experience in full-stack development.",
    skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "GraphQL"],
    videoIntro: {
      url: "/videos/sarah-intro.mp4",
      thumbnail: "/videos/sarah-thumbnail.jpg"
    },
    resume: {
      url: "/resumes/sarah-chen-resume.pdf",
      preview: "/resumes/sarah-chen-preview.jpg"
    },
    projects: [
      {
        name: "E-commerce Platform",
        description: "Built a scalable e-commerce platform serving 100k+ monthly users",
        technologies: ["Next.js", "Node.js", "PostgreSQL"],
        link: "https://github.com/sarahchen/ecommerce"
      }
    ],
    socialLinks: {
      github: "https://github.com/sarahchen",
      linkedin: "https://linkedin.com/in/sarahchen",
      twitter: "https://twitter.com/sarahchen",
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
    description: "We're revolutionizing the way businesses leverage AI technology. Our platform helps companies implement AI solutions efficiently and ethically.",
    teamHighlights: [
      {
        name: "John Smith",
        role: "Tech Lead",
        image: "/team/john-smith.jpg",
        quote: "The best part about working here is the freedom to innovate and experiment."
      },
      {
        name: "Emily Wang",
        role: "Senior Developer",
        image: "/team/emily-wang.jpg",
        quote: "We have a great mentorship culture and everyone is always willing to help."
      }
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/company/innovate-ai",
      twitter: "https://twitter.com/innovateai",
      website: "https://innovate-ai.com"
    }
  }
];

export default function SwipeCard({ type, onSwipe }: SwipeCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();

  const currentProfile = type === 'job' ? sampleCompanies[currentIndex] : sampleCandidates[currentIndex];

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
      setCurrentIndex((prev) => (prev + 1) % (type === 'job' ? sampleCompanies.length : sampleCandidates.length));
      controls.set({ x: 0, opacity: 1 });
    } else {
      controls.start({ x: 0, opacity: 1 });
    }
  };

  if (!currentProfile) return null;

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
        {type === 'candidate' && (currentProfile as CandidateProfile).videoIntro && (
          <div className="absolute inset-0 flex items-center justify-center">
            <video
              className="w-full h-full object-cover"
              poster={(currentProfile as CandidateProfile).videoIntro?.thumbnail}
              controls
            >
              <source src={(currentProfile as CandidateProfile).videoIntro?.url} type="video/mp4" />
            </video>
          </div>
        )}
        <img
          src={type === 'job' ? (currentProfile as CompanyProfile).logo : (currentProfile as CandidateProfile).avatar}
          alt={currentProfile.name}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-gray-800"
        />
      </div>

      <div className="px-6 pt-16 pb-4">
        <h2 className="text-2xl font-bold text-center mb-1">{currentProfile.name}</h2>
        <p className="text-gray-400 text-center mb-4">
          {type === 'job' ? (currentProfile as CompanyProfile).industry : (currentProfile as CandidateProfile).title}
        </p>
        <p className="text-gray-300 text-center mb-4">{currentProfile.location}</p>

        <div className="flex justify-center space-x-4 mb-4">
          {currentProfile.socialLinks?.github && (
            <a href={currentProfile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FiGithub className="w-6 h-6" />
            </a>
          )}
          {currentProfile.socialLinks?.linkedin && (
            <a href={currentProfile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FiLinkedin className="w-6 h-6" />
            </a>
          )}
          {currentProfile.socialLinks?.twitter && (
            <a href={currentProfile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <FiTwitter className="w-6 h-6" />
            </a>
          )}
          {currentProfile.socialLinks?.website && (
            <a href={currentProfile.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
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
            <p className="text-gray-300 mb-4">{currentProfile.description || (currentProfile as CandidateProfile).bio}</p>

            {type === 'candidate' && (
              <>
                <h3 className="text-lg font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(currentProfile as CandidateProfile).skills.map((skill) => (
                    <span key={skill} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>

                {(currentProfile as CandidateProfile).resume && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Resume</h3>
                    <PDFViewer url={(currentProfile as CandidateProfile).resume!.url} />
                  </div>
                )}

                {(currentProfile as CandidateProfile).projects && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Projects</h3>
                    {(currentProfile as CandidateProfile).projects.map((project) => (
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

            {type === 'job' && (currentProfile as CompanyProfile).teamHighlights && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Team Highlights</h3>
                {(currentProfile as CompanyProfile).teamHighlights.map((member) => (
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