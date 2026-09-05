'use client';

import * as React from 'react';
import { ChevronDown, Search } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { ControlSize } from '@/lib/design-tokens';
import { Icon } from './icon';
import { useField } from './field';

/**
 * Shared control chrome.
 *
 * `border-border-strong` rather than a hairline: an input border defines the
 * boundary of an interactive control, so WCAG requires it to clear 3:1 against
 * the background. The very light borders common in modern UI kits fail this.
 */
const controlBase = cn(
  'w-full rounded-md border bg-surface text-default',
  'border-border-strong',
  'placeholder:text-disabled',
  'transition-colors duration-[var(--duration-fast)]',
  'hover:not-disabled:border-ink-500',
  'disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:text-disabled',
  // Invalid state is driven by aria-invalid, so the visual and the accessible
  // state can never disagree.
  'aria-invalid:border-danger',
);

const controlSizes: Record<ControlSize, string> = {
  sm: 'h-[var(--control-h-sm)] px-2.5 text-caption',
  md: 'h-[var(--control-h-md)] px-3 text-small',
  lg: 'h-[var(--control-h-lg)] px-3.5 text-body',
};

/** Builds aria wiring from the surrounding Field, if there is one. */
function useFieldWiring(explicitId?: string, invalid?: boolean) {
  const field = useField();
  const describedBy = field
    ? field.hasError
      ? field.errorId
      : field.descriptionId
    : undefined;

  return {
    id: explicitId ?? field?.inputId,
    'aria-invalid': (invalid ?? field?.hasError) || undefined,
    'aria-describedby': describedBy,
    required: field?.isRequired,
  };
}

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  size?: ControlSize;
  invalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ size = 'md', invalid, className, id, ...props }, ref) {
    const wiring = useFieldWiring(id, invalid);

    return (
      <input
        ref={ref}
        className={cn(controlBase, controlSizes[size], className)}
        {...wiring}
        {...props}
      />
    );
  },
);

export interface SearchInputProps extends InputProps {
  onClear?: () => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput({ size = 'md', className, ...props }, ref) {
    return (
      <div className="relative">
        <Icon
          icon={Search}
          size="md"
          className="text-subtle pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
        />
        <Input
          ref={ref}
          type="search"
          size={size}
          className={cn('pl-9', className)}
          {...props}
        />
      </div>
    );
  },
);

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, invalid, id, rows = 4, ...props }, ref) {
    const wiring = useFieldWiring(id, invalid);

    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          controlBase,
          'text-small min-h-20 resize-y px-3 py-2 leading-relaxed',
          className,
        )}
        {...wiring}
        {...props}
      />
    );
  },
);

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  'size'
> {
  size?: ControlSize;
  invalid?: boolean;
}

/**
 * Native select, styled.
 *
 * A custom listbox would need focus trapping, typeahead and virtualisation to
 * match what the browser already provides for free, including on mobile where
 * the native picker is better than anything reimplemented. Kept native
 * deliberately.
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { size = 'md', className, invalid, id, children, ...props },
    ref,
  ) {
    const wiring = useFieldWiring(id, invalid);

    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            controlBase,
            controlSizes[size],
            'cursor-pointer appearance-none pr-9',
            className,
          )}
          {...wiring}
          {...props}
        >
          {children}
        </select>
        <Icon
          icon={ChevronDown}
          size="md"
          className="text-subtle pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
        />
      </div>
    );
  },
);
