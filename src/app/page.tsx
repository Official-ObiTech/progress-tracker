import Link from 'next/link';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { buttonClasses } from '@/components/ui';
import { siteConfig } from '@/config/site';

/**
 * Placeholder entry point.
 *
 * The dashboard is built in a later segment. This exists so the app has a
 * running route and so the design system foundation is visible on load.
 */
export default function HomePage() {
  return (
    <main className="page-container flex flex-1 flex-col justify-center py-16">
      <div className="flex max-w-prose flex-col items-start gap-4">
        <h1 className="text-h1">{siteConfig.name}</h1>
        <p className="text-body text-muted">{siteConfig.description}</p>
        <p className="text-small text-subtle">
          Design system foundation is in place. Screens are built in the next
          segment.
        </p>
        <div className="flex items-center gap-2">
          <Link
            href="/design-system"
            className={buttonClasses({ variant: 'primary' })}
          >
            View design system
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
}
