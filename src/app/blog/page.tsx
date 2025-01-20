'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiClock, FiTag, FiArrowRight } from 'react-icons/fi';

// Sample blog data - we'll move this to a separate file later
const blogPosts = [
  {
    id: 1,
    title: 'The Future of Tech Recruitment',
    excerpt: 'Exploring how AI and video introductions are transforming the hiring process in the tech industry.',
    date: '2024-01-20',
    readTime: '5 min read',
    category: 'Industry Insights',
    slug: 'future-of-tech-recruitment'
  },
  {
    id: 2,
    title: 'Making Your Tech Profile Stand Out',
    excerpt: 'Tips and strategies for creating an impressive tech profile that catches recruiters attention.',
    date: '2024-01-18',
    readTime: '7 min read',
    category: 'Career Tips',
    slug: 'make-your-profile-stand-out'
  },
  {
    id: 3,
    title: 'Video Introductions: The New Resume',
    excerpt: 'Why video introductions are becoming essential in modern tech recruitment.',
    date: '2024-01-15',
    readTime: '4 min read',
    category: 'Trends',
    slug: 'video-introductions-new-resume'
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Jobly Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Insights, trends, and tips for tech recruitment and career development.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-violet-500/50 transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`} className="block p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiTag className="w-4 h-4" />
                    {post.category}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-violet-400 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-violet-400 font-medium">
                  Read More 
                  <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
} 