import Link from 'next/link';

import { buttonClasses } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-[var(--page-gutter)] text-center">
      <p className="text-h2">Page not found</p>
      <p className="text-body text-muted max-w-prose">
        That address does not match anything in this workspace. It may have been
        moved or the link may be incomplete.
      </p>
      <Link href="/dashboard" className={buttonClasses({ variant: 'primary' })}>
        Go to dashboard
      </Link>
    </div>
  );
}
