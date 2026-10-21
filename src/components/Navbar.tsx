'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  HeartHandshake,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Lock,
  Phone,
  Mail,
  MapPin,
  Home,
  BookOpen,
  Layers,
  Send
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About Us', href: '/about', icon: BookOpen },
    { name: 'Activities & Impact', href: '/activities', icon: Sparkles },
    { name: 'Grants & Sponsorships', href: '/grants-sponsorships', highlight: true, icon: HeartHandshake },
    { name: 'Gallery', href: '/gallery', icon: Layers },
    { name: 'Contact Us', href: '/contact', icon: Send }
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="bkc-header">
      {/* Top Banner: Desktop Credibility Strip */}
      <div className="top-banner">
        <div className="container top-banner-inner">
          <div className="flex items-center gap-2">
            <span className="badge badge-gold" style={{ padding: '0.15rem 0.5rem', fontSize: '0.7rem' }}>
              <ShieldCheck style={{ width: '0.85rem', height: '0.85rem' }} />
              CAC/IT/NO 56020
            </span>
            <span className="text-slate-300" style={{ fontSize: '0.75rem' }}>
              Incorporated NGO | Patron: HRH, The Lamido of Adamawa
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300" style={{ fontSize: '0.75rem' }}>
            <span>
              📍 No 12 Mallum Hamid St, Yola Town, Adamawa State
            </span>
            <Link
              href="/admin"
              className="flex items-center gap-1 text-slate-300 hover:text-white"
              style={{ transition: 'color 0.2s' }}
            >
              <Lock style={{ width: '0.75rem', height: '0.75rem' }} />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container">
        <nav className="main-navbar">
          <div className="navbar-inner">
            {/* Logo & Title */}
            <Link href="/" className="nav-brand">
              <div className="nav-brand-logo">
                <Image
                  src="/uploads/bkc-logo.png"
                  alt="BKC International Logo"
                  width={40}
                  height={40}
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <div className="nav-brand-text">
                <span className="nav-brand-title">
                  BKC<span className="hidden sm:inline"> INTERNATIONAL</span>
                </span>
                <span className="nav-brand-subtitle hidden sm:block">
                  Bindir Knowledge Development Centre
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="nav-links-desktop">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-item-link ${active ? 'active' : ''} ${link.highlight ? 'highlight' : ''}`}
                  >
                    {link.highlight && (
                      <Sparkles style={{ width: '0.85rem', height: '0.85rem', marginRight: '0.35rem', color: '#D4AF37' }} />
                    )}
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/grants-sponsorships"
                className="btn btn-primary"
                style={{ fontSize: '0.875rem', padding: '0.65rem 1.25rem' }}
              >
                <HeartHandshake style={{ width: '1rem', height: '1rem' }} />
                Partner With Us
              </Link>
            </div>

            {/* Mobile Header Right Actions */}
            <div className="flex lg:hidden items-center gap-2 relative z-30 pointer-events-auto">
              <Link
                href="/grants-sponsorships"
                className="badge badge-gold"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.72rem', textTransform: 'none', letterSpacing: 'normal' }}
              >
                <HeartHandshake style={{ width: '0.8rem', height: '0.8rem' }} />
                Partner
              </Link>

              <button
                type="button"
                id="mobile-nav-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen((prev) => !prev);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpen((prev) => !prev);
                }}
                className="mobile-menu-btn"
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X style={{ width: '1.4rem', height: '1.4rem', color: '#E5C07B', pointerEvents: 'none' }} />
                ) : (
                  <Menu style={{ width: '1.4rem', height: '1.4rem', pointerEvents: 'none' }} />
                )}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* App-Grade Direct Header Mobile Navigation Dropdown (Anchored directly under header - 100% reliable on phones & desktops) */}
      {isOpen && (
        <>
          {/* Backdrop Overlay to catch taps outside */}
          <div
            className="mobile-dropdown-backdrop"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div
            className="mobile-nav-dropdown"
            id="mobile-nav-dropdown"
            role="dialog"
            aria-modal="true"
          >
            {/* Patron & CAC Credibility Pill with Official BKC Logo/Favicon */}
            <div className="mobile-dropdown-credibility">
              <div
                style={{
                  width: '2.1rem',
                  height: '2.1rem',
                  borderRadius: '0.5rem',
                  background: '#FFFFFF',
                  padding: '0.15rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  border: '1px solid rgba(212,175,55,0.35)'
                }}
              >
                <Image
                  src="/bkc-logo.png"
                  alt="BKC Logo"
                  width={28}
                  height={28}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div style={{ fontSize: '0.72rem', lineHeight: 1.35 }}>
                <div className="flex items-center gap-1.5">
                  <strong style={{ color: '#FFFFFF' }}>
                    Incorporated Non-Profit NGO
                  </strong>
                  <span className="badge badge-gold" style={{ fontSize: '0.65rem', padding: '0.05rem 0.35rem' }}>
                    CAC 56020
                  </span>
                </div>
                <span style={{ color: '#94A3B8', display: 'block' }}>
                  Patron: HRH The Lamido of Adamawa
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="mobile-dropdown-links" aria-label="Mobile Navigation">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`mobile-dropdown-link ${active ? 'active' : ''}`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        style={{
                          width: '1.15rem',
                          height: '1.15rem',
                          color: active ? '#FFFFFF' : link.highlight ? '#D4AF37' : '#94A3B8'
                        }}
                      />
                      <span className="font-semibold text-sm">{link.name}</span>
                    </span>
                    <ChevronRight style={{ width: '1rem', height: '1rem', opacity: 0.5 }} />
                  </Link>
                );
              })}
            </nav>

            {/* Full Proposal Button */}
            <div className="pt-2">
              <Link
                href="/grants-sponsorships"
                onClick={() => setIsOpen(false)}
                className="btn btn-primary w-full py-3.5 text-center justify-center font-bold text-sm shadow-xl shadow-amber-500/20"
                style={{ borderRadius: '0.85rem' }}
              >
                <HeartHandshake style={{ width: '1.1rem', height: '1.1rem' }} />
                <span>Partner &amp; Grant Application Hub</span>
              </Link>
            </div>

            {/* Quick Secretariat Contacts */}
            <div className="mobile-dropdown-footer">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:+2348033156117"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white"
                >
                  <Phone style={{ width: '0.9rem', height: '0.9rem', color: '#10B981' }} />
                  <span>Call Direct</span>
                </a>
                <a
                  href="mailto:ubindir@yahoo.com"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white"
                >
                  <Mail style={{ width: '0.9rem', height: '0.9rem', color: '#3B82F6' }} />
                  <span>Email Secretariat</span>
                </a>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin style={{ width: '0.8rem', height: '0.8rem', color: '#D4AF37' }} />
                  Yola Town Campus
                </span>
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1 text-slate-400 hover:text-white"
                >
                  <Lock style={{ width: '0.75rem', height: '0.75rem' }} />
                  Admin Sign In
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
