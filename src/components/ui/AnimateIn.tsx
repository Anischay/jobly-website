'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimateInProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale';
  delay?: number;
  className?: string;
}

const animations = {
  'fade': {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  'slide-up': {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }
  },
  'slide-down': {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  'slide-left': {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  },
  'slide-right': {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  },
  'scale': {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  }
};

const AnimateIn: React.FC<AnimateInProps> = ({ 
  children, 
  animation = 'fade', 
  delay = 0,
  className = ''
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <motion.div
      ref={ref}
      initial={animations[animation].initial}
      animate={isInView ? animations[animation].animate : animations[animation].initial}
      exit={animations[animation].exit}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimateIn; 