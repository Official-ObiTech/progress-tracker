import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PlaceholderPage } from '@/components/layout/placeholder-page';
import { allNav } from '@/config/navigation';

const item = allNav.find((entry) => entry.href === '/dashboard');

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  if (!item) notFound();
  return <PlaceholderPage item={item} />;
}
