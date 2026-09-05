'use client';

import { useCallback, useSyncExternalStore } from 'react';

import { THEME_STORAGE_KEY } from './theme-script';

export type Theme = 'light' | 'dark';

/**
 * The active theme lives on <html data-theme>, set by ThemeScript before first
 * paint. That makes the DOM the source of truth, not React state.
 *
 * useSyncExternalStore is the correct primitive for reading an external store:
 * it avoids the setState-inside-effect cascade, and it handles the server and
 * client snapshots differing during hydration without a warning.
 */

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  // Keeps other tabs in sync when the preference changes.
  window.addEventListener('storage', onChange);

  return () => {
    observer.disconnect();
    window.removeEventListener('storage', onChange);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark'
    ? 'dark'
    : 'light';
}

/** The server cannot know the user's preference, so it assumes light. */
function getServerSnapshot(): Theme {
  return 'light';
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    // Writing the attribute notifies the MutationObserver above, which is what
    // updates every consumer of this hook.
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage is unavailable in some privacy modes. The theme still applies
      // for this session, it just will not persist.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(getSnapshot() === 'dark' ? 'light' : 'dark');
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}
