'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/icon';
import { isNavItemActive, primaryNav, secondaryNav } from '@/config/navigation';

export interface SidebarNavProps {
  /**
   * Which group to render.
   *
   * The items are looked up here rather than passed in, because this is a
   * client component and a NavItem carries an `icon` component. Functions
   * cannot cross the server to client boundary, so passing the array as a prop
   * from the server Sidebar would fail at build time.
   */
  group: 'primary' | 'secondary';
  /**
   * Collapses labels, leaving icons only. Used by the tablet rail. The label
   * stays in the DOM for screen readers rather than being removed.
   */
  collapsed?: boolean;
  /** Fired after navigating, so the mobile drawer can close itself. */
  onNavigate?: () => void;
  className?: string;
}

export function SidebarNav({
  group,
  collapsed = false,
  onNavigate,
  className,
}: SidebarNavProps) {
  const pathname = usePathname();
  const items = group === 'primary' ? primaryNav : secondaryNav;

  return (
    <ul className={cn('flex flex-col gap-0.5', className)}>
      {items.map((item) => {
        const active = isNavItemActive(pathname, item.href);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              // aria-current is what tells a screen reader which section the
              // user is in. The colour change alone conveys nothing to them.
              aria-current={active ? 'page' : undefined}
              title={collapsed ? item.label : undefined}
              className={cn(
                'group relative flex items-center gap-3 rounded-md',
                'text-small px-2.5 py-2 font-medium',
                'transition-colors duration-[var(--duration-fast)]',
                collapsed && 'justify-center px-0',
                active
                  ? 'bg-primary-surface text-primary-text'
                  : 'text-muted hover:bg-surface-hover hover:text-default',
              )}
            >
              {/* Active marker. A second, non-colour signal for the current
                  section, so it does not rely on hue alone. */}
              <span
                aria-hidden="true"
                className={cn(
                  'bg-primary absolute left-0 h-5 w-0.5 rounded-full',
                  'transition-opacity duration-[var(--duration-fast)]',
                  active ? 'opacity-100' : 'opacity-0',
                )}
              />
              <Icon
                icon={item.icon}
                size="lg"
                className={active ? 'text-primary' : 'text-subtle'}
              />
              <span className={cn(collapsed && 'sr-only-text')}>
                {item.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
