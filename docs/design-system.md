# Design system

How to build interfaces in the Progress Tracker so they stay consistent.

This document explains the rules. The values themselves live in
`src/app/globals.css`, which is the single source of truth. If the two ever
disagree, the CSS is right and this file is stale.

## The one rule

Components consume tokens. They never contain raw values.

A hex code, a pixel shadow, or an off-scale radius inside a component is a bug.
Add a token or fix an existing one instead. This is what makes it possible to
restyle the whole application from one file later.

```tsx
// wrong
<div className="rounded-[7px] bg-[#2743c4] shadow-[0_2px_6px_rgba(0,0,0,.1)]" />

// right
<div className="rounded-md bg-primary shadow-sm" />
```

## Colour

Three families carry the entire interface.

| Family    | Role               | Where it appears                                                         |
| --------- | ------------------ | ------------------------------------------------------------------------ |
| **ink**   | Neutral foundation | Backgrounds, cards, all text levels, borders, dividers                   |
| **azure** | Primary brand      | Primary buttons, active nav, links, completed work, main progress fills  |
| **brass** | Secondary accent   | Work in flight, secondary emphasis, highlights, selected secondary state |

Azure is an ultramarine ink blue and brass is a warm metallic. The pairing is
drawn from drafting and instrument-making, which suits an application whose job
is measuring work precisely. It also avoids the indigo-on-white that most
project tools already use.

### Never use the raw palette directly

`--color-azure-500` and friends are fixed values. Components use the semantic
layer instead, because only the semantic layer knows about dark mode.

```tsx
<div className="bg-azure-500" />   // wrong, will not adapt to dark
<div className="bg-primary" />     // right
```

The semantic names are grouped by job: `canvas` / `surface` / `surface-sunken`
for backgrounds, `strong` / `default` / `muted` / `subtle` / `disabled` for
text, `border-subtle` / `border-default` / `border-strong` for lines, and
`primary` / `accent` / `danger` with `-hover`, `-active`, `-text`, `-surface`
and `-border` suffixes for interactive colour.

### The red exception

Red is not a brand colour. It appears in exactly two places: destructive
buttons and blocked status.

Three colours cannot honestly cover a destructive action. Signalling "this will
permanently delete something" in brand blue costs real usability, and red
carries a near-universal learned meaning that is worth more than palette
purity. It is scoped deliberately and used nowhere else. If you find yourself
reaching for red for anything other than destruction or blockage, use brass.

### Measured contrast

Every pairing was measured against WCAG 2.1, not estimated.

| Pairing                      | Ratio   | Level |
| ---------------------------- | ------- | ----- |
| Body text on canvas          | 18.26:1 | AAA   |
| Muted text on canvas         | 6.12:1  | AA    |
| Muted text on sunken surface | 5.51:1  | AA    |
| White on primary fill        | 7.82:1  | AAA   |
| White on accent fill         | 5.91:1  | AA    |
| White on danger fill         | 6.54:1  | AA    |
| Primary link on canvas       | 9.52:1  | AAA   |
| Dark mode body text          | 16.87:1 | AAA   |
| Dark mode muted text         | 7.39:1  | AAA   |
| Input border against surface | 3.61:1  | pass  |

That last row is the one people usually get wrong. An input border defines the
boundary of an interactive control, so WCAG requires 3:1 against its
background. The very pale hairlines common in modern UI kits fail this, which is
why `--border-strong` is noticeably darker than `--border-subtle`. Use
`border-strong` for anything a user can type into or click, and `border-subtle`
for decorative division.

## Typography

One family, the system UI stack. On macOS that resolves to SF Pro, on Windows to
Segoe UI, on Android to Roboto. All three are high quality interface faces.

This is a deliberate performance choice: no font request, no layout shift, no
build-time network dependency. Swapping to a self-hosted face later means
changing `--font-sans` in one place and nothing else.

Use the semantic scale, never raw sizes:

`text-display` `text-h1` `text-h2` `text-h3` `text-h4` `text-body` `text-small`
`text-caption` `text-label` `text-button`

Each carries its own line height, letter spacing and weight, so
`className="text-h2"` is complete on its own. Tracking tightens as size grows,
because large type looks loose at the same letter spacing that suits body text.

Two rules worth internalising:

**Keep measure under about 75 characters.** Use `max-w-prose` on running text.
Longer lines make it hard for the eye to find the start of the next one.

**Digits are tabular by default.** Set globally in the base layer, because this
application shows constantly changing percentages and figures that jump around
as they update are distracting. Opt out with `numeric-proportional` inside
prose, where proportional digits read better.

**Do not shout labels.** Sentence case throughout. All-caps tracked-out labels
above every heading is template chrome and reduces legibility.

## Spacing

Base unit is 4px. Use Tailwind's scale (`gap-2`, `p-4`) for local spacing.

For structural spacing, use the tokens, because they scale at breakpoints
automatically:

| Token            | Purpose                    | Mobile | Tablet | Desktop |
| ---------------- | -------------------------- | ------ | ------ | ------- |
| `--page-gutter`  | Page side padding          | 16px   | 24px   | 32px    |
| `--section-gap`  | Between major sections     | 32px   | 40px   | 56px    |
| `--card-padding` | Inside cards               | 16px   | 20px   | 24px    |
| `--stack-gap`    | Between stacked elements   | 12px   | 12px   | 12px    |
| `--field-gap`    | Label to control to helper | 6px    | 6px    | 6px     |

The `page-container` utility applies the gutter and the max width together. Use
it for every page shell rather than repeating padding classes.

## Radius

`xs` 4px, `sm` 6px, `md` 8px, `lg` 12px, `xl` 16px, `full` pill.

Radius scales with the element. Small controls take small radii, containers take
larger ones. Badges are pills, buttons and inputs are `md`, cards are `lg`,
modals are `xl`.

Applying one radius to everything regardless of size is one of the clearest
signs of a templated interface, so resist normalising these.

## Borders and dividers

Always 1px. Thicker borders read as heavy and dated.

- `border-subtle` divides content that is already grouped. Cards, table rows.
- `border-default` bounds a distinct region.
- `border-strong` bounds an interactive control. Inputs, selects, checkboxes.

Prefer a border over a shadow when separating content. It is lighter, sharper
and does not accumulate visual noise when repeated.

## Shadows

Four levels: `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`. All tinted
with ink rather than neutral black, so elevation stays inside the palette.

**Cards get no shadow by default.** This is the important rule. If every card is
elevated, nothing is, and the interface flattens into a wash of identical
floating rectangles. Separate with a border. Reach for elevation only when
content must lift off a busy background, and for overlays that genuinely float:
dropdowns, popovers, modals.

## Interaction states

Every interactive element defines all seven: default, hover, active, focus,
disabled, loading, selected.

**Focus is handled globally.** `:focus-visible` in the base layer draws a 2px
ring in the primary colour with a 2px offset. No component needs to implement
it, and no component may remove it. It uses `:focus-visible` rather than
`:focus`, so keyboard users see the ring and mouse users do not.

**Hover uses `enabled:hover:`, not `hover:`.** A disabled control that still
lights up on hover is a false affordance.

**Loading preserves layout.** The Button keeps its content in the DOM, hidden,
and overlays the spinner. The button never changes width, so nothing around it
jumps. Do the same for anything else that swaps in a loading state.

**Motion is functional.** 120ms for colour, 180ms for movement. Nothing
animates unless it is showing the user what changed. The base layer disables all
of it under `prefers-reduced-motion`.

## Buttons

Five variants, deliberately few:

- **primary** solid fill. One per view, the main action.
- **secondary** tinted. Sits beside a primary without competing.
- **outline** bordered neutral. The default for most actions.
- **ghost** no chrome until hovered. Low priority and icon-only controls.
- **destructive** the only control allowed to use red.

Three sizes matching the control height tokens, so a button aligns with an input
placed next to it. `sm` 32px, `md` 36px, `lg` 44px. Use `lg` for primary touch
targets on mobile: 44px is the WCAG target size guidance.

Icon-only buttons require `aria-label`. This is enforced by the type system, not
by review, so it cannot be forgotten.

For links that should look like buttons, use `buttonClasses()` on an `<a>` or
`<Link>`. Do not nest a link inside a button: it is invalid HTML and breaks
middle-click and open-in-new-tab.

## Forms

Wrap every control in `<Field>`. It generates the ids and wires `htmlFor`,
`aria-describedby` and `aria-invalid` automatically, which is the part that is
tedious to do by hand and therefore the part that gets skipped.

```tsx
<Field description="Shown on the dashboard." required>
  <Label>Project name</Label>
  <Input placeholder="Progress Tracker" />
</Field>
```

Passing `error` switches the control to its invalid state and replaces the
helper text rather than showing both. Two competing messages is worse than one.

Validation messages say what is wrong and how to fix it. "Pick a date in the
future", not "Invalid input". They do not apologise.

Selects stay native. A custom listbox would need focus trapping, typeahead and
virtualisation to match what the browser already gives for free, and the native
picker on mobile is better than anything reimplemented.

## Status

Six states, three colour families. Colour alone cannot separate six things into
three buckets, so each status carries **three independent signals**: hue, fill
treatment, and icon shape.

| Status       | Tone    | Treatment | Icon              |
| ------------ | ------- | --------- | ----------------- |
| Not started  | neutral | solid     | dashed circle     |
| Pending      | neutral | outline   | clock             |
| In progress  | accent  | solid     | dot-dashed circle |
| Needs review | accent  | outline   | eye               |
| Completed    | primary | solid     | check circle      |
| Blocked      | danger  | outline   | octagon with X    |

This is why a user with any form of colour vision deficiency can still separate
"in progress" from "needs review": one is filled brass with a dashed ring, the
other is outlined brass with an eye.

Always use `<StatusBadge status="..." />` rather than building a Badge by hand,
so the icon, tone and wording stay identical everywhere.

Add a new status by editing `src/config/status.ts` only. Every consumer picks it
up.

## Progress

This is where the design system raises its voice. Everything else is quiet so
progress reads first.

**Tracks carry faint quarter ticks** at 25, 50 and 75 percent, so a fill can be
read as a rough proportion at a glance without hunting for the number. It is the
measured-instrument idea that ties the whole palette together. Turn ticks off in
dense lists where they become noise.

Three components:

- **ProgressBar** for one value. The default. Bars stack and align, which makes
  them easy to compare down a column.
- **ProgressRing** for a single headline figure, such as overall project
  completion. One per view at most. A grid of rings is harder to compare than a
  column of bars, because arcs do not line up.
- **SegmentedProgress** for composition by status. Answers "how much is done"
  and "what is the rest doing" in one bar, which two separate numbers cannot.

Every one of them requires a `label`. A bare bar announces nothing useful, and
colour never carries the value alone: the number is always available as text or
as an accessible name.

## Icons

Lucide, one library, used consistently. Do not mix in a second icon set.

Three sizes tied to the type scale: `sm` 14px beside caption text, `md` 16px the
default beside body text, `lg` 20px for emphasis and large buttons.

Always use the `<Icon>` wrapper. Icons are hidden from assistive technology by
default, because most of them repeat adjacent text and a duplicate name is noise
for screen reader users. Pass `label` only when the icon is the sole meaning.

Icons support the interface. If an icon is larger than the text it accompanies,
it is too big.

## Responsive

Mobile first. Write the mobile layout, then add `md:` and `lg:` to enhance.

Breakpoints: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536.

Spacing tokens already scale at `md` and `lg`, so most layouts need fewer
responsive utilities than expected. Reach for the tokens before reaching for a
breakpoint.

Content caps at `--content-max` (1280px). Beyond that, line lengths get too long
to read comfortably.

Touch targets are at least 44px on interfaces intended for touch. Use `size="lg"`
on primary mobile actions.

## Dark mode

Included from the start, not bolted on later.

The reasoning is audience rather than fashion: this is a tool for developers,
who overwhelmingly run dark editors and expect dark tooling. Retrofitting theme
support after components are written is expensive, whereas building it into the
token layer costs almost nothing.

It works by attribute. `ThemeScript` sets `data-theme` on `<html>` as a blocking
inline script before first paint, which is what prevents a white flash for dark
mode users. React cannot do this, because React runs after paint.

**Components need no `dark:` classes for colour.** The semantic tokens swap
themselves. If you find yourself writing `dark:bg-something`, a token is
missing: add it rather than working around it.

Note that fills stay saturated in dark mode while text colours lighten. A fill
carries white text and must hold its ratio, whereas text on a dark canvas has to
lighten to stay readable. This is why `--primary` and `--primary-text` are
different values.

## Accessibility

Not a review step. Built into the components so it is difficult to get wrong.

- Contrast measured, not estimated. Table above.
- Focus rings global, keyboard only, cannot be removed by a component.
- Icon-only buttons require a label at the type level.
- Form controls wire their own aria relationships through `<Field>`.
- Status never depends on colour alone.
- Progress always exposes its value as text or accessible name.
- Reduced motion respected globally.
- Native elements preferred over reimplementations.
- Touch targets meet 44px where touch is expected.

## Reference

`/design-system` renders every token and component on one page. It is excluded
from search engines, nothing imports from it, and it is safe to delete. Use it
to check a change did not regress something elsewhere.
