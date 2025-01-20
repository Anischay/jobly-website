'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiBriefcase } from 'react-icons/fi';

export default function EarlyAccess() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'jobseeker' | 'recruiter' | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole || !email) {
      alert('Please select a role and enter your email');
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Store user data in localStorage for persistence
      localStorage.setItem('jobly_user', JSON.stringify({
        role: selectedRole,
        email: email,
        signupDate: new Date().toISOString()
      }));

      // Redirect after a short delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/match');
      
    } catch (error) {
      console.error('Navigation error:', error);
      alert('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-md mx-auto bg-black/30 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-white text-center">Get Early Access</h1>
          <p className="text-gray-300 text-center">
            Join our exclusive platform and be among the first to experience the future of tech recruitment.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300">I am a:</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedRole('jobseeker')}
                  className={`p-4 rounded-xl border ${
                    selectedRole === 'jobseeker'
                      ? 'border-violet-500 bg-violet-500/20'
                      : 'border-white/10 hover:border-white/20'
                  } flex flex-col items-center gap-2 transition-colors text-white`}
                >
                  <FiUser className="w-6 h-6" />
                  <span>Job Seeker</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('recruiter')}
                  className={`p-4 rounded-xl border ${
                    selectedRole === 'recruiter'
                      ? 'border-violet-500 bg-violet-500/20'
                      : 'border-white/10 hover:border-white/20'
                  } flex flex-col items-center gap-2 transition-colors text-white`}
                >
                  <FiBriefcase className="w-6 h-6" />
                  <span>Recruiter</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-black/30 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-white placeholder-gray-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Get Started'}
            </button>
          </form>

          <p className="text-sm text-gray-400 text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
} 