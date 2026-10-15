import type { ReactNode } from "react"

/**
 * Visual blocks for essays. Every block takes plain string props so MDX stays readable
 * and works with next-mdx-remote's JS blocking: lists are `;` separated, pairs use `::`.
 */

const split = (value: string | undefined, separator = ";") =>
  (value ?? "").split(separator).map((part) => part.trim()).filter(Boolean)

function Arrow() {
  return (
    <svg className="ed-arrow" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  )
}

export function Aside({ title, children }: { title?: string; children?: ReactNode }) {
  return (
    <aside className="ed-aside">
      {title ? <p className="ed-aside-title">{title}</p> : null}
      <div>{children}</div>
    </aside>
  )
}

/** A sequence that reads left to right and wraps on small screens. The last step is the destination. */
export function Flow({ steps, caption }: { steps: string; caption?: string }) {
  const items = split(steps, "|")
  return (
    <figure className="ed-fig">
      <ol className="ed-flow">
        {items.map((step, index) => (
          <li key={step} data-last={index === items.length - 1}>
            <span>{step}</span>
            {index < items.length - 1 ? <Arrow /> : null}
          </li>
        ))}
      </ol>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}

/** Two columns of translation: what is said, what it means. `items` is `said::means;said::means`. */
export function Pairs({ from, to, items, caption }: { from?: string; to?: string; items: string; caption?: string }) {
  const rows = split(items).map((row) => row.split("::").map((cell) => cell.trim()))
  return (
    <figure className="ed-fig">
      <table className="ed-pairs">
        {from || to ? (
          <thead>
            <tr>
              <th scope="col">{from}</th>
              <th aria-hidden="true" />
              <th scope="col">{to}</th>
            </tr>
          </thead>
        ) : null}
        <tbody>
          {rows.map(([a, b]) => (
            <tr key={a}>
              <td>{a}</td>
              <td aria-hidden="true">
                <Arrow />
              </td>
              <td>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}

/** Layers from the bottom of the argument up. `layers` is `Name::meaning;Name::meaning`. */
export function Stack({ layers, caption }: { layers: string; caption?: string }) {
  const rows = split(layers).map((row) => row.split("::").map((cell) => cell.trim()))
  return (
    <figure className="ed-fig">
      <ol className="ed-stack">
        {rows.map(([name, meaning], index) => (
          <li key={name} style={{ ["--n" as string]: index + 1, ["--of" as string]: rows.length }}>
            <strong>{name}</strong>
            <span>{meaning}</span>
          </li>
        ))}
      </ol>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}

/** Dated milestones. `items` is `year::what happened;year::what happened`. */
export function Timeline({ items, caption }: { items: string; caption?: string }) {
  const rows = split(items).map((row) => row.split("::").map((cell) => cell.trim()))
  return (
    <figure className="ed-fig">
      <ol className="ed-timeline">
        {rows.map(([year, text]) => (
          <li key={year + text}>
            <span className="ed-mono">{year}</span>
            <p>{text}</p>
          </li>
        ))}
      </ol>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}

/** Two positions compared row by row. `rows` is `left::right;left::right`. */
export function Versus({ left, right, rows, caption }: { left: string; right: string; rows: string; caption?: string }) {
  const lines = split(rows).map((row) => row.split("::").map((cell) => cell.trim()))
  return (
    <figure className="ed-fig">
      <table className="ed-versus">
        <thead>
          <tr>
            <th scope="col">{left}</th>
            <th scope="col">{right}</th>
          </tr>
        </thead>
        <tbody>
          {lines.map(([a, b]) => (
            <tr key={a}>
              <td>{a}</td>
              <td>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}

/** The village, the abyss and two maps: one that became dogma, one corrected by the terrain. */
export function Parable({ caption }: { caption?: string }) {
  return (
    <figure className="ed-fig ed-parable">
      <div className="ed-parable-scroll">
        <svg viewBox="0 0 640 270" role="img" aria-label="Uma vila à esquerda, um abismo à direita. Um caminho tracejado, o mapa sagrado, segue reto e termina na borda do abismo. Um caminho contínuo, o mapa corrigido, contorna a borda até uma lanterna.">
          <defs>
            <pattern id="ed-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
              <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.18" />
            </pattern>
          </defs>
          {/* ground and abyss */}
          <path d="M0 190 H372 L372 270 H0 Z" className="ed-p-ground" />
          <path d="M372 190 L372 270 H640 V190 Z" fill="url(#ed-hatch)" />
          <path d="M372 190 L372 270" className="ed-p-edge" />
          {/* fog */}
          <g className="ed-p-fog">
            <ellipse cx="450" cy="205" rx="70" ry="12" />
            <ellipse cx="540" cy="225" rx="80" ry="14" />
            <ellipse cx="480" cy="250" rx="90" ry="12" />
          </g>
          {/* village */}
          <g className="ed-p-village">
            <path d="M40 190 v-34 l22 -18 l22 18 v34 z" />
            <path d="M104 190 v-26 l18 -15 l18 15 v26 z" />
            <path d="M158 190 v-40 l24 -20 l24 20 v40 z" />
          </g>
          {/* sacred map: straight, ends at the edge */}
          <path d="M60 206 H360" className="ed-p-dogma" />
          <path d="M360 206 H410" className="ed-p-dogma ed-p-dogma-fall" />
          <g className="ed-p-cross">
            <path d="M404 199 l12 14 M416 199 l-12 14" />
          </g>
          {/* corrected map: bends back along the edge to a lantern */}
          <path d="M60 224 C 160 224 230 240 300 236 S 350 214 330 196" className="ed-p-fix" />
          <circle cx="330" cy="190" r="16" className="ed-p-glow" />
          <circle cx="330" cy="190" r="4.5" className="ed-p-lamp" />
          {/* labels */}
          <text x="60" y="108" className="ed-p-label">a vila</text>
          <text x="60" y="256" className="ed-p-label ed-p-label-fix">o mapa corrigido pelo terreno</text>
          <text x="430" y="200" className="ed-p-label ed-p-label-dogma">o mapa que virou dogma</text>
          <text x="470" y="140" className="ed-p-label">o abismo</text>
        </svg>
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  )
}
