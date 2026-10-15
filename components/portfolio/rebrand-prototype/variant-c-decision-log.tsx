// Variant C "Decision log", the default /dev page: statement, status, contact and
// a live section index stay pinned on the left; the whole story scrolls on the
// right: stack → cases (decision-first) → how I work → own projects → path →
// contact. Stack and path answer "can this person do the job?" before the long reads.

import Image from "next/image"
import { getProtoCopy, PROTO_LINKS, type ProtoLocale } from "./copy"
import { DecisionFlow } from "./decision-flow"
import { StackSection } from "./stack-section"
import { KatakanaRain } from "./katakana-rain"
import { SectionNav } from "./section-nav"
import { getProtoStory, INTRO_VIDEO, SPEC_URL } from "./story"
import { GhostCta, OpenDot, PrimaryCta, ProtoShell, StackTags, StateChip } from "./proto-chrome"

export function VariantCDecisionLog({ locale }: { locale: ProtoLocale }) {
  const copy = getProtoCopy(locale)
  const story = getProtoStory(locale)
  const L = story.labels

  const index = [
    { id: "stack", label: L.stack },
    { id: "cases", label: copy.labels.cases },
    { id: "how", label: L.how },
    { id: "projects", label: L.projects },
    { id: "journey", label: L.journey },
    { id: "contact", label: L.contact },
  ]

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
          <p className="text-base font-semibold leading-snug text-[var(--text)]/90 md:text-lg">{copy.hero.facts}</p>
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
        <section id="stack" className="scroll-mt-11 lg:scroll-mt-0">
          <Label n={sectionNumber("stack")} total={index.length}>{L.stack}</Label>
          <StackSection
            groups={story.stack.groups}
            highlightLabel={locale === "pt-BR" ? "Usado no trabalho" : "Used at work"}
          />
        </section>

        <section id="cases" className="mt-16 scroll-mt-11 border-t border-[var(--line)] lg:scroll-mt-0">
          <Label n={sectionNumber("cases")} total={index.length}>
            {copy.labels.cases} · {locale === "pt-BR" ? "resultado primeiro" : "result first"}
          </Label>
          <div className="flex flex-col">
            {copy.cases.map((c, i) => (
              <details key={c.id} open={i === 0} className="group border-t border-[var(--line)] py-8">
                <summary className="flex cursor-pointer list-none flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--muted)]">
                    <span className="text-[var(--orange)]">{c.id}</span>
                    <span className="font-sans text-lg font-bold text-[var(--text)]">{c.name}</span>
                    <span>· {c.kind}</span>
                    <StateChip state={c.state} label={c.stateLabel} />
                    <span aria-hidden="true" className="ml-auto transition group-open:rotate-45">+</span>
                  </div>
                  <p className="text-base font-medium leading-snug text-[var(--text)]/85 md:text-lg">{c.outcome}</p>
                </summary>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <Block label={copy.labels.problem} text={c.problem} />
                  <Block label={copy.labels.decision} text={c.decision} accent />
                  <div className="md:col-span-2">
                    <Block label={copy.labels.status} text={c.status} />
                  </div>
                  <div className="md:col-span-2">
                    <DecisionFlow label={c.flow.label} steps={c.flow.steps} />
                  </div>
                  <div className="md:col-span-2">
                    <StackTags items={c.stack} />
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="how" className="mt-16 scroll-mt-11 border-t border-[var(--line)] lg:scroll-mt-0">
          <Label n={sectionNumber("how")} total={index.length}>{L.how}</Label>
          <h2 className="mb-10 text-2xl font-bold leading-tight tracking-tight md:text-[1.75rem]">{story.how.stance}</h2>
          <p className="mb-5 max-w-prose text-base leading-relaxed text-[var(--text)]/85">{story.how.lead}</p>
          <p className="mb-10 max-w-prose text-base leading-relaxed text-[var(--text)]/85">{story.how.focus}</p>
          <ol className="flex flex-col gap-8">
            {story.how.principles.map((p, i) => (
              <li key={p.title} className="grid gap-2 md:grid-cols-[3rem_1fr]">
                <span className="font-mono text-xs text-[var(--orange)]">0{i + 1}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text)]/80">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <a
            href={SPEC_URL}
            className="group mt-10 flex flex-col gap-3 rounded-xl border border-[var(--orange)]/60 bg-[var(--surface)] p-6 transition hover:border-[var(--orange)]"
          >
            <p className="text-base font-semibold leading-snug">{story.how.proofNote}</p>
            <span className="font-mono text-xs text-[var(--orange)] transition group-hover:translate-x-1">
              {story.how.proofCta}
            </span>
          </a>
          <ul className="mt-6 flex flex-col gap-2">
            {story.how.quality.map((q) => (
              <li key={q} className="border-l-2 border-[var(--teal)] pl-3 text-sm text-[var(--text)]/80">
                {q}
              </li>
            ))}
          </ul>
                  <div className="mt-14 border-t border-[var(--line)] pt-8">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">
              {story.setup.label}
            </p>
            <p className="mb-3 font-mono text-sm text-[var(--text)]/80">{story.setup.tools}</p>
            <p className="mb-8 max-w-prose text-sm leading-relaxed text-[var(--text)]/80">{story.setup.workflow}</p>
            <h3 className="mb-6 text-base font-bold">{story.setup.claudeTitle}</h3>
            <ol className="flex flex-col gap-6">
              {story.setup.claude.map((c, i) => (
                <li key={c.title} className="grid gap-2 md:grid-cols-[3rem_1fr]">
                  <span className="font-mono text-xs text-[var(--orange)]">0{i + 1}</span>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-sm font-bold">{c.title}</h4>
                    <p className="text-sm leading-relaxed text-[var(--text)]/80">{c.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a
              href={story.setup.credit.href}
              className="mt-6 inline-block font-mono text-xs text-[var(--muted)] hover:text-[var(--orange)]"
            >
              {story.setup.credit.text} ↗
            </a>
          </div>
        </section>

        <section id="projects" className="mt-16 scroll-mt-11 border-t border-[var(--line)] lg:scroll-mt-0">
          <Label n={sectionNumber("projects")} total={index.length}>{L.projects}</Label>
          <p className="mb-6 max-w-prose text-sm leading-relaxed text-[var(--text)]/80">{story.projects.intro}</p>
          <ul className="flex flex-col">
            {story.projects.items.map((p) => (
              <li key={p.name} className="flex flex-col gap-3 border-t border-[var(--line)] py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-lg font-bold">{p.name}</h3>
                  <div className="flex gap-4 font-mono text-xs">
                    {p.repo ? (
                      <a href={p.repo} className="text-[var(--muted)] hover:text-[var(--text)]">repo ↗</a>
                    ) : (
                      <span className="text-[var(--muted)]">{story.projects.privateLabel}</span>
                    )}
                    {p.live && <a href={p.live} className="text-[var(--orange)]">live ↗</a>}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[var(--text)]/80">{p.blurb}</p>
                {p.featured && p.decision && (
                  <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-[var(--orange)]">
                      {copy.labels.decision}
                    </p>
                    <p className="text-sm font-medium leading-relaxed">{p.decision}</p>
                  </div>
                )}
                <StackTags items={p.tags} />
              </li>
            ))}
            <li className="border-t border-[var(--line)] py-5">
              <a
                href={story.projects.borrowed.href}
                className="flex flex-wrap items-baseline justify-between gap-3 text-sm text-[var(--muted)] hover:text-[var(--text)]"
              >
                <span className="max-w-2xl leading-relaxed">{story.projects.borrowed.text}</span>
                <span className="font-mono text-xs text-[var(--orange)]">{story.projects.borrowed.cta}</span>
              </a>
            </li>
            <li className="border-t border-[var(--line)] pt-5">
              <a
                href={`/${locale}/saerix`}
                className="flex flex-wrap items-baseline justify-between gap-3 text-sm text-[var(--muted)] hover:text-[var(--text)]"
              >
                <span>{story.projects.music.text}</span>
                <span className="font-mono text-xs text-[var(--orange)]">{story.projects.music.cta}</span>
              </a>
            </li>
          </ul>
        </section>

        <section id="journey" className="mt-16 scroll-mt-11 border-t border-[var(--line)] lg:scroll-mt-0">
          <Label n={sectionNumber("journey")} total={index.length}>{L.journey}</Label>
          <ol className="flex flex-col">
            {story.journey.items.map((it) => (
              <li key={it.year} className="grid gap-2 border-t border-[var(--line)] py-6 first:border-t-0 md:grid-cols-[5rem_1fr]">
                <span className="font-mono text-sm text-[var(--muted)]">{it.year}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="flex items-center gap-2 text-base font-bold">
                    {it.now && (
                      <span className="h-2 w-2 rounded-full bg-[var(--teal)]">
                        <span className="sr-only">{locale === "pt-BR" ? "atual" : "current"}</span>
                      </span>
                    )}
                    {it.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text)]/80">{it.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 font-mono text-sm leading-relaxed text-[var(--muted)]">{story.journey.fundamentals}</p>
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
            <a href={`/${locale}/laboratorio`} className="hover:text-[var(--text)]">{copy.labels.writing} →</a>
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
    <div className="mb-8 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-[var(--muted)] lg:sticky lg:top-0 lg:z-10 lg:-mx-10 lg:mb-6 lg:border-b lg:border-[var(--line)] lg:bg-[var(--bg)]/85 lg:px-10 lg:py-4 lg:backdrop-blur">
      <span>// {children}</span>
      <span className="text-[var(--orange)]">{String(n).padStart(2, "0")}/{String(total).padStart(2, "0")}</span>
    </div>
  )
}

function Block({ label, text, accent = false }: { label: string; text: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <p
        className={`mb-2 font-mono text-[11px] uppercase tracking-widest ${accent ? "text-[var(--orange)]" : "text-[var(--muted)]"}`}
      >
        {label}
      </p>
      <p className="text-sm leading-relaxed text-[var(--text)]/90">{text}</p>
    </div>
  )
}
