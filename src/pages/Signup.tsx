import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, authenticate here.
    // For now, redirect to the existing FocusFlow web app (Dashboard mock).
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#02040a] flex flex-col items-center justify-center p-6 text-white selection:bg-blue-500/30 relative overflow-hidden">
      {/* Background Video Animation */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <iframe 
          src="https://player.cloudinary.com/embed/?cloud_name=nmizpaiu&public_id=kling_20260812_VIDEO_Animate_th_3049_0&fluid=true&autoplay=true&loop=true&controls=false&muted=true" 
          className="w-full h-full min-w-full min-h-full object-cover scale-110 pointer-events-none opacity-35"
          style={{ border: 'none', width: '100%', height: '100%' }}
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          title="FocusFlow Background Animation"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/80 via-[#02040a]/60 to-[#02040a]/90 pointer-events-none" />
      </div>

      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors z-20">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl relative z-10"
      >
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-2 tracking-tight">Create Account</h2>
        <p className="text-gray-400 text-center mb-8">Start your focus journey today</p>

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-colors"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-colors"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl px-4 py-4 mt-4 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-400 mt-8">
          Already have an account? <Link to="/login" className="text-white font-medium hover:text-blue-400 transition-colors">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}
