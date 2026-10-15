// @ts-nocheck
import { slugify } from "@/lib/blog/generate-toc"
import type { SeriesType } from "@/lib/blog/graph"
import { Aside, Flow, Pairs, Parable, Stack, Timeline, Versus } from "./ed-blocks"

function textOf(node: any): string {
  if (node == null || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textOf).join("")
  return textOf(node.props?.children)
}

const QUOTED = /^["“].+["”]$/s

function Img({ src, alt }: { src?: string; alt?: string }) {
  return (
    <figure>
      <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" />
      {alt ? <figcaption>{alt}</figcaption> : null}
    </figure>
  )
}

function CodeHighlighted({ lightHtml, darkHtml }: { lightHtml: string; darkHtml: string }) {
  return (
    <div className="code-highlighted">
      <div className="code-light" dangerouslySetInnerHTML={{ __html: lightHtml }} />
      <div className="code-dark" dangerouslySetInnerHTML={{ __html: darkHtml }} />
    </div>
  )
}

export function getEdMdxComponents(series: SeriesType) {
  return {
    CodeHighlighted,
    Aside,
    Flow,
    Pairs,
    Parable,
    Stack,
    Timeline,
    Versus,
    h2: ({ children, ...props }) => (
      <h2 id={slugify(textOf(children))} {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 id={slugify(textOf(children))} {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => {
      if (children?.type === Img) return <>{children}</>
      const text = typeof children === "string" ? children.trim() : ""
      const pull = series === "essay" && text.length > 60 && QUOTED.test(text)
      return (
        <p className={pull ? "ed-pull" : undefined} {...props}>
          {children}
        </p>
      )
    },
    a: ({ children, href, ...props }) => {
      const external = typeof href === "string" && /^https?:\/\//.test(href)
      const target = typeof href === "string" ? (href.startsWith("/ensaios/") ? "essay" : href.startsWith("/laboratorio/") ? "lab" : null) : null
      if (target) {
        return (
          <a href={href} className="ed-wikilink" data-series={target} {...props}>
            {children}
          </a>
        )
      }
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...props}>
          {children}
        </a>
      )
    },
    img: Img,
    table: ({ children, ...props }) => (
      <div className="ed-table">
        <table {...props}>{children}</table>
      </div>
    ),
  }
}
