'use client';

import * as React from 'react';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '../primitives/badge';
import { Button } from '../primitives/button';
import { Icon } from '../primitives/icon';

export interface ActiveFilter {
  id: string;
  /** Shown as "Status: In progress". */
  field: string;
  value: string;
}

export interface FilterBarProps {
  /** Search field and filter triggers. */
  children: React.ReactNode;
  active?: ActiveFilter[];
  onRemoveFilter?: (id: string) => void;
  onClearAll?: () => void;
  className?: string;
}

/**
 * Search and filter controls above a list or table.
 *
 * Active filters are shown as removable chips rather than left implicit inside
 * dropdowns. Hidden filter state is a common cause of people concluding their
 * data has disappeared.
 *
 * Contains no filtering logic. It reports intent through callbacks and the
 * owning screen decides what that means.
 */
export function FilterBar({
  children,
  active = [],
  onRemoveFilter,
  onClearAll,
  className,
}: FilterBarProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Wraps rather than scrolls, so no control is ever off screen. */}
      <div className="flex flex-wrap items-center gap-2">{children}</div>

      {active.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-caption text-muted">Filtered by</span>

          {active.map((filter) => (
            <Badge key={filter.id} tone="neutral" className="gap-1 pr-1">
              <span className="text-subtle">{filter.field}:</span>
              {filter.value}
              {onRemoveFilter && (
                <button
                  type="button"
                  onClick={() => onRemoveFilter(filter.id)}
                  aria-label={`Remove ${filter.field} filter`}
                  className={cn(
                    'hover:bg-surface-active ml-0.5 rounded-full p-0.5',
                    'transition-colors duration-[var(--duration-fast)]',
                  )}
                >
                  <Icon icon={X} size="sm" />
                </button>
              )}
            </Badge>
          ))}

          {onClearAll && active.length > 1 && (
            <Button variant="ghost" size="sm" onClick={onClearAll}>
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
