import { PageContainer, PageHeader } from '@/components/layout';
import { EmptyState } from '@/components/ui/states';
import { Icon } from '@/components/ui/icon';
import type { NavItem } from '@/config/navigation';

/**
 * TEMPORARY.
 *
 * Every section route renders this until its feature segment is built. It
 * exists only so navigation, active states and the shell can be exercised
 * against real routes.
 *
 * Each of these pages is replaced by its real implementation in a later
 * segment. Delete this file once the last one is done.
 */
export function PlaceholderPage({ item }: { item: NavItem }) {
  return (
    <PageContainer>
      <PageHeader title={item.label} description={item.description} />
      <EmptyState
        icon={<Icon icon={item.icon} size="lg" />}
        title={`${item.label} is not built yet`}
        description="The application shell is in place. This section arrives in a later segment."
      />
    </PageContainer>
  );
}
