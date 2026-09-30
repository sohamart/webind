import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { WebindSymbol } from '../../components/common/WebindLogo';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';

export const AdminLoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    location.search.includes('expired=1')
      ? 'Your session has expired. Please sign in again.'
      : ''
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await login({ email, password });
      addToast({
        type: 'success',
        title: 'Authentication Successful',
        message: 'Welcome to the Webind OS Management Core.',
      });
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    setEmail('admin@webindgroup.com');
    setPassword('WebindAdmin2026!');
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4 select-none relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md p-8 rounded-3xl bg-zinc-950 border border-white/10 shadow-2xl space-y-6"
      >
        {/* Top Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/15 flex items-center justify-center mx-auto shadow-inner">
            <WebindSymbol className="w-9 h-9" />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase block">
            WEBIND GROUP • OS MANAGEMENT
          </span>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase">
            Sign In to Core
          </h1>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Admin Identity (Email)
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@webindgroup.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-white/30 text-white text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-zinc-400 mb-1.5">
              Secure Key (Password)
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-white/30 text-white text-sm focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-zinc-200 transition shadow-xl tap-bounce disabled:opacity-50"
          >
            {loading ? <span>Authenticating...</span> : <span>Access Management Core</span>}
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </form>

        {/* Quick Fill Helper for Review / Demo */}
        <div className="pt-4 border-t border-white/[0.08] text-center">
          <button
            type="button"
            onClick={handleQuickFill}
            className="inline-flex items-center space-x-1.5 text-xs font-mono text-zinc-400 hover:text-white transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-300" />
            <span>Auto-fill Superadmin Credentials</span>
          </button>
        </div>

        {/* Back Link */}
        <div className="text-center pt-2">
          <Link
            to="/"
            className="text-xs text-zinc-500 hover:text-zinc-300 font-mono transition"
          >
            ← Return to Public Ecosystem
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;
