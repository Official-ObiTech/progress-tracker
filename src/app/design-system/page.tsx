import type { Metadata } from 'next';
import { Plus, Trash2 } from 'lucide-react';

import { ThemeToggle } from '@/components/theme/theme-toggle';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Field,
  Input,
  Label,
  ProgressBar,
  ProgressRing,
  Radio,
  SearchInput,
  SegmentedProgress,
  Select,
  Spinner,
  StatusBadge,
  Switch,
  Textarea,
} from '@/components/ui';
import { STATUSES } from '@/config/status';

/**
 * DESIGN SYSTEM REFERENCE
 *
 * A living style guide, not a product screen. It exists so the system can be
 * reviewed and regression-checked in one place, and so a new developer can see
 * every token and component rendered together.
 *
 * It is excluded from search engines and is safe to delete: nothing in the
 * application imports from it.
 */

export const metadata: Metadata = {
  title: 'Design system',
  robots: { index: false, follow: false },
};

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-border-subtle flex flex-col gap-4 border-t pt-8">
      <div className="flex max-w-prose flex-col gap-1">
        <h2 className="text-h3">{title}</h2>
        <p className="text-small text-muted">{description}</p>
      </div>
      {children}
    </section>
  );
}

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`border-border-subtle h-14 rounded-md border ${className}`}
      />
      <span className="text-caption text-muted">{name}</span>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="page-container flex flex-col gap-[var(--section-gap)] py-10">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex max-w-prose flex-col gap-2">
          <h1 className="text-h1">Design system</h1>
          <p className="text-body text-muted">
            Every token and component in the Progress Tracker, rendered in one
            place. Three colour families carry the whole interface: ink for
            structure, azure for primary action, brass for secondary emphasis.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <Section
        title="Colour"
        description="Ink builds every surface, border and text level. Azure marks the primary path through a screen. Brass carries secondary emphasis and work in flight. Red appears only for destructive actions and blocked work."
      >
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Swatch name="canvas" className="bg-canvas" />
          <Swatch name="surface" className="bg-surface" />
          <Swatch name="surface sunken" className="bg-surface-sunken" />
          <Swatch name="primary" className="bg-primary" />
          <Swatch name="accent" className="bg-accent" />
          <Swatch name="danger" className="bg-danger" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Swatch name="azure 100" className="bg-azure-100" />
          <Swatch name="azure 300" className="bg-azure-300" />
          <Swatch name="azure 500" className="bg-azure-500" />
          <Swatch name="brass 100" className="bg-brass-100" />
          <Swatch name="brass 300" className="bg-brass-300" />
          <Swatch name="brass 600" className="bg-brass-600" />
        </div>
      </Section>

      <Section
        title="Typography"
        description="One family, a 1.2 modular scale, tighter tracking as size grows. Digits are tabular everywhere so percentages do not shift width as they update."
      >
        <div className="flex flex-col gap-3">
          <p className="text-display">Display 44</p>
          <p className="text-h1">Heading 1, 32</p>
          <p className="text-h2">Heading 2, 24</p>
          <p className="text-h3">Heading 3, 20</p>
          <p className="text-h4">Heading 4, 17</p>
          <p className="text-body max-w-prose">
            Body 15. Line length is capped near 70 characters because longer
            measures make it hard for the eye to find the start of the next
            line.
          </p>
          <p className="text-small text-muted">
            Small 14, secondary information
          </p>
          <p className="text-caption text-muted">Caption 13, metadata</p>
          <p className="text-label">Label 13, form labels and controls</p>
        </div>
      </Section>

      <Section
        title="Buttons"
        description="Five variants. One primary per view. Outline is the default for most actions. Loading keeps the button width fixed so the layout does not jump."
      >
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary">Create project</Button>
          <Button variant="secondary">Duplicate</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="ghost">Dismiss</Button>
          <Button variant="destructive" leadingIcon={Trash2}>
            Delete
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" size="sm" leadingIcon={Plus}>
            Small
          </Button>
          <Button variant="primary" size="md" leadingIcon={Plus}>
            Medium
          </Button>
          <Button variant="primary" size="lg" leadingIcon={Plus}>
            Large
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="primary" loading>
            Saving changes
          </Button>
          <Button variant="outline" loading>
            Loading
          </Button>
          <Button
            variant="ghost"
            iconOnly
            leadingIcon={Plus}
            aria-label="Add phase"
          />
          <Spinner />
        </div>
      </Section>

      <Section
        title="Status"
        description="Six states across three colour families. Each is separated by hue, by solid or outline treatment, and by icon shape, so none of them relies on colour alone."
      >
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((status) => (
            <StatusBadge key={status} status={status} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone="neutral">Neutral</Badge>
          <Badge tone="primary">Primary</Badge>
          <Badge tone="accent">Accent</Badge>
          <Badge tone="primary" variant="outline">
            Outline
          </Badge>
        </div>
      </Section>

      <Section
        title="Progress"
        description="Tracks carry faint quarter ticks so a fill can be read as a proportion without finding the number. The segmented bar answers how much is done and what the remainder is doing at the same time."
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <ProgressBar value={72} label="Phase 1 frontend" showLabel />
            <ProgressBar
              value={34}
              label="Phase 2 backend"
              showLabel
              tone="accent"
            />
            <ProgressBar
              value={0}
              label="Phase 3 database"
              showLabel
              tone="neutral"
            />
            <ProgressBar value={0} label="Deploying" showLabel indeterminate />
            <ProgressBar
              value={55}
              label="Compact, no ticks"
              size="sm"
              ticks={false}
            />
          </div>

          <div className="flex flex-wrap items-center gap-8">
            <ProgressRing value={68} label="Overall completion" />
            <ProgressRing
              value={41}
              label="This week"
              size={72}
              tone="accent"
            />
          </div>
        </div>

        <SegmentedProgress
          label="Task breakdown"
          segments={[
            { status: 'completed', count: 18 },
            { status: 'in_progress', count: 5 },
            { status: 'needs_review', count: 3 },
            { status: 'blocked', count: 2 },
            { status: 'not_started', count: 9 },
          ]}
        />
      </Section>

      <Section
        title="Cards"
        description="Bordered and flat by default. Elevation is reserved for content that must separate from a busy background, and shadow for things that genuinely float."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div>
                <CardTitle>Flat</CardTitle>
                <CardDescription>The default card</CardDescription>
              </div>
              <StatusBadge status="in_progress" compact />
            </CardHeader>
            <CardContent>
              <ProgressBar value={62} label="Progress" />
            </CardContent>
          </Card>

          <Card elevation="raised">
            <CardHeader>
              <div>
                <CardTitle>Raised</CardTitle>
                <CardDescription>Separates from busy content</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-small text-muted">
                Uses the smallest shadow in the scale.
              </p>
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
                <CardTitle>Floating</CardTitle>
                <CardDescription>Overlays only</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-small text-muted">
                Also shows the interactive hover state.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section
        title="Forms"
        description="Labels, helper text and validation messages wire themselves to the control by id. Helper text is replaced by the error rather than shown alongside it."
      >
        <div className="grid max-w-3xl gap-5 md:grid-cols-2">
          <Field description="Shown on the dashboard." required>
            <Label>Project name</Label>
            <Input placeholder="Progress Tracker" />
          </Field>

          <Field error="Pick a date in the future.">
            <Label>Target date</Label>
            <Input type="date" defaultValue="2020-01-01" />
          </Field>

          <Field>
            <Label>Phase</Label>
            <Select defaultValue="frontend">
              <option value="frontend">Frontend foundation</option>
              <option value="backend">Backend</option>
              <option value="database">Database</option>
            </Select>
          </Field>

          <Field>
            <Label>Search</Label>
            <SearchInput placeholder="Find a task" />
          </Field>

          <Field description="Markdown is supported." className="md:col-span-2">
            <Label>Notes</Label>
            <Textarea placeholder="What changed in this session?" />
          </Field>

          <Field>
            <Label>Disabled</Label>
            <Input disabled defaultValue="Not editable" />
          </Field>
        </div>

        <div className="flex flex-col gap-1">
          <Checkbox
            label="Require verification"
            description="Completed work needs a second pass."
            defaultChecked
          />
          <Checkbox label="Partially selected" indeterminate />
          <Checkbox label="Disabled option" disabled />
          <Radio name="demo-radio" label="Track by task" defaultChecked />
          <Radio name="demo-radio" label="Track by session" />
          <Switch
            label="Email notifications"
            description="Applies immediately."
            defaultChecked
          />
        </div>
      </Section>

      <Section
        title="Radius, shadow and focus"
        description="Radius scales with the element rather than being one value everywhere. Focus rings are keyboard only, applied globally so no component can forget them. Tab through this page to see them."
      >
        <div className="flex flex-wrap gap-3">
          {(
            [
              ['xs', 'rounded-xs'],
              ['sm', 'rounded-sm'],
              ['md', 'rounded-md'],
              ['lg', 'rounded-lg'],
              ['xl', 'rounded-xl'],
              ['full', 'rounded-full'],
            ] as const
          ).map(([name, cls]) => (
            <div key={name} className="flex flex-col items-center gap-1.5">
              <div
                className={`border-border-default bg-surface h-14 w-14 border ${cls}`}
              />
              <span className="text-caption text-muted">{name}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4">
          {(['shadow-xs', 'shadow-sm', 'shadow-md', 'shadow-lg'] as const).map(
            (s) => (
              <div key={s} className="flex flex-col items-center gap-1.5">
                <div className={`bg-surface h-14 w-24 rounded-lg ${s}`} />
                <span className="text-caption text-muted">{s}</span>
              </div>
            ),
          )}
        </div>
      </Section>
    </main>
  );
}
