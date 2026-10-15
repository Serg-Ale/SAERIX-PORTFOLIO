import type { Metadata } from "next"
import { ArticlePage, articleMetadata, articleStaticParams } from "@/components/editorial/article-page"

type Props = { params: Promise<{ locale: "en" | "pt-BR"; slug: string }> }

export async function generateStaticParams() {
  return articleStaticParams("essay")
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return articleMetadata("essay", await params)
}

export default async function Page({ params }: Props) {
  return <ArticlePage series="essay" params={await params} />
}
