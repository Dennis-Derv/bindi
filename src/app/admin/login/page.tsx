'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, Mail, ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@bkc.org.ng');
  const [password, setPassword] = useState('Admin@BKC2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('bkc_token', data.token);
        localStorage.setItem('bkc_user', JSON.stringify(data.user));
        router.push('/admin');
      } else {
        setError(data.message || 'Invalid credentials. Please verify your email and password.');
      }
    } catch (err: any) {
      setError('Connection failed. Please ensure the Express backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#061124] via-[#0B1E3A] to-[#040814]">
      <div className="max-w-md w-full bkc-card bkc-card-gold p-8 sm:p-10 space-y-8 shadow-2xl relative">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-white rounded-2xl p-1.5 mx-auto shadow-lg border border-[#F59E0B]/40 flex items-center justify-center">
            <Image
              src="/uploads/bkc-logo.png"
              alt="BKC Logo"
              width={54}
              height={54}
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-extrabold text-white font-['Outfit']">
            BKC Administrative Portal
          </h2>
          <p className="text-xs text-slate-400">
            Secure access for authorized BKC directors, managers, and editors.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="input-label">Administrator Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bkc.org.ng"
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="input-label">Master Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="input-field pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full py-3.5 font-bold text-sm shadow-xl shadow-amber-500/25 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        {/* Default Credential Helper Box */}
        <div className="p-4 rounded-xl bg-[rgba(6,17,36,0.7)] border border-[rgba(245,158,11,0.2)] text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center gap-1.5 text-[#FBBF24] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Default Administrator Credentials
          </div>
          <div className="text-[11px] text-slate-400">
            Email: <strong className="text-white">admin@bkc.org.ng</strong>
            <br />
            Password: <strong className="text-white">Admin@BKC2026!</strong>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
          >
            Return to Public Website
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
