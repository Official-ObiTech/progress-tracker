import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

/**
 * Test configuration.
 *
 * jsdom rather than a real browser: no browser binary is available in every
 * environment this runs in, and the behaviour under test here is DOM
 * structure, ARIA wiring and keyboard event handling, all of which jsdom
 * models accurately.
 *
 * What jsdom does NOT model is layout and painting, so responsive breakpoints
 * and visual regressions still need a real browser.
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
