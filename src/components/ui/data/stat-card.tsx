import type { LucideIcon } from 'lucide-react';
import { TrendingDown, TrendingUp } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Icon } from '../primitives/icon';
import { Card } from './card';

export interface StatCardProps {
  label: string;
  /** Pre-formatted. The component does not know your units or locale. */
  value: string | number;
  /** Small qualifier under the value, e.g. "of 48 tasks". */
  detail?: string;
  icon?: LucideIcon;
  /** Percentage change. Positive renders as up, negative as down. */
  change?: number;
  /**
   * Set false where a rise is bad, such as blocked tasks. Controls whether an
   * increase reads as positive or negative, since the component cannot know.
   */
  increaseIsGood?: boolean;
  className?: string;
}

/**
 * Single headline figure.
 *
 * The value uses tabular figures inherited from the base layer, so a row of
 * these stays aligned and does not jitter as numbers update.
 *
 * Trend direction is conveyed by an arrow icon as well as colour, and the
 * accessible text spells out "up" or "down" rather than relying on the glyph.
 */
export function StatCard({
  label,
  value,
  detail,
  icon,
  change,
  increaseIsGood = true,
  className,
}: StatCardProps) {
  const hasChange = typeof change === 'number' && change !== 0;
  const rising = (change ?? 0) > 0;
  const good = rising === increaseIsGood;

  return (
    <Card className={cn('p-[var(--card-padding)]', className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-caption text-muted">{label}</p>
        {icon && <Icon icon={icon} size="lg" className="text-subtle" />}
      </div>

      <p className="text-h1 text-strong mt-2">{value}</p>

      <div className="mt-1 flex items-center gap-2">
        {hasChange && (
          <span
            className={cn(
              'text-caption inline-flex items-center gap-1 font-medium',
              good ? 'text-primary-text' : 'text-danger-text',
            )}
          >
            <Icon icon={rising ? TrendingUp : TrendingDown} size="sm" />
            {Math.abs(change)}%
            <span className="sr-only-text">{rising ? 'up' : 'down'}</span>
          </span>
        )}
        {detail && <span className="text-caption text-subtle">{detail}</span>}
      </div>
    </Card>
  );
}
