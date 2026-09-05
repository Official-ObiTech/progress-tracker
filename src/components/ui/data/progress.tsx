import * as React from 'react';

import { cn } from '@/lib/utils';
import { getStatus, type Status } from '@/config/status';

/**
 * PROGRESS VISUALISATION
 *
 * This is the one place the design system raises its voice. Everything else in
 * the interface is deliberately quiet so that progress reads first.
 *
 * The shared idea is a measured instrument rather than a loading bar: tracks
 * carry faint quarter ticks so a fill can be read as a rough proportion at a
 * glance, without needing to find the number. Percentages are rendered with
 * tabular figures (set globally in globals.css) so digits do not shift width
 * as values change.
 *
 * Colour never carries the value alone. Every component here exposes the
 * number as text or as an accessible name.
 */

function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

export type ProgressTone = 'primary' | 'accent' | 'neutral';

const barTones: Record<ProgressTone, string> = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  neutral: 'bg-ink-500',
};

export interface ProgressBarProps {
  /** Completion from 0 to 100. Values outside the range are clamped. */
  value: number;
  /** Names what is progressing. Required: a bare bar means nothing spoken aloud. */
  label: string;
  /** Renders the label and percentage above the track. */
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  tone?: ProgressTone;
  /** Faint quarter marks. Turn off in dense lists where they add noise. */
  ticks?: boolean;
  /** Work is happening but the proportion is unknown. */
  indeterminate?: boolean;
  className?: string;
}

const barHeights = {
  sm: 'h-1',
  md: 'h-1.5',
  lg: 'h-2.5',
} as const;

export function ProgressBar({
  value,
  label,
  showLabel = false,
  size = 'md',
  tone = 'primary',
  ticks = true,
  indeterminate = false,
  className,
}: ProgressBarProps) {
  const percent = clampPercent(value);

  return (
    <div className={cn('flex w-full flex-col gap-1.5', className)}>
      {showLabel && (
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-caption text-muted">{label}</span>
          <span className="text-caption text-strong font-medium">
            {indeterminate ? 'In progress' : `${Math.round(percent)}%`}
          </span>
        </div>
      )}

      <div
        role="progressbar"
        aria-label={showLabel ? undefined : label}
        // Omitting valuenow is how ARIA expresses an unknown quantity.
        aria-valuenow={indeterminate ? undefined : Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={
          indeterminate ? 'In progress' : `${Math.round(percent)} percent`
        }
        className={cn(
          'bg-track relative w-full overflow-hidden rounded-full',
          barHeights[size],
        )}
      >
        {/* Quarter ticks. Sit above the track but below the fill, so a
            completed section reads as solid rather than perforated. */}
        {ticks && !indeterminate && (
          <div aria-hidden="true" className="absolute inset-0 flex">
            {[25, 50, 75].map((mark) => (
              <span
                key={mark}
                className="bg-track-tick absolute top-0 bottom-0 w-px"
                style={{ left: `${mark}%` }}
              />
            ))}
          </div>
        )}

        {indeterminate ? (
          <div
            className={cn(
              'absolute inset-y-0 w-1/4 rounded-full opacity-70',
              barTones[tone],
              'animate-[progress-sweep_1400ms_ease-in-out_infinite]',
            )}
          />
        ) : (
          <div
            className={cn(
              'relative h-full rounded-full',
              barTones[tone],
              'transition-[width] duration-[var(--duration-base)] ease-[var(--ease-out-soft)]',
            )}
            style={{ width: `${percent}%` }}
          />
        )}
      </div>
    </div>
  );
}

export interface ProgressRingProps {
  value: number;
  label: string;
  size?: number;
  tone?: ProgressTone;
  /** Prints the percentage in the centre. */
  showValue?: boolean;
  className?: string;
}

const ringStrokes: Record<ProgressTone, string> = {
  primary: 'stroke-primary',
  accent: 'stroke-accent',
  neutral: 'stroke-ink-500',
};

/**
 * Radial completion, for a single headline figure such as overall project
 * progress. Use one per view at most: a grid of rings is harder to compare
 * than a column of bars, because arcs do not line up.
 */
export function ProgressRing({
  value,
  label,
  size = 96,
  tone = 'primary',
  showValue = true,
  className,
}: ProgressRingProps) {
  const percent = clampPercent(value);
  const stroke = size >= 80 ? 7 : 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <div
      className={cn('relative inline-grid place-items-center', className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        role="progressbar"
        aria-label={label}
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        // Rotated so the arc starts at twelve o'clock rather than three.
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-track"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(
            ringStrokes[tone],
            'transition-[stroke-dashoffset] duration-[var(--duration-base)] ease-[var(--ease-out-soft)]',
          )}
        />
      </svg>

      {showValue && (
        <span className="text-strong absolute flex items-baseline">
          <span className={cn(size >= 80 ? 'text-h2' : 'text-h4')}>
            {Math.round(percent)}
          </span>
          <span className="text-caption text-muted">%</span>
        </span>
      )}
    </div>
  );
}

export interface ProgressSegment {
  status: Status;
  count: number;
}

const segmentTones: Record<string, string> = {
  neutral: 'bg-ink-400',
  primary: 'bg-primary',
  accent: 'bg-accent',
  danger: 'bg-danger',
};

/**
 * Composition of work by status in a single bar.
 *
 * Answers "how much is done" and "what is the rest doing" at once, which two
 * separate numbers cannot. Segments below one percent are dropped rather than
 * rendered as invisible slivers.
 */
export function SegmentedProgress({
  segments,
  label,
  className,
}: {
  segments: ProgressSegment[];
  label: string;
  className?: string;
}) {
  const total = segments.reduce((sum, s) => sum + s.count, 0);

  if (total === 0) {
    return (
      <div className={cn('flex w-full flex-col gap-1.5', className)}>
        <div className="bg-track h-2.5 w-full rounded-full" />
        <p className="text-caption text-muted">Nothing tracked yet</p>
      </div>
    );
  }

  const visible = segments
    .map((s) => ({ ...s, percent: (s.count / total) * 100 }))
    .filter((s) => s.percent >= 1);

  const doneCount = segments
    .filter((s) => getStatus(s.status).countsAsDone)
    .reduce((sum, s) => sum + s.count, 0);

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={Math.round((doneCount / total) * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={`${doneCount} of ${total} complete`}
        className="bg-track flex h-2.5 w-full gap-px overflow-hidden rounded-full"
      >
        {visible.map((segment) => (
          <span
            key={segment.status}
            style={{ width: `${segment.percent}%` }}
            className={cn(
              'h-full first:rounded-l-full last:rounded-r-full',
              segmentTones[getStatus(segment.status).tone],
            )}
          />
        ))}
      </div>

      <ul className="flex flex-wrap gap-x-4 gap-y-1">
        {segments
          .filter((s) => s.count > 0)
          .map((segment) => (
            <li
              key={segment.status}
              className="text-caption text-muted flex items-center gap-1.5"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'h-2 w-2 rounded-full',
                  segmentTones[getStatus(segment.status).tone],
                )}
              />
              {getStatus(segment.status).label}
              <span className="text-strong font-medium">{segment.count}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
