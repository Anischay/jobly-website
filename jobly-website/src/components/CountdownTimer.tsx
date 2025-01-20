'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LAUNCH_DATE = '2024-04-05T00:00:00';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(LAUNCH_DATE) - +new Date();
      
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
      {timeUnits.map(({ label, value }) => (
        <motion.div
          key={label}
          className="card relative overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/20 via-accent-purple/20 to-accent-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="text-4xl md:text-5xl font-bold mb-2">
              {String(value).padStart(2, '0')}
            </div>
            <div className="text-sm text-white/60 uppercase tracking-wider">
              {label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 