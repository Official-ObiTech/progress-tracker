import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Generic list primitives.
 *
 * Deliberately NOT TaskItem, ActivityItem or PhaseIndicator. Those are
 * business components: their shape depends on a domain model that does not
 * exist yet, and guessing it now would mean rebuilding them later. They are
 * composed from these in their own segments.
 */

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  /** Separates rows with rules. Better than gaps for dense data. */
  divided?: boolean;
}

export function List({ divided = true, className, ...props }: ListProps) {
  return (
    <ul
      className={cn(
        'flex flex-col',
        divided && 'divide-border-subtle divide-y',
        className,
      )}
      {...props}
    />
  );
}

export interface ListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  /** Icon, avatar or status indicator shown before the content. */
  leading?: React.ReactNode;
  /** Actions or metadata shown after the content. */
  trailing?: React.ReactNode;
  /** Adds hover feedback. Only for rows that are genuinely a single target. */
  interactive?: boolean;
}

export function ListItem({
  leading,
  trailing,
  interactive = false,
  className,
  children,
  ...props
}: ListItemProps) {
  return (
    <li
      className={cn(
        'flex items-center gap-3 py-3',
        interactive && [
          'hover:bg-surface-hover -mx-2 cursor-pointer rounded-md px-2',
          'transition-colors duration-[var(--duration-fast)]',
          'focus-within:bg-surface-hover',
        ],
        className,
      )}
      {...props}
    >
      {leading && <span className="flex shrink-0 items-center">{leading}</span>}

      {/* min-w-0 lets long content truncate instead of widening the row. */}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">{children}</div>

      {trailing && (
        <span className="flex shrink-0 items-center gap-2">{trailing}</span>
      )}
    </li>
  );
}

export function ListItemTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-small text-default truncate font-medium', className)}
      {...props}
    />
  );
}

export function ListItemDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn('text-caption text-muted truncate', className)}
      {...props}
    />
  );
}
