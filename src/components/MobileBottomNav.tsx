'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  BookOpen,
  Sparkles,
  Layers,
  Send
} from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  // If on admin routes, do not render mobile dock
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      exact: true
    },
    {
      name: 'About',
      href: '/about',
      icon: BookOpen,
      exact: false
    },
    {
      name: 'Activities',
      href: '/activities',
      icon: Sparkles,
      exact: false
    },
    {
      name: 'Gallery',
      href: '/gallery',
      icon: Layers,
      exact: false
    },
    {
      name: 'Contact',
      href: '/contact',
      icon: Send,
      exact: false
    }
  ];

  const isCurrentActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav className="mobile-bottom-dock" aria-label="Mobile Navigation Dock">
      <div className="mobile-dock-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isCurrentActive(item.href, item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-dock-item ${active ? 'active' : ''}`}
            >
              <Icon
                className="mobile-dock-icon"
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  transition: 'transform 0.2s ease, color 0.2s ease'
                }}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
