'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  HeartHandshake,
  Download,
  CheckCircle2,
  Send,
  Building2,
  GraduationCap,
  Laptop,
  Users,
  Award,
  Globe2,
  Sparkles,
  ArrowRight,
  User,
  Mail,
  Phone,
  DollarSign,
  FileText,
  Lock,
  Clock,
  Layers,
  MessageSquare,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { sendInquiry } from '../../lib/inquiryEmail';

export default function GrantsSponsorshipsPage() {
  // Focus Initiatives with Auto-Generated Statements
  const focusInitiatives = [
    {
      id: 'headmasters',
      title: 'Primary Headmasters Summit (774 LGAs)',
      badge: 'Flagship Summit',
      icon: GraduationCap,
      subject: 'Grant Proposal: Primary Headmasters Conference Scaling (774 LGAs)',
      brief: 'We are exploring strategic co-funding with BKC International to convene, accredit, and train primary school headmasters across Northern Nigeria on modern school management, pedagogy, and digital leadership.'
    },
    {
      id: 'girls',
      title: 'Out-of-School Girls STEM & Literacy',
      badge: 'Girl-Child Welfare',
      icon: Users,
      subject: 'Sponsorship: Out-of-School Girls Digital Literacy & Reintegration',
      brief: 'Our organization wishes to partner with BKC to provide foundational literacy, numeracy, and digital skills workshops for marginalized and out-of-school girls in rural Adamawa communities.'
    },
    {
      id: 'labs',
      title: 'Community 60+ PC Training Labs',
      badge: 'Infrastructure',
      icon: Laptop,
      subject: 'Partnership: Equipping & Supporting Free Community Computer Labs',
      brief: 'We are interested in co-sponsoring BKC computer workstation hubs, solar inverter systems, and satellite connectivity to keep computing training 100% free for underprivileged children.'
    },
    {
      id: 'science',
      title: 'Children Science & Robotics Kits',
      badge: 'STEM Modules',
      icon: Sparkles,
      subject: 'Inquiry: Sponsoring Hands-on Science & STEM Hardware Kits',
      brief: 'We seek to sponsor modular electronics boards, robotics experimentation sets, and basic science modules for primary pupils across BKC training facilities.'
    },
    {
      id: 'alliance',
      title: 'General Institutional Grant & Alliance',
      badge: 'Multi-Year Core',
      icon: Globe2,
      subject: 'Institutional Grant & Strategic Alliance Dialogue',
      brief: 'We would like to establish a consultative dialogue with BKC Executive Leadership and Founder Engr. Umar B. Bindir PhD to evaluate multi-year grant co-funding opportunities.'
    }
  ];

  const partnershipTypes = [
    {
      id: 'GRANT',
      title: 'Institutional Grant',
      badge: 'Foundation / Bilateral',
      desc: 'Bilateral, multilateral or foundation grants',
      icon: Building2
    },
    {
      id: 'SPONSORSHIP',
      title: 'CSR Sponsorship',
      badge: 'Corporate / Bank',
      desc: 'Corporate social responsibility co-funding',
      icon: Award
    },
    {
      id: 'DONATION',
      title: 'Tech Donation',
      badge: 'Hardware / V-SAT',
      desc: 'PCs, lab equipment, solar or internet',
      icon: Laptop
    },
    {
      id: 'PARTNERSHIP',
      title: 'Strategic Alliance',
      badge: 'NGO / University',
      desc: 'Academic, research or NGO alliance',
      icon: Globe2
    }
  ];

  const budgetOptions = [
    '$10,000 – $25,000',
    '$25,000 – $50,000',
    '$50,000 – $100,000',
    '$100,000+',
    'Equipment / In-Kind'
  ];

  const quickObjectives = [
    'Convene Headmasters Summit Cohort',
    'Sponsor 500+ Out-of-School Girls',
    'Donate 50+ Workstation PCs',
    'Provide Solar V-SAT Satellite Access',
    'Supply Science Modular Experiment Kits',
    'Audited Impact Verification Protocol'
  ];

  const [selectedInitiative, setSelectedInitiative] = useState('headmasters');
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    organizationName: '',
    contactName: '',
    email: '',
    phone: '',
    type: 'GRANT',
    proposedFunding: '$50,000 – $100,000',
    subject: 'Grant Proposal: Primary Headmasters Conference Scaling (774 LGAs)',
    message: 'We are exploring strategic co-funding with BKC International to convene, accredit, and train primary school headmasters across Northern Nigeria on modern school management, pedagogy, and digital leadership.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSelectInitiative = (init: typeof focusInitiatives[0]) => {
    setSelectedInitiative(init.id);
    setSelectedObjectives([]);
    setFormData((prev) => ({
      ...prev,
      subject: init.subject,
      message: init.brief
    }));
  };

  const handleToggleObjective = (obj: string) => {
    const isAlready = selectedObjectives.includes(obj);
    const updated = isAlready
      ? selectedObjectives.filter((o) => o !== obj)
      : [...selectedObjectives, obj];
    setSelectedObjectives(updated);

    setFormData((prev) => {
      let baseMsg = prev.message;
      if (!isAlready) {
        if (!baseMsg.includes(obj)) {
          baseMsg = `${baseMsg}\n• Target Focus: ${obj}`;
        }
      } else {
        baseMsg = baseMsg.replace(`\n• Target Focus: ${obj}`, '').replace(`• Target Focus: ${obj}`, '');
      }
      return { ...prev, message: baseMsg };
    });
  };

  const priorityPrograms = [
    {
      title: 'National Conference for Primary School Headmasters',
      target: '774 LGAs Nationwide (21 LGAs Pilot Completed)',
      desc: 'Sponsor the convening, accreditation, pedagogical training, and conference kits for primary school headmasters state-by-state.',
      fundingNeed: '$50,000 – $250,000 per State cohort',
      icon: GraduationCap,
      category: 'Teacher Empowerment'
    },
    {
      title: 'Out-of-School Girl Child Education Reintegration',
      target: 'Northern Nigeria Rural LGAs',
      desc: 'Comprehensive community identification, literacy classes, school uniforms, and formal school enrollment for vulnerable young girls.',
      fundingNeed: '$25,000 – $100,000 per LGA',
      icon: Users,
      category: 'Girl Child Welfare'
    },
    {
      title: 'Science Edutainment & Hands-On STEM Hardware Kits',
      target: '10,000 Primary School Children',
      desc: 'Equipping learning centres and primary schools with assorted technology kits, circuitry boards, and basic science modules.',
      fundingNeed: '$15,000 – $60,000 per Hub',
      icon: Laptop,
      category: 'STEM Innovation'
    },
    {
      title: 'Rural Community V-SAT High-Speed Internet Hubs',
      target: 'Underserved Local Government Areas',
      desc: 'Deploying solar-backed V-SAT satellite stations to create free 24/7 digital study facilities in off-grid communities.',
      fundingNeed: '$30,000 per Hub installation',
      icon: Globe2,
      category: 'Digital Inclusion'
    }
  ];

  const partnershipTiers = [
    {
      tier: 'Strategic Anchor Funder',
      scope: 'State / National Co-Sponsorship',
      benefits: [
        'Co-branding on all conference materials & certificates across 774 LGAs',
        'Direct representation on Project Advisory Committee',
        'Quarterly audited financial and impact reports',
        'Keynote address at state headmaster summits'
      ],
      color: 'border-[#F59E0B]',
      badge: 'Tier 1'
    },
    {
      tier: 'Program / Project Sponsor',
      scope: 'Dedicated Thematic Intervention',
      benefits: [
        'Branded sponsorship of specific cohort (e.g. Girl-Child or STEM)',
        'Direct beneficiary tracking and verifiable metric reports',
        'Media recognition in press releases and publications',
        'Field visit and impact inspection privileges'
      ],
      color: 'border-[#3B82F6]',
      badge: 'Tier 2'
    },
    {
      tier: 'Technology & Equipment Donor',
      scope: 'Hardware & Infrastructure Support',
      benefits: [
        'Donation of PCs, V-SAT equipment, inverters, or science kits',
        'Plaque and naming recognition at BKC training labs',
        'Documented handover and installation verification'
      ],
      color: 'border-[#10B981]',
      badge: 'Tier 3'
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    const outcome = await sendInquiry(
      {
        subject: formData.subject,
        name: formData.contactName,
        email: formData.email,
        message: formData.message,
        details: {
          Organization: formData.organizationName,
          Phone: formData.phone,
          'Inquiry Type': formData.type,
          'Proposed Funding': formData.proposedFunding
        },
        botcheck: new FormData(e.currentTarget).has('botcheck')
      },
      'Thank you! Your grant/sponsorship inquiry has been received. Our leadership will review your proposal and respond promptly.'
    );

    setSubmitResult(outcome);
    if (outcome.success) {
      setFormData({
        organizationName: '',
        contactName: '',
        email: '',
        phone: '',
        type: 'GRANT',
        proposedFunding: '$50,000 – $100,000',
        subject: focusInitiatives[0].subject,
        message: focusInitiatives[0].brief
      });
      setSelectedInitiative('headmasters');
      setSelectedObjectives([]);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-18 sm:space-y-24 pb-14 sm:pb-20 lg:pb-24">
      {/* 1. SOPHISTICATED HERO SECTION FOR FUNDERS & SPONSORS */}
      <section className="relative pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 overflow-hidden border-b border-[rgba(255,255,255,0.08)] bg-gradient-to-b from-[#0B1E3A] via-[#06142B] to-[#040B18]">
        {/* Ambient Glows */}
        <div className="hero-glow-amber top-10 left-10" />
        <div className="hero-glow-blue bottom-0 right-10" />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Investment Case & CTAs (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.3)] text-[#FBBF24] text-xs font-bold tracking-wide">
                <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
                <span>OFFICIAL DONOR & PARTNER HUB • CAC/IT/NO 56020</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-white font-['Outfit'] leading-tight tracking-tight">
                Institutional Grants,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F3E5AB] to-[#D4AF37]">Strategic Sponsorships</span> & Impact Alliances
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                BKC International bridges global philanthropic capital and verified grassroots transformation. We collaborate with international foundations, multilateral development banks, diplomatic missions, and corporate CSR departments to co-fund scalable basic education infrastructure, STEM edutainment labs, and teacher leadership summits across Nigeria’s 774 Local Government Areas.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <a
                  href="#submit-proposal"
                  className="btn btn-primary py-3.5 px-6 font-bold text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 w-full sm:w-auto text-center"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Funding Proposal</span>
                </a>

                <a
                  href="/BKC Brief on BKC for Grants Application.pdf"
                  download
                  className="btn btn-secondary py-3.5 px-5 text-sm font-semibold flex items-center justify-center gap-2 w-full sm:w-auto text-center"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Grant Brief (PDF)</span>
                </a>

                <a
                  href="#sponsorship-calculator"
                  className="px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center justify-center gap-1.5 w-full sm:w-auto text-center"
                >
                  <DollarSign className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Calculate Scope</span>
                </a>
              </div>

              {/* Governance & Trust Verification Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-6 border-t border-white/10 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-[#FBBF24] font-bold block flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    48-Hour Review SLA
                  </span>
                  <span className="text-slate-400 text-[11px]">Direct founder and trustee review protocol</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-[#60A5FA] font-bold block flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    Audited Accountability
                  </span>
                  <span className="text-slate-400 text-[11px]">Quarterly financial and field impact reports</span>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                  <span className="text-[#34D399] font-bold block flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Patron Leadership
                  </span>
                  <span className="text-slate-400 text-[11px]">Traditional and technocratic oversight</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Res BKC Facility / Field Showcase (5 cols) */}
            <div className="lg:col-span-5 relative">
              {/* Main Photo: BKC Children Training */}
              <div
                className="hero-visual-card relative w-full overflow-hidden"
                style={{
                  height: '300px',
                  backgroundColor: '#040B18',
                  border: '1px solid rgba(245,158,11,0.4)'
                }}
              >
                <img
                  src="/uploads/children-training-class.jpg"
                  alt="BKC Children STEM Training Hall"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(4,11,24,0.4) 50%, rgba(4,11,24,0.95) 100%)'
                  }}
                />

                <div className="absolute top-3 left-3">
                  <span className="badge badge-gold text-[10px] shadow-lg backdrop-blur-md">
                    Verified Program
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 space-y-1">
                  <h3 className="text-sm font-bold text-white font-['Outfit']">
                    100% Free Children STEM Training
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1">
                    Targeted at underprivileged children &amp; public school pupils
                  </p>
                </div>
              </div>

              {/* Floating Overlapping Card 1: CAC Registration (Top Right Offset) */}
              <div
                className="hidden sm:flex items-center gap-3 p-2.5 rounded-xl border border-white/15 shadow-2xl absolute -top-5 -right-5 z-20"
                style={{
                  backgroundColor: 'rgba(8, 20, 44, 0.95)',
                  backdropFilter: 'blur(16px)',
                  maxWidth: '260px'
                }}
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-amber-400/40 bg-black">
                  <img
                    src="/uploads/cac-certificate.png"
                    alt="CAC Certificate"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-1 text-[#FBBF24] font-bold text-[10px]">
                    <ShieldCheck className="w-3 h-3" />
                    <span>CAC Certified</span>
                  </div>
                  <strong className="text-white font-['Outfit'] block leading-tight">
                    CAC/IT/NO 56020
                  </strong>
                  <span className="text-[10px] text-slate-400">Part C Incorporated NGO</span>
                </div>
              </div>

              {/* Floating Overlapping Card 2: Physical Campus (Bottom Left Offset) */}
              <div
                className="hidden sm:flex items-center gap-3 p-2.5 rounded-xl border border-white/15 shadow-2xl absolute -bottom-6 -left-6 z-20"
                style={{
                  backgroundColor: 'rgba(8, 20, 44, 0.95)',
                  backdropFilter: 'blur(16px)',
                  maxWidth: '270px'
                }}
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-emerald-400/40 bg-black">
                  <img
                    src="/uploads/bkc-conference-hall.png"
                    alt="BKC Conference & Training Hall"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div className="text-xs">
                  <div className="flex items-center gap-1 text-[#34D399] font-bold text-[10px]">
                    <Building2 className="w-3 h-3" />
                    <span>Physical Infrastructure</span>
                  </div>
                  <strong className="text-white font-['Outfit'] block leading-tight">
                    60+ PC Terminal Facility
                  </strong>
                  <span className="text-[10px] text-slate-400">Yola Town Established Campus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY PARTNER WITH BKC */}
      <section className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="badge badge-gold text-xs mb-2">Institutional Credibility</span>
          <h2 className="section-title">
            Why Foundations & Donors Partner With Us
          </h2>
          <p className="section-subtitle mx-auto">
            We provide funders with a transparent, battle-tested operational bridge between international grant capital and verified grassroots impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          <div className="bkc-card p-6 space-y-3 border-[rgba(245,158,11,0.3)]">
            <div className="w-12 h-12 rounded-xl bg-[rgba(245,158,11,0.15)] text-[#FBBF24] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white font-['Outfit']">
              CAC Legal Incorporation
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Registered NGO under Part C (CAC/IT/NO 56020). Clear fiduciary accountability under our 4-member Board of Trustees.
            </p>
          </div>

          <div className="bkc-card p-6 space-y-3 border-[rgba(59,130,246,0.3)]">
            <div className="w-12 h-12 rounded-xl bg-[rgba(59,130,246,0.15)] text-[#60A5FA] flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white font-['Outfit']">
              Physical Campus & Assets
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              No overhead lag. We operate real training halls, V-Sat satellite systems, meeting rooms, and incubator suites in Yola Town.
            </p>
          </div>

          <div className="bkc-card p-6 space-y-3 border-[rgba(16,185,129,0.3)]">
            <div className="w-12 h-12 rounded-xl bg-[rgba(16,185,129,0.15)] text-[#34D399] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white font-['Outfit']">
              Traditional & Grassroots Trust
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Under the Royal Patronage of HRH The Lamido of Adamawa, with hundreds of youth and retired volunteers embedded locally.
            </p>
          </div>

          <div className="bkc-card p-6 space-y-3 border-[rgba(167,139,250,0.3)]">
            <div className="w-12 h-12 rounded-xl bg-[rgba(167,139,250,0.15)] text-[#A78BFA] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white font-['Outfit']">
              Experienced Leadership
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Led by Engr. Umar B. Bindir PhD FNA, veteran engineer, former Director-General of NOTAP, and former Secretary to the State Government.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PRIORITY FUNDING PROGRAMS */}
      <section className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="badge badge-blue text-xs mb-2">Targeted Interventions</span>
          <h2 className="section-title">
            Priority Funding Opportunities
          </h2>
          <p className="section-subtitle mx-auto">
            Select a project area below to co-fund or sponsor with BKC International.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {priorityPrograms.map((prog, idx) => {
            const Icon = prog.icon;
            return (
              <div key={idx} className="bkc-card p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-12 h-12 rounded-xl bg-[rgba(59,130,246,0.15)] text-[#60A5FA] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className="badge badge-gold text-[10px]">
                      {prog.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit']">
                    {prog.title}
                  </h3>

                  <div className="text-xs text-[#60A5FA] font-semibold">
                    Target Area: {prog.target}
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {prog.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Estimated Co-Funding Need:</span>
                    <span className="text-xs font-bold text-[#FBBF24]">{prog.fundingNeed}</span>
                  </div>

                  <button
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        subject: `Sponsorship Proposal: ${prog.title}`
                      }));
                      const formElement = document.getElementById('submit-proposal');
                      if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn btn-secondary text-xs font-bold py-2 px-4"
                  >
                    Select This Project
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. PARTNERSHIP TIERS */}
      <section className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="badge badge-gold text-xs mb-2">Collaboration Models</span>
          <h2 className="section-title">
            Sponsorship & Funding Tiers
          </h2>
          <p className="section-subtitle mx-auto">
            Flexible funding structures aligned with donor compliance guidelines and reporting frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {partnershipTiers.map((t, idx) => (
            <div
              key={idx}
              className={`bkc-card p-8 flex flex-col justify-between border-2 ${t.color} space-y-6`}
            >
              <div className="space-y-4">
                <span className="badge badge-gold text-xs">{t.badge}</span>
                <h3 className="text-2xl font-bold text-white font-['Outfit']">
                  {t.tier}
                </h3>
                <p className="text-xs text-[#60A5FA] font-bold">
                  Scope: {t.scope}
                </p>

                <ul className="space-y-2.5 text-xs text-slate-300 pt-3 border-t border-[rgba(255,255,255,0.08)]">
                  {t.benefits.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    subject: `Partnership Inquiry: ${t.tier} Tier`
                  }));
                  const formElement = document.getElementById('submit-proposal');
                  if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn btn-outline-gold w-full text-xs font-bold py-3"
              >
                Inquire for {t.badge}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SPLIT-CARD SECTION: PHOTO BACKGROUND ON LEFT, CLEAR NON-OVERWHELMING FORM ON RIGHT */}
      <section id="submit-proposal" className="container px-3 sm:px-6 pt-4 sm:pt-6 pb-12">
        <div className="max-w-6xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden border border-[rgba(245,158,11,0.3)] shadow-2xl bg-[#06142B]/95 backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
            {/* LEFT COLUMN: BACKGROUND PHOTO WITH TRANSLUCENT TINT (5 COLS) */}
            <div className="lg:col-span-5 relative proposal-photo-column flex flex-col justify-between overflow-hidden min-h-[260px] sm:min-h-[480px]">
              {/* Authentic Photo as Background - Clearly Visible */}
              <img
                src="/uploads/children-training-class.jpg"
                alt="BKC Educational & STEM Training"
                className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-700 brightness-[1.03] contrast-[1.05]"
              />
              {/* Subtle translucent teal/sapphire wash so photo is clearly visible */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(160deg, rgba(6, 78, 59, 0.20) 0%, rgba(6, 38, 54, 0.32) 50%, rgba(4, 18, 36, 0.48) 100%)'
                }}
              />

              {/* Top Pill Badge */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/75 border border-emerald-400/40 text-emerald-200 text-[11px] sm:text-xs font-bold tracking-wide backdrop-blur-md shadow-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>CAC/IT/NO 56020 • REGISTERED NGO</span>
                </div>
              </div>

              {/* Middle Headline & Description with crisp text border for maximum readability */}
              <div className="relative z-10 space-y-2.5 sm:space-y-4 my-auto py-4 sm:py-8">
                <h2
                  className="text-xl sm:text-4xl font-extrabold text-white font-['Outfit'] leading-tight tracking-tight"
                  style={{
                    textShadow:
                      '-1.5px -1.5px 0 #040b18, 1.5px -1.5px 0 #040b18, -1.5px 1.5px 0 #040b18, 1.5px 1.5px 0 #040b18, 0 1.5px 0 #040b18, 0 -1.5px 0 #040b18, 1.5px 0 0 #040b18, -1.5px 0 0 #040b18, 0 3px 12px rgba(0,0,0,0.95)',
                    WebkitTextStroke: '0.8px #040b18',
                    paintOrder: 'stroke fill'
                  }}
                >
                  Fully Dedicated To{' '}
                  <span
                    className="text-[#34D399] block"
                    style={{
                      textShadow:
                        '-1.5px -1.5px 0 #021a12, 1.5px -1.5px 0 #021a12, -1.5px 1.5px 0 #021a12, 1.5px 1.5px 0 #021a12, 0 1.5px 0 #021a12, 0 -1.5px 0 #021a12, 1.5px 0 0 #021a12, -1.5px 0 0 #021a12, 0 3px 12px rgba(0,0,0,0.95)',
                      WebkitTextStroke: '0.8px #021a12',
                      paintOrder: 'stroke fill'
                    }}
                  >
                    Basic Education &amp; STEM.
                  </span>
                </h2>

                <p
                  className="text-[11px] sm:text-sm text-white leading-relaxed max-w-md font-semibold line-clamp-3 sm:line-clamp-none"
                  style={{
                    textShadow:
                      '-1.2px -1.2px 0 #040b18, 1.2px -1.2px 0 #040b18, -1.2px 1.2px 0 #040b18, 1.2px 1.2px 0 #040b18, 0 1.2px 0 #040b18, 0 -1.2px 0 #040b18, 1.2px 0 0 #040b18, -1.2px 0 0 #040b18, 0 2px 8px rgba(0,0,0,0.95)',
                    WebkitTextStroke: '0.4px #040b18',
                    paintOrder: 'stroke fill'
                  }}
                >
                  Empowering underprivileged children and primary headmasters across Nigeria’s 774 Local Government Areas through scalable basic education infrastructure and digital learning.
                </p>

                {/* Pill Buttons */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
                  <a
                    href="/BKC Brief on BKC for Grants Application.pdf"
                    download
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#10B981] hover:bg-[#059669] text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/30"
                  >
                    <span>Download Brief</span>
                    <span className="w-3.5 h-3.5 rounded-full bg-slate-950/20 flex items-center justify-center text-[9px]">▶</span>
                  </a>

                  <a
                    href="/about"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-950/60 hover:bg-slate-900 text-white font-semibold text-xs border border-white/15 transition-all backdrop-blur-md shadow-md"
                  >
                    <span>Explore Impact</span>
                    <span className="w-3.5 h-3.5 rounded-full bg-white/20 flex items-center justify-center text-[9px]">▶</span>
                  </a>
                </div>
              </div>

              {/* Bottom SLA with Glass Backing */}
              <div className="relative z-10 flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-950/50 backdrop-blur-md border border-white/[0.08] text-[10px] sm:text-[11px] text-slate-200">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-1.5 rounded-full bg-emerald-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                </div>
                <div className="flex items-center gap-1 font-semibold text-emerald-300">
                  <Clock className="w-3 h-3" />
                  <span>48-Hour SLA Guarantee</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: CLEAN, NON-OVERWHELMING FORM (7 COLS) */}
            <div className="lg:col-span-7 proposal-form-container flex flex-col justify-center">
              <div className="max-w-lg mx-auto w-full space-y-5 sm:space-y-6">
                <div>
                  <span className="badge badge-gold text-xs mb-2">Institutional Proposal</span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit']">
                    Submit an Inquiry
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Quick, non-binding proposal submission. Direct review by Founder &amp; Trustees.
                  </p>
                </div>

                {submitResult && (
                  <div
                    className={`p-4 rounded-xl text-sm font-medium border flex items-start gap-3 ${
                      submitResult.success
                        ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-200'
                        : 'bg-red-950/70 border-red-500/60 text-red-200'
                    }`}
                  >
                    {submitResult.success ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h5 className="font-bold">{submitResult.success ? 'Inquiry Successfully Received' : 'Inquiry Not Sent'}</h5>
                      <p className="text-xs mt-0.5 opacity-90">{submitResult.message}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot: hidden from people, filled in by spam bots */}
                  <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

                  {/* Row 1: Full Name & Organization */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="input-label">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Dr. Jane Doe"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="input-label">Organization (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Ford Foundation, CSR"
                        value={formData.organizationName}
                        onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                        className="input-field"
                      />
                    </div>
                  </div>

                  {/* Row 2: Official Work Email */}
                  <div>
                    <label className="input-label">Official Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. contact@organization.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field"
                    />
                  </div>

                  {/* Row 3: Partnership Category & Indicative Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="input-label">Partnership Category *</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="input-field form-select cursor-pointer"
                        style={{ backgroundColor: '#061124' }}
                      >
                        <option value="GRANT">Institutional Grant Application</option>
                        <option value="SPONSORSHIP">Corporate CSR Sponsorship</option>
                        <option value="DONATION">Tech &amp; Hardware Donation</option>
                        <option value="PARTNERSHIP">Strategic NGO Alliance</option>
                        <option value="GENERAL">General Funding Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="input-label">Indicative Budget / Scope</label>
                      <select
                        value={formData.proposedFunding}
                        onChange={(e) => setFormData({ ...formData, proposedFunding: e.target.value })}
                        className="input-field form-select cursor-pointer"
                        style={{ backgroundColor: '#061124' }}
                      >
                        <option value="$10,000 – $25,000">$10,000 – $25,000</option>
                        <option value="$25,000 – $50,000">$25,000 – $50,000</option>
                        <option value="$50,000 – $100,000">$50,000 – $100,000</option>
                        <option value="$100,000+">$100,000+ (Anchor Funder)</option>
                        <option value="Equipment / In-Kind">Equipment / In-Kind (PCs/Solar)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Program of Interest */}
                  <div>
                    <label className="input-label">Program / Area of Interest *</label>
                    <select
                      value={
                        focusInitiatives.find((f) => f.id === selectedInitiative)?.title ||
                        focusInitiatives[0].title
                      }
                      onChange={(e) => {
                        const chosen = focusInitiatives.find((f) => f.title === e.target.value);
                        if (chosen) {
                          handleSelectInitiative(chosen);
                        }
                      }}
                      className="input-field form-select cursor-pointer"
                      style={{ backgroundColor: '#061124' }}
                    >
                      {focusInitiatives.map((init) => (
                        <option key={init.id} value={init.title}>
                          {init.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 5: Brief Proposal Summary / Objectives */}
                  <div>
                    <label className="input-label">Brief Proposal Summary / Objectives *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Outline your organization's goals, funding timelines, or specific activities..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-field leading-relaxed"
                      style={{ minHeight: '90px' }}
                    />
                  </div>

                  {/* Submit CTA Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full py-3.5 font-bold text-sm shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
                      style={{ borderRadius: '0.75rem' }}
                    >
                      {isSubmitting ? (
                        'Submitting Inquiry...'
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Proposal Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>🔒 Confidential &amp; Audited</span>
                    <span>Direct Executive Review SLA</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
