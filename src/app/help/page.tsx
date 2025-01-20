'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Jobly?",
      answer: "Jobly is an AI-powered recruitment platform that connects talented developers with innovative companies. We use advanced matching algorithms to ensure the perfect fit between candidates and employers."
    },
    {
      question: "How does the matching algorithm work?",
      answer: "Our AI algorithm analyzes multiple factors including technical skills, experience, company culture, and career goals to create optimal matches. It learns and improves with each successful connection."
    },
    {
      question: "Is Jobly free to use?",
      answer: "During our early access period, Jobly is completely free for both candidates and companies. After launch, we'll introduce flexible pricing plans to suit different needs."
    },
    {
      question: "How do I create a profile?",
      answer: "Currently, we're in early access mode. You can sign up for early access, and we'll notify you as soon as profile creation is available. We're working hard to ensure the best possible experience for our users."
    },
    {
      question: "What makes Jobly different?",
      answer: "Jobly stands out through its AI-powered matching, video introductions, and focus on company culture fit. We're building a platform that goes beyond traditional job boards and recruitment sites."
    },
    {
      question: "How can I get early access?",
      answer: "You can request early access by clicking the 'Early Access' button in the navigation menu. Enter your email, and we'll add you to our waiting list with priority access when we launch."
    }
  ];

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Help Center</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about Jobly and learn how we can help you
            find your perfect match.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="mb-4"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 text-left transition-colors hover:bg-white/20"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                  <div className="text-violet-400">
                    {openFaq === index ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                </div>
              </button>
              {openFaq === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl px-6 py-4 mt-2"
                >
                  <p className="text-gray-300">{faq.answer}</p>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto mt-16 text-center"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">Still have questions?</h2>
          <p className="text-gray-300 mb-8">
            Can't find the answer you're looking for? Please contact our support team.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
} 