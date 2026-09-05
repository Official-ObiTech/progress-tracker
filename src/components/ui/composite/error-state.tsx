import { CircleAlert } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Icon } from '../primitives/icon';

import type { StateMessageProps } from './empty-state';

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
