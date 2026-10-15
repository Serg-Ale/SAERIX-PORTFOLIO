# Editorial Content Structure

This repository now uses an **editorial-first** model with two distinct content roots:

- `content/essays/` for long-form authorial essays (`ensaios`)
- `content/laboratory/` for experimental and iterative pieces (`laboratorio`)

The old `/blog` and `content/posts/` no longer exist. `/blog` redirects permanently to `/laboratorio`, and each old slug redirects to its new series.

## 1) Essays (`content/essays/`)

Each essay lives in its own slug folder:

```txt
content/essays/
├── essay-slug/
│   ├── index.pt-BR.mdx
│   ├── index.en.mdx        # optional
│   └── images/             # optional
```

## 2) Laboratory (`content/laboratory/`)

Each laboratory entry also lives in its own slug folder:

```txt
content/laboratory/
├── experiment-slug/
│   ├── index.pt-BR.mdx
│   ├── index.en.mdx        # optional
│   └── images/             # optional
```

## 3) Drafts

Work-in-progress entries stay under `content/drafts/` and are only intended for development visibility.

```txt
content/drafts/
├── some-entry/
│   ├── index.pt-BR.mdx
│   └── index.en.mdx        # optional
```

## Frontmatter Contract

```yaml
---
title: "Entry title"
description: "Brief description for SEO and cards"
date: "2026-05-21"
tags: ["tag1", "tag2"]
author: "Sérgio Alexandre"
locale: "pt-BR" # or "en"
slug: "entry-slug"
contentType: "essay" # or "lab"
code: "ENS-009" # stable id; ENS-nnn for essays, LAB-nnn for laboratory
draft: false
---
```

## Links make the map

The vault map on the index pages and the "Cited by / Points to" lists on articles are built from real links in the text. Link another entry with a plain Markdown link, `[text](/ensaios/slug)` or `[text](/laboratorio/slug)`. No extra metadata is needed. See `lib/blog/graph.ts`.

### Optional frontmatter

- `image`
- `coverImage`
- `readingTime`

## PT-BR-first Publication Rule

PT-BR is allowed as the primary publication language.

- `index.pt-BR.mdx` can be published without `index.en.mdx`
- `index.en.mdx` can be added later as a translation
- Missing EN versions should use loader-level fallback behavior rather than hard 404 where applicable

## Images

Images are served from `public/`. Put them under `public/blog/<slug>/` and reference them with an absolute path. The `alt` text is also shown as the caption.

```markdown
![Description](/blog/entry-slug/diagram.png)
```
