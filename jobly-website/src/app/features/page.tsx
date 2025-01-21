'use client';

import { motion } from 'framer-motion';
import { FiArrowRight, FiHeart, FiX } from 'react-icons/fi';

const features = [
  {
    title: 'Swipe Right on Talent',
    description: 'Experience recruitment like modern dating - swipe right on candidates you love, left on those that don&apos;t match. No more endless resume scrolling.',
    icon: '💫',
    benefits: [
      'Intuitive card-based interface',
      'Quick decision making',
      'Instant match notifications'
    ]
  },
  {
    title: 'AI-Powered Matches',
    description: 'Our smart algorithms ensure you only see candidates that match your requirements, analyzing skills, experience, and culture fit.',
    icon: '🤖',
    benefits: [
      'Smart skill matching',
      'Cultural fit assessment',
      'High match accuracy'
    ]
  },
  {
    title: 'Interactive Profiles',
    description: 'Rich, dynamic profiles that showcase personality alongside skills. Video intros, project showcases, and real-time chat once matched.',
    icon: '✨',
    benefits: [
      'Video introductions',
      'Project portfolios',
      'Real-time messaging'
    ]
  }
];

const benefits = {
  companies: [
    'Find candidates faster with swipe-based selection',
    'Higher quality matches through AI',
    'Reduced time-to-hire with instant connections',
    'More engaging hiring process'
  ],
  candidates: [
    'Express interest with a simple swipe',
    'Get matched based on true potential',
    'Show personality beyond resumes',
    'Chat directly when matched'
  ]
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow opacity-60" />
        <div className="container mx-auto px-6 relative">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-text text-gradient mb-6">
              Recruitment, But Make It Fun
            </h1>
            <p className="text-xl md:text-2xl text-white/80">
              Swipe right on your next hire or dream job. We&apos;ve reimagined recruitment 
              with a modern, engaging approach that makes hiring feel less like work.
            </p>
          </motion.div>

          {/* Demo Preview */}
          <motion.div 
            className="mt-12 max-w-sm mx-auto bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative aspect-[3/4] rounded-lg bg-gradient-to-b from-accent-purple/20 to-accent-blue/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/60 text-lg">Profile Preview</p>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4 flex justify-between">
                <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-red-500 hover:bg-white/20 transition-colors">
                  <FiX size={24} />
                </button>
                <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-green-500 hover:bg-white/20 transition-colors">
                  <FiHeart size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/60 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center text-white/80">
                      <FiArrowRight className="text-accent-purple mr-2" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 relative bg-mesh-gradient">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="container mx-auto px-6 relative">
          <motion.h2 
            className="section-heading text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Benefits for Everyone
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              className="card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gradient">For Companies</h3>
              <ul className="space-y-4">
                {benefits.companies.map((benefit) => (
                  <li key={benefit} className="flex items-center text-white/80">
                    <span className="text-accent-cyan mr-2">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="card"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gradient">For Candidates</h3>
              <ul className="space-y-4">
                {benefits.candidates.map((benefit) => (
                  <li key={benefit} className="flex items-center text-white/80">
                    <span className="text-accent-pink mr-2">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
} 