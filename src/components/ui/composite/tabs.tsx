'use client';

import * as React from 'react';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Icon } from '../primitives/icon';

export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  disabled?: boolean;
  /** Optional count shown beside the label, e.g. number of open tasks. */
  badge?: number;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onValueChange: (id: string) => void;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Tabbed sections following the WAI-ARIA tabs pattern.
 *
 * Keyboard behaviour, which no browser provides for this pattern:
 *
 *   Arrow left / right   move between tabs, wrapping and skipping disabled
 *   Home / End           jump to first or last
 *   Tab                  leaves the tab list entirely and reaches the panel
 *
 * That last point is the reason for roving tabindex: only the selected tab is
 * in the tab order, so a keyboard user presses Tab once to get past the tabs
 * rather than once per tab.
 *
 * Selection follows focus, which is the recommended behaviour when panels are
 * cheap to render. If a panel ever needs a network request, switch to manual
 * activation so arrowing does not fire a request per keystroke.
 */
export function Tabs({
  items,
  value,
  onValueChange,
  children,
  className,
}: TabsProps) {
  const listRef = React.useRef<HTMLDivElement>(null);

  const enabled = React.useMemo(
    () => items.filter((item) => !item.disabled),
    [items],
  );

  const focusTab = (id: string) => {
    onValueChange(id);
    // The DOM node may not exist yet on first paint, so query after render.
    requestAnimationFrame(() => {
      listRef.current
        ?.querySelector<HTMLButtonElement>(`[data-tab-id="${id}"]`)
        ?.focus();
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const position = enabled.findIndex((item) => item.id === value);
    if (position === -1) return;

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        focusTab(enabled[(position + 1) % enabled.length].id);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        focusTab(enabled[(position - 1 + enabled.length) % enabled.length].id);
        break;
      case 'Home':
        event.preventDefault();
        focusTab(enabled[0].id);
        break;
      case 'End':
        event.preventDefault();
        focusTab(enabled[enabled.length - 1].id);
        break;
      default:
        break;
    }
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div
        ref={listRef}
        role="tablist"
        onKeyDown={handleKeyDown}
        className={cn(
          'border-border-subtle flex gap-1 border-b',
          // Scrolls horizontally rather than wrapping on narrow screens: a
          // wrapped tab list changes height and pushes content around.
          'overflow-x-auto',
        )}
      >
        {items.map((item) => {
          const selected = item.id === value;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              data-tab-id={item.id}
              id={`tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`panel-${item.id}`}
              disabled={item.disabled}
              tabIndex={selected ? 0 : -1}
              onClick={() => onValueChange(item.id)}
              className={cn(
                'flex shrink-0 items-center gap-2 px-3 py-2',
                'text-small border-b-2 font-medium whitespace-nowrap',
                'transition-colors duration-[var(--duration-fast)]',
                'disabled:text-disabled disabled:cursor-not-allowed',
                selected
                  ? 'border-primary text-primary-text'
                  : 'text-muted enabled:hover:text-default border-transparent',
              )}
            >
              {item.icon && <Icon icon={item.icon} size="md" />}
              {item.label}
              {typeof item.badge === 'number' && (
                <span
                  className={cn(
                    'text-caption rounded-full px-1.5',
                    selected
                      ? 'bg-primary-surface text-primary-text'
                      : 'bg-surface-sunken text-muted',
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {children}
    </div>
  );
}

export interface TabPanelProps {
  /** Must match the TabItem id it belongs to. */
  id: string;
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function TabPanel({ id, value, children, className }: TabPanelProps) {
  if (id !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      // Focusable so that tabbing out of the tab list lands on the panel,
      // rather than skipping over its content.
      tabIndex={0}
      className={cn('focus-visible:outline-none', className)}
    >
      {children}
    </div>
  );
}
