'use client';

import * as React from 'react';
import { Check, type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Icon } from '../primitives/icon';

export interface MenuItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  disabled?: boolean;
  /** Marks the item as the current selection. Renders a check. */
  selected?: boolean;
  /** Styles the item as destructive. */
  destructive?: boolean;
  onSelect?: () => void;
}

export interface DropdownMenuProps {
  /** Rendered as the trigger. Receives the props needed to open the menu. */
  trigger: (props: {
    ref: React.Ref<HTMLButtonElement>;
    onClick: () => void;
    onKeyDown: (event: React.KeyboardEvent) => void;
    'aria-expanded': boolean;
    'aria-haspopup': 'menu';
  }) => React.ReactNode;
  items: MenuItem[];
  align?: 'start' | 'end';
  className?: string;
}

/**
 * Menu of actions.
 *
 * The browser does not provide keyboard behaviour for menus, so this
 * implements the WAI-ARIA menu pattern directly:
 *
 *   Arrow down / up   move between items, wrapping at the ends
 *   Home / End        jump to first or last
 *   Enter / Space     activate
 *   Escape            close and return focus to the trigger
 *   Tab               close, then move on normally
 *
 * Focus is managed rather than roving through tabindex on every item: only one
 * item is tabbable at a time, which is what keeps Tab from walking through a
 * long menu.
 *
 * Disabled items are skipped when arrowing, because landing on something that
 * cannot be activated wastes a keystroke and confuses screen reader users.
 */
export function DropdownMenu({
  trigger,
  items,
  align = 'start',
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const enabledIndexes = React.useMemo(
    () =>
      items.map((item, i) => (item.disabled ? -1 : i)).filter((i) => i >= 0),
    [items],
  );

  const close = React.useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  const openAt = React.useCallback(
    (position: 'first' | 'last') => {
      if (enabledIndexes.length === 0) return;
      setActiveIndex(
        position === 'first'
          ? enabledIndexes[0]
          : enabledIndexes[enabledIndexes.length - 1],
      );
      setOpen(true);
    },
    [enabledIndexes],
  );

  // Move DOM focus to whichever item is active. Without this the arrow keys
  // would update styling but leave focus on the trigger, so screen readers
  // would announce nothing.
  React.useEffect(() => {
    if (open) itemRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  // Close on a click outside. Escape and Tab are handled on the elements
  // themselves, but a pointer press elsewhere has no keyboard equivalent.
  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !menuRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  const step = React.useCallback(
    (direction: 1 | -1) => {
      const position = enabledIndexes.indexOf(activeIndex);
      const next =
        (position + direction + enabledIndexes.length) % enabledIndexes.length;
      setActiveIndex(enabledIndexes[next]);
    },
    [activeIndex, enabledIndexes],
  );

  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (
      event.key === 'ArrowDown' ||
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      openAt('first');
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      openAt('last');
    }
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        step(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        step(-1);
        break;
      case 'Home':
        event.preventDefault();
        setActiveIndex(enabledIndexes[0]);
        break;
      case 'End':
        event.preventDefault();
        setActiveIndex(enabledIndexes[enabledIndexes.length - 1]);
        break;
      case 'Escape':
        event.preventDefault();
        close();
        break;
      case 'Tab':
        // Let Tab do its normal thing, but do not leave the menu open behind.
        close(false);
        break;
      default:
        break;
    }
  };

  const select = (item: MenuItem) => {
    if (item.disabled) return;
    item.onSelect?.();
    close();
  };

  return (
    <div className={cn('relative inline-flex', className)}>
      {trigger({
        ref: triggerRef,
        onClick: () => (open ? close(false) : openAt('first')),
        onKeyDown: handleTriggerKeyDown,
        'aria-expanded': open,
        'aria-haspopup': 'menu',
      })}

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-orientation="vertical"
          onKeyDown={handleMenuKeyDown}
          className={cn(
            'absolute top-full z-50 mt-1 min-w-52',
            'border-border-default bg-surface-raised rounded-lg border p-1 shadow-lg',
            align === 'end' ? 'right-0' : 'left-0',
          )}
        >
          {items.map((item, index) => (
            <button
              key={item.id}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              // Only the active item is tabbable, which is what stops Tab from
              // walking through every entry.
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => select(item)}
              onMouseEnter={() => !item.disabled && setActiveIndex(index)}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-sm px-2 py-1.5 text-left',
                'text-small transition-colors duration-[var(--duration-fast)]',
                'focus:outline-none',
                item.destructive ? 'text-danger-text' : 'text-default',
                index === activeIndex && !item.disabled && 'bg-surface-hover',
                'disabled:text-disabled disabled:cursor-not-allowed',
              )}
            >
              {item.icon && <Icon icon={item.icon} size="md" />}
              <span className="flex-1">{item.label}</span>
              {item.selected && (
                <Icon icon={Check} size="sm" className="text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
