"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import type { EditorialGraph, SeriesType } from "@/lib/blog/graph"
import { VaultMap } from "./vault-map"

/** Local graph for the article rail: the current note, who links to it and where it points. */
export function RailMap({ graph, series, current }: { graph: EditorialGraph; series: SeriesType; current: string }) {
  const t = useTranslations("editorial")
  const [hover, setHover] = useState<string | null>(null)
  const shown = graph.nodes.find((node) => node.slug === (hover ?? current))
  const isCurrent = !hover || hover === current

  return (
    <figure className="ed-map ed-map-rail" style={{ margin: 0 }}>
      <VaultMap
        graph={graph}
        activeSeries={series}
        focusSlug={current}
        currentSlug={current}
        onFocusChange={(slug) => setHover(slug)}
        compact
        label={t("map.label")}
      />
      <figcaption className="ed-map-caption" aria-live="polite">
        {shown && (
          <span>
            <span className="ed-mono">{shown.code}</span> <strong>{shown.title}</strong>
            {isCurrent ? <em className="ed-here"> {t("here")}</em> : null}
          </span>
        )}
      </figcaption>
    </figure>
  )
}
