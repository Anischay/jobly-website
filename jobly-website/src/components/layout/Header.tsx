'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'About', href: '/about' },
  { name: 'Match', href: '/match' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-glass-gradient py-4' : 'py-6'
    }`}>
      <nav className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gradient">
            Jobly
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link 
              href="/coming-soon"
              className="button-gradient"
            >
              Get Early Access
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-sm font-medium text-white/80 hover:text-white transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link 
              href="/coming-soon"
              className="block button-gradient text-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Early Access
            </Link>
          </div>
        </motion.div>
      </nav>
    </header>
  );
} 