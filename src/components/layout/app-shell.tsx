import { Header } from './header';
import { Sidebar } from './sidebar';

/**
 * Application frame shared by every signed-in screen.
 *
 * Layout is a flex row: a sticky sidebar column beside a content column. The
 * `min-w-0` on the content column is essential rather than cosmetic. A flex
 * child defaults to min-width:auto, so a wide table or a long unbroken string
 * would force the column past the viewport and produce horizontal scroll on
 * the whole page.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        {/* Focus target for the skip link in the root layout. tabIndex -1
            lets it receive programmatic focus without joining the tab order. */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 focus:outline-none"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
