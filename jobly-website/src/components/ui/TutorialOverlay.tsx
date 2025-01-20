'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const tutorialSteps = [
  {
    title: "Welcome to Jobly Match!",
    description: "Get ready to revolutionize your hiring or job search experience with our AI-powered matching system.",
    image: "/tutorial/welcome.svg"
  },
  {
    title: "Switch Perspectives",
    description: "Toggle between recruiter and job seeker views to experience both sides of the matching process.",
    image: "/tutorial/switch.svg"
  },
  {
    title: "Swipe to Match",
    description: "Swipe right on profiles you like, left on those you want to skip. It's that simple!",
    image: "/tutorial/swipe.svg"
  },
  {
    title: "Get Notified",
    description: "Receive instant notifications when you match with someone. The higher the match percentage, the better the fit!",
    image: "/tutorial/notify.svg"
  }
];

export default function TutorialOverlay() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    // Add any cleanup or state persistence logic here
  };

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-lg mx-4"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
            >
              <FiX size={24} />
            </button>

            {/* Content */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 flex items-center justify-center p-8">
                <img
                  src={tutorialSteps[currentStep].image}
                  alt={tutorialSteps[currentStep].title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {tutorialSteps[currentStep].title}
                </h3>
                <p className="text-white/80 mb-6">
                  {tutorialSteps[currentStep].description}
                </p>

                {/* Progress Dots */}
                <div className="flex justify-center gap-2 mb-6">
                  {tutorialSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentStep ? 'bg-accent-purple' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between">
                  <button
                    onClick={handlePrev}
                    className={`p-2 rounded-lg transition-colors ${
                      currentStep === 0
                        ? 'text-white/20 cursor-not-allowed'
                        : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                    disabled={currentStep === 0}
                  >
                    <FiChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-6 py-2 rounded-lg bg-accent-purple hover:bg-accent-purple/80 transition-colors text-white font-medium"
                  >
                    {currentStep === tutorialSteps.length - 1 ? "Get Started" : "Next"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 