'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2024-04-07T00:00:00Z').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-4 md:gap-6 justify-center items-center">
      <TimeBox value={timeLeft.days} label="Days" />
      <Separator />
      <TimeBox value={timeLeft.hours} label="Hours" />
      <Separator />
      <TimeBox value={timeLeft.minutes} label="Minutes" />
      <Separator />
      <TimeBox value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-75" />
        <div className="relative bg-black/50 backdrop-blur-xl rounded-xl p-3 md:p-4 min-w-[70px] md:min-w-[90px] border border-white/10 group-hover:border-violet-500/50 transition-colors duration-300">
          <motion.span 
            key={value}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="block text-2xl md:text-4xl font-bold text-white tabular-nums"
          >
            {value.toString().padStart(2, '0')}
          </motion.span>
        </div>
      </div>
      <span className="text-xs md:text-sm mt-2 text-gray-400 font-medium tracking-wider uppercase">
        {label}
      </span>
    </motion.div>
  );
}

function Separator() {
  return (
    <div className="text-2xl md:text-4xl font-bold text-violet-500/50">:</div>
  );
} 