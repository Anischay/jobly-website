'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const launchDate = new Date('2024-04-05T00:00:00');
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-violet-300 text-sm sm:text-base">
              {unit.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 