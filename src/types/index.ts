/**
 * Shared types used across more than one layer of the app.
 *
 * Domain types (Project, Phase, Task, Session) are deliberately absent.
 * They are introduced in the segments that actually model them, so this file
 * does not accumulate speculative shapes that later turn out to be wrong.
 */

/** Makes every property in T mutable. Useful when reading from frozen config. */
export type Mutable<T> = {
  -readonly [K in keyof T]: T[K];
};

/** A value that may still be loading. */
export type Maybe<T> = T | null | undefined;

/** Narrows an object type to only the keys whose values extend V. */
export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];
