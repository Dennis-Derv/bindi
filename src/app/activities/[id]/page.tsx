import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getActivityByIdOrSlug } from '../../../data/content';
import {
  Calendar,
  MapPin,
  Users,
  HeartHandshake,
  ArrowLeft,
  Award,
  CheckCircle2
} from 'lucide-react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const activity = getActivityByIdOrSlug(id);
  if (!activity) return { title: 'Activity Not Found | BKC' };

  return {
    title: `${activity.title} | BKC International`,
    description: activity.summary || activity.description.slice(0, 160)
  };
}

export default async function SingleActivityPage({ params }: PageProps) {
  const { id } = await params;
  const activity = getActivityByIdOrSlug(id);

  if (!activity) {
    notFound();
  }

  const formattedDate = new Date(activity.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const allImages = activity.images && activity.images.length > 0
    ? activity.images
    : activity.coverImage
    ? [activity.coverImage]
    : ['/uploads/training-lab-workstations-1.png'];

  return (
    <div className="space-y-14 sm:space-y-18 pb-14 sm:pb-20 lg:pb-24">
      {/* 1. TOP BREADCRUMB & BACK LINK */}
      <div className="container pt-4 sm:pt-6">
        <Link
          href="/activities"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors px-3 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-white/10 hover:bg-white/10 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4 text-[#F59E0B]" />
          Back to All Activities
        </Link>
      </div>

      {/* 2. ACTIVITY HEADER HERO */}
      <section className="container">
        <div className="max-w-4xl space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {activity.category && (
              <span className="badge badge-blue text-xs">
                {activity.category.name}
              </span>
            )}
            {activity.isFeatured && (
              <span className="badge badge-gold text-xs">
                ★ Flagship Initiative
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white font-['Outfit'] leading-tight">
            {activity.title}
          </h1>

          {activity.summary && (
            <p className="text-sm sm:text-lg text-slate-300 leading-relaxed">
              {activity.summary}
            </p>
          )}

          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-300 pt-2 border-t border-[rgba(255,255,255,0.08)]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#60A5FA]" />
              {formattedDate}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#F59E0B]" />
              {activity.location}
            </span>
            {activity.beneficiariesCount && activity.beneficiariesCount > 0 ? (
              <>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1.5 font-bold text-[#10B981]">
                  <Users className="w-4 h-4 text-[#10B981]" />
                  {activity.beneficiariesCount.toLocaleString()} {activity.beneficiariesLabel || 'Beneficiaries'}
                </span>
              </>
            ) : null}
          </div>
        </div>
      </section>

      {/* 3. COVER IMAGE & GALLERY */}
      <section className="container">
        <div className="space-y-3 sm:space-y-4">
          {/* Main Cover Display */}
          <div className="relative w-full h-[250px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden border border-[rgba(59,130,246,0.3)] shadow-2xl bg-slate-900">
            <Image
              src={allImages[0]}
              alt={activity.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061124] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <span className="text-[10px] sm:text-xs font-semibold text-[#FBBF24] tracking-wider uppercase">
                Activity Photographic Record
              </span>
              <h3 className="text-base sm:text-xl font-bold text-white font-['Outfit'] mt-0.5 sm:mt-1 line-clamp-1">
                {activity.title}
              </h3>
            </div>
          </div>

          {/* Multi-Image Gallery Thumbnails */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {allImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-28 sm:h-36 rounded-xl overflow-hidden border border-white/10 shadow-md group hover:border-[#F59E0B] transition-colors"
                >
                  <Image
                    src={img}
                    alt={`${activity.title} photo ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. MAIN CONTENT & SIDEBAR */}
      <section className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Main Column: Detailed Description */}
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            {/* Description */}
            <div className="bkc-card p-5 sm:p-10 space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-['Outfit'] border-b border-[rgba(255,255,255,0.08)] pb-3 sm:pb-4">
                Detailed Activity Overview
              </h2>
              <div className="prose prose-invert max-w-none text-slate-300 space-y-3 sm:space-y-4 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {activity.description}
              </div>
            </div>

            {/* Impact & Results Callout */}
            {activity.impact && (
              <div className="bkc-card bkc-card-gold p-5 sm:p-8 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FBBF24] uppercase tracking-wider">
                  <Award className="w-4 h-4" />
                  Impact & Documented Results
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-['Outfit']">
                  Outcomes Achieved on the Ground
                </h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {activity.impact}
                </p>
                {activity.beneficiariesCount && activity.beneficiariesCount > 0 ? (
                  <div className="pt-3 sm:pt-4 border-t border-[rgba(245,158,11,0.2)] flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-[rgba(245,158,11,0.15)] flex items-center justify-center text-[#FBBF24] shrink-0">
                      <Users className="w-5 h-5" />
                    </span>
                    <div>
                      <span className="text-lg sm:text-xl font-black text-white font-['Outfit']">
                        {activity.beneficiariesCount.toLocaleString()} Verified Participants
                      </span>
                      <p className="text-xs text-slate-400">
                        {activity.beneficiariesLabel || 'Direct Beneficiaries Reached'}
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Right Sidebar: Partners, Sponsoring & CTA */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            {/* Partner Details */}
            {activity.partnersInvolved && (
              <div className="bkc-card p-4 sm:p-6 space-y-2 sm:space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Collaborators & Partners
                </span>
                <h4 className="text-base font-bold text-white font-['Outfit']">
                  Partners Involved
                </h4>
                <p className="text-sm text-[#60A5FA] font-medium leading-relaxed">
                  {activity.partnersInvolved}
                </p>
              </div>
            )}

            {/* Sponsor Callout Card */}
            <div className="bkc-card p-5 sm:p-6 border-[rgba(245,158,11,0.35)] bg-gradient-to-br from-[#0B1E3A] to-[#061124] space-y-3 sm:space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[rgba(245,158,11,0.15)] flex items-center justify-center text-[#FBBF24]">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white font-['Outfit']">
                Support or Scale This Initiative
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Foundations, government agencies, and donors can sponsor the replication of this activity across additional Local Government Areas in Nigeria.
              </p>
              <Link
                href={`/grants-sponsorships?activity=${encodeURIComponent(activity.title)}`}
                className="btn btn-primary w-full py-3.5 text-xs font-bold justify-center min-h-[48px]"
              >
                Inquire to Sponsor This Activity
              </Link>
            </div>

            {/* BKC Trust Badge Box */}
            <div className="p-4 rounded-xl bg-[rgba(11,30,58,0.7)] border border-[rgba(255,255,255,0.08)] space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-[#FBBF24] font-bold">
                <CheckCircle2 className="w-4 h-4" />
                CAC/IT/NO 56020 Verified
              </div>
              <p>
                All BKC activities adhere strictly to non-profit voluntary statutes with transparent reporting.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
