import { redirect } from 'next/navigation';

/**
 * The application starts at the dashboard.
 *
 * A redirect rather than duplicating the dashboard here, so there is one
 * canonical URL for that screen.
 */
export default function RootPage() {
  redirect('/dashboard');
}
