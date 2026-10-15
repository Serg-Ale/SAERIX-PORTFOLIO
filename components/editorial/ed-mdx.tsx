// @ts-nocheck
import { slugify } from "@/lib/blog/generate-toc"
import { highlightCodeCached } from "@/lib/blog/syntax-highlighter"
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

/** Fenced code: highlighted on the server with a light and a dark rendering; CSS picks one. */
async function Pre({ children, ...props }) {
  const code = children?.props
  const language = /language-([\w-]+)/.exec(code?.className ?? "")?.[1]
  const text = typeof code?.children === "string" ? code.children.replace(/\n$/, "") : null
  if (!text || !language) return <pre {...props}>{children}</pre>

  const { light, dark } = await highlightCodeCached(text, language)
  return (
    <div className="ed-codeblock" data-lang={language}>
      <div className="code-light" dangerouslySetInnerHTML={{ __html: light }} />
      <div className="code-dark" dangerouslySetInnerHTML={{ __html: dark }} />
    </div>
  )
}

export function getEdMdxComponents(series: SeriesType) {
  return {
    pre: Pre,
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
