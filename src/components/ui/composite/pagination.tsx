'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '../primitives/button';

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Describes what is being paged, e.g. "projects". Used in the summary. */
  itemLabel?: string;
  totalItems?: number;
  className?: string;
}

/**
 * Builds the page list with ellipses.
 *
 * Always shows first, last, current and one neighbour either side, so the
 * control keeps a stable width instead of growing with the page count.
 */
function buildPages(page: number, pageCount: number): (number | 'gap')[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  const pages = new Set([1, pageCount, page, page - 1, page + 1]);
  const sorted = [...pages]
    .filter((p) => p >= 1 && p <= pageCount)
    .sort((a, b) => a - b);

  const result: (number | 'gap')[] = [];
  let previous = 0;
  for (const current of sorted) {
    if (current - previous > 1) result.push('gap');
    result.push(current);
    previous = current;
  }
  return result;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  itemLabel = 'items',
  totalItems,
  className,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  const pages = buildPages(page, pageCount);

  return (
    <nav
      aria-label="Pagination"
      className={cn(
        'flex flex-col items-center gap-3 sm:flex-row sm:justify-between',
        className,
      )}
    >
      {typeof totalItems === 'number' && (
        <p className="text-caption text-muted">
          Page {page} of {pageCount}, {totalItems} {itemLabel}
        </p>
      )}

      <div className="flex items-center gap-1">
        <Button
          iconOnly
          leadingIcon={ChevronLeft}
          variant="outline"
          size="sm"
          aria-label="Previous page"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        />

        {/* Page numbers are hidden on the narrowest screens, where previous
            and next plus the summary text are enough and the numbers would
            wrap. */}
        <ul className="hidden items-center gap-1 sm:flex">
          {pages.map((entry, index) =>
            entry === 'gap' ? (
              <li
                key={`gap-${index}`}
                aria-hidden="true"
                className="text-subtle px-1"
              >
                &hellip;
              </li>
            ) : (
              <li key={entry}>
                <Button
                  variant={entry === page ? 'secondary' : 'ghost'}
                  size="sm"
                  aria-label={`Page ${entry}`}
                  aria-current={entry === page ? 'page' : undefined}
                  onClick={() => onPageChange(entry)}
                  className="min-w-8"
                >
                  {entry}
                </Button>
              </li>
            ),
          )}
        </ul>

        <Button
          iconOnly
          leadingIcon={ChevronRight}
          variant="outline"
          size="sm"
          aria-label="Next page"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        />
      </div>
    </nav>
  );
}
