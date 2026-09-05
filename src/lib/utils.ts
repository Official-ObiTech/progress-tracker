import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind class names, resolving conflicts in favour of the last one.
 *
 * Needed because component variants build class strings from several sources.
 * Without the merge, `cn('p-4', 'p-6')` would emit both and the winner would
 * depend on CSS source order rather than call order.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
