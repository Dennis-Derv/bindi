import React from 'react';
import type { Metadata } from 'next';
import { media } from '../../data/content';
import GalleryClient from '../../components/GalleryClient';

export const metadata: Metadata = {
  title: 'Visual Archive & Field Documentation | BKC International',
  description: 'Authentic photographic archive of Bindir Knowledge Development Centre International (CAC/IT/NO 56020) educational campus, daily children STEM training, and headmaster summits.'
};

export default function GalleryPage() {
  return <GalleryClient initialMedia={media} />;
}
