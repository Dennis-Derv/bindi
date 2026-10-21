import React from 'react';
import Link from 'next/link';
import { categories as allCategories, getActivities } from '../../data/content';
import ActivityCard from '../../components/ActivityCard';
import {
  Search,
  Sparkles,
  Filter,
  Users,
  Calendar,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  Laptop,
  ArrowRight
} from 'lucide-react';

interface PageProps {
  searchParams: Promise<{
    category?: string;
    search?: string;
  }>;
}

export const metadata = {
  title: 'Activities & Impact Catalog | BKC International',
  description: 'Explore the full spectrum of educational, technical, and community activities delivered by Bindir Knowledge Development Centre International.'
};

export default async function ActivitiesPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams.category || '';
  const searchQuery = resolvedParams.search || '';

  const categories = allCategories;
  const activities = getActivities({
    categorySlug: currentCategory || undefined,
    search: searchQuery || undefined,
    publishedOnly: true
  });

  return (
    <div className="space-y-18 sm:space-y-24 pb-14 sm:pb-20 lg:pb-24">
      {/* 1. SOPHISTICATED HERO SECTION WITH AUTHENTIC FIELD IMAGES */}
      <section className="relative pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 overflow-hidden border-b border-[rgba(255,255,255,0.08)] bg-gradient-to-b from-[#0B1E3A] via-[#06142B] to-[#040B18]">
        {/* Ambient Glows */}
        <div className="hero-glow-amber top-10 left-10" />
        <div className="hero-glow-blue bottom-0 right-10" />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Narrative & Metrics (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.3)] text-[#FBBF24] text-xs font-bold tracking-wide">
                <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                <span>BKC FIELD DOCUMENTATION • IMPACT IN ACTION</span>
              </div>

              <h1 className="text-2xl sm:text-5xl lg:text-5xl font-extrabold text-white font-['Outfit'] leading-tight tracking-tight">
                Transforming Basic Education &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F3E5AB] to-[#D4AF37]">Inspiring Future Leaders</span>
              </h1>

              <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Explore our documented grassroots interventions across Northern Nigeria—from our 60+ PC community computer centre and daily hands-on STEM edutainment workshops in Yola Town to out-of-school girls literacy outreach and the landmark National Conference for Primary School Headmasters.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <a
                  href="#activities-catalog"
                  className="btn btn-primary py-3.5 px-6 font-bold text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 w-full sm:w-auto text-center"
                >
                  <span>Explore Activities Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Verified Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-white/10">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#FBBF24] font-black text-xl font-['Outfit']">10,000+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Children Impacted</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#60A5FA] font-black text-xl font-['Outfit']">850</div>
                  <div className="text-[11px] text-slate-300 font-medium">Headmasters Convened</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#34D399] font-black text-xl font-['Outfit']">650+</div>
                  <div className="text-[11px] text-slate-300 font-medium">Girls Reached</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-white font-black text-xl font-['Outfit']">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Free Access Model</div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Image Collage (5 cols) */}
            <div className="lg:col-span-5 relative">
              {/* Primary Image Card: Hands-on Computer Lab */}
              <div
                className="hero-visual-card relative w-full overflow-hidden"
                style={{
                  height: '280px',
                  backgroundColor: '#040B18',
                  border: '1px solid rgba(245,158,11,0.4)'
                }}
              >
                <img
                  src="/uploads/children-edutainment-hardware.jpg"
                  alt="BKC Children Edutainment Lab"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(4,11,24,0.3) 50%, rgba(4,11,24,0.95) 100%)'
                  }}
                />

                <div className="absolute top-3 left-3">
                  <span className="badge badge-gold text-[10px] shadow-lg backdrop-blur-md">
                    Featured Initiative
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 space-y-1">
                  <h3 className="text-sm font-bold text-white font-['Outfit']">
                    Hands-On STEM & Hardware Lab
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1">
                    Children disassembling and assembling CPUs in Yola Town
                  </p>
                </div>
              </div>

              {/* Floating Overlapping Card 1: Headmasters Assembly (Top Right Offset) */}
              <div
                className="hidden sm:flex items-center gap-3 p-2.5 rounded-xl border border-white/15 shadow-2xl absolute -bottom-6 -left-6 z-20"
                style={{
                  backgroundColor: 'rgba(8, 20, 44, 0.95)',
                  backdropFilter: 'blur(16px)',
                  maxWidth: '280px'
                }}
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-[#F59E0B]/40 bg-black">
                  <img
                    src="/uploads/headmasters-conference-hall.png"
                    alt="Headmasters Conference"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-1 text-[#FBBF24] font-bold text-[10px]">
                    <GraduationCap className="w-3 h-3" />
                    <span>21 LGAs Pilot</span>
                  </div>
                  <strong className="text-white font-['Outfit'] block leading-tight">
                    Headmasters Summit
                  </strong>
                  <span className="text-[10px] text-slate-400">850 delegates accredited</span>
                </div>
              </div>

              {/* Floating Overlapping Card 2: Girls Outreach (Bottom Right Offset) */}
              <div
                className="hidden sm:flex items-center gap-3 p-2.5 rounded-xl border border-white/15 shadow-2xl absolute -top-5 -right-5 z-20"
                style={{
                  backgroundColor: 'rgba(8, 20, 44, 0.95)',
                  backdropFilter: 'blur(16px)',
                  maxWidth: '260px'
                }}
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-blue-400/40 bg-black">
                  <img
                    src="/uploads/girl-child-outreach-1.png"
                    alt="Girl Child Outreach"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-1 text-[#60A5FA] font-bold text-[10px]">
                    <Users className="w-3 h-3" />
                    <span>650+ Girls Reached</span>
                  </div>
                  <strong className="text-white font-['Outfit'] block leading-tight">
                    Girls Outreach
                  </strong>
                  <span className="text-[10px] text-slate-400">Literacy & uniform kits</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER & SEARCH BAR */}
      <section id="activities-catalog" className="container">
        <div className="bkc-card p-4 sm:p-6 border-[rgba(59,130,246,0.3)] space-y-4 sm:space-y-6">
          <form method="GET" action="/activities" className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-8 relative">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="search"
                defaultValue={searchQuery}
                placeholder="Search activities by keyword, topic, or location..."
                className="input-field pl-10 sm:pl-11 text-xs sm:text-sm py-3"
              />
              {currentCategory && (
                <input type="hidden" name="category" value={currentCategory} />
              )}
            </div>

            <div className="md:col-span-4 flex items-center gap-2">
              <button type="submit" className="btn btn-primary w-full text-xs sm:text-sm font-bold py-3">
                Search Activities
              </button>
              {(searchQuery || currentCategory) && (
                <Link
                  href="/activities"
                  className="btn btn-secondary text-xs px-3.5 py-3 shrink-0"
                  title="Clear filters"
                >
                  Reset
                </Link>
              )}
            </div>
          </form>

          {/* Category Filter Horizontal Momentum Scroll Bar */}
          <div className="pt-2 border-t border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Filter By Strategic Pillar:
              </span>
              <span className="text-[10px] text-[#D4AF37] font-semibold sm:hidden">
                Swipe horizontally ➔
              </span>
            </div>
            <div className="horizontal-scroll-touch items-center gap-2 py-1">
              <Link
                href="/activities"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all border whitespace-nowrap shrink-0 ${
                  !currentCategory
                    ? 'bg-[rgba(212,175,55,0.2)] text-[#F3E5AB] border-[rgba(212,175,55,0.6)] shadow-sm'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border-white/10'
                }`}
              >
                All Activities ({activities.length})
              </Link>
              {categories.map((cat) => {
                const isSelected = currentCategory === cat.slug;
                return (
                  <Link
                    key={cat.id}
                    href={`/activities?category=${cat.slug}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-[rgba(212,175,55,0.2)] text-[#F3E5AB] border-[rgba(212,175,55,0.6)] font-bold shadow-sm'
                        : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border-white/10'
                    }`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 3. ACTIVITIES GRID */}
      <section className="container">
        {activities.length === 0 ? (
          <div className="bkc-card text-center py-16 px-6 space-y-4 max-w-xl mx-auto">
            <Filter className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              No Activities Found
            </h3>
            <p className="text-sm text-slate-400">
              There are currently no activities matching your selected category or search term.
            </p>
            <Link href="/activities" className="btn btn-secondary text-xs">
              Clear All Filters
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>
                Showing <strong className="text-white">{activities.length}</strong> activity {activities.length === 1 ? 'post' : 'posts'}
              </span>
              {currentCategory && (
                <span>
                  Filtered by pillar:{' '}
                  <strong className="text-[#60A5FA]">
                    {categories.find((c) => c.slug === currentCategory)?.name || currentCategory}
                  </strong>
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {activities.map((act) => (
                <ActivityCard key={act.id} activity={act} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 4. SPONSOR A SIMILAR PROJECT BANNER */}
      <section className="container">
        <div className="bkc-card bkc-card-gold p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="badge badge-gold text-xs">Partner With BKC</span>
            <h3 className="text-2xl font-bold text-white font-['Outfit']">
              Want to Sponsor a Specific Educational Activity?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              We collaborate with international donors and corporate sponsors to replicate and scale these activities across other Local Government Areas.
            </p>
          </div>
          <Link href="/grants-sponsorships" className="btn btn-primary shrink-0 py-3.5 px-6 font-bold">
            Submit Sponsorship Inquiry
          </Link>
        </div>
      </section>
    </div>
  );
}
