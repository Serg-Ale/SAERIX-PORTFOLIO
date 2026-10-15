"use client"

import { Link } from "@/i18n/routing"
import type { EditorialGraph, GraphNode, SeriesType } from "@/lib/blog/graph"
import { entryHref } from "./series"

interface VaultMapProps {
  graph: EditorialGraph
  /** Series the page belongs to; the other series is drawn quieter. */
  activeSeries: SeriesType
  /** Slug highlighted from outside the map (list hover, current article). */
  focusSlug?: string | null
  /** The note being read: drawn with an accent ring and a pulse. */
  currentSlug?: string
  onFocusChange?: (slug: string | null) => void
  /** Article rail: only the focus and the notes it links to, cropped and drawn large. */
  compact?: boolean
  label: string
}

type Point = { x: number; y: number }

function curve(from: Point, to: Point) {
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2
  const dx = to.x - from.x
  const dy = to.y - from.y
  const bend = 0.12
  return `M${from.x},${from.y} Q${mx - dy * bend},${my + dx * bend} ${to.x},${to.y}`
}

/** Crop to the focus and its neighbours, at roughly 3:2, with room for labels. */
function localView(nodes: GraphNode[]) {
  const xs = nodes.map((node) => node.x)
  const ys = nodes.map((node) => node.y)
  const spanX = Math.max(...xs) - Math.min(...xs)
  const spanY = Math.max(...ys) - Math.min(...ys)
  // Labels are about a fifth of the view wide, so the crop needs roughly half of itself as margin.
  let w = Math.max(spanX / 0.5, 300)
  let h = Math.max(spanY / 0.62, 190)
  if (w / h > 1.45) h = w / 1.45
  else w = h * 1.45
  const cx = (Math.max(...xs) + Math.min(...xs)) / 2
  const cy = (Math.max(...ys) + Math.min(...ys)) / 2
  return { x: cx - w / 2, y: cy - h / 2, w, h }
}

export function VaultMap({ graph, activeSeries, focusSlug = null, currentSlug, onFocusChange, compact = false, label }: VaultMapProps) {
  const bySlug = new Map(graph.nodes.map((node) => [node.slug, node]))
  const neighbours = new Set<string>()
  if (focusSlug) {
    neighbours.add(focusSlug)
    for (const edge of graph.edges) {
      if (edge.from === focusSlug) neighbours.add(edge.to)
      if (edge.to === focusSlug) neighbours.add(edge.from)
    }
  }

  const nodes = compact ? graph.nodes.filter((node) => neighbours.has(node.slug)) : graph.nodes
  const edges = compact ? graph.edges.filter((edge) => edge.from === focusSlug || edge.to === focusSlug) : graph.edges
  const view = compact && nodes.length > 0 ? localView(nodes) : { x: 0, y: 0, w: graph.width, h: graph.height }
  // In the rail the svg renders about 240px wide; scale marks so labels land near 11px.
  const k = compact ? view.w / 240 : 1
  const focusNode = focusSlug ? bySlug.get(focusSlug) : undefined

  return (
    <svg
      viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
      role="group"
      aria-label={label}
      onMouseLeave={() => onFocusChange?.(null)}
    >
      <g>
        {edges.map((edge, index) => {
          const from = bySlug.get(edge.from)
          const to = bySlug.get(edge.to)
          if (!from || !to) return null
          const hot = focusSlug !== null && (edge.from === focusSlug || edge.to === focusSlug)
          const dim = focusSlug !== null && !hot
          return (
            <path
              key={`${edge.from}-${edge.to}`}
              d={curve(from, to)}
              className="ed-edge"
              pathLength={1}
              data-hot={compact ? true : hot}
              data-dim={dim}
              style={{ ["--i" as string]: index, ...(compact ? { strokeWidth: 1.6 * k } : {}) }}
            />
          )
        })}
      </g>
      <g>
        {nodes.map((node, index) => {
          const hot = focusSlug === node.slug
          const dim = focusSlug !== null && !neighbours.has(node.slug)
          const off = node.type !== activeSeries
          const radius = (compact ? 6 * k : 7) + (hot ? (compact ? 2 * k : 2) : 0)
          const isFocusLabel = compact && node.slug === focusSlug
          const labelRight = compact ? node.x >= (focusNode?.x ?? 0) : node.x < graph.width * 0.72
          const gap = radius + (compact ? 6 * k : 8)
          return (
            <g
              key={node.slug}
              className="ed-node"
              data-series={node.type}
              data-hot={hot}
              data-dim={dim}
              data-current={node.slug === currentSlug}
              data-off={off && !compact}
              style={{ ["--i" as string]: index }}
            >
              <Link
                href={entryHref(node.type, node.slug)}
                aria-label={`${node.code}: ${node.title}`}
                onMouseEnter={() => onFocusChange?.(node.slug)}
                onFocus={() => onFocusChange?.(node.slug)}
                onBlur={() => onFocusChange?.(null)}
              >
                <circle className="hit" cx={node.x} cy={node.y} r={compact ? 14 * k : 20} fill="transparent" />
                <circle className="halo" cx={node.x} cy={node.y} r={radius + (compact ? 4 * k : 5)} />
                <circle className="core" cx={node.x} cy={node.y} r={radius} />
                <text
                  x={isFocusLabel ? node.x : node.x + (labelRight ? 1 : -1) * gap}
                  y={isFocusLabel ? node.y - gap : node.y + (compact ? 4 * k : 4)}
                  textAnchor={isFocusLabel ? "middle" : labelRight ? "start" : "end"}
                  style={compact ? { fontSize: 11 * k, strokeWidth: 3 * k } : undefined}
                >
                  {node.code}
                </text>
              </Link>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
