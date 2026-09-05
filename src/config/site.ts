import { env } from '@/lib/env';

/**
 * Static application metadata.
 *
 * Single source of truth for anything that names or describes the product,
 * so copy changes happen in one file rather than being scattered across
 * layouts, metadata blocks and headings.
 */
export const siteConfig = {
  name: env.appName,
  description:
    'Plan projects in phases, break phases into tasks, and track what is actually finished.',
  url: env.appUrl,
} as const;

export type SiteConfig = typeof siteConfig;
