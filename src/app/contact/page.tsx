'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  ShieldCheck,
  CheckCircle2,
  Building2,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { sendInquiryEmail } from '../../lib/inquiryEmail';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    phone: '',
    type: 'GENERAL',
    subject: '',
    message: ''
  });

  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    sendInquiryEmail(
      formData.subject || `Inquiry: ${formData.type}`,
      {
        Name: formData.contactName,
        Email: formData.email,
        Phone: formData.phone,
        'Inquiry Type': formData.type
      },
      formData.message
    );

    setResult({
      success: true,
      message: 'Your email app should now open with your message addressed to the BKC secretariat. Just press send. If nothing opened, email us directly at ubindir@yahoo.com.'
    });
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-14 sm:pb-20 lg:pb-24">
      {/* 1. HERO SECTION WITH AUTHENTIC CAMPUS BACKGROUND IMAGE */}
      <section
        className="relative pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 overflow-hidden border-b border-[rgba(255,255,255,0.1)]"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(4, 11, 24, 0.90) 0%, rgba(6, 20, 43, 0.88) 50%, rgba(4, 11, 24, 0.96) 100%), url('/uploads/bkc-facility-exterior-1.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 75%',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 border border-[rgba(245,158,11,0.45)] text-[#FBBF24] text-xs font-bold tracking-wide backdrop-blur-md shadow-lg">
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>BKC PHYSICAL CAMPUS &amp; SECRETARIAT • YOLA TOWN, NIGERIA</span>
            </div>

            <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black text-white font-['Outfit'] leading-tight tracking-tight">
              Get in Touch with{' '}
              <span className="text-[#FBBF24]">BKC International</span>
            </h1>

            <p className="text-sm sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-medium">
              We welcome dialogue with international funding bodies, corporate partners, school leaders, and community members. Reach out to schedule a meeting or visit our campus in Yola Town.
            </p>

            {/* Quick Contact Chips - Horizontal Momentum Scroll on Mobile */}
            <div className="horizontal-scroll-touch items-center gap-2 pt-2 text-xs">
              <a
                href="https://maps.google.com/?q=No+12+Mallum+Hamid+Street+Yola+Town+Adamawa+State"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/80 border border-white/15 text-slate-200 backdrop-blur-md whitespace-nowrap shrink-0"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>No 12 Mallum Hamid St, Yola Town</span>
              </a>
              <a
                href="mailto:ubindir@yahoo.com"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/80 border border-white/15 text-slate-200 backdrop-blur-md whitespace-nowrap shrink-0"
              >
                <Mail className="w-3.5 h-3.5 text-[#60A5FA]" />
                <span>ubindir@yahoo.com</span>
              </a>
              <a
                href="tel:+2348033156117"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/60 hover:bg-black/80 border border-white/15 text-slate-200 backdrop-blur-md whitespace-nowrap shrink-0"
              >
                <Phone className="w-3.5 h-3.5 text-[#34D399]" />
                <span>+234 803 315 6117</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIMPLE, EASY-TO-FOLLOW CONTACT SECTION */}
      <section className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left Column: Essential Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bkc-card p-5 sm:p-8 space-y-5 sm:space-y-6 border-[rgba(59,130,246,0.3)]">
              <div>
                <span className="badge badge-gold text-xs mb-2">Direct Contact</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
                  Physical Campus & Secretariat
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Our team is available for in-person visits, technical discussions, and donor consultations.
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-lg bg-[rgba(245,158,11,0.15)] text-[#FBBF24] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-['Outfit'] text-sm">Official Address</strong>
                    <p className="text-xs text-slate-300 leading-relaxed mt-0.5">
                      No 12 Mallum Hamid Street, Makama &apos;B&apos; Ward, Yola Town, Adamawa State, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-lg bg-[rgba(59,130,246,0.15)] text-[#60A5FA] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-['Outfit'] text-sm">Direct Email</strong>
                    <a
                      href="mailto:ubindir@yahoo.com"
                      className="text-xs text-[#60A5FA] hover:underline mt-0.5 block font-semibold"
                    >
                      ubindir@yahoo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-lg bg-[rgba(16,185,129,0.15)] text-[#34D399] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-['Outfit'] text-sm">Direct Phone Line</strong>
                    <a
                      href="tel:+2348033156117"
                      className="text-xs text-slate-200 hover:text-white mt-0.5 block font-medium"
                    >
                      +234 (0) 803 315 6117 (Engr. Umar B. Bindir)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-9 h-9 rounded-lg bg-[rgba(167,139,250,0.15)] text-[#A78BFA] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-white block font-['Outfit'] text-sm">Operating Hours</strong>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Monday – Saturday: 8:00 AM – 6:00 PM (ICT Hall available 24/7 for scheduled events)
                    </p>
                  </div>
                </div>
              </div>

              {/* Verified CAC Seal */}
              <div className="p-3.5 rounded-xl bg-[rgba(4,11,24,0.7)] border border-[rgba(245,158,11,0.25)] flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#F59E0B] shrink-0" />
                <div className="text-xs">
                  <span className="text-slate-400 block text-[11px]">CAC Legal Registration:</span>
                  <strong className="text-[#FBBF24]">Part C CAC/IT/NO 56020</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Simple & Easy-to-Follow Form */}
          <div className="lg:col-span-7">
            <div className="bkc-card p-6 sm:p-10 space-y-6 border-[rgba(245,158,11,0.3)]">
              <div>
                <span className="badge badge-gold text-xs mb-2">Send a Message</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">
                  How Can We Help You?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Fill out this quick form and our leadership team will respond directly.
                </p>
              </div>

              {result && (
                <div
                  className={`p-4 rounded-xl text-sm font-medium border flex items-start gap-3 ${
                    result.success
                      ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-200'
                      : 'bg-red-950/70 border-red-500/60 text-red-200'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold">{result.success ? 'Email Draft Ready' : 'Notice'}</h5>
                    <p className="text-xs mt-0.5 opacity-90">{result.message}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aliyu Mohammed"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="input-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>

                {/* 2. Phone & Inquiry Topic */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Phone / WhatsApp (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+234..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="input-label">Topic of Discussion *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="input-field form-select cursor-pointer"
                      style={{ backgroundColor: '#061124' }}
                    >
                      <option value="GENERAL">General Inquiries & Information</option>
                      <option value="GRANT">Grants & Funding Collaboration</option>
                      <option value="SPONSORSHIP">Program & Project Sponsorship</option>
                      <option value="PARTNERSHIP">Educational & NGO Partnership</option>
                      <option value="DONATION">ICT Equipment or Lab Support</option>
                    </select>
                  </div>
                </div>

                {/* 3. Subject (Optional / Short) */}
                <div>
                  <label className="input-label">Subject</label>
                  <input
                    type="text"
                    placeholder="Brief summary of your inquiry..."
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input-field"
                  />
                </div>

                {/* 4. Message */}
                <div>
                  <label className="input-label">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you would like to discuss or collaborate on..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-field"
                  />
                </div>

                {/* 5. Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-full py-3.5 font-bold text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
                  style={{ borderRadius: '0.75rem' }}
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>

                <p className="text-center text-xs text-slate-400 pt-1">
                  We respect your privacy. Messages are sent directly to the BKC executive team.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
