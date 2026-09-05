'use client';

import * as React from 'react';
import type { LucideIcon } from 'lucide-react';

import type { ControlSize } from '@/lib/design-tokens';
import { Button, type ButtonVariant } from './button';
import { Tooltip, type TooltipSide } from '../composite/tooltip';

export interface IconButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'children' | 'aria-label'
> {
  icon: LucideIcon;
  /**
   * Required. Becomes the accessible name and, unless `tooltip` overrides it,
   * the tooltip text.
   *
   * Making this a required prop rather than an optional one is the whole point
   * of the component: an unlabelled icon button is invisible to screen reader
   * and voice control users, and reviews do not reliably catch it.
   */
  label: string;
  variant?: ButtonVariant;
  size?: ControlSize;
  loading?: boolean;
  /** Set false for controls whose meaning is already obvious in context. */
  showTooltip?: boolean;
  tooltipSide?: TooltipSide;
}

/**
 * Square button showing only an icon.
 *
 * Wraps Button rather than reimplementing it, so variants, sizes, focus and
 * loading behaviour stay identical to every other button in the app.
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      icon,
      label,
      variant = 'ghost',
      size = 'md',
      showTooltip = true,
      tooltipSide = 'top',
      ...props
    },
    ref,
  ) {
    const button = (
      <Button
        ref={ref}
        iconOnly
        leadingIcon={icon}
        variant={variant}
        size={size}
        aria-label={label}
        {...props}
      />
    );

    if (!showTooltip) return button;

    return (
      <Tooltip content={label} side={tooltipSide}>
        {button}
      </Tooltip>
    );
  },
);
