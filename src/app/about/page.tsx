import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileCheck, ShieldCheck, Phone, Mail, Send, HeartHandshake } from 'lucide-react';

export const metadata = {
  title: 'About Us | Bindir Knowledge Development Centre International (BKC)',
  description: 'Learn about the history, governance, leadership, and facilities of BKC International. Incorporated NGO (CAC/IT/NO 56020) under Patron HRH The Lamido of Adamawa and Founder Engr. Umar B. Bindir PhD FNA.'
};

export default function AboutPage() {
  const objectives = [
    'Introducing a community initiative on basic education.',
    'Providing access to modern basic education tools by children on non-profit terms.',
    'Motivating pupils and teachers in primary schools on modern teaching and learning tools.',
    'Providing affordable ICT services to the immediate community.',
    'Providing a standard model for National Community Support for basic education.',
    'Providing a channel for international support to community-based quality basic education delivery.',
    'Raising the status of primary school headmasters and teachers through modern initiatives including professional networks, conferences, and sponsored ICT capacity building.',
    'Providing educational and entertainment technology Audio-Visual services to pupils and teachers.',
    'Providing information on further education and other social opportunities.',
    'Providing facilities and platforms for community and political dialogue.',
    'Providing selected commercial services for entrepreneurship development and project sustainability.',
    'Providing all other relevant support and services for comprehensive community development.'
  ];

  const facilities = [
    {
      title: 'ICT Training & Computer Hall',
      desc: 'Air-conditioned hall equipped with multi-row workstations, network infrastructure, and multimedia projection for free children computing.',
      image: '/uploads/training-lab-workstations-1.png'
    },
    {
      title: 'Dedicated V-SAT Satellite Dish',
      desc: 'Provides continuous high-bandwidth community internet and WiFi access across the entire facility grounds.',
      image: '/uploads/bkc-vsat-installation-1.png'
    },
    {
      title: 'Grand Conference & Assembly Hall',
      desc: 'Large capacity assembly hall designed for the National Conference of Primary School Headmasters and educational symposiums.',
      image: '/uploads/headmasters-conference-hall.png'
    },
    {
      title: 'Executive Meeting & Dialogue Rooms',
      desc: 'Large and small capacity strategic discussion rooms for community stakeholder consultations and international partner summits.',
      image: '/uploads/bkc-meeting-room-1.jpg'
    },
    {
      title: '2 Business Incubator Suites',
      desc: 'Structured incubation pods fostering local entrepreneurship, youth technology ventures, and commercial sustainability.',
      image: '/uploads/bkc-incubator-office-1.jpg'
    },
    {
      title: 'Science Edutainment & Hardware Lab',
      desc: 'Specialized lab stocked with assorted technology kits, electronic boards, and experiment modules for children aged 5–12.',
      image: '/uploads/science-edutainment-kits-1.jpg'
    }
  ];

  const trustees = [
    {
      name: 'Engr. Umar Buba Bindir PhD FNA',
      role: 'Chairman, Board of Trustees / Founder & COO',
      desc: 'Distinguished agricultural engineer, former Director-General of NOTAP, and former Secretary to the State Government (SSG) of Adamawa State.'
    },
    {
      name: 'Engr. Halimatu Sadiya Umar Bindir',
      role: 'Trustee',
      desc: 'Dedicated advocate for female STEM empowerment, educational access, and technical curriculum integration.'
    },
    {
      name: 'Mr. Yahya Umar Bindir',
      role: 'Trustee',
      desc: 'Community development specialist focused on youth vocational programs and grassroots educational advocacy.'
    },
    {
      name: 'Mrs. Natacha Umar Bindir',
      role: 'Trustee',
      desc: 'Educationist championing early childhood development, foundational literacy, and child welfare initiatives.'
    }
  ];

  return (
    <div className="space-y-18 sm:space-y-24 pb-14 sm:pb-20 lg:pb-24">
      {/* 1. HERO / BANNER */}
      <section className="relative pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 bg-gradient-to-b from-[#0B1E3A] to-[#061124] border-b border-[rgba(255,255,255,0.08)]">
        <div className="container">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <span className="badge badge-gold text-xs">About BKC International</span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Outfit'] leading-tight">
              A Deliberate Community Movement for Quality Basic Education
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 leading-relaxed">
              Conceived in 2010 and incorporated under Part C of the Companies and Allied Matters Act (CAC/IT/NO 56020), Bindir Knowledge Development Centre International is a non-profit NGO dedicated to lifting under-privileged children and primary educators.
            </p>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE & PATRON / LEADERSHIP */}
      <section className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <span className="badge badge-blue text-xs">Origins & Institutional Heritage</span>
            <h2 className="section-title">
              Founded on the Principle that Knowledge is Good
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              The Bindir Knowledge Development Center International (BKC) was established as a deliberate community development initiative. Operating on purely voluntary and non-profit terms, BKC addresses one of Nigeria’s most pressing developmental bottlenecks: <strong>the crisis of quality basic education and digital illiteracy among children from under-served backgrounds</strong>.
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              With its headquarters in Yola Town, Adamawa State, BKC combines grassroots trust with high-level institutional governance, bringing together traditional leadership, seasoned technocrats, and community youth volunteers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-2 sm:pt-4">
              <div className="p-4 rounded-xl bg-[rgba(11,30,58,0.6)] border border-[rgba(59,130,246,0.25)]">
                <span className="text-xs text-slate-400 font-medium block">Royal Patron</span>
                <h4 className="text-base font-bold text-white font-['Outfit'] mt-1">
                  HRH, The Lamido of Adamawa
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Providing royal patronage and traditional moral authority to our community initiatives.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[rgba(11,30,58,0.6)] border border-[rgba(245,158,11,0.25)]">
                <span className="text-xs text-slate-400 font-medium block">Founder & COO</span>
                <h4 className="text-base font-bold text-[#E5C07B] font-['Outfit'] mt-1">
                  Engr. Umar B. Bindir PhD FNA
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Renowned engineer, former DG of NOTAP, former SSG of Adamawa State.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bkc-card p-4 sm:p-6 border-[rgba(245,158,11,0.3)] bg-gradient-to-br from-[#0B1E3A] to-[#061124] space-y-4">
              <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden border border-white/10">
                <Image
                  src="/uploads/children-training-class.jpg"
                  alt="Children learning at BKC"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#E5C07B] uppercase tracking-wider">
                  Organization Characteristics
                </span>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li>• A Registered Non-Governmental Organization (CAC/IT/NO 56020)</li>
                  <li>• 4-Member Board of Trustees overseeing strategic direction</li>
                  <li>• Professional Management headed by a Managing Director (MD)</li>
                  <li>• 4 Dedicated Activities and Business Managers</li>
                  <li>• Extensive pool of community-based young & retired volunteers</li>
                  <li>• Operating from No 12 Mallum Hamid St, Yola Town</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE 12 CONSTITUTIONAL OBJECTIVES */}
      <section className="container">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="badge badge-gold text-xs mb-2">Our Official Mandate</span>
          <h2 className="section-title">
            The 12 Core Objectives of BKC
          </h2>
          <p className="section-subtitle mx-auto">
            These twelve pillars form the institutional charter deposited with the Corporate Affairs Commission of the Federal Republic of Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {objectives.map((obj, idx) => (
            <div
              key={idx}
              className="bkc-card p-4 sm:p-6 flex flex-col justify-between border-[rgba(255,255,255,0.08)] hover:border-[rgba(59,130,246,0.35)]"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[rgba(245,158,11,0.15)] text-[#FBBF24] font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  {obj}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BOARD OF TRUSTEES */}
      <section id="trustees" className="container">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="badge badge-blue text-xs mb-2">Fiduciary Governance</span>
          <h2 className="section-title">
            Board of Trustees
          </h2>
          <p className="section-subtitle mx-auto">
            Governed by an experienced board committed to financial transparency, institutional rigor, and alignment with international donor standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {trustees.map((t, idx) => (
            <div key={idx} className="bkc-card p-4.5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[rgba(59,130,246,0.15)] text-[#60A5FA] flex items-center justify-center font-bold text-lg mb-4 font-['Outfit']">
                  {t.name.split(' ')[1]?.[0] || 'B'}
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-1 font-['Outfit']">
                  {t.name}
                </h4>
                <span className="text-xs font-semibold text-[#FBBF24] block mb-2 sm:mb-3">
                  {t.role}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FACILITIES & CAMPUS INFRASTRUCTURE */}
      <section id="facilities" className="container">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="badge badge-gold text-xs mb-2">Real Assets & Capabilities</span>
          <h2 className="section-title">
            Established Physical Facilities
          </h2>
          <p className="section-subtitle mx-auto">
            BKC possesses concrete infrastructure ready to deploy grant interventions directly to beneficiaries without overhead delays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {facilities.map((fac, idx) => (
            <div key={idx} className="bkc-card p-0 overflow-hidden group">
              <div className="relative h-44 sm:h-48 w-full bg-slate-900">
                <Image
                  src={fac.image}
                  alt={fac.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-6 space-y-1.5 sm:space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                  {fac.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {fac.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CAC CERTIFICATE & LEGAL INCORPORATION */}
      <section id="certificate" className="container">
        <div className="bkc-card bkc-card-gold p-5 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FBBF24]">
                <FileCheck className="w-4 h-4" />
                <span>LEGAL INCORPORATION CERTIFICATE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Outfit'] leading-tight">
                Corporate Affairs Commission (CAC/IT/NO 56020)
              </h2>
              <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
                Bindir Knowledge Development Center International was officially incorporated under the Common Seal of the Corporate Affairs Commission at Abuja on the <strong>14th day of September, 2012</strong>, signed by the Registrar-General Bello Mahmud.
              </p>

              <div className="p-3.5 sm:p-4 rounded-xl bg-[rgba(6,17,36,0.7)] border border-[rgba(245,158,11,0.2)] text-xs text-slate-300 space-y-2">
                <div>
                  <strong className="text-[#FBBF24]">Official Registered Name:</strong> BINDIR KNOWLEDGE DEVELOPMENT CENTER INTERNATIONAL
                </div>
                <div>
                  <strong className="text-[#FBBF24]">Registered Body:</strong> Incorporated Trustees
                </div>
                <div>
                  <strong className="text-[#FBBF24]">Certificate Number:</strong> CAC/IT/NO 56020 (Serial No: 558034)
                </div>
                <div>
                  <strong className="text-[#FBBF24]">Appointed Trustees:</strong> Engr. Umar Buba Bindir, Engr. Halimatu Sadiya Umar Bindir, Mr. Yahya Umar Bindir, Mrs. Natacha Umar Bindir
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <Link href="/grants-sponsorships" className="btn btn-secondary text-xs w-full sm:w-auto text-center justify-center min-h-[44px]">
                  Review Grant Application Criteria
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-56 sm:w-80 aspect-[1/1.4] rounded-2xl overflow-hidden border-4 border-[#F59E0B] shadow-2xl bg-white p-1">
                <Image
                  src="/uploads/cac-certificate.png"
                  alt="Original CAC Certificate of Incorporation"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EXECUTIVE CONTACT & OFFICE */}
      <section className="container">
        <div className="bkc-card bkc-card-gold p-6 sm:p-10 border-[rgba(212,175,55,0.35)] shadow-2xl relative overflow-hidden">
          {/* Subtle ambient gold wash */}
          <div
            className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full pointer-events-none opacity-20"
            style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)', filter: 'blur(50px)' }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Column: Direct Leadership Contact Details */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="badge badge-gold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Executive Secretariat
                </span>
                <span className="text-xs text-slate-400">Direct Leadership Inquiry</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-white font-['Outfit']">
                  Direct Inquiry to Founder &amp; Trustees
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Have institutional questions, educational partnership proposals, or donor inquiries? Reach out directly to our Founder and Governing Secretariat.
                </p>
              </div>

              {/* Verified Contact Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Telephone Direct</span>
                    <a href="tel:+2348033156117" className="text-xs sm:text-sm font-bold text-white hover:text-[#D4AF37] transition-colors">
                      +234 (0) 803 315 6117
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-medium">Official Email</span>
                    <a href="mailto:ubindir@yahoo.com" className="text-xs sm:text-sm font-bold text-white hover:text-[#D4AF37] transition-colors">
                      ubindir@yahoo.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Beautiful Action CTA Buttons */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-center">
              <Link
                href="/contact"
                className="btn btn-primary py-3.5 px-6 font-bold text-xs sm:text-sm shadow-xl shadow-amber-500/20 text-center justify-center"
                style={{ borderRadius: '0.75rem' }}
              >
                <Send className="w-4 h-4" />
                <span>Open Contact Form</span>
              </Link>
              <Link
                href="/grants-sponsorships#submit-proposal"
                className="btn btn-secondary py-3.5 px-6 font-semibold text-xs text-center justify-center border border-white/15"
                style={{ borderRadius: '0.75rem' }}
              >
                <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
                <span>Partner &amp; Grant Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
