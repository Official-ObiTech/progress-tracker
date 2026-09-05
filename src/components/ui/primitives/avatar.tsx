'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';

const sizes: Record<AvatarSize, string> = {
  xs: 'h-6 w-6 text-[0.625rem]',
  sm: 'h-7 w-7 text-caption',
  md: 'h-9 w-9 text-small',
  lg: 'h-12 w-12 text-h4',
};

/**
 * Derives initials from a name.
 *
 * Takes the first and last word rather than the first two, so "Ada King
 * Lovelace" gives AL rather than AK. Falls back to two characters for
 * single-word names.
 */
export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export interface AvatarProps {
  /** Used for initials and as the accessible name. Always required. */
  name: string;
  src?: string;
  size?: AvatarSize;
  className?: string;
}

/**
 * User or entity representation.
 *
 * Initials are the default rather than the fallback, and the image layers on
 * top when present. If the image fails to load, the initials are already
 * underneath, so there is no flash of empty space.
 */
export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const [failed, setFailed] = React.useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span
      // The image carries the name, so the wrapper only needs a role and label
      // when there is no image to carry it.
      role="img"
      aria-label={name}
      className={cn(
        'relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full',
        'bg-surface-sunken text-muted font-medium',
        'ring-border-subtle ring-1 ring-inset',
        sizes[size],
        className,
      )}
    >
      <span aria-hidden="true">{getInitials(name)}</span>
      {showImage && (
        /* Avatar sources are arbitrary remote URLs. next/image would require
           allowlisting a host for every future provider, and these render at
           48px at most, so optimisation buys nothing here. */
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </span>
  );
}

export interface AvatarGroupProps {
  people: { name: string; src?: string }[];
  size?: AvatarSize;
  /** Anything beyond this collapses into a +N chip. */
  max?: number;
  className?: string;
}

/**
 * Overlapping stack of avatars.
 *
 * The overflow chip carries the remaining names in its label, so a screen
 * reader user is not told only that "3 more" exist.
 */
export function AvatarGroup({
  people,
  size = 'sm',
  max = 4,
  className,
}: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const hidden = people.slice(max);

  return (
    <span className={cn('flex items-center -space-x-1.5', className)}>
      {shown.map((person) => (
        <Avatar
          key={person.name}
          name={person.name}
          src={person.src}
          size={size}
          className="ring-surface ring-2"
        />
      ))}
      {hidden.length > 0 && (
        <span
          role="img"
          aria-label={`${hidden.length} more: ${hidden.map((p) => p.name).join(', ')}`}
          className={cn(
            'inline-grid place-items-center rounded-full',
            'bg-surface-sunken text-muted ring-surface font-medium ring-2',
            sizes[size],
          )}
        >
          <span aria-hidden="true">+{hidden.length}</span>
        </span>
      )}
    </span>
  );
}
