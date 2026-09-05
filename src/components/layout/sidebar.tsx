import { cn } from '@/lib/utils';
import { Brand } from './brand';
import { SidebarNav } from './sidebar-nav';
import { UserMenu } from './user-menu';

/**
 * Desktop and tablet sidebar.
 *
 * Three states, all handled in CSS with no JavaScript and no stored state:
 *
 *   below md   hidden entirely, navigation moves to the mobile drawer
 *   md to lg   64px icon rail, labels available to screen readers only
 *   lg and up  256px full sidebar
 *
 * The tablet rail is a deliberate choice rather than a shrunken desktop
 * sidebar. At that width a full sidebar takes roughly a third of the viewport,
 * which leaves the content cramped, but hiding navigation entirely wastes the
 * space that is there.
 */
export function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      // Sticky rather than fixed, so it participates in the flex row and the
      // main content does not need a matching margin to avoid sitting under it.
      className={cn(
        'sticky top-0 hidden h-dvh shrink-0 md:flex',
        'border-border-subtle bg-surface flex-col border-r',
        'w-16 lg:w-64',
        className,
      )}
    >
      <div className="border-border-subtle flex h-14 shrink-0 items-center border-b px-3 lg:px-4">
        <Brand collapsed className="lg:hidden" />
        <Brand className="hidden lg:flex" />
      </div>

      {/* Scrolls independently. If the nav ever outgrows the viewport, the
          brand and user menu stay put while only this region moves. */}
      <nav
        aria-label="Main"
        className="flex-1 overflow-y-auto px-2 py-3 lg:px-3"
      >
        <SidebarNav group="primary" collapsed className="lg:hidden" />
        <SidebarNav group="primary" className="hidden lg:flex" />
      </nav>

      <div className="border-border-subtle shrink-0 border-t px-2 py-3 lg:px-3">
        <nav aria-label="Secondary" className="mb-2">
          <SidebarNav group="secondary" collapsed className="lg:hidden" />
          <SidebarNav group="secondary" className="hidden lg:flex" />
        </nav>
        <UserMenu collapsed className="lg:hidden" />
        <UserMenu className="hidden lg:flex" />
      </div>
    </aside>
  );
}
