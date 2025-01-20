'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent mb-4">
              Jobly
            </div>
            <p className="text-gray-400">Empowering the future of recruitment with innovation and purpose.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="https://twitter.com/jobly" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
              <li><a href="https://linkedin.com/company/jobly" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/jobly" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Jobly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 