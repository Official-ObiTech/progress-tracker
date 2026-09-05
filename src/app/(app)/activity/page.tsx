import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PlaceholderPage } from '@/components/layout/placeholder-page';
import { allNav } from '@/config/navigation';

const item = allNav.find((entry) => entry.href === '/activity');

export const metadata: Metadata = {
  title: 'Activity',
};

export default function ActivityPage() {
  if (!item) notFound();
  return <PlaceholderPage item={item} />;
}
