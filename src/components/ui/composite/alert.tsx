'use client';

import * as React from 'react';
import { CircleAlert, CircleCheck, Info, TriangleAlert, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '../primitives/button';
import { Icon } from '../primitives/icon';

export type AlertTone = 'info' | 'success' | 'warning' | 'error';

/**
 * Four tones, three colours.
 *
 * Info and success both map to the primary family, warning to accent, error to
 * the danger signal. They stay distinguishable because each carries its own
 * icon: a filled check reads as success and an outlined i reads as information
 * regardless of hue.
 *
 * Adding a fifth colour for success would break the three-colour identity for
 * very little gain, since success messages are almost always transient.
 */
const tones: Record<
  AlertTone,
  { container: string; icon: typeof Info; iconClass: string }
> = {
  info: {
    container: 'bg-primary-surface border-primary-border',
    icon: Info,
    iconClass: 'text-primary-text',
  },
  success: {
    container: 'bg-primary-surface border-primary-border',
    icon: CircleCheck,
    iconClass: 'text-primary-text',
  },
  warning: {
    container: 'bg-accent-surface border-accent-border',
    icon: TriangleAlert,
    iconClass: 'text-accent-text',
  },
  error: {
    container: 'bg-danger-surface border-danger-border',
    icon: CircleAlert,
    iconClass: 'text-danger-text',
  },
};

export interface AlertProps {
  tone?: AlertTone;
  title?: string;
  children: React.ReactNode;
  /** Renders a dismiss button. */
  onDismiss?: () => void;
  className?: string;
}

/**
 * Inline message attached to a region of the page.
 *
 * Errors use role="alert" so they interrupt and are announced immediately.
 * Everything else uses role="status", which waits for a pause and does not
 * interrupt what the user is doing.
 */
export function Alert({
  tone = 'info',
  title,
  children,
  onDismiss,
  className,
}: AlertProps) {
  const config = tones[tone];

  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex items-start gap-3 rounded-lg border p-3',
        config.container,
        className,
      )}
    >
      <Icon
        icon={config.icon}
        size="lg"
        className={cn('mt-0.5', config.iconClass)}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {title && <p className="text-small text-strong font-medium">{title}</p>}
        <div className="text-small text-muted">{children}</div>
      </div>

      {onDismiss && (
        <Button
          iconOnly
          leadingIcon={X}
          variant="ghost"
          size="sm"
          aria-label="Dismiss message"
          onClick={onDismiss}
          className="-mt-1 -mr-1"
        />
      )}
    </div>
  );
}
