'use client';

import { RotateCcw } from 'lucide-react';

import { PageContainer } from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { ErrorState } from '@/components/ui/states';

/**
 * Route-level error boundary.
 *
 * Must be a client component: Next passes a reset function that re-renders the
 * failed segment. The message names what failed and offers the one action that
 * can help, rather than apologising.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageContainer>
      <ErrorState
        title="This page did not load"
        description={
          error.digest
            ? `Something failed while rendering. Reference ${error.digest}.`
            : 'Something failed while rendering this page.'
        }
        action={
          <Button variant="outline" leadingIcon={RotateCcw} onClick={reset}>
            Try again
          </Button>
        }
      />
    </PageContainer>
  );
}
