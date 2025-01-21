'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CountdownTimer from '@/components/CountdownTimer';

const features = [
  {
    title: 'AI-Powered Matching',
    description: 'Our advanced algorithms ensure perfect matches between candidates and companies.',
    icon: '🤖'
  },
  {
    title: 'Interactive Hiring',
    description: 'Experience a new way of hiring with our innovative swipe-based interface.',
    icon: '🔄'
  },
  {
    title: 'Real-time Analytics',
    description: 'Get detailed insights into your hiring process and candidate matches.',
    icon: '📊'
  }
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute inset-0 bg-gradient-radial from-accent-blue/20 via-accent-purple/20 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="hero-text text-gradient mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The Future of Recruitment is Here
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/80 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Where talent meets opportunity through human-centric AI matchmaking. 
              Join the recruitment revolution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <CountdownTimer />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12"
            >
              <Link href="/coming-soon" className="button-gradient">
                Get Early Access
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="section-heading text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Why Choose Jobly?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 relative bg-mesh-gradient">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-heading">Our Mission</h2>
            <p className="text-xl text-white/80">
              We&apos;re revolutionizing the recruitment industry by bringing together 
              cutting-edge AI technology with a human-centric approach. Our goal is 
              to create perfect matches between talented individuals and forward-thinking 
              companies, making the hiring process more efficient, enjoyable, and successful 
              for everyone involved.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
