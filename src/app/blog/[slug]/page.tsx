'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiTag, FiCalendar } from 'react-icons/fi';

// Sample blog post data - we'll move this to a separate file later
const blogPost = {
  title: 'The Future of Tech Recruitment',
  date: '2024-01-20',
  readTime: '5 min read',
  category: 'Industry Insights',
  content: `
    <p>The landscape of tech recruitment is rapidly evolving, driven by technological advancements and changing workplace dynamics. In this article, we'll explore how AI and video introductions are transforming the hiring process in the tech industry.</p>

    <h2>The Rise of Video Introductions</h2>
    <p>Traditional resumes, while still important, are no longer the sole deciding factor in tech recruitment. Video introductions have emerged as a powerful tool for both candidates and employers, offering a more personal and comprehensive way to showcase skills and personality.</p>

    <h2>AI-Powered Matching</h2>
    <p>Artificial Intelligence is revolutionizing how candidates and companies find their perfect match. By analyzing various data points, including technical skills, work preferences, and company culture, AI algorithms can suggest highly compatible connections.</p>

    <h2>The Human Element</h2>
    <p>While technology plays a crucial role in modern recruitment, the human element remains irreplaceable. The best recruitment processes combine technological efficiency with human insight to create meaningful connections between talent and opportunities.</p>

    <h2>Looking Ahead</h2>
    <p>As we move forward, we can expect to see even more innovative approaches to tech recruitment. The future lies in creating seamless, efficient, and human-centric hiring experiences that benefit both candidates and employers.</p>
  `
};

export default function BlogPostPage() {
  return (
    <main className="min-h-screen pt-24 px-4 md:px-8">
      <article className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link 
            href="/blog"
            className="inline-flex items-center text-violet-400 hover:text-violet-300 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {blogPost.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-400">
            <span className="flex items-center gap-2">
              <FiCalendar className="w-4 h-4" />
              {blogPost.date}
            </span>
            <span className="flex items-center gap-2">
              <FiClock className="w-4 h-4" />
              {blogPost.readTime}
            </span>
            <span className="flex items-center gap-2">
              <FiTag className="w-4 h-4" />
              {blogPost.category}
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert prose-violet max-w-none"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />
      </article>
    </main>
  );
} 