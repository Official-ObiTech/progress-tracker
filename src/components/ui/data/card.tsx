import * as React from 'react';

import { cn } from '@/lib/utils';

export type CardElevation = 'flat' | 'raised' | 'floating';

/**
 * Card container.
 *
 * Default is a bordered surface with NO shadow. Giving every card the same
 * soft drop shadow is the fastest way to make an interface look templated, and
 * it destroys hierarchy: if everything is elevated, nothing is. Reach for
 * `raised` only when a card must separate from busy content, and `floating`
 * only for things that genuinely overlay the page.
 */
const elevations: Record<CardElevation, string> = {
  flat: 'border-border-subtle bg-surface',
  raised: 'border-border-subtle bg-surface-raised shadow-sm',
  floating: 'border-border-default bg-surface-raised shadow-lg',
};

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  elevation?: CardElevation;
  /**
   * Adds hover feedback. Only for cards that are genuinely a single link or
   * button target. A hover state on a non-clickable card is a false affordance.
   */
  interactive?: boolean;
  as?: 'div' | 'article' | 'section' | 'li';
}

export function Card({
  elevation = 'flat',
  interactive = false,
  as: Component = 'div',
  className,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        'rounded-lg border',
        elevations[elevation],
        interactive && [
          'cursor-pointer transition-colors duration-[var(--duration-fast)]',
          'hover:border-border-default hover:bg-surface-hover',
          'focus-within:border-primary',
        ],
        className,
      )}
      {...props}
    />
  );
}

/**
 * Header, content and footer share the same inline padding token so their
 * edges align. Vertical padding differs because a header sits tighter to its
 * content than a footer does.
 */
export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-3',
        'px-[var(--card-padding)] pt-[var(--card-padding)] pb-3',
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  as: Component = 'h3',
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  as?: 'h2' | 'h3' | 'h4';
}) {
  return (
    <Component className={cn('text-h4 text-strong', className)} {...props} />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-caption text-muted', className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'px-[var(--card-padding)] pb-[var(--card-padding)]',
        className,
      )}
      {...props}
    />
  );
}

/**
 * Footer is divided by a rule and sits on the sunken surface, so actions read
 * as separate from content rather than floating at the bottom of it.
 */
export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-2',
        'border-border-subtle bg-surface-sunken rounded-b-lg border-t',
        'px-[var(--card-padding)] py-3',
        className,
      )}
      {...props}
    />
  );
}
