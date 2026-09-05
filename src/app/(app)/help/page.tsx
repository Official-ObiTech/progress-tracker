import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PlaceholderPage } from '@/components/layout/placeholder-page';
import { allNav } from '@/config/navigation';

const item = allNav.find((entry) => entry.href === '/help');

export const metadata: Metadata = {
  title: 'Help',
};

export default function HelpPage() {
  if (!item) notFound();
  return <PlaceholderPage item={item} />;
}
