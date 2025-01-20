'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiTarget, FiUsers, FiHeart } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About Jobly</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We're on a mission to revolutionize tech recruitment by creating meaningful 
            connections between exceptional talent and innovative companies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8"
          >
            <div className="mb-4 text-violet-400">
              <FiTarget size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Our Mission</h3>
            <p className="text-gray-300">
              To transform the tech recruitment landscape by leveraging AI and human-centric design
              to create perfect matches between talent and opportunities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8"
          >
            <div className="mb-4 text-violet-400">
              <FiUsers size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Our Team</h3>
            <p className="text-gray-300">
              A diverse group of tech enthusiasts, recruitment experts, and AI specialists
              working together to build the future of tech recruitment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-8"
          >
            <div className="mb-4 text-violet-400">
              <FiHeart size={32} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Our Values</h3>
            <p className="text-gray-300">
              We believe in transparency, innovation, and putting people first in everything we do.
              Our platform is built on trust and meaningful connections.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center"
        >
          <h3 className="text-2xl font-semibold text-white mb-6">Join Us on Our Journey</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            We're just getting started, and we'd love for you to be part of our story.
            Together, we can create a better way to connect talent with opportunities.
          </p>
          <a
            href="/early-access"
            className="inline-block px-8 py-4 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors"
          >
            Get Early Access
          </a>
        </motion.div>
      </div>
    </div>
  );
} 