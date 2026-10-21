import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  CheckCircle2,
  Building2,
  Users,
  Compass,
  FileCheck,
  Globe
} from 'lucide-react';
import ImpactCounters from '../components/ImpactCounters';
import ActivityCard from '../components/ActivityCard';
import { getActivities, getStats } from '../data/content';

export default function HomePage() {
  const activities = getActivities({ publishedOnly: true });
  const stats = getStats();

  // Featured flagship projects
  const featuredActivities = activities.slice(0, 3);

  const coreObjectives = [
    {
      title: 'Universal Access to Modern Tools',
      description: 'Providing non-profit access to computers, digital learning software, and foundational science kits for primary school pupils.'
    },
    {
      title: 'Empowering Out-of-School Girls',
      description: 'Special outreach programs to rehabilitate, educate, and reintegrate vulnerable girl-children into formal primary education.'
    },
    {
      title: 'Elevating Headmaster Leadership',
      description: 'Hosting dedicated capacity-building conferences for primary school headmasters across all 774 Local Government Areas.'
    },
    {
      title: 'Community V-SAT Broadband',
      description: 'Operating community-wide high-speed internet and quiet revision study hubs powered by our dedicated V-SAT dish.'
    },
    {
      title: 'Assorted Science Edutainment',
      description: 'Hands-on electronics disassembly, robotics, and STEM kits to ignite curiosity and career orientation at an early age.'
    },
    {
      title: 'Business Incubators & Tech Hubs',
      description: 'Operating 2 business incubator suites and 12 technical services shops for youth skills and community sustainability.'
    }
  ];

  return (
    <div className="space-y-18 sm:space-y-24 pb-14 sm:pb-20 lg:pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* Left Col: Pitch & CTAs */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.3)] text-[#FBBF24] text-xs font-bold tracking-wide">
                <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                <span>Incorporated NGO • CAC/IT/NO 56020</span>
              </div>

              <h1 className="text-[1.85rem] sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight font-['Outfit']">
                Deliberate Community Support for{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F3E5AB] to-[#D4AF37]">
                  Quality Basic Education
                </span>
              </h1>

              <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Bindir Knowledge Development Centre International (BKC) establishes and operates high-quality knowledge, science, and ICT facilities. We partner with{' '}
                <strong className="text-white font-semibold">foundations, international donors, NGOs, and corporations</strong> to empower under-privileged children, out-of-school girls, and primary educators.
              </p>

              {/* Action Buttons: Stacked on mobile, side-by-side on sm+ */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <Link
                  href="/grants-sponsorships"
                  className="btn btn-primary text-sm sm:text-base py-3.5 px-7 shadow-lg shadow-amber-500/20 w-full sm:w-auto text-center justify-center"
                >
                  <HeartHandshake className="w-5 h-5" />
                  Partner / Grant Opportunities
                </Link>

                <Link
                  href="/activities"
                  className="btn btn-secondary text-sm sm:text-base py-3.5 px-6 w-full sm:w-auto text-center justify-center"
                >
                  Explore Our Activities
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Patron & Founder Credibility Micro-Bar */}
              <div className="pt-5 sm:pt-6 border-t border-[rgba(255,255,255,0.1)] grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-400">
                <div>
                  <span className="block text-slate-500 font-medium text-[11px]">Patron</span>
                  <span className="text-slate-200 font-semibold text-xs sm:text-sm">HRH, The Lamido of Adamawa</span>
                </div>
                <div className="h-6 w-px bg-white/10 hidden sm:block" />
                <div>
                  <span className="block text-slate-500 font-medium text-[11px]">Founder & COO</span>
                  <span className="text-slate-200 font-semibold text-xs sm:text-sm">Engr. Umar B. Bindir PhD FNA</span>
                </div>
                <div className="h-6 w-px bg-white/10 hidden sm:block" />
                <div className="col-span-2 sm:col-span-1">
                  <span className="block text-slate-500 font-medium text-[11px]">Pilot Scope</span>
                  <span className="text-[#FBBF24] font-semibold text-xs sm:text-sm">21 LGAs (Ready for 774)</span>
                </div>
              </div>
            </div>

            {/* Right Col: High-Res Authentic BKC Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Card: Lab Workstations */}
                <div className="hero-main-image-card" style={{ height: '320px' }}>
                  <Image
                    src="/uploads/training-lab-workstations-1.png"
                    alt="BKC Training Hall Workstations"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #061124 0%, transparent 60%)' }} />
                  <div className="absolute bottom-4 left-4 right-4" style={{ zIndex: 1 }}>
                    <span className="badge badge-gold text-[10px] mb-1.5">
                      Established Facility
                    </span>
                    <h4 className="text-white font-bold text-sm sm:text-base font-['Outfit']">
                      BKC ICT & Computer Training Hall
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-300">
                      Air-conditioned multi-workstation hall for free children STEM training.
                    </p>
                  </div>
                </div>

                {/* Mobile-Only Interactive Facility Thumbnails */}
                <div className="grid grid-cols-2 gap-3 pt-3.5 sm:hidden">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[rgba(11,30,58,0.8)] border border-amber-500/25">
                    <div className="w-10 h-10 rounded-lg overflow-hidden relative shrink-0">
                      <Image
                        src="/uploads/children-edutainment-hardware.jpg"
                        alt="Children hardware lab"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-[10px] leading-tight">
                      <span className="text-[#FBBF24] font-bold block">Free STEM Lab</span>
                      <span className="text-white font-medium line-clamp-1">Hardware & Robotics</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2 rounded-xl bg-[rgba(11,30,58,0.8)] border border-blue-500/25">
                    <div className="w-10 h-10 rounded-lg overflow-hidden relative shrink-0">
                      <Image
                        src="/uploads/bkc-vsat-installation-1.png"
                        alt="V-Sat dish"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-[10px] leading-tight">
                      <span className="text-[#60A5FA] font-bold block">V-SAT Dish</span>
                      <span className="text-white font-medium line-clamp-1">Community WiFi Hub</span>
                    </div>
                  </div>
                </div>

                {/* Floating Card: Children in Lab (Desktop/Tablet) */}
                <div className="hero-floating-card-1">
                  <div className="relative w-full rounded-lg overflow-hidden" style={{ height: '7rem' }}>
                    <Image
                      src="/uploads/children-edutainment-hardware.jpg"
                      alt="Children learning hardware"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-[#FBBF24] block">
                      Daily Free Training
                    </span>
                    <span className="text-[11px] text-white font-semibold line-clamp-1">
                      Hands-On Hardware Labs
                    </span>
                  </div>
                </div>

                {/* Floating Card: V-Sat Installation (Desktop/Tablet) */}
                <div className="hero-floating-card-2">
                  <div className="relative w-full rounded-lg overflow-hidden" style={{ height: '6rem' }}>
                    <Image
                      src="/uploads/bkc-vsat-installation-1.png"
                      alt="BKC V-Sat Satellite System"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="pt-1.5">
                    <span className="text-[10px] font-bold text-[#60A5FA] block">
                      High-Speed V-SAT
                    </span>
                    <span className="text-[11px] text-white font-semibold line-clamp-1">
                      Community Internet Hub
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IMPACT COUNTERS BAR */}
      <section className="container">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge badge-gold text-xs mb-2">Verified Real-World Impact</span>
          <h2 className="section-title text-2xl sm:text-3xl">
            Numbers That Speak For Themselves
          </h2>
          <p className="text-sm text-slate-300">
            Over a decade of voluntary grassroots service to children and primary education in Nigeria.
          </p>
        </div>
        <ImpactCounters stats={stats} />
      </section>

      {/* 3. MISSION & VISION SECTION */}
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bkc-card bkc-card-gold p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[rgba(245,158,11,0.15)] flex items-center justify-center text-[#FBBF24] mb-6">
                <Compass className="w-7 h-7" />
              </div>
              <span className="badge badge-gold text-xs mb-3">Our Vision</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-['Outfit']">
                Active Community Participation in Quality Education
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">
                &ldquo;To deliberately unleash and encourage active community participation and support in the effective delivery of quality basic education to under-privileged children.&rdquo;
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.08)] flex items-center gap-2 text-xs text-[#FBBF24] font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              Grassroots community ownership since 2010
            </div>
          </div>

          {/* Mission */}
          <div className="bkc-card p-8 sm:p-10 flex flex-col justify-between border-[rgba(59,130,246,0.3)]">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[rgba(59,130,246,0.15)] flex items-center justify-center text-[#60A5FA] mb-6">
                <BookOpen className="w-7 h-7" />
              </div>
              <span className="badge badge-blue text-xs mb-3">Our Mission</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 font-['Outfit']">
                High-Quality Knowledge Facilities on Voluntary Terms
              </h3>
              <p className="text-slate-300 text-base leading-relaxed">
                &ldquo;By establishing and operating high quality knowledge and education facilities targeted at basic education on voluntary terms and also by sharing appropriate capacity building experiences.&rdquo;
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.08)] flex items-center gap-2 text-xs text-[#60A5FA] font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              Fully equipped facilities established in Yola South
            </div>
          </div>
        </div>
      </section>

      {/* 4. STRATEGIC OBJECTIVES */}
      <section className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="badge badge-gold text-xs mb-2">Institutional Mandate</span>
            <h2 className="section-title">
              Our 6 Strategic Focus Areas
            </h2>
            <p className="section-subtitle mb-0">
              Anchored in our official CAC constitution, delivering systemic transformation to education and community resilience.
            </p>
          </div>
          <Link
            href="/about"
            className="btn btn-secondary self-start md:self-auto shrink-0"
          >
            Full 12 Objectives
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {coreObjectives.map((obj, i) => (
            <div key={i} className="bkc-card p-6 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#FBBF24] font-black text-sm mb-4 font-['Outfit']">
                  0{i + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-['Outfit']">
                  {obj.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {obj.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FEATURED ACTIVITIES & IMPACT */}
      <section className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="badge badge-blue text-xs mb-2">Proven Track Record</span>
            <h2 className="section-title">
              Flagship Activities & Projects
            </h2>
            <p className="section-subtitle mb-0">
              Take a look at how BKC delivers daily impact on the ground in basic education, girls outreach, and teacher networking.
            </p>
          </div>
          <Link href="/activities" className="btn btn-primary self-start md:self-auto shrink-0">
            View All Activities
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredActivities.map((act) => (
            <ActivityCard key={act.id} activity={act} />
          ))}
        </div>
      </section>

      {/* 6. REAL FACILITIES SHOWCASE */}
      <section className="container">
        <div className="bkc-card p-6 sm:p-12 border-[rgba(59,130,246,0.3)] bg-gradient-to-br from-[#0B1E3A] to-[#061124]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              <span className="badge badge-gold text-xs">Physical Infrastructure</span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit'] leading-tight">
                Established Facilities Ready for Scaling
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Unlike theoretical programs, BKC already owns and operates a physical campus in Yola Town with fully operational utilities:
              </p>

              <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span><strong>Training Hall:</strong> 60+ computer workstations & projector</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span><strong>V-SAT Installation:</strong> Dedicated high-speed internet dish</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span><strong>Meeting Rooms:</strong> Strategic conference & dialogue rooms</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span><strong>Business Incubators:</strong> 2 suites + 12 technical shops</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  <span><strong>Staff Quarters:</strong> Single staff accommodation on site</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link href="/gallery" className="btn btn-secondary text-sm py-3 px-5 w-full sm:w-auto text-center justify-center">
                  Tour All Facilities in Gallery
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-3.5 sm:gap-4">
              <div className="relative h-32 sm:h-52 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <Image
                  src="/uploads/training-lab-workstations-2.png"
                  alt="Training lab chairs and computers"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 sm:h-52 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <Image
                  src="/uploads/bkc-meeting-room-1.jpg"
                  alt="Meeting room"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 sm:h-52 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <Image
                  src="/uploads/headmasters-conference-hall.png"
                  alt="Conference hall"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-32 sm:h-52 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <Image
                  src="/uploads/bkc-vsat-installation-2.png"
                  alt="V-Sat dish"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. INSTITUTIONAL TRUST & CAC LEGAL CERTIFICATION */}
      <section className="container">
        <div className="bkc-card bkc-card-gold p-6 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            <div className="lg:col-span-8 space-y-4 sm:space-y-5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FBBF24]">
                <FileCheck className="w-4 h-4" />
                <span>OFFICIAL VERIFICATION • FEDERAL REPUBLIC OF NIGERIA</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit'] leading-tight">
                Registered Under the Corporate Affairs Commission (CAC)
              </h2>
              <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
                BKC is a formally incorporated non-profit body registered under Part C of the Companies and Allied Matters Act. Our governance structure features an esteemed 4-member Board of Trustees and patronship by His Royal Highness, The Lamido of Adamawa.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 text-xs text-slate-300 pt-2">
                <div className="p-3 bg-[rgba(6,17,36,0.6)] rounded-lg border border-[rgba(245,158,11,0.2)]">
                  <span className="block text-slate-400 font-medium">Registration Number:</span>
                  <span className="text-[#FBBF24] font-bold text-sm">CAC/IT/NO 56020</span>
                </div>
                <div className="p-3 bg-[rgba(6,17,36,0.6)] rounded-lg border border-[rgba(245,158,11,0.2)]">
                  <span className="block text-slate-400 font-medium">Registered Trustees:</span>
                  <span className="text-white font-bold">4 Members (Engr. Umar Buba Bindir et al.)</span>
                </div>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <Link href="/about#certificate" className="btn btn-outline-gold text-xs font-bold w-full sm:w-auto text-center justify-center">
                  View CAC Incorporation Certificate
                </Link>
                <Link href="/about#leadership" className="text-xs text-slate-300 hover:text-white underline text-center sm:text-left py-1">
                  Read Leadership Profiles
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-44 sm:w-60 aspect-[1/1.4] rounded-xl overflow-hidden border border-[rgba(212,175,55,0.35)] shadow-2xl bg-white p-1">
                <Image
                  src="/uploads/cac-certificate.png"
                  alt="CAC Certificate of Incorporation"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. GRANTS & SPONSORSHIP CALL TO ACTION */}
      <section className="container">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-14 bg-gradient-to-r from-[#1E40AF] via-[#0B1E3A] to-[#142F5B] border border-[rgba(59,130,246,0.4)] shadow-2xl text-center space-y-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="badge badge-gold text-xs">Opportunities for Strategic Support</span>
            <h2 className="text-2xl sm:text-5xl font-extrabold text-white font-['Outfit'] leading-tight">
              Partner With Us to Expand Quality Basic Education
            </h2>
            <p className="text-sm sm:text-lg text-slate-200 leading-relaxed">
              We welcome international grant agencies, corporate CSR directors, bilateral development partners, and philanthropic donors to co-fund our high-impact programs across Nigeria.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href="/grants-sponsorships"
                className="btn btn-primary text-sm sm:text-base py-3.5 px-7 shadow-xl shadow-amber-500/25 w-full sm:w-auto text-center justify-center"
              >
                <HeartHandshake className="w-5 h-5" />
                Explore Grant Opportunities
              </Link>
              <a
                href="/BKC Brief on BKC for Grants Application.pdf"
                download
                className="btn btn-secondary text-sm sm:text-base py-3.5 px-6 w-full sm:w-auto text-center justify-center"
              >
                Download Official BKC Brief (PDF)
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
