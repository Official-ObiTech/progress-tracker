import {
  Activity,
  CircleHelp,
  FolderKanban,
  LayoutDashboard,
  ListChecks,
  Settings,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

/**
 * Application navigation.
 *
 * Single source of truth for the sidebar, the mobile drawer and the header
 * breadcrumb. Adding a section means editing this file only: nothing else
 * hardcodes a route or a label.
 */

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Short sentence used by the placeholder pages and for tooltips. */
  description: string;
}

/** Main sections. Order is the order shown in the sidebar. */
export const primaryNav: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overall progress across every project.',
  },
  {
    label: 'Projects',
    href: '/projects',
    icon: FolderKanban,
    description: 'Every project and its phases.',
  },
  {
    label: 'Progress',
    href: '/progress',
    icon: TrendingUp,
    description: 'How completion is trending over time.',
  },
  {
    label: 'Tasks',
    href: '/tasks',
    icon: ListChecks,
    description: 'Work broken down to the task level.',
  },
  {
    label: 'Activity',
    href: '/activity',
    icon: Activity,
    description: 'Recent sessions and recorded changes.',
  },
];

/** Pinned to the bottom of the sidebar, away from the main sections. */
export const secondaryNav: NavItem[] = [
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'Workspace and account preferences.',
  },
  {
    label: 'Help',
    href: '/help',
    icon: CircleHelp,
    description: 'Documentation and support.',
  },
];

export const allNav: NavItem[] = [...primaryNav, ...secondaryNav];

/**
 * Finds the nav entry for a pathname.
 *
 * Matches the section prefix rather than the exact path, so `/projects/42`
 * still highlights Projects. The root check prevents `/` matching everything.
 */
export function findNavItem(pathname: string): NavItem | undefined {
  return allNav.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
}

export function isNavItemActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
