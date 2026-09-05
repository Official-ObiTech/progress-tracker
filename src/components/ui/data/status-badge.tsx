import * as React from 'react';

import { cn } from '@/lib/utils';
import { getStatus, type Status } from '@/config/status';
import { Badge } from '../primitives/badge';
import { Icon } from '../primitives/icon';

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
