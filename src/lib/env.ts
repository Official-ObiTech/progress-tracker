/**
 * Type-safe environment configuration.
 *
 * Every environment variable the app reads is declared here once, validated
 * once, and exported as a frozen, fully typed object. Application code must
 * import `env` from this module and must never read `process.env` directly.
 *
 * Why: a missing or malformed variable then fails loudly at startup with a
 * message naming the variable, instead of surfacing later as `undefined`
 * somewhere deep in a component.
 *
 * IMPORTANT (Next.js constraint):
 * `NEXT_PUBLIC_*` variables are inlined into the client bundle by a build-time
 * find-and-replace on the literal text `process.env.NEXT_PUBLIC_FOO`. A dynamic
 * lookup such as `process.env[key]` is NOT replaced and resolves to `undefined`
 * in the browser. Each variable below is therefore spelled out literally.
 */

const rawEnv = {
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
} as const;

type RawEnvKey = keyof typeof rawEnv;

const missing: RawEnvKey[] = [];

/** Reads a variable that must be present and non-empty. */
function required(key: RawEnvKey): string {
  const value = rawEnv[key]?.trim();

  if (!value) {
    missing.push(key);
    return '';
  }

  return value;
}

/** Reads a variable that may be absent, falling back to a default. */
function optional(key: RawEnvKey, fallback: string): string {
  return rawEnv[key]?.trim() || fallback;
}

const parsed = {
  /** Display name of the application, used in titles and headings. */
  appName: required('NEXT_PUBLIC_APP_NAME'),

  /** Absolute origin the app is served from, used for metadata and absolute URLs. */
  appUrl: required('NEXT_PUBLIC_APP_URL'),

  /**
   * Base URL of the REST API.
   *
   * Reserved for Phase 5, when the frontend is wired to the real backend.
   * Until then it is unused and defaults to a same-origin path, so nothing
   * breaks while the backend does not exist.
   */
  apiUrl: optional('NEXT_PUBLIC_API_URL', '/api'),

  /** True when running the production build. */
  isProduction: process.env.NODE_ENV === 'production',

  /** True when running the local development server. */
  isDevelopment: process.env.NODE_ENV === 'development',
} as const;

if (missing.length > 0) {
  throw new Error(
    [
      `Invalid environment configuration. Missing or empty: ${missing.join(', ')}.`,
      'Copy .env.example to .env.local and fill in the listed variables.',
    ].join(' '),
  );
}

export type Env = typeof parsed;

export const env: Env = Object.freeze(parsed);
