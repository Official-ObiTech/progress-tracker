/**
 * Public surface of the design system.
 *
 * Import from '@/components/ui' rather than reaching into individual files, so
 * internals can be reorganised without touching call sites.
 */

export {
  Button,
  buttonClasses,
  type ButtonProps,
  type ButtonVariant,
} from './button';
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardElevation,
  type CardProps,
} from './card';
export {
  Badge,
  StatusBadge,
  type BadgeProps,
  type StatusBadgeProps,
} from './badge';
export {
  Checkbox,
  Radio,
  Switch,
  type CheckboxProps,
  type RadioProps,
  type SwitchProps,
} from './choice';
export {
  Field,
  Label,
  useField,
  type FieldProps,
  type LabelProps,
} from './field';
export { Icon, type IconProps } from './icon';
export {
  Input,
  SearchInput,
  Select,
  Textarea,
  type InputProps,
  type SelectProps,
  type TextareaProps,
} from './input';
export {
  ProgressBar,
  ProgressRing,
  SegmentedProgress,
  type ProgressBarProps,
  type ProgressRingProps,
  type ProgressSegment,
  type ProgressTone,
} from './progress';
export { Spinner, type SpinnerProps } from './spinner';
export {
  EmptyState,
  ErrorState,
  Skeleton,
  type SkeletonProps,
  type StateMessageProps,
} from './states';
