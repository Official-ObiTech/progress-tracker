'use client';

import { ChevronsUpDown, LogOut, Settings, UserRound } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/primitives/icon';

/**
 * Profile area placeholder.
 *
 * There is no authentication yet, so the name and initials are static and the
 * actions do nothing. The structure is real so a later segment can drop a
 * session into it without redesigning anything.
 *
 * Built on the native Popover API: light dismiss, Escape to close and
 * top-layer stacking come from the browser. A hand rolled dropdown would need
 * an outside-click listener, an Escape handler and a z-index strategy to reach
 * the same place.
 */

const PLACEHOLDER_USER = {
  name: 'Signed out',
  detail: 'No account connected',
  initials: 'PT',
} as const;

export interface UserMenuProps {
  collapsed?: boolean;
  className?: string;
}

export function UserMenu({ collapsed = false, className }: UserMenuProps) {
  return (
    <>
      <button
        type="button"
        popoverTarget="user-menu-popover"
        aria-label="Open account menu"
        className={cn(
          'flex w-full items-center gap-2.5 rounded-md p-1.5 text-left',
          'transition-colors duration-[var(--duration-fast)]',
          'hover:bg-surface-hover',
          collapsed && 'justify-center',
          className,
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'grid h-7 w-7 shrink-0 place-items-center rounded-full',
            'bg-surface-sunken text-caption text-muted font-medium',
            'ring-border-subtle ring-1 ring-inset',
          )}
        >
          {PLACEHOLDER_USER.initials}
        </span>

        {!collapsed && (
          <>
            <span className="flex min-w-0 flex-col">
              {/* truncate prevents a long name pushing the layout wider than
                  the sidebar, which is a common source of overflow. */}
              <span className="text-caption text-default truncate font-medium">
                {PLACEHOLDER_USER.name}
              </span>
              <span className="text-caption text-subtle truncate">
                {PLACEHOLDER_USER.detail}
              </span>
            </span>
            <Icon
              icon={ChevronsUpDown}
              size="sm"
              className="text-subtle ml-auto"
            />
          </>
        )}
      </button>

      <div
        id="user-menu-popover"
        popover="auto"
        className={cn(
          'border-border-default bg-surface-raised m-0 w-56 rounded-lg border p-1 shadow-lg',
          // Positioned relative to the trigger by the browser.
          '[position-area:top_span-right] [position-try-fallbacks:flip-block]',
        )}
      >
        <p className="text-caption text-subtle px-2 py-1.5">
          Accounts arrive with authentication in a later segment.
        </p>
        <ul className="flex flex-col">
          {[
            { label: 'Profile', icon: UserRound },
            { label: 'Preferences', icon: Settings },
            { label: 'Sign out', icon: LogOut },
          ].map((action) => (
            <li key={action.label}>
              <button
                type="button"
                disabled
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-sm px-2 py-1.5',
                  'text-small text-muted',
                  'disabled:cursor-not-allowed disabled:opacity-55',
                )}
              >
                <Icon icon={action.icon} size="md" />
                {action.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
