import { cn } from '@/lib/utils';
import { Skeleton } from '../primitives/skeleton';
import { Spinner } from '../primitives/spinner';

export interface LoadingStateProps {
  /**
   * `skeleton` when the shape of the result is known, which is almost always
   * better: it holds the layout and reduces perceived wait.
   * `spinner` only when the result shape is unknown or the wait is very short.
   */
  variant?: 'skeleton' | 'spinner';
  /** Number of skeleton rows. Ignored by the spinner variant. */
  rows?: number;
  label?: string;
  className?: string;
}

/**
 * Page or section loading placeholder.
 *
 * Announced politely via role="status" so screen reader users are told work is
 * in progress, without the announcement interrupting them.
 */
export function LoadingState({
  variant = 'skeleton',
  rows = 3,
  label = 'Loading',
  className,
}: LoadingStateProps) {
  if (variant === 'spinner') {
    return (
      <div
        role="status"
        className={cn(
          'text-muted flex flex-col items-center justify-center gap-3 py-12',
          className,
        )}
      >
        <Spinner size="lg" label={null} />
        <p className="text-small">{label}</p>
      </div>
    );
  }

  return (
    <div role="status" className={cn('flex flex-col gap-3', className)}>
      <span className="sr-only-text">{label}</span>
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} className="h-16" />
      ))}
    </div>
  );
}
