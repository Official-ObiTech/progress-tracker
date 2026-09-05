'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

const sidePositions: Record<TooltipSide, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-1.5',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5',
  left: 'right-full top-1/2 -translate-y-1/2 mr-1.5',
  right: 'left-full top-1/2 -translate-y-1/2 ml-1.5',
};

export interface TooltipProps {
  /** The element the tooltip describes. Must be focusable. */
  children: React.ReactElement;
  content: string;
  side?: TooltipSide;
  className?: string;
}

/**
 * Supplementary label shown on hover and on keyboard focus.
 *
 * A tooltip must never be the only way to learn what a control does. It is
 * wired with aria-describedby, meaning it *supplements* an accessible name
 * rather than providing one. Controls still need their own label.
 *
 * Shown on focus as well as hover, because a hover-only tooltip is invisible to
 * keyboard users. Dismissible with Escape, per WCAG 1.4.13.
 */
export function Tooltip({
  children,
  content,
  side = 'top',
  className,
}: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Escape') setOpen(false);
  }, []);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={() => setOpen(false)}
      onKeyDown={handleKeyDown}
    >
      {React.cloneElement(children, {
        'aria-describedby': open ? id : undefined,
      } as React.HTMLAttributes<HTMLElement>)}

      <span
        id={id}
        role="tooltip"
        // Kept in the DOM and hidden, rather than conditionally rendered, so
        // aria-describedby always resolves to a real element.
        hidden={!open}
        className={cn(
          'pointer-events-none absolute z-50 w-max max-w-56',
          'bg-ink-900 text-ink-0 rounded-md px-2 py-1',
          'text-caption shadow-md',
          sidePositions[side],
          className,
        )}
      >
        {content}
      </span>
    </span>
  );
}
