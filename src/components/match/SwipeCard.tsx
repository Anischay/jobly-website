import React from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { Job, Candidate } from '../../types';
import Image from 'next/image';
import { FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaCode } from 'react-icons/fa';
import { FiX, FiCheck } from 'react-icons/fi';

interface SwipeCardProps {
  item: Job | Candidate;
  onSwipe: (direction: 'left' | 'right') => void;
  isFirst: boolean;
  type: 'job' | 'candidate';
}

export default function SwipeCard({ item, onSwipe, isFirst, type }: SwipeCardProps) {
  const handleDragEnd = (event: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe(info.offset.x > 0 ? 'right' : 'left');
    }
  };

  const isJob = type === 'job';
  const job = item as Job;
  const candidate = item as Candidate;

  return (
    <motion.div
      className={`absolute w-full ${isFirst ? 'z-10' : 'z-0'}`}
      style={{ maxWidth: '400px', left: '50%', x: '-50%' }}
      initial={isFirst ? { scale: 1 } : { scale: 0.95 }}
      animate={isFirst ? { scale: 1 } : { scale: 0.95 }}
      exit={{ x: 0, opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      drag={isFirst ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.05 }}
    >
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header with match percentage */}
        <div className="relative h-48 bg-gradient-to-br from-violet-600 to-indigo-600">
          {isJob ? (
            <Image
              src={job.companyLogo}
              alt={job.company}
              width={80}
              height={80}
              className="absolute bottom-4 left-4 rounded-xl bg-white p-2"
            />
          ) : (
            <Image
              src={candidate.avatar}
              alt={candidate.name}
              width={80}
              height={80}
              className="absolute bottom-4 left-4 rounded-full border-4 border-white"
            />
          )}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-violet-600">
            {item.matchPercentage}% Match
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title Section */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900">
              {isJob ? job.role : candidate.name}
            </h3>
            <p className="text-violet-600 font-medium">
              {isJob ? job.company : candidate.title}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-violet-500" />
              <span>{isJob ? job.location : candidate.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBriefcase className="text-violet-500" />
              <span>{isJob ? job.salary : `${candidate.experience} experience`}</span>
            </div>
            {!isJob && (
              <div className="flex items-center gap-2">
                <FaGraduationCap className="text-violet-500" />
                <span>{candidate.education}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <FaCode className="text-violet-500" />
              <span className="font-medium text-gray-900">Skills</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(isJob ? job.skills : candidate.skills).map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-violet-100 text-violet-600 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Description/Bio */}
          <p className="mt-6 text-gray-600 line-clamp-3">
            {isJob ? job.description : candidate.bio}
          </p>
        </div>
      </div>
    </motion.div>
  );
} 