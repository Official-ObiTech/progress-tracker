'use client';

import * as React from 'react';
import {
  Archive,
  CircleCheck,
  FolderKanban,
  ListChecks,
  MoreHorizontal,
  Pencil,
  Plus,
  Trash2,
  TrendingUp,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Avatar, AvatarGroup } from '@/components/ui/primitives/avatar';
import { Badge } from '@/components/ui/primitives/badge';
import { Button } from '@/components/ui/primitives/button';
import { Checkbox, Radio, Switch } from '@/components/ui/primitives/choice';
import { Divider } from '@/components/ui/primitives/divider';
import { IconButton } from '@/components/ui/primitives/icon-button';
import { Input, Select, Textarea } from '@/components/ui/primitives/input';
import { Skeleton } from '@/components/ui/primitives/skeleton';
import { Spinner } from '@/components/ui/primitives/spinner';
import { Alert } from '@/components/ui/composite/alert';
import { ConfirmDialog } from '@/components/ui/composite/confirm-dialog';
import { Dialog } from '@/components/ui/composite/dialog';
import { DropdownMenu } from '@/components/ui/composite/dropdown-menu';
import { EmptyState } from '@/components/ui/composite/empty-state';
import { ErrorState } from '@/components/ui/composite/error-state';
import { FilterBar } from '@/components/ui/composite/filter-bar';
import { Field, Label } from '@/components/ui/composite/form-field';
import { LoadingState } from '@/components/ui/composite/loading-state';
import { Pagination } from '@/components/ui/composite/pagination';
import { SearchInput } from '@/components/ui/composite/search-input';
import { TabPanel, Tabs } from '@/components/ui/composite/tabs';
import { Tooltip } from '@/components/ui/composite/tooltip';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/data/card';
import { DataTable, type Column } from '@/components/ui/data/data-table';
import {
  List,
  ListItem,
  ListItemDescription,
  ListItemTitle,
} from '@/components/ui/data/list';
import { ProgressBar, ProgressRing } from '@/components/ui/data/progress';
import { StatCard } from '@/components/ui/data/stat-card';
import { StatusBadge } from '@/components/ui/data/status-badge';
import { STATUSES } from '@/config/status';

/**
 * COMPONENT LIBRARY REFERENCE
 *
 * Development route, not part of the product. Every reusable component is
 * rendered here so changes can be reviewed and regressions spotted in one
 * place.
 *
 * The sample content below is DEMO DATA ONLY. It is not the application's
 * domain model, and nothing here should be copied into a feature screen.
 */

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-border-subtle flex flex-col gap-4 border-t pt-8">
      <div className="flex max-w-prose flex-col gap-1">
        <h2 className="text-h3">{title}</h2>
        <p className="text-small text-muted">{note}</p>
      </div>
      {children}
    </section>
  );
}

interface DemoRow {
  id: string;
  name: string;
  owner: string;
  tasks: number;
}

const demoRows: DemoRow[] = [
  { id: '1', name: 'Sample row one', owner: 'A. Person', tasks: 12 },
  { id: '2', name: 'Sample row two', owner: 'B. Person', tasks: 4 },
  { id: '3', name: 'Sample row three', owner: 'C. Person', tasks: 27 },
];

const demoPeople = [
  { name: 'Ada Lovelace' },
  { name: 'Grace Hopper' },
  { name: 'Alan Turing' },
  { name: 'Katherine Johnson' },
  { name: 'Edsger Dijkstra' },
];

export default function ComponentsPage() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [tab, setTab] = React.useState('overview');
  const [page, setPage] = React.useState(3);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [sort, setSort] = React.useState<{
    columnId: string;
    direction: 'asc' | 'desc';
  }>({ columnId: 'name', direction: 'asc' });
  const [alertVisible, setAlertVisible] = React.useState(true);

  const columns: Column<DemoRow>[] = [
    { id: 'name', header: 'Name', cell: (row) => row.name, sortable: true },
    {
      id: 'owner',
      header: 'Owner',
      cell: (row) => row.owner,
      hideOnMobile: true,
    },
    {
      id: 'tasks',
      header: 'Tasks',
      cell: (row) => row.tasks,
      align: 'end',
      sortable: true,
    },
  ];

  return (
    <main className="page-container flex flex-col gap-[var(--section-gap)] py-10">
      <header className="flex max-w-prose flex-col gap-2">
        <h1 className="text-h1">Component library</h1>
        <p className="text-body text-muted">
          Every reusable component, rendered together. Sample content here is
          for inspection only and is not application data.
        </p>
      </header>

      <Section
        title="Buttons"
        note="Five variants, three sizes. One primary per view. Loading keeps the width fixed so nothing shifts."
      >
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive" leadingIcon={Trash2}>
            Destructive
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" leadingIcon={Plus}>
            Small
          </Button>
          <Button size="md" leadingIcon={Plus}>
            Medium
          </Button>
          <Button size="lg" leadingIcon={Plus}>
            Large
          </Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <IconButton icon={Pencil} label="Edit" />
          <IconButton icon={Trash2} label="Delete" variant="outline" />
          <IconButton icon={Archive} label="Archive" variant="ghost" disabled />
          <Tooltip content="Tooltips supplement labels, they never replace them">
            <Button variant="outline">Hover or focus me</Button>
          </Tooltip>
        </div>
      </Section>

      <Section
        title="Form controls"
        note="Field wires label, helper text and validation to the control automatically. Helper text is replaced by an error rather than shown beside it."
      >
        <div className="grid max-w-3xl gap-5 md:grid-cols-2">
          <Field description="Helper text sits here." required>
            <Label>Text input</Label>
            <Input placeholder="Placeholder" />
          </Field>

          <Field error="This message replaces the helper text.">
            <Label>Invalid input</Label>
            <Input defaultValue="Not valid" />
          </Field>

          <Field>
            <Label>Select</Label>
            <Select defaultValue="a">
              <option value="a">First option</option>
              <option value="b">Second option</option>
            </Select>
          </Field>

          <Field>
            <Label>Search</Label>
            <SearchInput placeholder="Search" />
          </Field>

          <Field className="md:col-span-2">
            <Label>Textarea</Label>
            <Textarea placeholder="Longer text" />
          </Field>

          <Field>
            <Label>Read only</Label>
            <Input readOnly defaultValue="Read only value" />
          </Field>

          <Field>
            <Label>Disabled</Label>
            <Input disabled defaultValue="Disabled value" />
          </Field>
        </div>

        <div className="flex flex-col gap-1">
          <Checkbox
            label="Checkbox"
            description="With a description."
            defaultChecked
          />
          <Checkbox label="Indeterminate" indeterminate />
          <Radio name="demo" label="Radio one" defaultChecked />
          <Radio name="demo" label="Radio two" />
          <Switch
            label="Switch"
            description="Applies immediately."
            defaultChecked
          />
        </div>
      </Section>

      <Section
        title="Cards and statistics"
        note="Cards are bordered and flat by default. StatCard conveys trend direction by arrow and text, not colour alone."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Projects"
            value={12}
            icon={FolderKanban}
            change={8}
            detail="vs last month"
          />
          <StatCard
            label="Completed"
            value="68%"
            icon={CircleCheck}
            change={12}
          />
          <StatCard
            label="Blocked"
            value={3}
            icon={ListChecks}
            change={25}
            increaseIsGood={false}
          />
          <StatCard
            label="Velocity"
            value="4.2"
            icon={TrendingUp}
            detail="tasks per day"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Flat card</CardTitle>
                <CardDescription>The default</CardDescription>
              </div>
              <StatusBadge status="in_progress" compact />
            </CardHeader>
            <CardContent>
              <ProgressBar value={62} label="Sample progress" />
            </CardContent>
          </Card>

          <Card elevation="raised">
            <CardHeader>
              <div>
                <CardTitle>Raised card</CardTitle>
                <CardDescription>With a footer</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-small text-muted">Content area.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="ghost">
                Cancel
              </Button>
              <Button size="sm" variant="primary">
                Save
              </Button>
            </CardFooter>
          </Card>

          <Card elevation="floating" interactive>
            <CardHeader>
              <div>
                <CardTitle>Floating card</CardTitle>
                <CardDescription>Interactive hover</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-small text-muted">For overlays only.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        title="Badges, status and avatars"
        note="Six statuses across three colour families, separated by icon and fill treatment as well as hue."
      >
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((status) => (
            <StatusBadge key={status} status={status} />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="neutral">Neutral</Badge>
          <Badge tone="primary">Primary</Badge>
          <Badge tone="accent">Accent</Badge>
          <Badge tone="primary" variant="outline">
            Outline
          </Badge>
          <Divider orientation="vertical" className="h-6" />
          <Avatar name="Ada Lovelace" size="xs" />
          <Avatar name="Grace Hopper" size="sm" />
          <Avatar name="Alan Turing" size="md" />
          <Avatar name="Katherine Johnson" size="lg" />
          <AvatarGroup people={demoPeople} />
        </div>
      </Section>

      <Section
        title="Progress"
        note="Tracks carry faint quarter ticks so a fill reads as a proportion without finding the number."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <ProgressBar value={72} label="Primary tone" showLabel />
            <ProgressBar
              value={34}
              label="Accent tone"
              showLabel
              tone="accent"
            />
            <ProgressBar
              value={0}
              label="Indeterminate"
              showLabel
              indeterminate
            />
            <ProgressBar value={55} label="Compact" size="sm" ticks={false} />
          </div>
          <div className="flex flex-wrap items-center gap-8">
            <ProgressRing value={68} label="Overall" />
            <ProgressRing
              value={41}
              label="This week"
              size={72}
              tone="accent"
            />
          </div>
        </div>
      </Section>

      <Section
        title="Overlays"
        note="Dialogs use the native element, so focus trapping and Escape come from the browser. The menu implements the ARIA pattern: arrows to move, Home and End to jump, Escape to close."
      >
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => setDialogOpen(true)}>
            Open dialog
          </Button>
          <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
            Open confirmation
          </Button>

          <DropdownMenu
            trigger={(props) => (
              <Button
                {...props}
                variant="outline"
                trailingIcon={MoreHorizontal}
              >
                Actions menu
              </Button>
            )}
            items={[
              { id: 'edit', label: 'Edit', icon: Pencil },
              {
                id: 'archive',
                label: 'Archive',
                icon: Archive,
                disabled: true,
              },
              { id: 'selected', label: 'Currently selected', selected: true },
              {
                id: 'delete',
                label: 'Delete',
                icon: Trash2,
                destructive: true,
              },
            ]}
          />
        </div>

        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Dialog title"
          description="Docks to the bottom on phones and centres from the small breakpoint up."
          actions={
            <>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setDialogOpen(false)}>
                Save changes
              </Button>
            </>
          }
        >
          <p className="text-small text-muted">
            Try Escape, Tab cycling and clicking the backdrop.
          </p>
        </Dialog>

        <ConfirmDialog
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => setConfirmOpen(false)}
          title="Delete this item?"
          description="This cannot be undone. Cancel is focused by default so the safe path is the easy one."
          confirmLabel="Delete item"
          destructive
        />
      </Section>

      <Section
        title="Tabs"
        note="Only the selected tab is in the tab order, so one Tab press moves past the whole list to the panel."
      >
        <Tabs
          value={tab}
          onValueChange={setTab}
          items={[
            { id: 'overview', label: 'Overview' },
            { id: 'phases', label: 'Phases', badge: 4 },
            { id: 'tasks', label: 'Tasks', badge: 27 },
            { id: 'archived', label: 'Archived', disabled: true },
          ]}
        >
          <TabPanel id="overview" value={tab}>
            <p className="text-small text-muted">Overview panel content.</p>
          </TabPanel>
          <TabPanel id="phases" value={tab}>
            <p className="text-small text-muted">Phases panel content.</p>
          </TabPanel>
          <TabPanel id="tasks" value={tab}>
            <p className="text-small text-muted">Tasks panel content.</p>
          </TabPanel>
        </Tabs>
      </Section>

      <Section
        title="Search and filters"
        note="Active filters appear as removable chips rather than hidden inside dropdowns, so nobody concludes their data vanished."
      >
        <FilterBar
          active={[
            { id: 'status', field: 'Status', value: 'In progress' },
            { id: 'owner', field: 'Owner', value: 'A. Person' },
          ]}
          onRemoveFilter={() => {}}
          onClearAll={() => {}}
        >
          <SearchInput placeholder="Search" className="w-full sm:w-64" />
          <Select size="sm" defaultValue="all" aria-label="Status filter">
            <option value="all">All statuses</option>
            <option value="active">In progress</option>
          </Select>
        </FilterBar>
      </Section>

      <Section
        title="Data table"
        note="Below the medium breakpoint each row becomes a stacked card with the column header as a label, rather than scrolling sideways and hiding the columns that give numbers meaning."
      >
        <DataTable
          columns={columns}
          rows={demoRows}
          getRowId={(row) => row.id}
          caption="Demo table"
          sort={sort}
          onSortChange={setSort}
          selectedIds={selected}
          onSelectionChange={setSelected}
        />
        <Pagination
          page={page}
          pageCount={8}
          onPageChange={setPage}
          totalItems={78}
          itemLabel="rows"
        />
      </Section>

      <Section
        title="Lists"
        note="Generic list primitives. Task and activity rows are composed from these in their own segments, once a domain model exists."
      >
        <Card className="px-[var(--card-padding)]">
          <List>
            {demoRows.map((row) => (
              <ListItem
                key={row.id}
                interactive
                leading={<Avatar name={row.owner} size="sm" />}
                trailing={
                  <>
                    <StatusBadge status="in_progress" compact />
                    <IconButton
                      icon={MoreHorizontal}
                      label="Row actions"
                      size="sm"
                    />
                  </>
                }
              >
                <ListItemTitle>{row.name}</ListItemTitle>
                <ListItemDescription>
                  {row.tasks} sample items
                </ListItemDescription>
              </ListItem>
            ))}
          </List>
        </Card>
      </Section>

      <Section
        title="Feedback"
        note="Four tones across three colours. Errors interrupt with an alert role, everything else waits politely."
      >
        <div className="flex flex-col gap-3">
          <Alert tone="info" title="Information">
            Neutral context that does not require action.
          </Alert>
          <Alert tone="success" title="Saved">
            A check icon carries the meaning, not just the colour.
          </Alert>
          <Alert tone="warning" title="Check this">
            Something needs attention but nothing failed.
          </Alert>
          {alertVisible && (
            <Alert
              tone="error"
              title="Could not save"
              onDismiss={() => setAlertVisible(false)}
            >
              Say what failed and what to do next, never just an apology.
            </Alert>
          )}
        </div>
      </Section>

      <Section
        title="Loading, empty and error"
        note="Skeletons hold layout and beat spinners whenever the result shape is known."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="flex flex-col gap-3">
            <LoadingState rows={2} />
            <div className="flex items-center gap-3">
              <Spinner />
              <Skeleton className="h-4 flex-1" />
            </div>
          </div>

          <EmptyState
            title="Nothing here yet"
            description="An empty screen is an invitation to act."
            action={
              <Button variant="primary" size="sm" leadingIcon={Plus}>
                Create the first one
              </Button>
            }
          />

          <ErrorState
            title="This did not load"
            description="Explain the failure and offer the action that helps."
            action={
              <Button variant="outline" size="sm">
                Try again
              </Button>
            }
          />
        </div>
      </Section>

      <Section
        title="Dividers"
        note="Rendered as separator roles so the break in content is announced."
      >
        <div className={cn('flex max-w-md flex-col gap-4')}>
          <Divider />
          <Divider label="or" />
        </div>
      </Section>
    </main>
  );
}
