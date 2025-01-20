'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeCard from '../../components/ui/SwipeCard';
import { FiToggleLeft, FiToggleRight, FiBell } from 'react-icons/fi';
import { CandidateProfile, CompanyProfile } from '../../types/profile';

export default function MatchPage() {
  const [showingJobs, setShowingJobs] = useState(true);
  const [notifications, setNotifications] = useState<string[]>([]);

  const handleSwipe = (direction: 'left' | 'right') => {
    console.log(`Swiped ${direction}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="max-w-md mx-auto relative">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setShowingJobs(!showingJobs)}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            {showingJobs ? (
              <>
                <FiToggleLeft className="w-6 h-6" />
                <span>Viewing Jobs</span>
              </>
            ) : (
              <>
                <FiToggleRight className="w-6 h-6" />
                <span>Viewing Candidates</span>
              </>
            )}
          </button>
          <button className="text-gray-400 hover:text-white transition-colors">
            <FiBell className="w-6 h-6" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={showingJobs ? 'jobs' : 'candidates'}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <SwipeCard
              type={showingJobs ? 'job' : 'candidate'}
              onSwipe={handleSwipe}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 