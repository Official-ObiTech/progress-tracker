import { cn } from '@/lib/utils';

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
