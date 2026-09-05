import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { iconSizes, type IconSize } from '@/lib/design-tokens';

export interface IconProps {
  /** Any icon from lucide-react. One library, used consistently. */
  icon: LucideIcon;
  size?: IconSize;
  className?: string;
  /**
   * Accessible name. Omit when the icon sits beside text that already names
   * the action: a duplicate name is noise for screen reader users.
   */
  label?: string;
}

/**
 * Wrapper enforcing the icon size scale and the decorative-by-default rule.
 *
 * Icons are hidden from assistive technology unless given a label, because
 * most icons in this app repeat adjacent text.
 */
export function Icon({
  icon: IconComponent,
  size = 'md',
  className,
  label,
}: IconProps) {
  return (
    <IconComponent
      width={iconSizes[size]}
      height={iconSizes[size]}
      strokeWidth={2}
      className={cn('shrink-0', className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    />
  );
}
