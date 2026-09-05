'use client';

import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/primitives/button';
import { useTheme } from './use-theme';

/**
 * Light and dark switch.
 *
 * The label describes the action rather than the current state, because that
 * is what a screen reader user needs to hear before activating it.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <Button
      variant="ghost"
      size="md"
      iconOnly
      leadingIcon={theme === 'dark' ? Sun : Moon}
      aria-label={`Switch to ${next} theme`}
      onClick={toggleTheme}
    />
  );
}
