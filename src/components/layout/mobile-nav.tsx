'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { mediaQuery } from '@/lib/design-tokens';
import { Button } from '@/components/ui/primitives/button';
import { Brand } from './brand';
import { SidebarNav } from './sidebar-nav';
import { UserMenu } from './user-menu';

/**
 * Mobile navigation drawer.
 *
 * Built on the native <dialog> element with showModal(). That gives focus
 * trapping, Escape to close, background inerting and top-layer stacking from
 * the browser. Reimplementing those correctly is a common source of
 * accessibility bugs, and doing it here would mean either a large dependency
 * or a hand rolled focus trap.
 */
export function MobileNav() {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  const close = React.useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Close on navigation. Without this the drawer stays open over the page the
  // user just asked for.
  React.useEffect(() => {
    close();
  }, [pathname, close]);

  // Close when the viewport grows past the breakpoint where the permanent
  // sidebar takes over. Without this, opening the drawer on a phone and then
  // rotating to landscape leaves a modal stranded over a layout that already
  // has its own navigation.
  React.useEffect(() => {
    const query = window.matchMedia(mediaQuery('md'));
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) close();
    };

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, [close]);

  return (
    <>
      <Button
        variant="ghost"
        size="md"
        iconOnly
        leadingIcon={Menu}
        aria-label="Open navigation menu"
        className="md:hidden"
        onClick={() => dialogRef.current?.showModal()}
      />

      <dialog
        ref={dialogRef}
        aria-label="Navigation"
        // Reset the UA dialog defaults: centred box, auto margins, fixed
        // max sizes. This one is a full height panel pinned to the left.
        className={cn(
          'm-0 h-dvh max-h-none w-[min(19rem,85vw)] max-w-none',
          'border-border-subtle bg-surface flex-col border-r p-0',
          'text-default backdrop:bg-ink-950/40',
          'open:flex md:hidden',
        )}
      >
        <div className="border-border-subtle flex h-14 shrink-0 items-center justify-between border-b pr-2 pl-4">
          <Brand />
          <Button
            variant="ghost"
            size="md"
            iconOnly
            leadingIcon={X}
            aria-label="Close navigation menu"
            onClick={close}
          />
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 py-3">
          <SidebarNav group="primary" onNavigate={close} />
        </nav>

        <div className="border-border-subtle shrink-0 border-t px-3 py-3">
          <nav aria-label="Secondary" className="mb-2">
            <SidebarNav group="secondary" onNavigate={close} />
          </nav>
          <UserMenu />
        </div>
      </dialog>
    </>
  );
}
