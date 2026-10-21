import React from 'react';
import type { Metadata } from 'next';
import { dbStore } from '../../../server/src/services/store';
import GalleryClient from '../../components/GalleryClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Visual Archive & Field Documentation | BKC International',
  description: 'Authentic photographic archive of Bindir Knowledge Development Centre International (CAC/IT/NO 56020) educational campus, daily children STEM training, and headmaster summits.'
};

export default async function GalleryPage() {
  const mediaList = await dbStore.getMedia();
  return <GalleryClient initialMedia={mediaList as any} />;
}
