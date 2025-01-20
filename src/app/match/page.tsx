'use client';

import React from 'react';

export default function MatchPage() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Welcome to Jobly Match
        </h1>
        <div className="bg-black/30 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
          <p className="text-gray-300 text-center text-lg">
            Your profile is being set up. You'll be able to start matching soon!
          </p>
        </div>
      </div>
    </div>
  );
} 