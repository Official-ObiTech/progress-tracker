import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PlaceholderPage } from '@/components/layout/placeholder-page';
import { allNav } from '@/config/navigation';

const item = allNav.find((entry) => entry.href === '/tasks');

export const metadata: Metadata = {
  title: 'Tasks',
};

export default function TasksPage() {
  if (!item) notFound();
  return <PlaceholderPage item={item} />;
}
