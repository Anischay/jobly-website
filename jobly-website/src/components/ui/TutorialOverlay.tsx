'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function TutorialOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-2xl">
        <h2 className="text-2xl font-bold text-white mb-4">Welcome to Jobly!</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-xl">
              👆
            </div>
            <p className="text-white/80">Swipe right on profiles you like, left on those you want to pass.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-xl">
              💬
            </div>
            <p className="text-white/80">When you match, you can start chatting instantly!</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-xl">
              ⚡
            </div>
            <p className="text-white/80">Our AI helps find the best matches for you.</p>
          </div>
        </div>
        <button
          className="mt-6 w-full py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          Got it!
        </button>
      </div>
    </motion.div>
  );
} 