---
name: Editorial Vault (ensaios + laboratorio)
description: A note vault with two series, LAB in signal orange and ENS in violet, read through a map of real links between texts.
colors:
  lab: "#b53a08"
  lab-dark: "#ff7a3d"
  essay: "#5b3fd1"
  essay-dark: "#b39bff"
  bg: "#eef0f3"
  bg-dark: "#0e1014"
  surface: "#ffffff"
  surface-dark: "#151821"
  text: "#14161b"
  text-dark: "#e9e8e4"
  muted: "#565a66"
  muted-dark: "#9a9ca6"
  line: "rgba(20, 22, 27, 0.13)"
  line-strong: "rgba(20, 22, 27, 0.28)"
  edge: "rgba(20, 22, 27, 0.42)"
  line-on-dark: "rgba(255, 255, 255, 0.1)"
  line-strong-on-dark: "rgba(255, 255, 255, 0.24)"
  edge-on-dark: "rgba(255, 255, 255, 0.4)"
typography:
  index-title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 6.4vw, 5rem)"
    fontWeight: 650
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  article-title-lab:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 5vw, 3.6rem)"
    fontWeight: 650
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  article-title-essay:
    fontFamily: "Literata, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.2rem, 5vw, 3.6rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  row-title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)"
    fontWeight: 620
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body-lab:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
  body-essay:
    fontFamily: "Literata, Iowan Old Style, Georgia, serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.74
  lede:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  meta:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
  code-label:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, monospace"
    fontSize: "0.8125rem"
    fontWeight: 560
    lineHeight: 1.4
rounded:
  pill: "999px"
  map: "14px"
  panel: "10px"
  chip-inline: "6px"
  code: "5px"
  focus: "3px"
spacing:
  row-y: "28px"
  gutter: "clamp(16px, 4vw, 40px)"
  article-gap: "56px"
  chip-y: "5px"
  chip-x: "12px"
components:
  switch-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "3px"
  switch-pill-current:
    textColor: "{colors.text}"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
  filter-chip-pressed:
    textColor: "{colors.text}"
  properties-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
    padding: "16px 18px"
  wikilink-chip:
    textColor: "{colors.lab}"
    rounded: "{rounded.chip-inline}"
    padding: "0.04em 0.4em"
  vault-map:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.map}"
  entry-row:
    textColor: "{colors.text}"
    padding: "28px 0"
---

# Design System: Editorial Vault

Scope: the editorial area only (/ensaios, /laboratorio and the articles of both). Everything is scoped under `.ed` in `components/editorial/editorial.css`, so nothing leaks out.

## Overview

**Creative North Star: "The Digital Garden Vault"**

A note vault laid out like the one the texts come from: two series with their own colour, coded entries, a properties panel as metadata, and a map that shows the real links between texts. The page proves how the author thinks by showing connections, not by decoration. It reads as a calm cool-grey (or blue-graphite) workspace in which the series colours are the only saturated things.

Density is moderate and reading-first: a 41rem article column between a sticky properties panel and a sticky rail, a 68ch prose measure, hairline rules instead of cards. ENS reads in a book serif; LAB reads in the sans; codes are the only mono.

**Key Characteristics:**
- Two series colours (LAB orange, ENS violet) on a cool neutral; one series accent per page via `--ed-accent`.
- Hairline borders and one soft ambient shadow on the map; no hard offset shadows.
- Codes (LAB-001, ENS-001) in tabular mono; titles in tight-tracked sans or serif.
- One authored motion moment: the map draws itself once.

## Colors

A cool ice-grey page (graphite-blue in dark) with white (or deep navy-graphite) surfaces, near-black ink, and two series hues reserved for identity and state.

### Primary
- **Signal Orange / LAB** (`lab`, dark `lab-dark`): the LAB series. Map nodes, entry codes, LAB focus ring, selection, progress bar, active chip tint, wikilink chips pointing at LAB notes. Deepened to #b53a08 in light for text contrast; brightened in dark.
- **Violet / ENS** (`essay`, dark `essay-dark`): the ENS series, same roles as LAB when the page or element has `data-series="essay"`.

### Neutral
- **Ice Grey / Graphite** (`bg`, `bg-dark`): page ground.
- **Paper / Night Surface** (`surface`, `surface-dark`): map, properties panel, switch pill, code blocks, mobile TOC.
- **Ink** (`text`, `text-dark`): body, titles, hot edges.
- **Muted** (`muted`, `muted-dark`): secondary copy, meta, unselected chips, labels.
- **Line / Line Strong** (`line`, `line-strong`; `*-on-dark` variants in dark): row dividers and quiet borders / panel, chip and switch borders. **Edge** (`edge`, `edge-on-dark`): map edges at rest.

Dark values are set under `.dark .ed`; the tokens named `-dark` and `-on-dark` are those overrides. The accent defaults to LAB and flips to violet through `data-series="essay"`.

### Named Rules
**The Series Colour Rule.** Orange means LAB, violet means ENS, and nothing else on these pages is saturated. Accents appear as text colour, 13-16% tints, thin borders and node fills, never as large filled surfaces.
**The Accent Follows Series Rule.** Components read `--ed-accent`, never a hard-coded series hue, so an element inside a `data-series` scope re-colours itself.

## Typography

**Display/Headline:** Geist (LAB, index, list rows), Literata (ENS titles, ENS row titles, ENS prose), falling back to Iowan Old Style, Georgia.
**Body:** Geist for LAB; Literata for ENS reading.
**Label/Mono:** Geist Mono, tabular numerals, for codes and map labels only. Fonts are wired as `--font-geist`, `--font-literata`, `--font-geist-mono` in `app/[locale]/layout.tsx` (Literata 400-700 plus italic, swap, not preloaded).

**Character:** Engineered sans for the notes that are work, a book serif for the texts that are thought; the shift in face is the series signal.

### Hierarchy
Essay reading uses Literata at 1.25rem on 1.82, with a first paragraph at 1.14em in the full text colour, h2 at 2.05rem set off by a hairline and generous space above, and h3 as italic accent-tinted Literata at 1.35rem. Body copy is slightly softer than headings (`--ed-body`) so the hierarchy reads in dark mode.

- **Index title** (650, clamp 2.6-5rem, 0.98, -0.035em): series page title.
- **Article title** (650 Geist / 600 Literata, clamp 2.2-3.6rem, 1.04 / 1.08).
- **Row title** (620, clamp 1.4-1.9rem, 1.15; serif 600 for ENS).
- **Body** (LAB 1.0625rem / 1.7; ENS 1.1875rem / 1.74 Literata), max 68ch. Prose h2 1.65rem, h3 1.25rem, in the sans for LAB and serif for ENS.
- **Meta / label** (500-560, 0.75-0.8125rem), sentence case. Group headings in rail and linked notes are 0.8125rem 560 muted, not uppercase.
- **Code label** (Geist Mono 0.8125rem, 560, accent colour): entry codes and map node labels (11px in the SVG).

### Named Rules
**The Mono Is For Codes Rule.** Geist Mono is used for entry codes, counts, map labels and code blocks. Never for headings or running copy.
**The Serif Is Reading Rule.** Literata appears only where an ENS text is being read or titled.

## Layout

Wrapper `ed-wrap`: max 1240px, side padding clamp(16px, 4vw, 40px).
- **Index:** at 960px and up, a two-column head (0.9fr title and switch, 1.2fr vault map), then filter chips, then the list of rows. Below, a single stack; top padding 96px on phones.
- **Article:** at 1120px and up, three columns `13.5rem | 41rem | 15rem`, centred, gap 32px 56px: sticky properties panel (top 112px), prose column, sticky rail with TOC and compact map (max-height viewport minus 136px, own scroll). Below 1120px the stack is one column, the properties panel becomes a two-column grid, the rail is hidden and replaced by a collapsible TOC (details).
- **Rows:** at 820px and up a grid `11rem | 1fr | auto` (meta, title and description, arrow); below it, stacked. Vertical padding 28px.
- Prose measure 68ch; linked notes and share row sit under the prose at the same measure, 56px below.

## Elevation & Depth

Flat with hairlines. The only shadow is the soft ambient `0 1px 2px` + `0 8px 24px -12px` (stronger in dark) on the vault map on the index; in the article rail the map drops it. Depth otherwise comes from the surface/ground contrast and 1px lines. A dotted 22px grid sits inside the map as its paper texture.

### Named Rules
**The Hairline Rule.** Separation is a 1px line (`line` quiet, `line-strong` for panels and controls). No hard offset shadows, no stacked cards.

## Shapes

Pill (999px) for the switch, chips, tags; 14px for the map; 10px for panels, code blocks, figures, mobile TOC; 8px for the fallback notice and skip link; 6px for wikilink chips; 5px inline code; 3px on focus outlines. Dashed 1px border marks the "falls back to pt-BR" notice.

## Components

### Switch pill
Two links (LAB / ENS) in a pill on `surface` with a strong hairline, 3px inner padding. The current one takes a 16% tint of the series accent and full ink; the other stays muted, ink on hover. Each carries a mono count in the accent. 180ms ease-out on background.

### Filter chips
Ghost pills: transparent, strong hairline, muted 0.8125rem 500 text, padding 5px 12px. Hover shifts text and border to ink. `aria-pressed="true"` uses accent border, ink text and a 14% accent tint. A strong rule closes the filter row.

### Entry row
Hairline-separated, no card. Meta column (mono code in accent, date, reading time), then title and description (62ch, muted) with `#tag` text, then an arrow. Hover or focus recolours the title to the accent and slides the arrow 6px right (220ms). ENS rows set the title in Literata.

### Vault map (signature)
An SVG of every entry as a node and every real link as a curved edge, on a dotted paper in a 14px frame with a caption line (aria-live) naming the focused note.
- **Nodes:** filled circles in the series colour; the other series drawn at 72% opacity; the focused node gets a ring (halo) and ink-coloured label. Labels are mono 11px, muted, with a surface-coloured stroke halo for legibility. Keyboard focus shows the halo.
- **Edges:** 1.25px in `edge`; hot edges (touching the focus) go ink at 1.75px; unrelated edges dim to 25%, unrelated nodes to 30%.
- **Interaction:** hovering a list row or a node focuses it; leaving clears it.
- **Compact rail mode:** in the article rail only the current note and its neighbours are drawn, cropped to the neighbourhood (about 3:2), marks scaled so labels land near 11px in a 240px rail; all of its edges are hot; frame has no shadow.
- **Mobile (640px and under):** labels are hidden except the focused one, which is enlarged to 21px; nodes grow to r 11 (14 when hot), hit area r 34, edges 2px; the caption is hidden. The compact rail is exempt from these overrides.
- **Print:** map, rail, progress and share are hidden.

### Properties panel
Left column metadata card: `surface` fill, strong hairline, 10px radius, 16px 18px padding, a definition list with 0.75rem muted terms and ink values. The entry code is mono in the accent. Tags are pill chips with a 14% accent tint. Two columns when stacked, one when in the sticky column.

### Wikilink chip
An in-prose link between notes: no underline, accent text, a 13% accent tint (24% on hover), 6px radius, small horizontal padding. It takes the colour of the series it points at (`data-series` on the link). Ordinary prose links are ink with a 1.5px underline in a 70% accent tint that turns solid on hover.

### Backlink list (linked notes)
Under the article: heading in muted 0.8125rem, then a hairline list of rows with a mono code in a 5.2rem column and the title (540 weight) plus a muted excerpt. Hover recolours title and code to the accent. Empty state is plain muted text.

### Table of contents
Sticky rail list with a 1px left rule per item; the current section (`aria-current="true"`) takes ink text and an accent rule. On narrow screens it is a bordered `details` block. Heading anchors keep a 96px scroll margin.

### Reading extras
A 2px reading-progress bar fixed to the top in the accent (scaleX from a CSS variable). Share row: underlined text actions in ink with a strong-hairline underline that turns accent on hover. A skip link sits off-screen until focused.

### Reading shell (collapsible side panels)
From 1120px the article is three columns: properties (17rem), text, and navigation with the local map (18.5rem). The properties panel starts collapsed and the navigation panel open. Two edge tabs, `Propriedades` and `Navegação e mapa`, collapse each side; the `F` key toggles both (focus mode) and the choice persists in `localStorage` under `ed-panels-v2`. Collapsed, the text column widens from 41rem to 44rem, or 50rem with both closed. Below 1120px the tabs and the right column do not exist. The only layout transition in the system is this one, run once per click.

### Local map (article rail)
A cropped view of the note, the notes that cite it and the ones it points to. The crop width is chosen so node labels fit (labels are about a fifth of the view). The current note carries an accent ring that pulses three times on load; hovering a neighbour shows its code and title in the caption, and clicking goes to it.

### Essay blocks
Visual blocks for essays, written as MDX with string props only. `Aside` (key idea, tinted surface). `Flow` (steps ending in a destination). `Pairs` (said to meant, two columns). `Stack` (layers that build up, indented by level). `Timeline` (dated milestones, years in mono). `Versus` (two positions compared row by row). `Parable` (the village, the abyss and two maps, an authored SVG). They use the series accent, the hairline rule and the sans face; none adds a shadow. Captions are 0.8125rem muted.

### Motion rule
**One authored moment.** On first paint the map's edges draw in (dash offset, 1100ms, expo-out, staggered 55ms by index) and the nodes fade in (600ms, 45ms stagger). Everything else is a 160-220ms state transition (colour, border, arrow slide, node radius). All animation sits under `prefers-reduced-motion: no-preference`; with reduced motion the map is simply there. Easing is `cubic-bezier(0.16, 1, 0.3, 1)`.

## Do's and Don'ts

### Do:
- **Do** read colour from `--ed-accent` and set `data-series` on any block that belongs to one series.
- **Do** show codes (LAB-001, ENS-001) in Geist Mono with tabular numerals, in the accent.
- **Do** keep text in the 68ch measure and separate entries with hairlines.
- **Do** tint with `color-mix` at 13-16% for selected or linked states.
- **Do** keep the focus ring: 2px accent outline, 3px offset.

### Don't:
- **Don't** use series colours as large filled surfaces or for anything that is not series identity or state.
- **Don't** add hard offset shadows or equal-card grids with coloured tags; the world is a vault of hairlined rows.
- **Don't** use Geist Mono for headings or body, or Literata outside ENS reading.
- **Don't** add a second motion moment or any animation outside `prefers-reduced-motion: no-preference`.

## Out of scope

The legacy brutalist nav and footer, the /dev "decision log" world, the home page and the SAERIX pages are different worlds and are not described here. The editorial pages only borrow the nav colour by setting `data-theme="editorial"` on the `.ed` wrapper.
