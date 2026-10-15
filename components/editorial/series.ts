import type { SeriesType } from "@/lib/blog/graph"

export const SERIES: Record<SeriesType, { path: string; messageKey: "essay" | "lab" }> = {
  essay: { path: "/ensaios", messageKey: "essay" },
  lab: { path: "/laboratorio", messageKey: "lab" },
}

export function entryHref(type: SeriesType, slug: string) {
  return `${SERIES[type].path}/${slug}`
}

export function otherSeries(type: SeriesType): SeriesType {
  return type === "essay" ? "lab" : "essay"
}
