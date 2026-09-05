import { CircleAlert, Inbox } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Icon } from './icon';

/**
 * Structural support for the three states every data-backed screen needs.
 *
 * These are shells, not finished screens. Feature segments supply the copy and
 * the actions; this file only guarantees the three states look like they
 * belong to the same application.
 */

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Placeholder block shown while content loads.
 *
 * The pulse is disabled globally under prefers-reduced-motion by the base
 * layer, so it degrades to a flat block rather than needing a check here.
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('bg-surface-sunken animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

export interface StateMessageProps {
  /**
   * Rendered element, not a component reference.
   *
   * A component is a function, and functions cannot cross a server to client
   * boundary. Taking an already-rendered element means these states work from
   * either side without the caller having to know which they are in.
   */
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Empty state.
 *
 * Written as an invitation to act rather than a statement of absence, which is
 * why `action` sits in the same block as the message instead of elsewhere on
 * the page.
 */
export function EmptyState({
  icon = <Icon icon={Inbox} size="lg" />,
  title,
  description,
  action,
  className,
}: StateMessageProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg',
        'border-border-default border border-dashed px-6 py-12 text-center',
        className,
      )}
    >
      <span className="bg-surface-sunken text-subtle grid h-10 w-10 place-items-center rounded-full">
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-h4 text-strong">{title}</p>
        {description && (
          <p className="text-small text-muted max-w-prose">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

/**
 * Error state.
 *
 * role="alert" so it is announced when it replaces content. The message should
 * say what failed and what to do next, never just "something went wrong".
 */
export function ErrorState({
  icon = <Icon icon={CircleAlert} size="lg" />,
  title,
  description,
  action,
  className,
}: StateMessageProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-lg',
        'border-danger-border bg-danger-surface border px-6 py-12 text-center',
        className,
      )}
    >
      <span className="bg-surface text-danger-text grid h-10 w-10 place-items-center rounded-full">
        {icon}
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-h4 text-strong">{title}</p>
        {description && (
          <p className="text-small text-muted max-w-prose">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
