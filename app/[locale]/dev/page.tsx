import { PortfolioNav } from "@/components/portfolio/nav"
import { PortfolioFooter } from "@/components/portfolio/footer"
import { VariantB1aMagazineSpread } from "@/components/portfolio/prototype/variant-b1a-magazine-spread"
import { RebrandPrototypeHost } from "@/components/portfolio/rebrand-prototype/rebrand-prototype-host"
import { getAllEssays } from "@/lib/blog/server"
import { BASE_URL } from "@/lib/constants"
import { Metadata } from "next"

interface PageProps {
  params: Promise<{ locale: "en" | "pt-BR" }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params

  const titles: Record<string, string> = {
    en: "Sérgio Alexandre — Full-Stack Software Engineer",
    "pt-BR": "Sérgio Alexandre — Engenheiro de Software Full-Stack",
  }

  const descriptions: Record<string, string> = {
    en: "Full-stack engineer with 4+ years shipping web products end to end with TypeScript, React, Next.js and NestJS, at Aeon Tech and Kaizen. Open to mid-level roles, remote or in Londrina.",
    "pt-BR":
      "Engenheiro full-stack com 4+ anos entregando produtos web de ponta a ponta com TypeScript, React, Next.js e NestJS, na Aeon Tech e na Kaizen. Aberto a vagas de nível pleno, remoto ou em Londrina.",
  }

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: `${BASE_URL}/${locale}/dev`,
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${BASE_URL}/${locale}/dev`,
      siteName: "SAERIX Portfolio",
      type: "website",
      images: [{ url: "/og-default.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale],
      description: descriptions[locale],
      images: ["/og-default.png"],
    },
  }
}

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sérgio Alexandre",
  jobTitle: "Full-Stack Software Engineer",
  url: BASE_URL,
  sameAs: [
    "https://github.com/Serg-Ale",
    "https://x.com/OAlexandreSerg",
    "https://linkedin.com/in/serg-alexandre",
  ],
  worksFor: [
    { "@type": "Organization", name: "Aeon Tech" },
    { "@type": "Organization", name: "Kaizen" },
  ],
  alumniOf: { "@type": "EducationalOrganization", name: "UTFPR" },
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "NestJS",
    "Node.js",
    "PostgreSQL",
    "Tailwind CSS",
    "FastAPI",
    "tRPC",
    "n8n",
    "AI Agent Orchestration",
  ],
  nationality: { "@type": "Country", name: "Brazil" },
  speakingLanguages: ["en", "pt-BR"],
}

// Default is the decision-log page. ?variant=B is the scenes comparison and
// ?variant=A is the previous magazine-spread landing, both kept until cleanup.
export default async function DevPortfolio({
  params,
  searchParams,
}: PageProps & { searchParams: Promise<{ variant?: string }> }) {
  const { locale } = await params
  const { variant } = await searchParams

  if (variant === "B") {
    return <RebrandPrototypeHost variant="B" locale={locale} />
  }

  if (variant === "A") {
    const allPosts = await getAllEssays(locale, false)
    const recentPosts = allPosts.slice(0, 2)
    return (
      <>
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:font-bold focus:border-2 focus:border-background"
        >
          Skip to main content
        </a>
        <PortfolioNav />
        <VariantB1aMagazineSpread locale={locale} posts={recentPosts} />
        <PortfolioFooter />
      </>
    )
  }

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:font-bold focus:border-2 focus:border-background"
      >
        {locale === "pt-BR" ? "Pular para o conteúdo" : "Skip to main content"}
      </a>
      <RebrandPrototypeHost variant="C" locale={locale} />
    </>
  )
}
