import * as React from 'react';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import type { ControlSize } from '@/lib/design-tokens';
import { Icon } from './icon';
import { Spinner } from './spinner';

export type ButtonVariant =
  'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

/**
 * Shared across every variant.
 *
 * Note what is deliberately absent: no shadow, and no transform on hover.
 * Buttons change colour on interaction and nothing else. Lifting or scaling a
 * button on hover is decoration rather than feedback.
 */
const base = cn(
  'relative inline-flex items-center justify-center gap-2',
  'rounded-md border font-medium whitespace-nowrap select-none',
  'text-button',
  'transition-colors duration-[var(--duration-fast)] ease-[var(--ease-out-soft)]',
  'disabled:cursor-not-allowed disabled:opacity-55',
);

const variants: Record<ButtonVariant, string> = {
  // Solid brand fill. One per view: the single most important action.
  primary: cn(
    'border-transparent bg-primary text-on-fill',
    'enabled:hover:bg-primary-hover enabled:active:bg-primary-active',
  ),
  // Tinted rather than solid, so it sits beside a primary without competing.
  secondary: cn(
    'border-transparent bg-primary-surface text-primary-text',
    'enabled:hover:bg-primary-border enabled:active:bg-primary-border',
  ),
  // Bordered neutral. The workhorse for most actions in a dense interface.
  outline: cn(
    'border-border-default bg-surface text-default',
    'enabled:hover:bg-surface-hover enabled:hover:border-border-strong',
    'enabled:active:bg-surface-active',
  ),
  // No chrome until touched. For low-priority and icon-only controls.
  ghost: cn(
    'border-transparent bg-transparent text-muted',
    'enabled:hover:bg-surface-hover enabled:hover:text-default',
    'enabled:active:bg-surface-active',
  ),
  // The only control where the danger signal colour is permitted.
  destructive: cn(
    'border-transparent bg-danger text-on-fill',
    'enabled:hover:bg-danger-hover enabled:active:bg-danger-active',
  ),
};

const sizes: Record<ControlSize, string> = {
  sm: 'h-[var(--control-h-sm)] px-2.5 text-caption',
  md: 'h-[var(--control-h-md)] px-3.5',
  lg: 'h-[var(--control-h-lg)] px-5',
};

const iconOnlySizes: Record<ControlSize, string> = {
  sm: 'h-[var(--control-h-sm)] w-[var(--control-h-sm)] px-0',
  md: 'h-[var(--control-h-md)] w-[var(--control-h-md)] px-0',
  lg: 'h-[var(--control-h-lg)] w-[var(--control-h-lg)] px-0',
};

/**
 * Builds button classes for elements that are not <button>.
 *
 * Needed because a link must render as <a> for correct semantics, middle click
 * and "open in new tab". Nesting an <a> inside a <button> is invalid HTML, so
 * links borrow the styling instead of the component.
 */
export function buttonClasses({
  variant = 'outline',
  size = 'md',
  fullWidth = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ControlSize;
  fullWidth?: boolean;
  className?: string;
} = {}): string {
  return cn(
    base,
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  );
}

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonBaseProps extends NativeButtonProps {
  variant?: ButtonVariant;
  size?: ControlSize;
  /** Swaps content for a spinner and blocks interaction. */
  loading?: boolean;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  fullWidth?: boolean;
}

interface LabelledButtonProps extends ButtonBaseProps {
  iconOnly?: false;
}

interface IconOnlyButtonProps extends ButtonBaseProps {
  /**
   * Square button showing only an icon.
   *
   * `aria-label` is required by the type system here. An unlabelled icon
   * button is unusable by screen reader and voice control users, so this is
   * enforced at compile time rather than left to review.
   */
  iconOnly: true;
  'aria-label': string;
  leadingIcon: LucideIcon;
  children?: never;
}

export type ButtonProps = LabelledButtonProps | IconOnlyButtonProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'outline',
      size = 'md',
      loading = false,
      disabled,
      leadingIcon,
      trailingIcon,
      iconOnly = false,
      fullWidth = false,
      className,
      children,
      type = 'button',
      ...props
    },
    ref,
  ) {
    const isDisabled = disabled || loading;
    const iconSize = size === 'lg' ? 'lg' : 'sm';

    return (
      <button
        ref={ref}
        // Defaulting to "button" avoids the classic bug where a button inside
        // a form submits it by accident.
        type={type}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          base,
          variants[variant],
          iconOnly ? iconOnlySizes[size] : sizes[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {/* Content is hidden rather than removed while loading, so the button
            keeps its width and the surrounding layout does not jump. */}
        <span
          className={cn(
            'inline-flex items-center gap-2',
            loading && 'invisible',
          )}
        >
          {leadingIcon && <Icon icon={leadingIcon} size={iconSize} />}
          {!iconOnly && children}
          {trailingIcon && <Icon icon={trailingIcon} size={iconSize} />}
        </span>

        {loading && (
          <span className="absolute inset-0 grid place-items-center">
            <Spinner size={iconSize} label={null} />
            <span className="sr-only-text">Loading</span>
          </span>
        )}
      </button>
    );
  },
);
