import { AppShell } from '@/components/layout';

/**
 * Layout for every screen inside the application shell.
 *
 * The (app) route group wraps pages in the shell without adding a path
 * segment, so /dashboard stays /dashboard. Screens that must not have the
 * shell, such as a future sign-in page or the design system reference, simply
 * live outside this group.
 */
export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}
