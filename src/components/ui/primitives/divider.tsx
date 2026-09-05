import { cn } from '@/lib/utils';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  /** Optional centred label, for separating sections within a card. */
  label?: string;
  className?: string;
}

/**
 * Rule between content.
 *
 * Rendered as a separator role rather than a styled div, so assistive
 * technology reports the break in content. A labelled divider uses the label
 * as its accessible name.
 */
export function Divider({
  orientation = 'horizontal',
  label,
  className,
}: DividerProps) {
  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        aria-label={label}
        className={cn('flex items-center gap-3', className)}
      >
        <span className="bg-border-subtle h-px flex-1" />
        <span className="text-caption text-subtle">{label}</span>
        <span className="bg-border-subtle h-px flex-1" />
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'bg-border-subtle',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
    />
  );
}
