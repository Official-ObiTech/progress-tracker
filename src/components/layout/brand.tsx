import Link from 'next/link';

import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

export interface BrandProps {
  /** Hides the wordmark, leaving the mark alone. Used by the tablet rail. */
  collapsed?: boolean;
  className?: string;
}

/**
 * Application mark and wordmark.
 *
 * The mark is a quarter-filled ring: the same measured-progress idea the
 * progress components use, reduced to its smallest form. Drawn inline as SVG
 * rather than shipped as an image file so it inherits theme colours.
 */
export function Brand({ collapsed = false, className }: BrandProps) {
  return (
    <Link
      href="/dashboard"
      className={cn(
        'flex items-center gap-2.5 rounded-md',
        collapsed && 'justify-center',
        className,
      )}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          strokeWidth="2.5"
          className="stroke-border-default"
        />
        <path
          d="M12 3a9 9 0 0 1 9 9"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="stroke-primary"
        />
      </svg>
      <span
        className={cn(
          'text-h4 text-strong tracking-tight',
          collapsed && 'sr-only-text',
        )}
      >
        {siteConfig.name}
      </span>
    </Link>
  );
}
