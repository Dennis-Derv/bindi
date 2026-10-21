import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  Lock,
  Heart
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 pt-12 sm:pt-16 lg:pt-20 pb-24 lg:pb-16 border-t border-[rgba(255,255,255,0.08)] bg-[#030812]">
      <div className="container">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10" style={{ paddingBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {/* Col 1 & 2: Organization Overview & CAC Badge */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="nav-brand-logo" style={{ width: '2.75rem', height: '2.75rem' }}>
                <Image
                  src="/uploads/bkc-logo.png"
                  alt="BKC Logo"
                  width={34}
                  height={34}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>
                  BINDIR KNOWLEDGE <span style={{ color: '#E5C07B' }}>CENTRE</span>
                </h3>
                <p style={{ fontSize: '0.68rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>
                  International (BKC) • Incorporated 2012
                </p>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.6, maxWidth: '28rem' }}>
              A community-based non-profit Non-Governmental Organization (NGO) deliberately established to unleash and encourage active community participation in delivering high-quality basic education and ICT tools to under-privileged children.
            </p>

            <div style={{ padding: '0.85rem', borderRadius: '0.75rem', backgroundColor: 'rgba(11,30,58,0.7)', border: '1px solid rgba(59,130,246,0.25)', maxWidth: '28rem' }}>
              <div className="flex items-center gap-2" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#E5C07B', marginBottom: '0.35rem' }}>
                <ShieldCheck style={{ width: '1rem', height: '1rem' }} />
                Corporate Affairs Commission: CAC/IT/NO 56020
              </div>
              <p style={{ fontSize: '0.72rem', color: '#94A3B8', lineHeight: 1.5 }}>
                <strong style={{ color: '#E2E8F0' }}>Patron:</strong> HRH, The Lamido of Adamawa
                <br />
                <strong style={{ color: '#E2E8F0' }}>Founder / COO:</strong> Engr. Umar B. Bindir PhD FNA
              </p>
            </div>
          </div>

          {/* Mobile 2-Column Group for Organization & Grants */}
          <div className="grid grid-cols-2 gap-6 md:contents">
            {/* Col 3: Quick Navigation */}
            <div>
              <h4 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.825rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.85rem' }}>
                Organization
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.8rem', color: '#CBD5E1' }}>
                <li>
                  <Link href="/about" className="hover:text-white" style={{ transition: 'color 0.2s' }}>
                    Who We Are
                  </Link>
                </li>
                <li>
                  <Link href="/about#trustees" className="hover:text-white" style={{ transition: 'color 0.2s' }}>
                    Board of Trustees
                  </Link>
                </li>
                <li>
                  <Link href="/about#facilities" className="hover:text-white" style={{ transition: 'color 0.2s' }}>
                    Facilities & Labs
                  </Link>
                </li>
                <li>
                  <Link href="/about#certificate" className="hover:text-white" style={{ transition: 'color 0.2s' }}>
                    CAC Incorporation
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-white" style={{ transition: 'color 0.2s' }}>
                    Visual Archive
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Grants & Impact */}
            <div>
              <h4 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.825rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.85rem' }}>
                Grants & Impact
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '0.8rem' }}>
                <li>
                  <Link href="/grants-sponsorships" className="flex items-center gap-1" style={{ color: '#E5C07B', fontWeight: 600 }}>
                    Grant Opportunities <ArrowUpRight style={{ width: '0.8rem', height: '0.8rem' }} />
                  </Link>
                </li>
                <li>
                  <Link href="/activities" className="text-slate-300 hover:text-white">
                    Activities Catalog
                  </Link>
                </li>
                <li>
                  <Link href="/activities?category=headmasters-conference" className="text-slate-300 hover:text-white">
                    Headmasters (774 LGAs)
                  </Link>
                </li>
                <li>
                  <Link href="/activities?category=girl-child" className="text-slate-300 hover:text-white">
                    Girls Outreach
                  </Link>
                </li>
                <li>
                  <Link href="/activities?category=basic-education" className="text-slate-300 hover:text-white">
                    Free STEM Labs
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 5: Contact & Location */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.825rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.85rem' }}>
              Contact & Address
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.78rem', color: '#94A3B8' }}>
              <div className="flex items-start gap-2">
                <MapPin style={{ width: '0.95rem', height: '0.95rem', color: '#D4AF37', flexShrink: 0, marginTop: '0.15rem' }} />
                <span>
                  No 12 Mallum Hamid St, Makama &apos;B&apos; Ward, Yola Town, Adamawa State
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail style={{ width: '0.95rem', height: '0.95rem', color: '#3B82F6', flexShrink: 0 }} />
                <a href="mailto:ubindir@yahoo.com" style={{ color: '#94A3B8' }} className="hover:text-white">
                  ubindir@yahoo.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone style={{ width: '0.95rem', height: '0.95rem', color: '#10B981', flexShrink: 0 }} />
                <a href="tel:+2348033156117" style={{ color: '#94A3B8' }} className="hover:text-white">
                  +234 803 315 6117
                </a>
              </div>
            </div>

            {/* Quick Mobile Action Chips */}
            <div className="grid grid-cols-2 gap-2 pt-3">
              <a
                href="tel:+2348033156117"
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] font-semibold text-emerald-300 hover:bg-emerald-900/50"
              >
                <Phone style={{ width: '0.75rem', height: '0.75rem' }} />
                <span>Call Us</span>
              </a>
              <a
                href="mailto:ubindir@yahoo.com"
                className="flex items-center justify-center gap-1.5 p-2 rounded-lg bg-blue-950/40 border border-blue-500/30 text-[11px] font-semibold text-blue-300 hover:bg-blue-900/50"
              >
                <Mail style={{ width: '0.75rem', height: '0.75rem' }} />
                <span>Email Us</span>
              </a>
            </div>

            <div style={{ marginTop: '1.25rem', paddingTop: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5"
                style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}
              >
                <Lock style={{ width: '0.85rem', height: '0.85rem' }} />
                Staff / Admin Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left" style={{ paddingTop: '1.75rem', fontSize: '0.72rem', color: '#64748B' }}>
          <p>
            © {new Date().getFullYear()} Bindir Knowledge Development Centre International (BKC). All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span>Knowledge is Good</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-400">
              Dedicated to Underprivileged Children with <Heart style={{ width: '0.75rem', height: '0.75rem', color: '#EF4444', fill: '#EF4444', display: 'inline' }} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
