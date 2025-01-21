'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFilter, FiX, FiMapPin, FiDollarSign, FiStar, FiSearch } from 'react-icons/fi';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  location: string;
  skills: string[];
  experienceLevel: string;
  salary: {
    min: number;
    max: number;
  };
  remote: boolean;
}

const experienceLevels = ['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Executive'];

export default function FilterPanel({ isOpen, onClose, onApplyFilters }: FilterPanelProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    location: '',
    skills: [],
    experienceLevel: '',
    salary: {
      min: 0,
      max: 200000,
    },
    remote: false,
  });

  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = (skill: string) => {
    if (skill && !filters.skills.includes(skill)) {
      setFilters(prev => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <FiFilter className="mr-2" />
                  Filters
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <FiX className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="block text-white mb-2 font-medium">Location</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter location..."
                    className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-violet-600 outline-none"
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <label className="block text-white mb-2 font-medium">Skills</label>
                <div className="relative mb-2">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill(skillInput)}
                    placeholder="Add skills..."
                    className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-violet-600 outline-none"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-violet-600/30 text-violet-200 rounded-full flex items-center gap-1"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="hover:text-white"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <label className="block text-white mb-2 font-medium">Experience Level</label>
                <div className="grid grid-cols-2 gap-2">
                  {experienceLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setFilters(prev => ({ ...prev, experienceLevel: level }))}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        filters.experienceLevel === level
                          ? 'bg-violet-600 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary Range */}
              <div className="mb-6">
                <label className="block text-white mb-2 font-medium">Salary Range</label>
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={filters.salary.min}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        salary: { ...prev.salary, min: Number(e.target.value) }
                      }))}
                      placeholder="Min"
                      className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-violet-600 outline-none"
                    />
                  </div>
                  <span className="text-gray-400">to</span>
                  <div className="relative flex-1">
                    <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      value={filters.salary.max}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        salary: { ...prev.salary, max: Number(e.target.value) }
                      }))}
                      placeholder="Max"
                      className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-violet-600 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Remote Option */}
              <div className="mb-8">
                <label className="flex items-center space-x-3 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.remote}
                    onChange={(e) => setFilters(prev => ({ ...prev, remote: e.target.checked }))}
                    className="w-5 h-5 rounded border-gray-600 text-violet-600 focus:ring-violet-600 focus:ring-offset-gray-900"
                  />
                  <span>Remote Only</span>
                </label>
              </div>

              {/* Apply Button */}
              <button
                onClick={handleApply}
                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white py-3 rounded-lg font-medium transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 