import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PlaceholderPage } from '@/components/layout/placeholder-page';
import { allNav } from '@/config/navigation';

const item = allNav.find((entry) => entry.href === '/progress');

export const metadata: Metadata = {
  title: 'Progress',
};

export default function ProgressPage() {
  if (!item) notFound();
  return <PlaceholderPage item={item} />;
}
