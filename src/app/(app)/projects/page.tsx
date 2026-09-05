import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PlaceholderPage } from '@/components/layout/placeholder-page';
import { allNav } from '@/config/navigation';

const item = allNav.find((entry) => entry.href === '/projects');

export const metadata: Metadata = {
  title: 'Projects',
};

export default function ProjectsPage() {
  if (!item) notFound();
  return <PlaceholderPage item={item} />;
}
