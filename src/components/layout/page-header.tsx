import { cn } from '@/lib/utils';

export interface PageHeaderProps {
  title: string;
  description?: string;
  /** Buttons or controls for this page. Wraps below the title on mobile. */
  actions?: React.ReactNode;
  className?: string;
}

/**
 * Title block for a page.
 *
 * The h1 lives here rather than in the app header, because a page should have
 * exactly one h1 and it belongs with the content it names.
 *
 * Actions sit beside the title on wide screens and wrap underneath on narrow
 * ones, rather than shrinking, since a squeezed button is harder to hit than a
 * full width one on a phone.
 */
export function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 pb-6 sm:flex-row sm:items-start sm:justify-between',
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-1.5">
        <h1 className="text-h1 text-balance">{title}</h1>
        {description && (
          <p className="text-body text-muted max-w-prose">{description}</p>
        )}
      </div>

      {actions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
}
