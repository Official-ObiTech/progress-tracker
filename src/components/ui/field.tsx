'use client';

import * as React from 'react';
import { AlertCircle } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Icon } from './icon';

interface FieldContextValue {
  inputId: string;
  descriptionId: string;
  errorId: string;
  hasError: boolean;
  isRequired: boolean;
}

const FieldContext = React.createContext<FieldContextValue | null>(null);

/**
 * Wiring a label, helper text and validation message to a control by id is
 * repetitive and easy to get wrong. This context does it once so every control
 * gets correct `aria-describedby` and `aria-invalid` without the caller
 * managing ids by hand.
 */
export function useField(): FieldContextValue | null {
  return React.useContext(FieldContext);
}

export interface FieldProps {
  children: React.ReactNode;
  /** Renders below the control unless an error is present. */
  description?: string;
  /** Presence of this switches the control into its invalid state. */
  error?: string;
  required?: boolean;
  className?: string;
}

export function Field({
  children,
  description,
  error,
  required = false,
  className,
}: FieldProps) {
  const id = React.useId();

  const value = React.useMemo<FieldContextValue>(
    () => ({
      inputId: `${id}-input`,
      descriptionId: `${id}-description`,
      errorId: `${id}-error`,
      hasError: Boolean(error),
      isRequired: required,
    }),
    [id, error, required],
  );

  return (
    <FieldContext.Provider value={value}>
      <div className={cn('flex flex-col gap-[var(--field-gap)]', className)}>
        {children}

        {/* Helper text is suppressed while an error shows, so the user reads
            one message rather than two competing ones. */}
        {description && !error && (
          <p id={value.descriptionId} className="text-caption text-muted">
            {description}
          </p>
        )}

        {error && (
          <p
            id={value.errorId}
            // Announced when it appears, without stealing focus.
            role="status"
            className="text-caption text-danger-text flex items-start gap-1.5"
          >
            <Icon icon={AlertCircle} size="sm" className="mt-0.5" />
            {error}
          </p>
        )}
      </div>
    </FieldContext.Provider>
  );
}

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export function Label({ className, children, htmlFor, ...props }: LabelProps) {
  const field = useField();

  return (
    <label
      htmlFor={htmlFor ?? field?.inputId}
      className={cn('text-label text-default', className)}
      {...props}
    >
      {children}
      {field?.isRequired && (
        <>
          <span aria-hidden="true" className="text-danger-text ml-0.5">
            *
          </span>
          <span className="sr-only-text">(required)</span>
        </>
      )}
    </label>
  );
}
