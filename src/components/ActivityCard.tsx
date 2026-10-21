import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Users, ArrowRight, ShieldCheck } from 'lucide-react';

export interface ActivityItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  date: string;
  location: string;
  categoryId: string;
  category?: {
    name: string;
    slug: string;
  };
  impact?: string;
  beneficiariesCount?: number;
  beneficiariesLabel?: string;
  partnersInvolved?: string;
  coverImage?: string;
  images?: string[];
  isFeatured?: boolean;
}

export default function ActivityCard({ activity }: { activity: ActivityItem }) {
  const formattedDate = new Date(activity.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const imageSrc = activity.coverImage || activity.images?.[0] || '/uploads/training-lab-workstations-1.png';

  return (
    <div className="bkc-card group flex flex-col justify-between overflow-hidden p-0 border border-[rgba(255,255,255,0.1)] hover:border-[rgba(59,130,246,0.5)] transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
        <Image
          src={imageSrc}
          alt={activity.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061124] via-transparent to-black/30" />

        {/* Top Badges Bar: Category & Flagship Project without overlapping */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2 z-10 pointer-events-none">
          {activity.category ? (
            <span className="badge badge-blue text-[10px] sm:text-[11px] shadow-lg backdrop-blur-md truncate max-w-[62%] shrink pointer-events-auto">
              {activity.category.name}
            </span>
          ) : (
            <span />
          )}

          {activity.isFeatured && (
            <span className="badge badge-gold text-[9px] sm:text-[10px] shadow-lg backdrop-blur-md whitespace-nowrap shrink-0 pointer-events-auto">
              ★ Flagship Project
            </span>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3.5 sm:space-y-4">
        <div>
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#60A5FA]" />
              {formattedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="truncate max-w-[150px] sm:max-w-[170px]">{activity.location}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="font-extrabold text-base sm:text-xl text-white group-hover:text-[#FBBF24] transition-colors line-clamp-2 leading-snug font-['Outfit']">
            <Link href={`/activities/${activity.slug || activity.id}`}>
              {activity.title}
            </Link>
          </h3>

          {/* Summary */}
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 line-clamp-2 sm:line-clamp-3 leading-relaxed">
            {activity.summary}
          </p>
        </div>

        {/* Bottom Info: Beneficiaries & Action */}
        <div className="pt-3 sm:pt-4 border-t border-[rgba(255,255,255,0.08)] space-y-3">
          {activity.beneficiariesCount && activity.beneficiariesCount > 0 ? (
            <div className="flex items-center justify-between text-xs bg-[rgba(11,30,58,0.8)] px-3 py-2 rounded-lg border border-[rgba(59,130,246,0.2)]">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Users className="w-3.5 h-3.5 text-[#10B981]" />
                {activity.beneficiariesLabel || 'Beneficiaries'}
              </span>
              <span className="font-bold text-[#FBBF24]">
                {activity.beneficiariesCount.toLocaleString()} Reached
              </span>
            </div>
          ) : null}

          {activity.partnersInvolved && (
            <p className="text-[11px] text-slate-400 truncate">
              <strong className="text-slate-300">Partners:</strong> {activity.partnersInvolved}
            </p>
          )}

          <div className="flex items-center justify-between pt-1">
            <Link
              href={`/activities/${activity.slug || activity.id}`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#60A5FA] group-hover:text-[#FBBF24] transition-colors py-1.5"
            >
              Explore Impact Report
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={`/grants-sponsorships?activity=${encodeURIComponent(activity.title)}`}
              className="text-xs font-semibold text-[#FBBF24] hover:underline px-2 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/20"
            >
              Sponsor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
