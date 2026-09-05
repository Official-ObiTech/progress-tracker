import * as React from 'react';

import { cn } from '@/lib/utils';
import { getStatus, type Status, type StatusTone } from '@/config/status';
import { Icon } from './icon';

/**
 * Tone styling shared by Badge and StatusBadge.
 *
 * Solid variants use the tinted surface plus matching text, never a saturated
 * fill: a page of fully saturated badges shouts. Outline variants drop the
 * background so two statuses of the same hue stay distinguishable.
 */
const toneSolid: Record<StatusTone, string> = {
  neutral: 'bg-surface-sunken text-muted ring-border-subtle',
  primary: 'bg-primary-surface text-primary-text ring-primary-border',
  accent: 'bg-accent-surface text-accent-text ring-accent-border',
  danger: 'bg-danger-surface text-danger-text ring-danger-border',
};

const toneOutline: Record<StatusTone, string> = {
  neutral: 'bg-transparent text-muted ring-border-default',
  primary: 'bg-transparent text-primary-text ring-primary-border',
  accent: 'bg-transparent text-accent-text ring-accent-border',
  danger: 'bg-transparent text-danger-text ring-danger-border',
};

const badgeBase = cn(
  'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5',
  'text-caption font-medium whitespace-nowrap',
  // Ring rather than border, so the badge height is not affected by the
  // outline and it aligns with adjacent text.
  'ring-1 ring-inset',
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone;
  variant?: 'solid' | 'outline';
}

export function Badge({
  tone = 'neutral',
  variant = 'solid',
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        badgeBase,
        variant === 'solid' ? toneSolid[tone] : toneOutline[tone],
        className,
      )}
      {...props}
    />
  );
}

export interface StatusBadgeProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  'children'
> {
  status: Status;
  /** Hides the text label. The icon keeps an accessible name regardless. */
  compact?: boolean;
}

/**
 * Canonical way to render a work state.
 *
 * Always prefer this over a hand built Badge so the icon, tone and wording for
 * a given status stay identical everywhere they appear.
 */
export function StatusBadge({
  status,
  compact = false,
  className,
  ...props
}: StatusBadgeProps) {
  const { label, tone, variant, icon } = getStatus(status);

  return (
    <Badge
      tone={tone}
      variant={variant}
      className={cn(compact && 'px-1.5', className)}
      {...props}
    >
      <Icon icon={icon} size="sm" />
      {compact ? <span className="sr-only-text">{label}</span> : label}
    </Badge>
  );
}
