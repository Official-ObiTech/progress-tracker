'use client';

import * as React from 'react';

import { Button } from '../primitives/button';
import { Dialog } from './dialog';

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  /** Say what will happen and whether it can be undone. */
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Styles the confirm action as destructive. */
  destructive?: boolean;
  loading?: boolean;
}

/**
 * Confirmation before an irreversible action.
 *
 * Two rules encoded here rather than left to each caller:
 *
 * The confirm button names the action ("Delete project"), never "OK" or "Yes".
 * People click through dialogs without reading, so the button text is often the
 * only thing that registers.
 *
 * Cancel is the default focus target, and the dialog is dismissible, so the
 * safe path is the easy one.
 */
export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  loading = false,
}: ConfirmDialogProps) {
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (open) cancelRef.current?.focus();
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      size="sm"
      actions={
        <>
          <Button ref={cancelRef} variant="outline" onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={destructive ? 'destructive' : 'primary'}
            loading={loading}
            onClick={() => void onConfirm()}
          >
            {confirmLabel}
          </Button>
        </>
      }
    />
  );
}
