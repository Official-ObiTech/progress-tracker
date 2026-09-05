/**
 * Public surface of the component library.
 *
 * Organised in three tiers:
 *
 *   primitives  low-level elements with no dependencies on other components
 *   composite   built from primitives, often stateful
 *   data        display components for application information
 *
 * IMPORTANT: import from this barrel only in SERVER components and pages.
 * A client component importing this file pulls the whole library into the
 * client bundle and turns every component into a client component. Client
 * components should import the specific module, for example
 * '@/components/ui/primitives/button'. See docs/design-system.md.
 */

/* ---------------------------------------------------------------- primitives */
export { Avatar, AvatarGroup, getInitials } from './primitives/avatar';
export type {
  AvatarProps,
  AvatarGroupProps,
  AvatarSize,
} from './primitives/avatar';
export { Badge } from './primitives/badge';
export type { BadgeProps } from './primitives/badge';
export { Button, buttonClasses } from './primitives/button';
export type { ButtonProps, ButtonVariant } from './primitives/button';
export { Checkbox, Radio, Switch } from './primitives/choice';
export type {
  CheckboxProps,
  RadioProps,
  SwitchProps,
} from './primitives/choice';
export { Divider } from './primitives/divider';
export type { DividerProps } from './primitives/divider';
export { Icon } from './primitives/icon';
export type { IconProps } from './primitives/icon';
export { IconButton } from './primitives/icon-button';
export type { IconButtonProps } from './primitives/icon-button';
export { Input, Select, Textarea } from './primitives/input';
export type {
  InputProps,
  SelectProps,
  TextareaProps,
} from './primitives/input';
export { Skeleton } from './primitives/skeleton';
export type { SkeletonProps } from './primitives/skeleton';
export { Spinner } from './primitives/spinner';
export type { SpinnerProps } from './primitives/spinner';

/* ----------------------------------------------------------------- composite */
export { Alert } from './composite/alert';
export type { AlertProps, AlertTone } from './composite/alert';
export { ConfirmDialog } from './composite/confirm-dialog';
export type { ConfirmDialogProps } from './composite/confirm-dialog';
export { Dialog } from './composite/dialog';
export type { DialogProps, DialogSize } from './composite/dialog';
export { DropdownMenu } from './composite/dropdown-menu';
export type { DropdownMenuProps, MenuItem } from './composite/dropdown-menu';
export { EmptyState } from './composite/empty-state';
export type { StateMessageProps } from './composite/empty-state';
export { ErrorState } from './composite/error-state';
export { FilterBar } from './composite/filter-bar';
export type { ActiveFilter, FilterBarProps } from './composite/filter-bar';
export { Field, Label, useField } from './composite/form-field';
export type { FieldProps, LabelProps } from './composite/form-field';
export { LoadingState } from './composite/loading-state';
export type { LoadingStateProps } from './composite/loading-state';
export { Pagination } from './composite/pagination';
export type { PaginationProps } from './composite/pagination';
export { SearchInput } from './composite/search-input';
export type { SearchInputProps } from './composite/search-input';
export { TabPanel, Tabs } from './composite/tabs';
export type { TabItem, TabPanelProps, TabsProps } from './composite/tabs';
export { Tooltip } from './composite/tooltip';
export type { TooltipProps, TooltipSide } from './composite/tooltip';

/* ---------------------------------------------------------------------- data */
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './data/card';
export type { CardElevation, CardProps } from './data/card';
export { DataTable } from './data/data-table';
export type { Column, DataTableProps, SortDirection } from './data/data-table';
export {
  List,
  ListItem,
  ListItemDescription,
  ListItemTitle,
} from './data/list';
export type { ListItemProps, ListProps } from './data/list';
export { ProgressBar, ProgressRing, SegmentedProgress } from './data/progress';
export type {
  ProgressBarProps,
  ProgressRingProps,
  ProgressSegment,
  ProgressTone,
} from './data/progress';
export { StatCard } from './data/stat-card';
export type { StatCardProps } from './data/stat-card';
export { StatusBadge } from './data/status-badge';
export type { StatusBadgeProps } from './data/status-badge';
