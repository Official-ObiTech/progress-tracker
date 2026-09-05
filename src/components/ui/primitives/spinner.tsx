import { cn } from '@/lib/utils';
import { iconSizes, type IconSize } from '@/lib/design-tokens';

export interface SpinnerProps {
  size?: IconSize;
  className?: string;
  /** Announced to screen readers. Set null inside a control that already says it. */
  label?: string | null;
}

/**
 * Loading indicator.
 *
 * Uses currentColor so it inherits whatever text colour its parent sets,
 * meaning one spinner works on a primary fill, a ghost button and a card.
 */
export function Spinner({
  size = 'md',
  className,
  label = 'Loading',
}: SpinnerProps) {
  const px = iconSizes[size];

  return (
    <>
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className={cn(
          'shrink-0 animate-[spin-smooth_700ms_linear_infinite]',
          className,
        )}
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2.5"
          opacity="0.25"
        />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      {label ? <span className="sr-only-text">{label}</span> : null}
    </>
  );
}
