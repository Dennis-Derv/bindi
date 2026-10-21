'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import {
  Image as ImageIcon,
  Video as VideoIcon,
  Maximize2,
  Filter,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Search,
  Download,
  HeartHandshake,
  Play,
  Pause,
  Layers,
  Building2,
  CheckCircle2,
  ExternalLink,
  Info
} from 'lucide-react';
import MediaLightbox from './MediaLightbox';

export interface MediaItem {
  id: string;
  title: string;
  filename: string;
  url: string;
  mediaType: 'IMAGE' | 'VIDEO';
  mimeType: string;
  fileSize: number;
  caption: string;
  category: string;
  isGallery: boolean;
  createdAt: string;
}

interface GalleryClientProps {
  initialMedia?: MediaItem[];
}

export default function GalleryClient({ initialMedia = [] }: GalleryClientProps) {
  const mediaList = initialMedia;
  const [activeType, setActiveType] = useState<'ALL' | 'IMAGE' | 'VIDEO'>('ALL');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Curated Featured Carousel Items (Flagship photos)
  const featuredSlides = useMemo(() => {
    if (mediaList.length === 0) return [];
    // Select flagship photos representing diversity: lab, cac cert, kids hardware, girls outreach, headmasters, exterior
    const preferredIds = ['med-1', 'med-2', 'med-3', 'med-5', 'med-6', 'med-10'];
    const curated = mediaList.filter((m) => preferredIds.includes(m.id));
    return curated.length > 0 ? curated : mediaList.slice(0, 6);
  }, [mediaList]);

  // Auto-advance Carousel
  useEffect(() => {
    if (!isAutoPlaying || featuredSlides.length <= 1) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
    }, 5500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, featuredSlides.length]);

  const nextSlide = () => {
    if (featuredSlides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % featuredSlides.length);
  };

  const prevSlide = () => {
    if (featuredSlides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + featuredSlides.length) % featuredSlides.length);
  };

  // Categories
  const categories = [
    { name: 'ALL', label: 'All' },
    { name: 'Facilities', label: 'Facilities' },
    { name: 'Activities', label: 'Activities' },
    { name: 'Conferences', label: 'Conferences' },
    { name: 'Edutainment', label: 'Edutainment' },
    { name: 'Governance & Trust', label: 'Governance' }
  ];

  // Filtering logic
  const filteredMedia = useMemo(() => {
    return mediaList.filter((item) => {
      if (activeType !== 'ALL' && item.mediaType !== activeType) return false;
      if (activeCategory !== 'ALL' && item.category !== activeCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title?.toLowerCase().includes(q);
        const matchCaption = item.caption?.toLowerCase().includes(q);
        const matchCat = item.category?.toLowerCase().includes(q);
        if (!matchTitle && !matchCaption && !matchCat) return false;
      }
      return true;
    });
  }, [mediaList, activeType, activeCategory, searchQuery]);

  return (
    <div className="space-y-18 sm:space-y-24 pb-14 sm:pb-20 lg:pb-24">
      {/* 1. HERO HEADER */}
      <section className="relative pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 overflow-hidden border-b border-[rgba(255,255,255,0.08)] bg-gradient-to-b from-[#06142B] to-[#040B18]">
        <div className="container">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.3)] text-[#FBBF24] text-xs font-bold tracking-wide">
              <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
              <span>OFFICIAL BKC PHOTOGRAPHIC ARCHIVE • CAC/IT/NO 56020</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight leading-tight">
              Visual Archive & Field Documentation
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore authentic photographic records of our established educational campus in Yola Town, daily free STEM workshops for under-privileged children, out-of-school girls outreach, and primary headmaster leadership summits.
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-[rgba(8,20,44,0.6)] border border-white/10">
              <span className="text-slate-400 block mb-1">Archived Records:</span>
              <span className="text-white font-bold text-base font-['Outfit']">{mediaList.length}+ High-Res Items</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[rgba(8,20,44,0.6)] border border-white/10">
              <span className="text-slate-400 block mb-1">Infrastructure:</span>
              <span className="text-[#FBBF24] font-bold text-base font-['Outfit']">60+ PC Terminal Hall</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[rgba(8,20,44,0.6)] border border-white/10">
              <span className="text-slate-400 block mb-1">Outreach Beneficiaries:</span>
              <span className="text-[#60A5FA] font-bold text-base font-['Outfit']">650+ Girls Reached</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[rgba(8,20,44,0.6)] border border-white/10">
              <span className="text-slate-400 block mb-1">School Leaders:</span>
              <span className="text-[#34D399] font-bold text-base font-['Outfit']">850 Headmasters</span>
            </div>
          </div>
        </div>
      </section>      {/* 2. CURATED FEATURED SHOWCASE CAROUSEL (EXECUTIVE DUAL-STAGE EXHIBITION DECK) */}
      {featuredSlides.length > 0 && (
        <section className="container">
          <div className="space-y-6">
            {/* Header */}
            <div className="pb-2 border-b border-white/10">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.3)] text-[#FBBF24] text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CURATED IMPACT EXHIBITION</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                  Flagship Field Moments & Historic Milestones
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Handpicked photographic documentation of our 60+ PC facility, nationwide headmaster assemblies, and grassroots girls outreach.
                </p>
              </div>
            </div>

            {/* DUAL-STAGE EXHIBITION STAGE */}
            <div
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* STAGE LEFT: VISUAL THEATRE (7 COLS) */}
              <div
                className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-[rgba(59,130,246,0.35)] shadow-2xl group"
                style={{
                  minHeight: '400px',
                  height: '460px',
                  backgroundColor: '#040B18'
                }}
              >
                {/* Slides Layer with Crossfade */}
                {featuredSlides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={slide.url}
                      alt={slide.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />

                    {/* Subtle Corner Vignette */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(4,11,24,0.4) 0%, rgba(4,11,24,0) 40%, rgba(4,11,24,0.75) 100%)'
                      }}
                    />
                  </div>
                ))}

                {/* Floating Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                  <span className="badge badge-gold text-xs shadow-lg backdrop-blur-md pointer-events-auto">
                    {featuredSlides[currentSlide]?.category || 'Featured'}
                  </span>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/15 text-white text-xs font-semibold backdrop-blur-md pointer-events-auto">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>Verified Authentic BKC Archive</span>
                  </div>
                </div>

                {/* Overlaid Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-[rgba(212,175,55,0.25)] text-white border border-white/20 hover:border-[#D4AF37] transition-all shadow-xl hover:scale-105"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-[rgba(212,175,55,0.25)] text-white border border-white/20 hover:border-[#D4AF37] transition-all shadow-xl hover:scale-105"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Floating Bottom Lightbox Trigger */}
                <div className="absolute bottom-4 right-4 z-20">
                  <button
                    onClick={() => {
                      const targetIdx = mediaList.findIndex((m) => m.id === featuredSlides[currentSlide].id);
                      setLightboxIndex(targetIdx !== -1 ? targetIdx : 0);
                    }}
                    className="btn btn-primary py-2.5 px-4 text-xs font-bold shadow-xl shadow-amber-500/25 flex items-center gap-2"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span>View High-Res Cinema Lightbox</span>
                  </button>
                </div>
              </div>

              {/* STAGE RIGHT: EDITORIAL IMPACT STORYBOARD (5 COLS) */}
              <div
                className="lg:col-span-5 rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-[rgba(255,255,255,0.12)] shadow-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, rgba(8,22,48,0.95) 0%, rgba(4,12,28,0.98) 100%)'
                }}
              >
                {/* Ambient glow accent */}
                <div
                  className="absolute -top-16 -right-16 w-44 h-44 rounded-full pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0) 70%)',
                    filter: 'blur(30px)'
                  }}
                />

                {/* Story Top */}
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#FBBF24] font-bold uppercase tracking-wider">
                      Milestone {currentSlide + 1} of {featuredSlides.length}
                    </span>
                    <span className="text-slate-400 font-medium">
                      Location: Yola Town, Nigeria
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#F59E0B] to-[#3B82F6] transition-all duration-300"
                      style={{
                        width: `${((currentSlide + 1) / featuredSlides.length) * 100}%`
                      }}
                    />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] leading-tight">
                    {featuredSlides[currentSlide]?.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {featuredSlides[currentSlide]?.caption}
                  </p>
                </div>

                {/* Story Metadata & CTAs */}
                <div className="pt-6 mt-6 border-t border-white/10 space-y-4 relative z-10">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#F59E0B] shrink-0" />
                    <div className="text-xs">
                      <strong className="text-white block font-['Outfit']">
                        Official BKC Photographic Record
                      </strong>
                      <span className="text-slate-400">
                        Permanent field documentation for grant audit and donor due diligence.
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        const targetIdx = mediaList.findIndex((m) => m.id === featuredSlides[currentSlide].id);
                        setLightboxIndex(targetIdx !== -1 ? targetIdx : 0);
                      }}
                      className="btn btn-primary py-3 px-5 text-xs font-bold flex-1 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span>Inspect Full High-Res</span>
                    </button>

                    <a
                      href="#archive-browser"
                      className="btn btn-secondary py-3 px-4 text-xs font-semibold"
                    >
                      Browse Grid
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. BASIC, SIMPLE & NICE FILTER BAR */}
      <section id="archive-browser" className="container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 py-2">
          {/* Category Filter Pills: Momentum Horizontal Scroll */}
          <div className="horizontal-scroll-touch items-center gap-2 py-1 w-full md:w-auto">
            {categories.map((cat) => {
              const active = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all border whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[rgba(212,175,55,0.2)] text-[#F3E5AB] border-[rgba(212,175,55,0.6)] font-bold shadow-sm'
                      : 'bg-[#0B1E3A] hover:bg-[#132C52] text-slate-300 hover:text-white border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Simple Search Input */}
          <div className="relative w-full md:w-64 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gallery..."
              className="w-full pl-10 pr-8 py-2.5 rounded-full text-xs text-white placeholder-slate-400 bg-[#0B1E3A] border border-white/10 focus:border-[#3B82F6] outline-none transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white p-1"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 4. SOPHISTICATED BENTO / EDITORIAL GALLERY GRID */}
      <section className="container">
        {filteredMedia.length === 0 ? (
          <div className="bkc-card text-center py-16 px-6 space-y-4 max-w-md mx-auto">
            <Filter className="w-10 h-10 text-slate-500 mx-auto" />
            <h4 className="text-lg font-bold text-white font-['Outfit']">
              No Archival Records Found
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              No media items matching &quot;{searchQuery || activeCategory}&quot;. Try adjusting your keywords or clearing category filters.
            </p>
            <button
              onClick={() => {
                setActiveCategory('ALL');
                setActiveType('ALL');
                setSearchQuery('');
              }}
              className="btn btn-secondary text-xs py-2 px-4 mx-auto"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedia.map((item, index) => {
              // Create subtle visual hierarchy: featured items have elevated accent
              const isHeroCard = index === 0 || index === 5;

              return (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(index)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 shadow-lg ${
                    isHeroCard
                      ? 'border-[rgba(245,158,11,0.4)] hover:border-[#F59E0B] hover:shadow-amber-500/10'
                      : 'border-white/10 hover:border-[rgba(59,130,246,0.5)]'
                  }`}
                  style={{
                    backgroundColor: '#061124',
                    transform: 'translateZ(0)'
                  }}
                >
                  {/* Image Viewport */}
                  <div className="relative w-full h-72 sm:h-80 overflow-hidden bg-[#040B18]">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      style={{
                        display: 'block',
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />

                    {/* Gradient Overlay Vignette */}
                    <div
                      className="absolute inset-0 transition-opacity duration-300"
                      style={{
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.3) 40%, rgba(4,11,24,0.95) 100%)'
                      }}
                    />

                    {/* Top Tag & Zoom Trigger */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="badge badge-gold text-[10px] backdrop-blur-md shadow-md">
                        {item.category}
                      </span>

                      <div className="w-8 h-8 rounded-full bg-black/60 group-hover:bg-[rgba(212,175,55,0.3)] text-white flex items-center justify-center backdrop-blur-md transition-all duration-200 border border-white/15 group-hover:border-[#D4AF37]">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1.5">
                      <h4 className="text-white font-bold text-base font-['Outfit'] line-clamp-1 group-hover:text-[#FBBF24] transition-colors">
                        {item.title}
                      </h4>
                      {item.caption && (
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed opacity-90">
                          {item.caption}
                        </p>
                      )}
                      <div className="pt-2 flex items-center gap-2 text-[11px] text-[#60A5FA] font-medium">
                        <span>Click to view full photo</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. FUNDER PROOF & VERIFICATION CALL TO ACTION */}
      <section className="container">
        <div
          className="rounded-2xl p-8 sm:p-12 relative overflow-hidden text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-8"
          style={{
            background: 'linear-gradient(135deg, #0B1E3A 0%, #142F5B 50%, #061124 100%)',
            border: '1px solid rgba(245,158,11,0.35)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
          }}
        >
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(245,158,11,0.15)] text-[#FBBF24] text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DUE DILIGENCE & DONOR COMPLIANCE</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
              Require Comprehensive Illustrated Grant Briefs?
            </h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              We provide formal international funding partners with documented physical asset schedules, CAC incorporation certificates, and verified community impact matrices.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/BKC Brief on BKC for Grants Application.pdf"
              download
              className="btn btn-secondary py-3 px-5 text-xs font-bold flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Full Illustrated Brief (PDF)
            </a>
            <Link
              href="/grants-sponsorships"
              className="btn btn-primary py-3 px-5 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/25"
            >
              <HeartHandshake className="w-4 h-4" />
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Lightbox */}
      {lightboxIndex !== null && (
        <MediaLightbox
          items={filteredMedia}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </div>
  );
}
