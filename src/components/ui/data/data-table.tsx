'use client';

import * as React from 'react';
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Checkbox } from '../primitives/choice';
import { Icon } from '../primitives/icon';
import { Skeleton } from '../primitives/skeleton';

export type SortDirection = 'asc' | 'desc';

export interface Column<T> {
  /** Must be unique within the table. */
  id: string;
  header: string;
  /** Renders the cell. Receives the whole row so it can combine fields. */
  cell: (row: T) => React.ReactNode;
  sortable?: boolean;
  /** Right-align numeric columns so digits line up. */
  align?: 'start' | 'end';
  /** Hides the column below the md breakpoint. */
  hideOnMobile?: boolean;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  /** Stable identity for each row. Required for selection and React keys. */
  getRowId: (row: T) => string;
  caption: string;
  loading?: boolean;
  /** Shown when there are no rows and loading is false. */
  empty?: React.ReactNode;
  sort?: { columnId: string; direction: SortDirection };
  onSortChange?: (sort: { columnId: string; direction: SortDirection }) => void;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  onRowClick?: (row: T) => void;
  className?: string;
}

/**
 * Tabular data.
 *
 * Generic over the row type, so consumers get full type safety on `cell`
 * without casting. It holds no data logic: sorting and selection are reported
 * through callbacks and the owning screen decides what happens, which keeps it
 * usable for both client-side and future server-side paging.
 *
 * Responsive strategy is a real breakpoint switch rather than a horizontal
 * scrollbar. Below `md` each row becomes a stacked card with the column header
 * as a label, because a table scrolled sideways on a phone hides the columns
 * that give the numbers meaning. Columns marked `hideOnMobile` drop out
 * entirely.
 *
 * Sorting uses aria-sort on the header cell, which is how a screen reader
 * announces the current order.
 */
export function DataTable<T>({
  columns,
  rows,
  getRowId,
  caption,
  loading = false,
  empty,
  sort,
  onSortChange,
  selectedIds,
  onSelectionChange,
  onRowClick,
  className,
}: DataTableProps<T>) {
  const selectable = Boolean(onSelectionChange);
  const selected = React.useMemo(
    () => new Set(selectedIds ?? []),
    [selectedIds],
  );

  const allSelected =
    rows.length > 0 && rows.every((row) => selected.has(getRowId(row)));
  const someSelected = rows.some((row) => selected.has(getRowId(row)));

  const toggleAll = () => {
    onSelectionChange?.(allSelected ? [] : rows.map(getRowId));
  };

  const toggleRow = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    onSelectionChange?.([...next]);
  };

  const handleSort = (column: Column<T>) => {
    if (!column.sortable || !onSortChange) return;
    const direction: SortDirection =
      sort?.columnId === column.id && sort.direction === 'asc' ? 'desc' : 'asc';
    onSortChange({ columnId: column.id, direction });
  };

  if (loading) {
    return (
      <div role="status" className={cn('flex flex-col gap-2', className)}>
        <span className="sr-only-text">Loading {caption}</span>
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton key={i} className="h-12" />
        ))}
      </div>
    );
  }

  if (rows.length === 0 && empty) {
    return <div className={className}>{empty}</div>;
  }

  const mobileColumns = columns.filter((column) => !column.hideOnMobile);

  return (
    <div className={className}>
      {/* Table layout, md and up. */}
      <table className="hidden w-full border-collapse md:table">
        <caption className="sr-only-text">{caption}</caption>
        <thead>
          <tr className="border-border-subtle border-b">
            {selectable && (
              <th scope="col" className="w-10 py-2 pr-2">
                <Checkbox
                  label="Select all rows"
                  checked={allSelected}
                  indeterminate={someSelected && !allSelected}
                  onChange={toggleAll}
                  className="[&_span:last-child]:sr-only-text"
                />
              </th>
            )}

            {columns.map((column) => {
              const active = sort?.columnId === column.id;

              return (
                <th
                  key={column.id}
                  scope="col"
                  aria-sort={
                    active
                      ? sort.direction === 'asc'
                        ? 'ascending'
                        : 'descending'
                      : column.sortable
                        ? 'none'
                        : undefined
                  }
                  className={cn(
                    'text-label text-muted py-2 font-medium',
                    column.align === 'end' ? 'text-right' : 'text-left',
                  )}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => handleSort(column)}
                      className={cn(
                        'hover:text-default inline-flex items-center gap-1 rounded-xs',
                        'transition-colors duration-[var(--duration-fast)]',
                        active && 'text-default',
                      )}
                    >
                      {column.header}
                      <Icon
                        icon={
                          active
                            ? sort.direction === 'asc'
                              ? ArrowUp
                              : ArrowDown
                            : ChevronsUpDown
                        }
                        size="sm"
                        className={active ? 'text-primary' : 'text-disabled'}
                      />
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="divide-border-subtle divide-y">
          {rows.map((row) => {
            const id = getRowId(row);

            return (
              <tr
                key={id}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cn(
                  'transition-colors duration-[var(--duration-fast)]',
                  selected.has(id) && 'bg-primary-surface',
                  onRowClick && 'hover:bg-surface-hover cursor-pointer',
                )}
              >
                {selectable && (
                  <td
                    className="py-2 pr-2"
                    // Stops a selection click also triggering row navigation.
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Checkbox
                      label={`Select row`}
                      checked={selected.has(id)}
                      onChange={() => toggleRow(id)}
                      className="[&_span:last-child]:sr-only-text"
                    />
                  </td>
                )}

                {columns.map((column) => (
                  <td
                    key={column.id}
                    className={cn(
                      'text-small text-default py-3',
                      column.align === 'end' && 'text-right',
                    )}
                  >
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Stacked cards below md. */}
      <ul className="flex flex-col gap-2 md:hidden">
        {rows.map((row) => {
          const id = getRowId(row);

          return (
            <li
              key={id}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                'border-border-subtle bg-surface rounded-lg border p-3',
                selected.has(id) && 'border-primary-border bg-primary-surface',
                onRowClick && 'cursor-pointer',
              )}
            >
              {selectable && (
                <div
                  className="mb-2"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Checkbox
                    label="Select row"
                    checked={selected.has(id)}
                    onChange={() => toggleRow(id)}
                  />
                </div>
              )}

              <dl className="flex flex-col gap-1.5">
                {mobileColumns.map((column) => (
                  <div
                    key={column.id}
                    className="flex items-baseline justify-between gap-3"
                  >
                    <dt className="text-caption text-muted shrink-0">
                      {column.header}
                    </dt>
                    <dd className="text-small text-default min-w-0 text-right">
                      {column.cell(row)}
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
