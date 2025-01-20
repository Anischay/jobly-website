'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center text-white text-2xl font-bold">
            Jobly
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/help" className="text-gray-300 hover:text-white transition-colors">
              Help
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/early-access"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Get Early Access
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 