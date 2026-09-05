/**
 * Applies the stored theme before first paint.
 *
 * This must run as a blocking inline script in <head>. Any later and the
 * browser paints the light theme first, producing a white flash for dark mode
 * users. React cannot do this: it runs after paint.
 *
 * The script is intentionally tiny and dependency free.
 */

export const THEME_STORAGE_KEY = 'progress-tracker-theme';

const script = `
(function () {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();
`;

export function ThemeScript() {
  return (
    <script
      // Static string defined above, no user input reaches it.
      dangerouslySetInnerHTML={{ __html: script }}
      suppressHydrationWarning
    />
  );
}
