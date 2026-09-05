import { Inbox } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Icon } from '../primitives/icon';

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
