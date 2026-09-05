'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/primitives/button';
import { Icon } from '@/components/ui/primitives/icon';
import { SearchInput } from '@/components/ui/composite/search-input';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { findNavItem } from '@/config/navigation';
import { MobileNav } from './mobile-nav';

/**
 * Application header.
 *
 * Deliberately thin. The page title lives in PageHeader inside the content
 * area, where it can scroll away; the header keeps a compact breadcrumb so the
 * user always knows where they are even after scrolling.
 *
 * Sticky so global actions stay reachable on long pages.
 */
export function Header({ className }: { className?: string }) {
  const pathname = usePathname();
  const current = findNavItem(pathname);

  return (
    <header
      className={cn(
        'sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2',
        'border-border-subtle bg-surface/85 border-b backdrop-blur-sm',
        'px-[var(--page-gutter)]',
        className,
      )}
    >
      <MobileNav />

      <nav aria-label="Breadcrumb" className="min-w-0">
        <ol className="text-small flex items-center gap-1.5">
          <li>
            <Link
              href="/dashboard"
              className="text-muted hover:text-default transition-colors"
            >
              Workspace
            </Link>
          </li>
          {current && (
            <>
              <li aria-hidden="true" className="flex items-center">
                <Icon icon={ChevronRight} size="sm" className="text-disabled" />
              </li>
              <li className="min-w-0">
                <span
                  aria-current="page"
                  className="text-strong block truncate font-medium"
                >
                  {current.label}
                </span>
              </li>
            </>
          )}
        </ol>
      </nav>

      {/* ml-auto rather than a spacer div, so the actions cluster right
          without an empty element in the accessibility tree. */}
      <div className="ml-auto flex items-center gap-1.5">
        {/* Search is a placeholder: it has no behaviour until there is data to
            search. Hidden on small screens where it would crowd the header. */}
        <SearchInput
          size="sm"
          placeholder="Search"
          aria-label="Search"
          disabled
          className="hidden w-56 lg:block"
        />

        <Button
          variant="ghost"
          size="md"
          iconOnly
          leadingIcon={Bell}
          aria-label="Notifications"
          disabled
        />

        <ThemeToggle />
      </div>
    </header>
  );
}
