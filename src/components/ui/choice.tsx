'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

/**
 * Selection controls: checkbox, radio and switch.
 *
 * All three keep the real input in the DOM and style it directly rather than
 * hiding it behind a decorative div. That preserves native keyboard handling,
 * form participation, and the indeterminate state, none of which are worth
 * reimplementing.
 *
 * Touch targets: the visual box is 16px, but the label wrapper gives the whole
 * row a comfortable hit area, which is what the pointer actually lands on.
 */

const boxBase = cn(
  'peer h-4 w-4 shrink-0 cursor-pointer appearance-none border bg-surface',
  'border-border-strong',
  'transition-colors duration-[var(--duration-fast)]',
  'checked:border-primary checked:bg-primary',
  'disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:opacity-60',
  // Mark is drawn with a mask so it inherits the fill colour and stays crisp
  // at any zoom level, unlike a background image.
  'checked:bg-[length:100%_100%] checked:bg-center checked:bg-no-repeat',
);

const checkMark =
  "checked:bg-[url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 1 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0z'/%3e%3c/svg%3e\")]";

const radioMark =
  "checked:bg-[url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3.5'/%3e%3c/svg%3e\")]";

interface ChoiceRowProps {
  children: React.ReactNode;
  label: React.ReactNode;
  description?: string;
  disabled?: boolean;
  className?: string;
}

function ChoiceRow({
  children,
  label,
  description,
  disabled,
  className,
}: ChoiceRowProps) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-start gap-2.5 py-1',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      {children}
      <span className="flex flex-col gap-0.5">
        <span className="text-small text-default leading-tight">{label}</span>
        {description && (
          <span className="text-caption text-muted">{description}</span>
        )}
      </span>
    </label>
  );
}

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label: React.ReactNode;
  description?: string;
  /** Renders the mixed state used by "select all" controls. */
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { label, description, indeterminate = false, className, ...props },
    ref,
  ) {
    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    // Indeterminate has no HTML attribute. It exists only as a DOM property,
    // so it must be set imperatively after render.
    React.useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <ChoiceRow
        label={label}
        description={description}
        disabled={props.disabled}
      >
        <input
          ref={innerRef}
          type="checkbox"
          className={cn(
            boxBase,
            checkMark,
            'mt-0.5 rounded-xs',
            'indeterminate:border-primary indeterminate:bg-primary',
            className,
          )}
          {...props}
        />
      </ChoiceRow>
    );
  },
);

export interface RadioProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label: React.ReactNode;
  description?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  function Radio({ label, description, className, ...props }, ref) {
    return (
      <ChoiceRow
        label={label}
        description={description}
        disabled={props.disabled}
      >
        <input
          ref={ref}
          type="radio"
          className={cn(boxBase, radioMark, 'mt-0.5 rounded-full', className)}
          {...props}
        />
      </ChoiceRow>
    );
  },
);

export interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label: React.ReactNode;
  description?: string;
}

/**
 * Toggle for settings that apply immediately.
 *
 * Use a checkbox instead when the change only takes effect on submit: a switch
 * implies the state changed the moment it moved.
 */
export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  function Switch({ label, description, className, ...props }, ref) {
    return (
      <ChoiceRow
        label={label}
        description={description}
        disabled={props.disabled}
      >
        <span className="relative mt-0.5 inline-flex shrink-0">
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            className={cn(
              'peer h-5 w-9 cursor-pointer appearance-none rounded-full border',
              'border-border-strong bg-surface-sunken',
              'transition-colors duration-[var(--duration-base)]',
              'checked:border-primary checked:bg-primary',
              'disabled:cursor-not-allowed disabled:opacity-60',
              className,
            )}
            {...props}
          />
          {/* Knob. pointer-events-none so clicks reach the input beneath. */}
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute top-0.5 left-0.5 h-4 w-4 rounded-full',
              'bg-surface ring-border-default shadow-xs ring-1',
              'transition-transform duration-[var(--duration-base)] ease-[var(--ease-out-soft)]',
              'peer-checked:translate-x-4 peer-checked:ring-transparent',
            )}
          />
        </span>
      </ChoiceRow>
    );
  },
);
