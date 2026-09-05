import { cn } from '@/lib/utils';

export interface PageContainerProps {
  children: React.ReactNode;
  /**
   * Removes the max width for screens that need the full viewport, such as a
   * wide board or table.
   */
  wide?: boolean;
  className?: string;
}

/**
 * Standard content wrapper for every page.
 *
 * Owns horizontal gutters, maximum width and vertical rhythm, all from tokens
 * that already scale at breakpoints. Pages should never set their own page
 * margins: use this instead so spacing stays consistent as the app grows.
 */
export function PageContainer({
  children,
  wide = false,
  className,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        'w-full px-[var(--page-gutter)] py-6 lg:py-8',
        !wide && 'mx-auto max-w-[var(--content-max)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
