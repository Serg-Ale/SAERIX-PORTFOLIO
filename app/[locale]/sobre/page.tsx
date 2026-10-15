import { Metadata } from "next"
import { PortfolioNav } from "@/components/portfolio/nav"
import { PortfolioAbout } from "@/components/portfolio/about"
import { PortfolioTimeline } from "@/components/portfolio/timeline"
import { PortfolioFooter } from "@/components/portfolio/footer"
import { BASE_URL } from "@/lib/constants"

interface PageProps {
  params: Promise<{
    locale: "en" | "pt-BR"
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: "About — Sérgio Alexandre",
    "pt-BR": "Sobre — Sérgio Alexandre",
  }

  const descriptions: Record<string, string> = {
    en: "Full-stack software engineer with 4+ years owning architecture end-to-end, shipping AI-powered automation, and mentoring newer developers.",
    "pt-BR": "Engenheiro de software full-stack com 4+ anos de experiência, responsável por arquitetura de ponta a ponta, automações com IA e mentoria de desenvolvedores mais novos.",
  }

  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${BASE_URL}/${locale}/sobre`,
      siteName: "SAERIX",
      type: "website",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}/sobre`,
      languages: {
        en: "/en/sobre",
        "pt-BR": "/pt-BR/sobre",
      },
    },
  }
}

export default async function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <PortfolioNav />
      <div className="pt-24">
        <PortfolioAbout />
        <PortfolioTimeline />
      </div>
      <PortfolioFooter />
    </main>
  )
}
