/**
 * TypeScript mirror of the tokens that code needs to read at runtime.
 *
 * CSS variables in `globals.css` remain the source of truth for anything the
 * browser renders. This file exists only for values that JavaScript must know:
 * breakpoints used in media query hooks, icon sizes passed as props, durations
 * used to time a state change.
 *
 * Keep the two in sync. If a value appears in both, `globals.css` wins.
 */

/** Breakpoints in pixels. Mirrors --breakpoint-* in globals.css. */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** Icon pixel sizes. Mirrors --icon-* in globals.css. */
export const iconSizes = {
  sm: 14,
  md: 16,
  lg: 20,
} as const;

export type IconSize = keyof typeof iconSizes;

/** Transition durations in milliseconds. Mirrors --duration-* tokens. */
export const durations = {
  fast: 120,
  base: 180,
} as const;

/** Control heights, for aligning a button beside an input. */
export const controlSizes = ['sm', 'md', 'lg'] as const;

export type ControlSize = (typeof controlSizes)[number];

/** Media query string for a min-width breakpoint. */
export function mediaQuery(bp: Breakpoint): string {
  return `(min-width: ${breakpoints[bp]}px)`;
}
