'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {!isAdminRoute && <Navbar />}
      <main className={`flex-1 ${!isAdminRoute ? 'pt-18 lg:pt-32' : ''}`}>
        {children}
      </main>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <MobileBottomNav />}
    </div>
  );
}

