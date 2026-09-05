import {
  CircleDashed,
  CircleCheck,
  CircleDotDashed,
  Clock,
  Eye,
  OctagonX,
  type LucideIcon,
} from 'lucide-react';

/**
 * Work states used across projects, phases and tasks.
 *
 * These are visual definitions only. The domain model that decides when a task
 * moves between them is defined in a later segment.
 */
export const STATUSES = [
  'not_started',
  'pending',
  'in_progress',
  'needs_review',
  'completed',
  'blocked',
] as const;

export type Status = (typeof STATUSES)[number];

/**
 * Tone maps a status onto the three-colour identity.
 *
 * There are six statuses and only three brand colours, so colour alone cannot
 * separate them. Each status is therefore distinguished by THREE independent
 * signals: hue, fill treatment (solid tint vs outline), and a distinct icon
 * shape. A user with any form of colour vision deficiency can still tell
 * `in_progress` from `needs_review` because one is filled brass with a dashed
 * ring icon and the other is outlined brass with an eye.
 *
 * `blocked` is the single case that leaves the three-colour palette. Signalling
 * a blocking failure in brand blue or brass would be a real usability cost,
 * and red carries a near-universal learned meaning. It is scoped to this
 * status and destructive buttons, and appears nowhere else.
 */
export type StatusTone = 'neutral' | 'primary' | 'accent' | 'danger';

export interface StatusDefinition {
  /** Human readable name. Sentence case, never shouted in all caps. */
  label: string;
  tone: StatusTone;
  /** Outline treatment differentiates statuses that share a tone. */
  variant: 'solid' | 'outline';
  icon: LucideIcon;
  /** Whether work in this state counts toward a completion percentage. */
  countsAsDone: boolean;
}

export const statusConfig: Record<Status, StatusDefinition> = {
  not_started: {
    label: 'Not started',
    tone: 'neutral',
    variant: 'solid',
    icon: CircleDashed,
    countsAsDone: false,
  },
  pending: {
    label: 'Pending',
    tone: 'neutral',
    variant: 'outline',
    icon: Clock,
    countsAsDone: false,
  },
  in_progress: {
    label: 'In progress',
    tone: 'accent',
    variant: 'solid',
    icon: CircleDotDashed,
    countsAsDone: false,
  },
  needs_review: {
    label: 'Needs review',
    tone: 'accent',
    variant: 'outline',
    icon: Eye,
    countsAsDone: false,
  },
  completed: {
    label: 'Completed',
    tone: 'primary',
    variant: 'solid',
    icon: CircleCheck,
    countsAsDone: true,
  },
  blocked: {
    label: 'Blocked',
    tone: 'danger',
    variant: 'outline',
    icon: OctagonX,
    countsAsDone: false,
  },
};

export function getStatus(status: Status): StatusDefinition {
  return statusConfig[status];
}
