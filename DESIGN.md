---
name: TATAI
description: Střechy a dřevěné konstrukce — a field report, not a brochure
colors:
  graphite-1000: "#0e1113"
  graphite-900: "#14181a"
  graphite-800: "#1d2225"
  graphite-700: "#2b3134"
  graphite-600: "#41484c"
  graphite-500: "#606060"
  graphite-400: "#8a9195"
  graphite-300: "#b4babd"
  graphite-200: "#d5d9db"
  graphite-100: "#e8ebec"
  graphite-050: "#f2f4f5"
  bone-500: "#d9d3c8"
  bone-400: "#e5e0d6"
  bone-300: "#efebe3"
  bone-200: "#f5f2ec"
  bone-100: "#faf8f4"
  signal-700: "#00688c"
  signal-600: "#0089b8"
  signal-500: "#00a8e0"
  signal-400: "#4fc2eb"
  signal-200: "#bee8f8"
  signal-050: "#eaf7fd"
  timber-700: "#7a5327"
  timber-500: "#b98a4b"
  timber-300: "#dcc49b"
  timber-100: "#f1e7d6"
  status-ok: "#2f7d4f"
  status-warn: "#b67a12"
  status-error: "#b4342a"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Instrument Sans, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.14em"
rounded:
  none: "0px"
  xs: "2px"
  sm: "3px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 5vw, 72px)"
  grid-gap: "clamp(16px, 2vw, 32px)"
  section-sm: "clamp(48px, 8vw, 64px)"
  section-md: "clamp(64px, 10vw, 112px)"
  section-lg: "clamp(80px, 13vw, 176px)"
components:
  button-primary:
    backgroundColor: "{colors.graphite-1000}"
    textColor: "{colors.bone-100}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.signal-500}"
    textColor: "{colors.graphite-1000}"
  button-accent:
    backgroundColor: "{colors.signal-500}"
    textColor: "{colors.graphite-1000}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.graphite-1000}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "14px 22px"
  tag-default:
    backgroundColor: "transparent"
    textColor: "{colors.graphite-500}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "7px 12px"
  input-text:
    backgroundColor: "transparent"
    textColor: "{colors.graphite-1000}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 0"
---

# Design System: TATAI

## 1. Overview

**Creative North Star: "The Field Report"**

TATAI's interface reads like a report filed from the job site, not a
brochure printed to sell one. The company's real working documents — layer
breakdowns with measured thicknesses, numbered detail photos, a spec table
per project — *are* the design language. Nothing here is decorative in the
usual marketing sense: every visual device (a hairline rule, a Σ total, a
monospace label) is doing the same job it does on an actual construction
document, just rendered for the web.

The system explicitly rejects two failure modes at once. It rejects the
generic AI/SaaS landing page — gradient text, shadow-heavy cards, an
eyebrow label pasted above every section, the hero-metric template — because
that vocabulary belongs to software, not to a company whose entire pitch is
"we show you what's under the surface." And it rejects glossy real-estate
marketing — over-lit stock photography, aspirational tone, anything that
reads as lifestyle rather than the work itself — because TATAI's credibility
comes from precision, not polish.

**Key Characteristics:**
- One accent color used sparingly; everything else is graphite and paper.
- Zero box-shadow anywhere in the codebase — depth is hairline rules and
  tonal shifts only.
- Square corners everywhere except pills (tags, radio dots) and two
  4-decimal-place radii (2px, 3px) reserved for the smallest controls.
- Monospace, uppercase, wide-tracked labels mark anything that is metadata
  (eyebrows, index numbers, material call-outs) — never body copy.
- Real numbers everywhere a claim could otherwise be vague: layer
  thickness in mm, Σ totals, year counts, project counts.
- Motion runs on two curves only — `ease-standard`
  (`cubic-bezier(0.2,0,0.2,1)`) for state changes, `ease-out`
  (`cubic-bezier(0.16,1,0.3,1)`) for entrances — always transform/opacity,
  never bounce, never a layout property, always with a
  `prefers-reduced-motion` fallback.

### Named Rules
**The Reveal-Never-Bounce Rule.** Motion always eases out toward rest; it
never overshoots or oscillates. If a curve has a bounce or elastic
character, it's wrong for this system.

## 2. Colors

Cool structural graphite and warm paper carry the page; one signal cyan is
the only saturated color, and it is rationed.

### Primary
- **Signal Cyan** (#00a8e0): The single accent. Rules under eyebrows, the
  active nav underline, hover states, index numbers on detail hotspots, the
  one line-item unit on a stat ("**18** let"). It never fills a surface
  larger than a button or a 2px rule.

### Secondary
- **Timber Amber** (#b98a4b): A warm counterweight reserved for wood/CLT
  context — the `timber` tag tone and `surface-timber` background. Used
  rarely enough that it reads as a deliberate second material, not a second
  brand color.

### Neutral
- **Near-Black Graphite** (#0e1113): Primary text, primary button fill,
  the darkest structural tone (`graphite-1000`).
- **Ink Graphite** (#14181a–#2b3134): Inverse surfaces (`surface-inverse`,
  dark sections, dark hero panels) — the `graphite-900` / `graphite-800` /
  `graphite-700` step.
- **Slate Graphite** (#41484c–#8a9195): Muted and faint text roles
  (`graphite-600` through `graphite-400`) — captions, meta labels,
  placeholder "no photo" text.
- **Cool Grey** (#b4babd–#f2f4f5): Borders, dividers, and the lightest
  structural tones (`graphite-300` down to `graphite-050`).
- **Warm Paper** (#faf8f4–#d9d3c8): The `bone` scale — page background
  (`bone-200`), raised surfaces (`bone-100`), and the darkest paper tone
  used for sunken surfaces. Never pure white; TATAI is a material brand and
  paper is warm, not clinical.

### Named Rules
**The One Voice Rule.** Signal cyan appears on rules, hovers, and single
data points — never as a fill larger than a button. Its rarity is what
makes it read as a signal instead of decoration.

**The No Pure White Rule.** Backgrounds are `bone-100`/`bone-200`, never
`#ffffff`, except `surface-card` where a true white plate is needed against
paper. Pure white next to warm paper reads as a bug, not a choice.

## 3. Typography

**Display Font:** Archivo (with Helvetica Neue, Arial, sans-serif fallback)
**Body Font:** Instrument Sans (with Helvetica Neue, Arial, sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, SF Mono, Menlo fallback)

**Character:** A humanist grotesque (Archivo) carrying headlines at
negative tracking gives the display type a drafted, architectural weight;
Instrument Sans keeps body copy plain and legible; JetBrains Mono is
reserved entirely for metadata, so its appearance is itself a signal that
"this is a label, not prose."

### Hierarchy
- **Display** (500, `clamp(2.5rem, 6vw, 5rem)`, 1.02 line-height, -0.03em
  tracking): Hero headlines only.
- **Headline** (500, `clamp(1.75rem, 3vw, 2.5rem)`, 1.12 line-height,
  -0.02em tracking): Section titles (`h2`).
- **Title** (500, 1.25rem, 1.12 line-height, -0.02em tracking): Card and
  component headings (`h3`/`h4` — project titles, process step titles,
  material names).
- **Body** (400, 1.0625rem down to 0.875rem, 1.55 line-height, max ~65ch):
  Paragraph copy. Three size steps (`body-lg`/`body-md`/`body-sm`) cover
  lead paragraphs down to fine print; none go below 14px.
- **Label** (400, 0.6875rem–0.75rem, 0.14em tracking, uppercase): Eyebrows,
  index numbers, tag text, spec-table keys, footer nav headers. Always
  monospace, always uppercase, always JetBrains Mono.

### Named Rules
**The Mono-Means-Metadata Rule.** JetBrains Mono never appears in a
sentence a visitor reads for content — only in labels, numbers, and
technical call-outs. If it's mono, it's data.

## 4. Elevation

Flat by design. There is no `box-shadow` used anywhere in the shipped
component tree — depth is conveyed entirely through hairline rules
(`border-hairline` at 12% black, `border-strong` at 28% black) and tonal
shifts between adjacent surfaces (`surface-page` → `surface-raised` →
`surface-inverse`). Four shadow tokens exist in the theme
(`shadow-flat`/`lift`/`panel`/`overlay`) as a reserve for future overlay
UI (modals, popovers) that doesn't exist yet — they are not used on any
current surface.

### Named Rules
**The Flat Rule.** Depth comes from a hairline or a change in surface
tone, never from a shadow. If a component needs to look "elevated," change
its background tone or add a top rule before reaching for `box-shadow`.

## 5. Components

### Buttons
- **Shape:** Square corners (0px radius) at every size.
- **Primary:** Graphite-1000 fill, bone-100 text, mono label typography,
  14px/22px padding. Hover swaps to signal-500 fill with graphite-1000
  text — the accent color's one permitted large-surface appearance, and
  only on interaction.
- **Accent:** Signal-500 fill, graphite-1000 text — used for the single
  highest-priority action per view (e.g. "Odeslat poptávku").
- **Outline / Ghost / Inverse-outline:** Transparent fill, border-strong
  (or border-inverse on dark surfaces) stroke, text in the surface's
  primary ink. Hover inverts to a solid graphite-1000 (light context) or
  brightens the border to signal-500 (dark context).
- **Arrow affordance:** An optional trailing `→` glyph that translates
  4px on hover — the only motion most buttons carry.

### Tags
- **Style:** Transparent background, 1px border-strong, mono uppercase
  label, square corners. `solid` variant (active/selected state) inverts to
  graphite-1000 fill.
- **State:** Interactive tags (filter pills) get a hover border shift to
  graphite-1000; non-interactive tags are static labels only.

### Cards (Project / Material / Process items)
- **Corner Style:** Square (0px) throughout — this system does not use
  rounded cards.
- **Background:** Transparent or `surface-raised`; never a boxed card with
  its own shadow. Separation comes from a hairline rule or gutter, not a
  container.
- **Border:** A hairline rule only where two items are adjacent in a
  grid/list, never as a full card outline.
- **Internal Padding:** Follows the section spacing scale
  (`grid-gap`/`section-sm`), not an independent card padding scale.

### Inputs / Fields
- **Style:** No box, no border-radius. A single bottom border
  (`border-strong`, 1px) is the entire input chrome.
- **Focus:** Bottom border widens to 2px and shifts to signal-500 —
  underline-style focus, not a glow or ring.
- **Error:** Bottom border shifts to `status-error`.

### Navigation (Header)
- **Style:** Sticky, `surface-page` background, single bottom hairline.
  Nav links are mono-uppercase; the active link gets a signal-500
  underline. Below `lg` the nav collapses to a two-line hamburger that
  reveals a full-height mono/display link stack.

### AssemblyStack (signature)
A row-per-layer material breakdown: index (counting down from the layer
count), material name, material description, and thickness in mm,
right-aligned tabular numerals. A Σ total sits in the header. Hovering a
row shifts its background to `surface-raised` and its index to signal-500
— this is the component that most literally embodies "The Field Report."

### DetailCallout (signature)
A photo with numbered circular hotspots placed by real x/y percentage
coordinates, paired with a synced list below (hover a hotspot, its list
row brightens; hover a list row, its hotspot brightens). This is the
component the hero diptych's motion vocabulary was built to echo.

### HeroDiptych (signature)
The homepage's full-viewport (`100svh` minus header) hero: two photo panels
side by side, one per discipline, split by a hairline that draws itself in
on load. Each half is a real navigation link (`#strechy` / `#domy`), not a
decorative image — the composition doubles as primary navigation. On load,
each panel rises from `translateY(101%)` under an overflow mask (staggered
120ms apart), the divider scales in from the top, then eyebrow → headline →
lead → CTAs → trust stats fade up in sequence. On hover, the hovered panel's
resting 25%-black tint lifts and its photo scales to 1.045; the signal-cyan
top rule draws in — the same accent-line gesture as `PillarSplit` and
`MaterialStrip`. On scroll, the two halves drift ±24px in opposite
directions (transform-only). All of it collapses to entrance-only under
`prefers-reduced-motion`, and the caption row is desktop-only past `sm` —
at 320px a panel is ~160px wide and a full caption would overflow it.

## 6. Do's and Don'ts

### Do:
- **Do** keep signal-500 rationed to rules, hovers, and single data points
  — "The One Voice Rule."
- **Do** use real numbers (mm, Σ totals, project counts, years) instead of
  adjectives wherever a claim can be shown instead of stated.
- **Do** use JetBrains Mono uppercase exclusively for metadata (labels,
  indices, spec keys) — never for content copy.
- **Do** keep every surface flat; depth is a hairline or a tone shift.
- **Do** default to square corners; reserve radius for pills and the two
  smallest control radii (2px/3px) only.
- **Do** use warm paper (`bone-*`) backgrounds, never pure white, except
  the explicit `surface-card` plate.

### Don't:
- **Don't** use gradient text, shadow-heavy cards, or the hero-metric
  template — the generic AI/SaaS landing-page vocabulary this system is
  built to avoid.
- **Don't** add a tiny uppercase eyebrow above every section reflexively;
  eyebrows here mark the technical-document numbering system (`01 —
  Střechy`), not a decorative section-scaffold habit.
- **Don't** use over-polished, aspirational, "lifestyle" photography — the
  glossy real-estate anti-reference. Photography should look like it was
  taken on site, not staged.
- **Don't** add `box-shadow` to any component at rest. If something needs
  to feel elevated, change its surface tone instead.
- **Don't** round card corners or box a list/grid item in a bordered
  container — separation is a hairline between items, not a card shell.
- **Don't** let vague superlatives ("best," "premium," "quality") stand in
  for a number the company actually has.
