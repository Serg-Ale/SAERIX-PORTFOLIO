import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/routing"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getAllEssays, getAllLaboratoryEntries, getEssayBySlug, getLaboratoryEntryBySlug, generateTOC } from "@/lib/blog/server"
import { getEditorialGraph, type SeriesType } from "@/lib/blog/graph"
import { EditorialNav } from "./editorial-nav"
import { EditorialFooter } from "./editorial-footer"
import { SkipLink } from "@/components/shared/skip-link"
import { BASE_URL } from "@/lib/constants"
import { getEdMdxComponents } from "./ed-mdx"
import { TocList } from "./toc-rail"
import { ReadingProgress, ShareRow } from "./article-extras"
import { RailMap } from "./rail-map"
import { ReadingShell } from "./reading-shell"
import { SERIES, entryHref } from "./series"
import "./editorial.css"

type Locale = "en" | "pt-BR"
type Params = { locale: Locale; slug: string }

const loaders = {
  essay: { all: getAllEssays, one: getEssayBySlug },
  lab: { all: getAllLaboratoryEntries, one: getLaboratoryEntryBySlug },
}

export async function articleStaticParams(series: SeriesType) {
  const params: Params[] = []
  for (const locale of ["en", "pt-BR"] as const) {
    for (const post of await loaders[series].all(locale, false)) params.push({ locale, slug: post.slug })
  }
  return params
}

export async function articleMetadata(series: SeriesType, { locale, slug }: Params): Promise<Metadata> {
  const post = await loaders[series].one(slug, locale)
  if (!post) return { title: "Not found" }

  const pageLocale = post.isLocaleFallback ? post.sourceLocale || "pt-BR" : locale
  const url = `${BASE_URL}/${pageLocale}${SERIES[series].path}/${slug}`
  const image = `/og?type=blog&title=${encodeURIComponent(post.title)}`

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(", "),
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: "SAERIX",
      type: "article",
      locale: pageLocale === "pt-BR" ? "pt_BR" : "en_US",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [image] },
    alternates: {
      canonical: url,
      languages: { en: `/en${SERIES[series].path}/${slug}`, "pt-BR": `/pt-BR${SERIES[series].path}/${slug}` },
    },
  }
}

function formatDate(date: string, locale: string) {
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" }).format(new Date(date))
}

export async function ArticlePage({ series, params }: { series: SeriesType; params: Params }) {
  const { locale, slug } = params
  const post = await loaders[series].one(slug, locale)
  if (!post) notFound()

  const t = await getTranslations("editorial")
  const graph = await getEditorialGraph(locale)
  const headings = generateTOC(post.content).filter((heading) => heading.level === 2)

  const nodeBySlug = new Map(graph.nodes.map((node) => [node.slug, node]))
  const citedBy = graph.edges.filter((edge) => edge.to === slug).map((edge) => nodeBySlug.get(edge.from)!).filter(Boolean)
  const pointsTo = graph.edges.filter((edge) => edge.from === slug).map((edge) => nodeBySlug.get(edge.to)!).filter(Boolean)

  const pageLocale = post.isLocaleFallback ? post.sourceLocale || locale : locale
  const url = `${BASE_URL}/${pageLocale}${SERIES[series].path}/${slug}`

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Person", name: post.author, url: BASE_URL },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      keywords: post.tags.join(", "),
      inLanguage: pageLocale === "pt-BR" ? "pt-BR" : "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: t(`series.${series}.name`), item: `${BASE_URL}/${pageLocale}${SERIES[series].path}` },
        { "@type": "ListItem", position: 3, name: post.title },
      ],
    },
  ]

  const linked = [
    { key: "citedBy", items: citedBy },
    { key: "pointsTo", items: pointsTo },
  ].filter((group) => group.items.length > 0)

  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SkipLink targetId="article-content" />
      <div className="ed" data-series={series}>
        <EditorialNav />
        <ReadingProgress />
        <div className="ed-wrap">
          <ReadingShell
            props={
            <aside className="ed-props" aria-label={t("props.label")}>
              <Link href={SERIES[series].path} className="ed-back">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 10H4M9 5l-5 5 5 5" />
                </svg>
                {t(`series.${series}.name`)}
              </Link>
              <dl className="ed-props-grid">
                <div>
                  <dt>{t("props.code")}</dt>
                  <dd className="ed-mono ed-code">{post.code}</dd>
                </div>
                <div>
                  <dt>{t("props.date")}</dt>
                  <dd>
                    <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                  </dd>
                </div>
                <div>
                  <dt>{t("props.reading")}</dt>
                  <dd>{t("reading", { minutes: post.readingTime })}</dd>
                </div>
                <div>
                  <dt>{t("props.tags")}</dt>
                  <dd className="ed-tags">
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </dd>
                </div>
              </dl>
            </aside>
            }
            rail={
            <aside className="ed-rail ed-rail-desktop" aria-label={t("rail")}>
              {headings.length > 2 && (
                <>
                  <h2>{t("toc")}</h2>
                  <TocList headings={headings} />
                </>
              )}
              <h2>{t("map.title")}</h2>
              <RailMap graph={graph} series={series} current={slug} />
            </aside>
            }
          >
            <div className="ed-main" style={{ minWidth: 0 }} lang={post.isLocaleFallback ? post.sourceLocale || "pt-BR" : undefined}>
              <header className="ed-head">
                {post.isLocaleFallback && <p className="ed-fallback">{t("fallback")}</p>}
                <h1>{post.title}</h1>
                <p>{post.description}</p>
              </header>

              {headings.length > 2 && (
                <details className="ed-toc-mobile">
                  <summary>{t("toc")}</summary>
                  <TocList headings={headings} />
                </details>
              )}

              <article id="article-content" className="ed-prose">
                <MDXRemote source={post.content} components={getEdMdxComponents(series)} />
              </article>

              <div className="ed-below">
                {linked.map((group) => (
                  <section key={group.key} className="ed-linked">
                    <h2>{t(group.key)}</h2>
                    <ul>
                      {group.items.map((node) => (
                        <li key={node.slug}>
                          <Link href={entryHref(node.type, node.slug)}>
                            <span className="ed-mono">{node.code}</span>
                            <span>
                              {node.title}
                              <span className="ed-excerpt">{node.description}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
                <ShareRow title={post.title} url={url} />
              </div>
            </div>

          </ReadingShell>
        </div>
        <EditorialFooter />
      </div>
    </main>
  )
}
