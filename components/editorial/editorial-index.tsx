"use client"

import { useMemo, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import type { EditorialGraph, SeriesType } from "@/lib/blog/graph"
import type { Post } from "@/lib/blog"
import { VaultMap } from "./vault-map"
import { SERIES, entryHref, otherSeries } from "./series"
import "./editorial.css"

interface EditorialIndexProps {
  series: SeriesType
  entries: Post[]
  counts: Record<SeriesType, number>
  graph: EditorialGraph
}

function formatDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "numeric" }).format(new Date(date))
}

export function EditorialIndex({ series, entries, counts, graph }: EditorialIndexProps) {
  const t = useTranslations("editorial")
  const locale = useLocale()
  const [focus, setFocus] = useState<string | null>(null)
  const [tag, setTag] = useState<string | null>(null)

  const tags = useMemo(() => {
    const tally = new Map<string, number>()
    for (const entry of entries) for (const name of entry.tags) tally.set(name, (tally.get(name) ?? 0) + 1)
    return [...tally.entries()]
      .filter(([, count]) => count > 1)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name]) => name)
  }, [entries])

  const visible = tag ? entries.filter((entry) => entry.tags.includes(tag)) : entries
  const focused = focus ? graph.nodes.find((node) => node.slug === focus) : null
  const other = otherSeries(series)

  return (
    <div data-series={series}>
      <div className="ed-wrap">
        <div className="ed-index-head">
          <div>
            <h1 className="ed-title">{t(`series.${series}.name`)}</h1>
            <p className="ed-lede">{t(`series.${series}.blurb`)}</p>
            <nav className="ed-switch" aria-label={t("seriesNav")}>
              {(["lab", "essay"] as SeriesType[]).map((item) => (
                <Link
                  key={item}
                  href={SERIES[item].path}
                  data-series={item}
                  aria-current={item === series ? "page" : undefined}
                >
                  {t(`series.${item}.name`)}
                  <span className="ed-count">{counts[item]}</span>
                </Link>
              ))}
            </nav>
          </div>

          <figure className="ed-map" style={{ margin: 0 }}>
            <a className="ed-skip" href="#ed-list">
              {t("skipMap")}
            </a>
            <VaultMap
              graph={graph}
              activeSeries={series}
              focusSlug={focus}
              onFocusChange={setFocus}
              label={t("map.label")}
            />
            <figcaption className="ed-map-caption" aria-live="polite">
              {focused ? (
                <span>
                  <span className="ed-mono">{focused.code}</span> <strong>{focused.title}</strong>
                </span>
              ) : (
                <span>{t("map.caption")}</span>
              )}
            </figcaption>
          </figure>
        </div>

        {tags.length > 0 && (
          <div className="ed-filters" role="group" aria-label={t("filterByTag")}>
            <button type="button" className="ed-chip" aria-pressed={tag === null} onClick={() => setTag(null)}>
              {t("allTags")}
            </button>
            {tags.map((name) => (
              <button
                key={name}
                type="button"
                className="ed-chip"
                aria-pressed={tag === name}
                onClick={() => setTag(tag === name ? null : name)}
              >
                {name}
              </button>
            ))}
          </div>
        )}

        {entries.some((entry) => entry.isLocaleFallback) && <p className="ed-note">{t("fallback")}</p>}

        {visible.length === 0 ? (
          <p className="ed-empty">{t("empty")}</p>
        ) : (
          <ul id="ed-list" className="ed-list">
            {visible.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={entryHref(series, entry.slug)}
                  className="ed-row"
                  data-series={series}
                  lang={entry.isLocaleFallback ? entry.sourceLocale || "pt-BR" : undefined}
                  onMouseEnter={() => setFocus(entry.slug)}
                  onMouseLeave={() => setFocus(null)}
                  onFocus={() => setFocus(entry.slug)}
                  onBlur={() => setFocus(null)}
                >
                  <div className="ed-row-meta">
                    <span className="ed-row-code ed-mono">{entry.code}</span>
                    <time dateTime={entry.date}>{formatDate(entry.date, locale)}</time>
                    <span>{t("reading", { minutes: entry.readingTime })}</span>
                  </div>
                  <div>
                    <h2 className="ed-row-title">{entry.title}</h2>
                    <p className="ed-row-desc">{entry.description}</p>
                    <div className="ed-row-tags">
                      {entry.tags.slice(0, 4).map((name) => (
                        <span key={name}>{name}</span>
                      ))}
                    </div>
                  </div>
                  <span className="ed-row-go" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 10h12M11 5l5 5-5 5" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Link href={SERIES[other].path} className="ed-other">
          {t("seeOther", { series: t(`series.${other}.name`) })}
        </Link>
      </div>
    </div>
  )
}
