// Variant C "Decision log", the default /dev page: statement, status, contact and
// a live section index stay pinned on the left; the whole story scrolls on the
// right: proof strip → work (cases, then own projects) → stack → how I work → path →
// contact. Proof comes before claims: the work shows it, the stack sums it up.

import Image from "next/image"
import { getProtoCopy, PROTO_LINKS, type ProtoLocale } from "./copy"
import { PathTimeline } from "./path-timeline"
import { ProofStrip } from "./proof-strip"
import { SpeakDriven } from "./speak-driven"
import { StackSection } from "./stack-section"
import { WorkSection } from "./work-section"
import { KatakanaRain } from "./katakana-rain"
import { SectionNav } from "./section-nav"
import { getProtoStory, INTRO_VIDEO } from "./story"
import { GhostCta, OpenDot, PrimaryCta, ProtoShell } from "./proto-chrome"

export function VariantCDecisionLog({ locale }: { locale: ProtoLocale }) {
  const copy = getProtoCopy(locale)
  const story = getProtoStory(locale)
  const L = story.labels

  const index = [
    { id: "work", label: L.work },
    { id: "stack", label: L.stack },
    { id: "how", label: L.how },
    { id: "journey", label: L.journey },
    { id: "contact", label: L.contact },
  ]

  const replayLabel =
    locale === "pt-BR"
      ? "Replay de uma sessão: o Claude pergunta onde mora a tese de origem e recomenda uma resposta, e eu escolho a."
      : "Replay of a session: Claude asks where the origin story lives and recommends an answer, and I pick it."

  const sectionNumber = (id: string) => index.findIndex((i) => i.id === id) + 1

  return (
    <ProtoShell className="min-h-screen pt-11 lg:grid lg:pt-0 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <aside id="top" className="relative flex flex-col justify-between gap-8 overflow-hidden px-5 py-8 md:px-10 lg:sticky lg:top-0 lg:h-screen lg:border-r lg:border-[var(--line)]">
        <KatakanaRain />
        <div className="relative z-10 flex items-center justify-between font-mono text-xs">
          <span className="flex items-center gap-3">
            <Image
              src="/avatar.webp"
              alt={locale === "pt-BR" ? "Foto de Sérgio Alexandre" : "Photo of Sérgio Alexandre"}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full border border-[var(--line)] object-cover"
              priority
            />
            <span className="font-bold tracking-widest">SÉRGIO ALEXANDRE</span>
          </span>
          <a href={`/${locale}/saerix`} className="text-[var(--muted)] hover:text-[var(--text)]">
            {copy.labels.saerix} ↗
          </a>
        </div>
        <div className="relative z-10 flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 font-mono text-xs">
            <OpenDot />
            {copy.hero.open}
          </span>
          <h1 className="text-[clamp(1.75rem,2.9vw,2.6rem)] font-bold leading-[1.05] tracking-tight">
            {copy.hero.h1}
          </h1>
          <p className="text-base font-semibold leading-snug text-[color-mix(in_srgb,var(--text)_90%,transparent)] md:text-lg">{copy.hero.facts}</p>
          <p className="font-mono text-xs text-[var(--muted)]">{copy.hero.sub}</p>
        </div>
        <div className="relative z-10 flex flex-col gap-6">
          <SectionNav
            items={index}
            introLabel={L.top}
            prevLabel={locale === "pt-BR" ? "Seção anterior" : "Previous section"}
            nextLabel={locale === "pt-BR" ? "Próxima seção" : "Next section"}
          />
          <div className="flex flex-wrap gap-3">
            <PrimaryCta href={PROTO_LINKS.email}>{copy.hero.email}</PrimaryCta>
            <GhostCta href={PROTO_LINKS.linkedin}>LinkedIn</GhostCta>
            <GhostCta href={PROTO_LINKS.github}>GitHub</GhostCta>
            {INTRO_VIDEO[locale] && (
              <GhostCta href={INTRO_VIDEO[locale]}>{locale === "pt-BR" ? "▶ Ver apresentação" : "▶ Watch intro"}</GhostCta>
            )}
          </div>
        </div>
      </aside>

      <main id="main-content" className="px-5 py-12 md:px-10 lg:py-20">
        <ProofStrip items={story.proofStrip} />

        <section id="work" className="scroll-mt-11 lg:scroll-mt-0">
          <Label n={sectionNumber("work")} total={index.length}>{L.work}</Label>

          <WorkSection copy={copy} story={story} locale={locale} />
        </section>

        <section id="stack" className="mt-16 scroll-mt-11 border-t border-[var(--line)] lg:scroll-mt-0">
          <Label n={sectionNumber("stack")} total={index.length}>{L.stack}</Label>
          <StackSection
            groups={story.stack.groups}
            highlightLabel={locale === "pt-BR" ? "Usado no trabalho" : "Used at work"}
          />
        </section>

        <section id="how" className="mt-16 scroll-mt-11 border-t border-[var(--line)] lg:scroll-mt-0">
          <Label n={sectionNumber("how")} total={index.length}>{L.how}</Label>
          <SpeakDriven how={story.how} setup={story.setup} replayLabel={replayLabel} />
        </section>

        <section id="journey" className="mt-16 scroll-mt-11 border-t border-[var(--line)] lg:scroll-mt-0">
          <Label n={sectionNumber("journey")} total={index.length}>{L.journey}</Label>
          <PathTimeline journey={story.journey} currentLabel={locale === "pt-BR" ? "atual" : "current"} />
        </section>

        <section id="contact" className="mt-16 scroll-mt-11 border-t border-[var(--line)] lg:scroll-mt-0">
          <Label n={sectionNumber("contact")} total={index.length}>{L.contact}</Label>
          <h2 className="mb-4 text-2xl font-bold leading-tight md:text-[1.75rem]">{story.contact.line}</h2>
          <p className="mb-6 font-mono text-xs text-[var(--muted)]">
            {story.contact.location} · {story.contact.languages}
          </p>
          <div className="mb-8 flex flex-wrap gap-3 lg:hidden">
            <PrimaryCta href={PROTO_LINKS.email}>{copy.hero.email}</PrimaryCta>
            <GhostCta href={PROTO_LINKS.linkedin}>LinkedIn</GhostCta>
            <GhostCta href={PROTO_LINKS.github}>GitHub</GhostCta>
          </div>
          <div className="flex flex-wrap gap-6 font-mono text-xs text-[var(--muted)]">
            <a href={`/${locale}/blog`} className="hover:text-[var(--text)]">{copy.labels.writing} →</a>
            <a href={`/${locale}/saerix`} className="hover:text-[var(--text)]">{copy.labels.saerix} ↗</a>
          </div>
        </section>
      </main>
    </ProtoShell>
  )
}

// Sticky on desktop: the current section's title stays pinned while it scrolls,
// and the next section's label replaces it when it arrives.
function Label({ n, total, children }: { n: number; total: number; children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-[var(--muted)] lg:sticky lg:top-0 lg:z-10 lg:-mx-10 lg:mb-6 lg:border-b lg:border-[var(--line)] lg:bg-[color-mix(in_srgb,var(--bg)_85%,transparent)] lg:px-10 lg:py-4 lg:backdrop-blur">
      <span>// {children}</span>
      <span className="text-[var(--orange)]">{String(n).padStart(2, "0")}/{String(total).padStart(2, "0")}</span>
    </div>
  )
}

function Block({ label, text, accent = false }: { label: string; text: string; accent?: boolean }) {
  return (
    <div className="rounded-[0.75rem] border border-[var(--line)] bg-[var(--surface)] p-5">
      <p
        className={`mb-2 font-mono text-[11px] uppercase tracking-widest ${accent ? "text-[var(--orange)]" : "text-[var(--muted)]"}`}
      >
        {label}
      </p>
      <p className="text-sm leading-relaxed text-[color-mix(in_srgb,var(--text)_90%,transparent)]">{text}</p>
    </div>
  )
}
