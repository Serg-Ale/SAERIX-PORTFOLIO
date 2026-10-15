import { getAllPosts } from "./get-posts"

type Locale = "en" | "pt-BR"
export type SeriesType = "essay" | "lab"

export interface GraphNode {
  slug: string
  title: string
  code: string
  type: SeriesType
  description: string
  tags: string[]
  x: number
  y: number
}

export interface GraphEdge {
  from: string
  to: string
}

export interface EditorialGraph {
  nodes: GraphNode[]
  edges: GraphEdge[]
  width: number
  height: number
}

const WIDTH = 720
const MIN_HEIGHT = 440
const PAD = 56
const LINK_PATTERN = /\]\(\/(ensaios|laboratorio)\/([a-z0-9-]+)\)/g

/**
 * Builds the note graph from the links that already exist in the texts.
 * Layout is a fixed-iteration force simulation seeded by order, so the
 * same content always renders the same map.
 */
export async function getEditorialGraph(locale: Locale): Promise<EditorialGraph> {
  const posts = await getAllPosts(locale, false)
  const published = posts.filter((post) => post.contentType === "essay" || post.contentType === "lab")
  const slugs = new Set(published.map((post) => post.slug))

  const edgeKeys = new Set<string>()
  const edges: GraphEdge[] = []
  for (const post of published) {
    for (const match of post.content.matchAll(LINK_PATTERN)) {
      const target = match[2]
      if (target === post.slug || !slugs.has(target)) continue
      const key = `${post.slug}>${target}`
      if (edgeKeys.has(key)) continue
      edgeKeys.add(key)
      edges.push({ from: post.slug, to: target })
    }
  }

  const ordered = [...published].sort((a, b) => (a.code ?? a.slug).localeCompare(b.code ?? b.slug))
  const labCount = ordered.filter((post) => post.contentType === "lab").length
  const essayCount = ordered.length - labCount
  const HEIGHT = Math.max(MIN_HEIGHT, Math.max(labCount, essayCount) * 34 + PAD * 2)
  let labIndex = 0
  let essayIndex = 0

  const points = ordered.map((post) => {
    const isLab = post.contentType === "lab"
    const index = isLab ? labIndex++ : essayIndex++
    const count = isLab ? labCount : essayCount
    return {
      slug: post.slug,
      type: post.contentType as SeriesType,
      homeX: WIDTH * (isLab ? 0.3 : 0.7),
      x: WIDTH * (isLab ? 0.3 : 0.7) + ((index % 2) - 0.5) * 40,
      y: PAD + ((index + 0.5) / Math.max(count, 1)) * (HEIGHT - PAD * 2),
      vx: 0,
      vy: 0,
    }
  })

  const byslug = new Map(points.map((point) => [point.slug, point]))

  for (let step = 0; step < 320; step++) {
    const cooling = 1 - step / 320
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const a = points[i]
        const b = points[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const dist2 = Math.max(dx * dx + dy * dy, 25)
        const force = 9000 / dist2
        const dist = Math.sqrt(dist2)
        a.vx += (dx / dist) * force
        a.vy += (dy / dist) * force
        b.vx -= (dx / dist) * force
        b.vy -= (dy / dist) * force
      }
    }
    for (const edge of edges) {
      const a = byslug.get(edge.from)!
      const b = byslug.get(edge.to)!
      const dx = b.x - a.x
      const dy = b.y - a.y
      const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 1)
      const pull = (dist - 150) * 0.02
      a.vx += (dx / dist) * pull
      a.vy += (dy / dist) * pull
      b.vx -= (dx / dist) * pull
      b.vy -= (dy / dist) * pull
    }
    for (const point of points) {
      point.vx += (point.homeX - point.x) * 0.012
      point.vy += (HEIGHT / 2 - point.y) * 0.004
      point.x += point.vx * 0.5 * cooling
      point.y += point.vy * 0.5 * cooling
      point.vx *= 0.6
      point.vy *= 0.6
      point.x = Math.min(WIDTH - PAD, Math.max(PAD, point.x))
      point.y = Math.min(HEIGHT - PAD, Math.max(PAD, point.y))
    }
  }

  const xs = points.map((point) => point.x)
  const ys = points.map((point) => point.y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  for (const point of points) {
    point.x = PAD + ((point.x - minX) / Math.max(maxX - minX, 1)) * (WIDTH - PAD * 2)
    point.y = PAD + ((point.y - minY) / Math.max(maxY - minY, 1)) * (HEIGHT - PAD * 2)
  }

  const nodes: GraphNode[] = ordered.map((post) => {
    const point = byslug.get(post.slug)!
    return {
      slug: post.slug,
      title: post.title,
      code: post.code ?? post.slug,
      type: post.contentType as SeriesType,
      description: post.description,
      tags: post.tags,
      x: Math.round(point.x * 10) / 10,
      y: Math.round(point.y * 10) / 10,
    }
  })

  return { nodes, edges, width: WIDTH, height: HEIGHT }
}
