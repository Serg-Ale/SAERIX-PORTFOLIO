import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { getAllEssays, getAllLaboratoryEntries } from "@/lib/blog/server"
import { getEditorialGraph, type SeriesType } from "@/lib/blog/graph"
import { EditorialNav } from "./editorial-nav"
import { EditorialFooter } from "./editorial-footer"
import { SkipLink } from "@/components/shared/skip-link"
import { BASE_URL } from "@/lib/constants"
import { EditorialIndex } from "./editorial-index"
import { SERIES } from "./series"

type Locale = "en" | "pt-BR"

export async function indexMetadata(series: SeriesType, locale: Locale): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "editorial" })
  const title = `${t(`series.${series}.name`)} — Sérgio Alexandre`
  const description = t(`series.${series}.blurb`)
  const path = SERIES[series].path
  const image = `/og?type=blog&title=${encodeURIComponent(t(`series.${series}.name`))}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}${path}`,
      siteName: "SAERIX",
      type: "website",
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    alternates: { canonical: `${BASE_URL}/${locale}${path}`, languages: { en: `/en${path}`, "pt-BR": `/pt-BR${path}` } },
  }
}

export async function IndexPage({ series, locale }: { series: SeriesType; locale: Locale }) {
  const [essays, labs, graph] = await Promise.all([
    getAllEssays(locale, false),
    getAllLaboratoryEntries(locale, false),
    getEditorialGraph(locale),
  ])
  const byCode = (a: { code?: string }, b: { code?: string }) => (b.code ?? "").localeCompare(a.code ?? "")
  const entries = [...(series === "essay" ? essays : labs)].sort(byCode)

  return (
    <main className="min-h-screen">
      <SkipLink targetId="editorial-content" />
      <div id="editorial-content" className="ed">
        <EditorialNav />
        <EditorialIndex series={series} entries={entries} counts={{ essay: essays.length, lab: labs.length }} graph={graph} />
        <EditorialFooter />
      </div>
    </main>
  )
}
