import type { Metadata } from "next"
import { IndexPage, indexMetadata } from "@/components/editorial/index-page"

type Props = { params: Promise<{ locale: "en" | "pt-BR" }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return indexMetadata("lab", (await params).locale)
}

export default async function LaboratoryPage({ params }: Props) {
  return <IndexPage series="lab" locale={(await params).locale} />
}
