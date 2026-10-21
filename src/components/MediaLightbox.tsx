'use client';

import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface MediaItem {
  id: string;
  title?: string;
  url: string;
  mediaType: 'IMAGE' | 'VIDEO';
  caption?: string;
  category?: string;
}

interface LightboxProps {
  items: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function MediaLightbox({
  items,
  currentIndex,
  onClose,
  onNavigate
}: LightboxProps) {
  const current = items[currentIndex];
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);
  const imageLoading = loadedUrl !== current?.url;

  // Prevent background scrolling while lightbox is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Keyboard navigation & ESC handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault();
        onNavigate(currentIndex - 1);
      }
      if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
        e.preventDefault();
        onNavigate(currentIndex + 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, items.length, onClose, onNavigate]);

  if (!current) return null;

  return (
    <div
      className="lightbox-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        backgroundColor: 'rgba(2, 6, 23, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflow: 'hidden'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* 1. TOP BAR: Category & Counter Pill */}
      <div
        style={{
          position: 'fixed',
          top: '14px',
          left: '14px',
          zIndex: 1000000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(11, 30, 58, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            fontSize: '11px',
            fontWeight: 700
          }}
        >
          <span style={{ color: '#E5C07B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {current.category || 'BKC Archive'}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>•</span>
          <span style={{ color: '#E2E8F0' }}>
            {currentIndex + 1} / {items.length}
          </span>
        </div>
      </div>

      {/* 2. UNMISSABLE FLOATING CLOSE BUTTON (TOP-RIGHT FIXED) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="modal-close-pill"
        style={{
          position: 'fixed',
          top: '14px',
          right: '14px',
          zIndex: 1000000,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 16px',
          borderRadius: '9999px',
          backgroundColor: '#0B1E3A',
          border: '1.5px solid rgba(212, 175, 55, 0.5)',
          color: '#FFFFFF',
          fontWeight: 800,
          fontSize: '12px',
          letterSpacing: '0.04em',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.8), 0 0 12px rgba(212, 175, 55, 0.15)'
        }}
        aria-label="Close Lightbox Modal"
        title="Close Lightbox (Press ESC)"
      >
        <X style={{ width: '16px', height: '16px', color: '#E5C07B' }} />
        <span>CLOSE</span>
      </button>

      {/* 3. DESKTOP PREVIOUS BUTTON (FIXED LEFT, HIDDEN ON MOBILE) */}
      {currentIndex > 0 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex - 1);
          }}
          className="hidden md:flex"
          style={{
            position: 'fixed',
            left: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000000,
            padding: '14px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            color: '#FFFFFF',
            border: '1.5px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          aria-label="Previous Media"
          title="Previous Photo (Left Arrow)"
        >
          <ChevronLeft style={{ width: '28px', height: '28px' }} />
        </button>
      )}

      {/* 4. DESKTOP NEXT BUTTON (FIXED RIGHT, HIDDEN ON MOBILE) */}
      {currentIndex < items.length - 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex + 1);
          }}
          className="hidden md:flex"
          style={{
            position: 'fixed',
            right: '24px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1000000,
            padding: '14px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            color: '#FFFFFF',
            border: '1.5px solid rgba(255, 255, 255, 0.2)',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          aria-label="Next Media"
          title="Next Photo (Right Arrow)"
        >
          <ChevronRight style={{ width: '28px', height: '28px' }} />
        </button>
      )}

      {/* 5. BOTTOM THUMB CONTROL DOCK (OPTIMIZED FOR MOBILE THUMB ZONE) */}
      <div
        style={{
          position: 'fixed',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          backgroundColor: 'rgba(6, 17, 36, 0.95)',
          border: '1.5px solid rgba(212, 175, 55, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          padding: '6px 14px',
          borderRadius: '9999px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.85), 0 0 15px rgba(212, 175, 55, 0.15)'
        }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (currentIndex > 0) onNavigate(currentIndex - 1);
          }}
          disabled={currentIndex === 0}
          style={{
            padding: '6px',
            color: currentIndex === 0 ? 'rgba(255,255,255,0.2)' : '#FFFFFF',
            cursor: currentIndex === 0 ? 'default' : 'pointer',
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center'
          }}
          aria-label="Previous Photo"
        >
          <ChevronLeft style={{ width: '20px', height: '20px' }} />
        </button>

        <span style={{ fontSize: '11px', fontWeight: 800, color: '#F3E5AB', letterSpacing: '0.04em' }}>
          {currentIndex + 1} / {items.length}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (currentIndex < items.length - 1) onNavigate(currentIndex + 1);
          }}
          disabled={currentIndex === items.length - 1}
          style={{
            padding: '6px',
            color: currentIndex === items.length - 1 ? 'rgba(255,255,255,0.2)' : '#FFFFFF',
            cursor: currentIndex === items.length - 1 ? 'default' : 'pointer',
            background: 'none',
            border: 'none',
            display: 'flex',
            alignItems: 'center'
          }}
          aria-label="Next Photo"
        >
          <ChevronRight style={{ width: '20px', height: '20px' }} />
        </button>
      </div>

      {/* 6. MAIN MEDIA VIEWPORT */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '85vh',
          zIndex: 10,
          marginTop: '20px',
          marginBottom: '40px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Visual Frame */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            minHeight: '200px',
            maxHeight: '58vh',
            borderRadius: '1rem',
            overflow: 'hidden',
            backgroundColor: 'rgba(5, 13, 29, 0.7)'
          }}
        >
          {/* Loading Indicator */}
          {imageLoading && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                color: '#94A3B8'
              }}
            >
              <Loader2 className="animate-spin" style={{ width: '36px', height: '36px', color: '#D4AF37' }} />
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Loading authentic BKC photo...</span>
            </div>
          )}

          {current.mediaType === 'VIDEO' ? (
            <video
              src={current.url}
              controls
              autoPlay
              onLoadedData={() => setLoadedUrl(current.url)}
              style={{
                maxHeight: '58vh',
                maxWidth: '100%',
                borderRadius: '0.75rem',
                boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
                border: '1px solid rgba(59, 130, 246, 0.3)'
              }}
            />
          ) : (
            <img
              key={current.url}
              src={current.url}
              alt={current.title || 'BKC Media Archive'}
              onLoad={() => setLoadedUrl(current.url)}
              onError={() => setLoadedUrl(current.url)}
              style={{
                maxHeight: '58vh',
                maxWidth: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '0.85rem',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                transition: 'opacity 0.25s ease-in-out',
                opacity: imageLoading ? 0 : 1,
                display: 'block'
              }}
            />
          )}
        </div>

        {/* Caption & Secondary Close Card */}
        <div
          style={{
            marginTop: '10px',
            marginBottom: '35px',
            width: '100%',
            maxWidth: '800px',
            padding: '10px 16px',
            borderRadius: '0.75rem',
            backgroundColor: 'rgba(8, 20, 42, 0.92)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          {current.title && (
            <h4
              style={{
                margin: 0,
                fontSize: '0.95rem',
                fontWeight: 800,
                color: '#FFFFFF',
                fontFamily: "'Outfit', sans-serif",
                lineHeight: 1.3
              }}
            >
              {current.title}
            </h4>
          )}
          {current.caption && (
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '0.75rem',
                color: '#CBD5E1',
                lineHeight: 1.45,
                maxWidth: '640px'
              }}
            >
              {current.caption}
            </p>
          )}

          {/* Bottom helper bar: quick close & hint */}
          <div
            style={{
              marginTop: '10px',
              paddingTop: '8px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#94A3B8'
            }}
          >
            <span>
              Tip: Click outside or press <strong style={{ color: '#E5C07B' }}>ESC</strong> to exit
            </span>

            <button
              type="button"
              onClick={onClose}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 12px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <X style={{ width: '14px', height: '14px' }} />
              Close Viewer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
