'use client';

import * as React from 'react';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '../primitives/button';

export type DialogSize = 'sm' | 'md' | 'lg';

const sizes: Record<DialogSize, string> = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
};

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  /** Buttons for the footer. Omit for a purely informational dialog. */
  actions?: React.ReactNode;
  size?: DialogSize;
  /**
   * Prevents closing by backdrop click or Escape. Only for dialogs where
   * dismissing would lose work; never use it for convenience.
   */
  dismissible?: boolean;
  className?: string;
}

/**
 * Modal dialog built on the native <dialog> element.
 *
 * showModal() gives focus trapping, Escape, background inerting and top-layer
 * stacking from the browser. Reimplementing a focus trap correctly is one of
 * the most commonly botched pieces of accessibility work, so this defers to the
 * platform rather than competing with it.
 *
 * Responsive behaviour is intentional rather than a shrunk desktop modal: on
 * phones it docks to the bottom of the screen with rounded top corners, which
 * puts the actions within thumb reach. From `sm` up it is a centred box.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  size = 'md',
  dismissible = true,
  className,
}: DialogProps) {
  const ref = React.useRef<HTMLDialogElement>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();

  // Drive the native element from the `open` prop. showModal() cannot be set
  // declaratively, so this is the one place an effect is the right tool.
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      // Fires for Escape as well as close(), so the parent state stays in sync
      // however the dialog was dismissed.
      onClose={onClose}
      onCancel={(event) => {
        if (!dismissible) event.preventDefault();
      }}
      // The backdrop is part of the dialog element, so a click landing on the
      // element itself rather than its content means the backdrop was hit.
      onClick={(event) => {
        if (dismissible && event.target === ref.current) onClose();
      }}
      className={cn(
        'bg-surface text-default m-0 w-full max-w-none p-0',
        'mt-auto mb-0 rounded-t-xl sm:m-auto sm:rounded-xl',
        'border-border-subtle border shadow-lg',
        'backdrop:bg-ink-950/40',
        sizes[size],
        className,
      )}
    >
      {/* Inner wrapper stops backdrop clicks registering on content. */}
      <div className="flex max-h-[85dvh] flex-col">
        <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-3">
          <div className="flex flex-col gap-1">
            <h2 id={titleId} className="text-h3 text-strong">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="text-small text-muted">
                {description}
              </p>
            )}
          </div>
          {dismissible && (
            <Button
              iconOnly
              leadingIcon={X}
              variant="ghost"
              size="sm"
              aria-label="Close dialog"
              onClick={onClose}
              className="-mt-1 -mr-1"
            />
          )}
        </div>

        {children && (
          <div className="flex-1 overflow-y-auto px-5 py-1">{children}</div>
        )}

        {actions && (
          <div
            className={cn(
              'flex flex-col-reverse gap-2 px-5 pt-4 pb-5',
              // Stacked and full width on phones so each action is an easy
              // target; inline and right aligned from sm up.
              'sm:flex-row sm:justify-end',
              '[&>button]:w-full sm:[&>button]:w-auto',
            )}
          >
            {actions}
          </div>
        )}
      </div>
    </dialog>
  );
}
