'use client';

import React from 'react';
import { Users, MapPin, Award, GraduationCap, Laptop, BookOpen } from 'lucide-react';

interface ImpactProps {
  stats?: {
    totalBeneficiaries?: number;
    lgaCount?: number;
    yearsActive?: number;
    totalActivities?: number;
  };
}

export default function ImpactCounters({ stats }: ImpactProps) {
  const items = [
    {
      label: 'Direct Beneficiaries Reached',
      value: stats?.totalBeneficiaries ? `${stats.totalBeneficiaries.toLocaleString()}+` : '6,920+',
      icon: Users,
      description: 'Underprivileged children, out-of-school girls, and youth mentored.',
      color: 'text-[#FBBF24]',
      bg: 'bg-[rgba(245,158,11,0.12)]',
      border: 'border-[rgba(245,158,11,0.25)]'
    },
    {
      label: 'Adamawa LGAs Covered',
      value: `${stats?.lgaCount || 21} LGAs`,
      icon: MapPin,
      description: 'Pilot implemented across all 21 LGAs, ready for national 774-LGA rollout.',
      color: 'text-[#60A5FA]',
      bg: 'bg-[rgba(59,130,246,0.12)]',
      border: 'border-[rgba(59,130,246,0.25)]'
    },
    {
      label: 'Years of Proven Service',
      value: `${stats?.yearsActive || 16} Years`,
      icon: Award,
      description: 'Community-led impact conceived in 2010 and incorporated with CAC in 2012.',
      color: 'text-[#34D399]',
      bg: 'bg-[rgba(16,185,129,0.12)]',
      border: 'border-[rgba(16,185,129,0.25)]'
    },
    {
      label: 'Headmasters & Educators',
      value: '850+ Trained',
      icon: GraduationCap,
      description: 'Empowered through state-level leadership and modern pedagogy conferences.',
      color: 'text-[#A78BFA]',
      bg: 'bg-[rgba(167,139,250,0.12)]',
      border: 'border-[rgba(167,139,250,0.25)]'
    },
    {
      label: 'Children STEM Programs',
      value: '100% Free',
      icon: Laptop,
      description: 'Zero tuition charged for foundational computing, science kits, and robotics.',
      color: 'text-[#38BDF8]',
      bg: 'bg-[rgba(56,189,248,0.12)]',
      border: 'border-[rgba(56,189,248,0.25)]'
    },
    {
      label: 'Dedicated Facilities',
      value: '12+ Units',
      icon: BookOpen,
      description: 'Computer hall, V-SAT dish, incubators, study hubs, and technical shops.',
      color: 'text-[#F472B6]',
      bg: 'bg-[rgba(244,114,182,0.12)]',
      border: 'border-[rgba(244,114,182,0.25)]'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className={`bkc-card p-4 sm:p-6 flex flex-col justify-between border ${item.border} hover:scale-[1.02] transition-transform duration-300`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
              <span className={`w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </span>
              <span className="text-xl sm:text-3xl font-black font-['Outfit'] tracking-tight text-white">
                {item.value}
              </span>
            </div>
            <div>
              <h4 className="font-bold text-white text-xs sm:text-base mb-1 font-['Outfit'] line-clamp-1 sm:line-clamp-none">
                {item.label}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

