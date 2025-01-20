'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SwipeCard from '@/components/ui/SwipeCard';
import TutorialOverlay from '@/components/ui/TutorialOverlay';
import { FiToggleLeft, FiToggleRight, FiBell } from 'react-icons/fi';
import type { JobData, CandidateData } from '@/components/ui/SwipeCard';

// Sample data
const sampleJobs: JobData[] = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Bangalore, India",
    salary: "₹25-35 LPA",
    skills: ["React", "TypeScript", "Next.js", "TailwindCSS", "GraphQL"],
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
    match: 95
  },
  {
    title: "Product Designer",
    company: "DesignLabs",
    location: "Remote",
    salary: "₹18-28 LPA",
    skills: ["Figma", "UI/UX", "Design Systems", "User Research"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
    match: 88
  },
  {
    title: "Full Stack Engineer",
    company: "StartupX",
    location: "Mumbai, India",
    salary: "₹20-30 LPA",
    skills: ["Node.js", "React", "MongoDB", "AWS", "Docker"],
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
    match: 92
  }
];

const sampleCandidates: CandidateData[] = [
  {
    name: "Priya Sharma",
    title: "Senior UI/UX Designer",
    location: "Bangalore, India",
    skills: ["UI Design", "User Research", "Figma", "Design Systems"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    match: 94
  },
  {
    name: "Rahul Verma",
    title: "Full Stack Developer",
    location: "Mumbai, India",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    match: 89
  },
  {
    name: "Aisha Patel",
    title: "Product Manager",
    location: "Delhi, India",
    skills: ["Product Strategy", "Agile", "Data Analysis", "User Stories"],
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    match: 91
  }
];

interface MatchNotification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
}

export default function MatchPage() {
  const [perspective, setPerspective] = useState<'recruiter' | 'candidate'>('recruiter');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [notifications, setNotifications] = useState<MatchNotification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [stats, setStats] = useState({
    todayMatches: 0,
    successRate: 0
  });

  const data = perspective === 'recruiter' ? sampleCandidates : sampleJobs;
  const currentItem = data[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right' && currentItem.match > 85) {
      // Create a match notification
      const matchName = perspective === 'recruiter' 
        ? (currentItem as CandidateData).name 
        : (currentItem as JobData).company;
        
      const newNotification = {
        id: Date.now().toString(),
        title: "New Match!",
        message: `You matched with ${matchName}!`,
        timestamp: new Date()
      };
      setNotifications(prev => [newNotification, ...prev]);
      setStats(prev => ({
        todayMatches: prev.todayMatches + 1,
        successRate: Math.round(((prev.todayMatches + 1) / (currentIndex + 1)) * 100)
      }));
    }
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {showTutorial && <TutorialOverlay />}

      {/* Header */}
      <div className="fixed top-24 inset-x-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Perspective Toggle */}
            <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-white/10 backdrop-blur">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  perspective === 'recruiter' ? 'bg-accent-purple text-white' : 'text-white/60'
                }`}
                onClick={() => setPerspective('recruiter')}
              >
                <FiToggleLeft size={20} />
                Recruiter
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  perspective === 'candidate' ? 'bg-accent-purple text-white' : 'text-white/60'
                }`}
                onClick={() => setPerspective('candidate')}
              >
                <FiToggleRight size={20} />
                Job Seeker
              </button>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-3 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition-colors relative"
              >
                <FiBell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-accent-pink" />
                )}
              </button>

              {/* Notifications Panel */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-xl bg-white/10 backdrop-blur border border-white/10"
                  >
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-white/60">
                        No notifications yet
                      </div>
                    ) : (
                      notifications.map(notification => (
                        <div
                          key={notification.id}
                          className="p-4 border-b border-white/10 last:border-0"
                        >
                          <h4 className="font-medium text-white">{notification.title}</h4>
                          <p className="text-sm text-white/80">{notification.message}</p>
                          <span className="text-xs text-white/60">
                            {notification.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      ))
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Container */}
      <div className="container mx-auto px-4 pt-48 pb-24">
        <div className="max-w-sm mx-auto relative h-[600px]">
          {currentItem && (
            <SwipeCard
              type={perspective === 'recruiter' ? 'candidate' : 'job'}
              data={currentItem}
              onSwipe={handleSwipe}
            />
          )}
        </div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-white/10 backdrop-blur text-white/80 text-sm"
      >
        Today's Matches: {stats.todayMatches} • Success Rate: {stats.successRate}%
      </motion.div>
    </main>
  );
} 