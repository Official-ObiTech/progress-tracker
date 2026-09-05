import { PageContainer } from '@/components/layout';
import { Skeleton } from '@/components/ui';

/**
 * Route-level loading fallback.
 *
 * Next renders this automatically while a segment loads. It mirrors the shape
 * of a page header plus content, so the transition does not jump.
 */
export default function Loading() {
  return (
    <PageContainer>
      <span className="sr-only-text" role="status">
        Loading page
      </span>
      <div className="flex flex-col gap-3 pb-6">
        <Skeleton className="h-9 w-56" />
        <Skeleton className="h-5 w-full max-w-md" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    </PageContainer>
  );
}
