import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MoreHorizontal, Trash2 } from 'lucide-react';

import { Button } from './primitives/button';
import { IconButton } from './primitives/icon-button';
import { Avatar, getInitials } from './primitives/avatar';
import { Checkbox } from './primitives/choice';
import { Input } from './primitives/input';
import { Field, Label } from './composite/form-field';
import { DropdownMenu } from './composite/dropdown-menu';
import { Tabs, TabPanel } from './composite/tabs';
import { Dialog } from './composite/dialog';
import { Alert } from './composite/alert';
import { Pagination } from './composite/pagination';
import { ProgressBar } from './data/progress';
import { StatusBadge } from './data/status-badge';
import { DataTable, type Column } from './data/data-table';

describe('Button', () => {
  it('renders its label and fires onClick', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Create project</Button>);

    await user.click(screen.getByRole('button', { name: 'Create project' }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is activated by keyboard', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onClick).toHaveBeenCalled();
  });

  it('blocks interaction while loading and exposes aria-busy', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Saving
      </Button>,
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('keeps its label in the DOM while loading so width does not change', () => {
    render(<Button loading>Saving changes</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Saving changes');
  });

  it('does not fire when disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Delete
      </Button>,
    );

    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('IconButton', () => {
  it('always has an accessible name', () => {
    render(<IconButton icon={Trash2} label="Delete project" />);
    expect(
      screen.getByRole('button', { name: 'Delete project' }),
    ).toBeInTheDocument();
  });

  it('shows its tooltip on keyboard focus, not just hover', async () => {
    const user = userEvent.setup();
    render(<IconButton icon={Trash2} label="Delete project" />);

    expect(screen.getByRole('tooltip', { hidden: true })).not.toBeVisible();
    await user.tab();
    expect(screen.getByRole('tooltip')).toBeVisible();
  });
});

describe('Avatar', () => {
  it('derives initials from first and last name', () => {
    expect(getInitials('Ada King Lovelace')).toBe('AL');
    expect(getInitials('Prince')).toBe('PR');
    expect(getInitials('')).toBe('?');
  });

  it('exposes the name to assistive technology', () => {
    render(<Avatar name="Ada Lovelace" />);
    expect(
      screen.getByRole('img', { name: 'Ada Lovelace' }),
    ).toBeInTheDocument();
  });
});

describe('Field', () => {
  it('links label, helper text and control', () => {
    render(
      <Field description="Shown on the dashboard." required>
        <Label>Project name</Label>
        <Input />
      </Field>,
    );

    const input = screen.getByLabelText(/Project name/);
    expect(input).toBeRequired();
    expect(input).toHaveAccessibleDescription('Shown on the dashboard.');
  });

  it('marks the control invalid and replaces helper text with the error', () => {
    render(
      <Field description="Helper text" error="Pick a date in the future.">
        <Label>Target date</Label>
        <Input />
      </Field>,
    );

    const input = screen.getByLabelText('Target date');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Pick a date in the future.');
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
  });
});

describe('Checkbox', () => {
  it('supports the indeterminate DOM property', () => {
    render(<Checkbox label="Select all" indeterminate />);
    const box = screen.getByRole('checkbox') as HTMLInputElement;
    expect(box.indeterminate).toBe(true);
  });

  it('toggles with the keyboard', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Require verification" />);

    await user.tab();
    await user.keyboard(' ');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});

const menuItems = [
  { id: 'edit', label: 'Edit' },
  { id: 'duplicate', label: 'Duplicate', disabled: true },
  { id: 'delete', label: 'Delete', destructive: true },
];

describe('DropdownMenu', () => {
  function renderMenu(onSelect = vi.fn()) {
    render(
      <DropdownMenu
        items={menuItems.map((item) => ({ ...item, onSelect }))}
        trigger={(props) => (
          <Button {...props} leadingIcon={MoreHorizontal}>
            Actions
          </Button>
        )}
      />,
    );
    return onSelect;
  }

  it('opens on ArrowDown and focuses the first item', async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.tab();
    await user.keyboard('{ArrowDown}');

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
  });

  it('skips disabled items when arrowing', async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.tab();
    await user.keyboard('{ArrowDown}{ArrowDown}');

    // Duplicate is disabled, so focus should land on Delete.
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();
  });

  it('wraps from last to first', async () => {
    const user = userEvent.setup();
    renderMenu();

    await user.tab();
    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    renderMenu();

    const trigger = screen.getByRole('button', { name: 'Actions' });
    await user.click(trigger);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('reports expanded state to assistive technology', async () => {
    const user = userEvent.setup();
    renderMenu();

    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('calls onSelect and closes', async () => {
    const user = userEvent.setup();
    const onSelect = renderMenu();

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));

    expect(onSelect).toHaveBeenCalled();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});

describe('Tabs', () => {
  function TabsHarness() {
    const [value, setValue] = React.useState('overview');
    return (
      <Tabs
        value={value}
        onValueChange={setValue}
        items={[
          { id: 'overview', label: 'Overview' },
          { id: 'phases', label: 'Phases' },
          { id: 'archived', label: 'Archived', disabled: true },
        ]}
      >
        <TabPanel id="overview" value={value}>
          Overview content
        </TabPanel>
        <TabPanel id="phases" value={value}>
          Phases content
        </TabPanel>
      </Tabs>
    );
  }

  it('only the selected tab is in the tab order', () => {
    render(<TabsHarness />);
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute(
      'tabindex',
      '0',
    );
    expect(screen.getByRole('tab', { name: 'Phases' })).toHaveAttribute(
      'tabindex',
      '-1',
    );
  });

  it('moves between tabs with arrow keys and shows the matching panel', async () => {
    const user = userEvent.setup();
    render(<TabsHarness />);

    expect(screen.getByRole('tabpanel')).toHaveTextContent('Overview content');

    await user.tab();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'Phases' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Phases content');
  });

  it('skips disabled tabs and wraps', async () => {
    const user = userEvent.setup();
    render(<TabsHarness />);

    await user.tab();
    await user.keyboard('{ArrowLeft}');

    // Archived is disabled, so ArrowLeft from Overview wraps to Phases.
    expect(screen.getByRole('tab', { name: 'Phases' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
  });
});

describe('Dialog', () => {
  it('exposes its title and description as the accessible name', () => {
    render(
      <Dialog
        open
        onClose={vi.fn()}
        title="Delete project"
        description="Cannot be undone."
      >
        Body
      </Dialog>,
    );

    const dialog = screen.getByRole('dialog', { hidden: true });
    expect(dialog).toHaveAccessibleName('Delete project');
    expect(dialog).toHaveAccessibleDescription('Cannot be undone.');
  });

  it('closes via the close button', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="Settings" />);

    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(onClose).toHaveBeenCalled();
  });
});

describe('Alert', () => {
  it('uses assertive alert role for errors and polite status otherwise', () => {
    const { rerender } = render(<Alert tone="error">Upload failed</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();

    rerender(<Alert tone="info">Heads up</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});

describe('ProgressBar', () => {
  it('exposes its value to assistive technology', () => {
    render(<ProgressBar value={72} label="Phase 1" />);
    const bar = screen.getByRole('progressbar', { name: 'Phase 1' });
    expect(bar).toHaveAttribute('aria-valuenow', '72');
  });

  it('clamps out of range values', () => {
    render(<ProgressBar value={140} label="Overflow" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100',
    );
  });

  it('omits valuenow when indeterminate, which is how ARIA says unknown', () => {
    render(<ProgressBar value={0} label="Deploying" indeterminate />);
    expect(screen.getByRole('progressbar')).not.toHaveAttribute(
      'aria-valuenow',
    );
  });
});

describe('StatusBadge', () => {
  it('renders readable text rather than relying on colour', () => {
    render(<StatusBadge status="needs_review" />);
    expect(screen.getByText('Needs review')).toBeInTheDocument();
  });

  it('keeps an accessible name when compact', () => {
    render(<StatusBadge status="blocked" compact />);
    expect(screen.getByText('Blocked')).toBeInTheDocument();
  });
});

describe('Pagination', () => {
  it('renders nothing for a single page', () => {
    const { container } = render(
      <Pagination page={1} pageCount={1} onPageChange={vi.fn()} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('disables previous on the first page', () => {
    render(<Pagination page={1} pageCount={5} onPageChange={vi.fn()} />);
    expect(
      screen.getByRole('button', { name: 'Previous page' }),
    ).toBeDisabled();
  });

  it('marks the current page with aria-current', () => {
    render(<Pagination page={3} pageCount={5} onPageChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Page 3' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });
});

interface Row {
  id: string;
  name: string;
  count: number;
}

const columns: Column<Row>[] = [
  { id: 'name', header: 'Name', cell: (row) => row.name, sortable: true },
  { id: 'count', header: 'Count', cell: (row) => row.count, align: 'end' },
];

const rows: Row[] = [
  { id: '1', name: 'Alpha', count: 3 },
  { id: '2', name: 'Beta', count: 7 },
];

describe('DataTable', () => {
  it('renders a caption and rows', () => {
    render(
      <DataTable
        columns={columns}
        rows={rows}
        getRowId={(r) => r.id}
        caption="Projects"
      />,
    );

    const table = screen.getByRole('table', { name: 'Projects' });
    expect(within(table).getByText('Alpha')).toBeInTheDocument();
  });

  it('reports sort state through aria-sort', async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    render(
      <DataTable
        columns={columns}
        rows={rows}
        getRowId={(r) => r.id}
        caption="Projects"
        sort={{ columnId: 'name', direction: 'asc' }}
        onSortChange={onSortChange}
      />,
    );

    expect(screen.getByRole('columnheader', { name: /Name/ })).toHaveAttribute(
      'aria-sort',
      'ascending',
    );

    await user.click(screen.getByRole('button', { name: /Name/ }));
    expect(onSortChange).toHaveBeenCalledWith({
      columnId: 'name',
      direction: 'desc',
    });
  });

  it('shows the empty slot when there are no rows', () => {
    render(
      <DataTable
        columns={columns}
        rows={[]}
        getRowId={(r) => r.id}
        caption="Projects"
        empty={<p>No projects yet</p>}
      />,
    );
    expect(screen.getByText('No projects yet')).toBeInTheDocument();
  });

  it('announces the loading state', () => {
    render(
      <DataTable
        columns={columns}
        rows={[]}
        getRowId={(r) => r.id}
        caption="Projects"
        loading
      />,
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
