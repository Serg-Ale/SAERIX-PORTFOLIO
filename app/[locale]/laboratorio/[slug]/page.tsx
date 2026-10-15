import type { Metadata } from "next"
import { ArticlePage, articleMetadata, articleStaticParams } from "@/components/editorial/article-page"

type Props = { params: Promise<{ locale: "en" | "pt-BR"; slug: string }> }

export async function generateStaticParams() {
  return articleStaticParams("lab")
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return articleMetadata("lab", await params)
}

export default async function Page({ params }: Props) {
  return <ArticlePage series="lab" params={await params} />
}
