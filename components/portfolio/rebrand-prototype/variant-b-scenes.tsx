// PROTOTYPE — throwaway. Variant B "Scenes": the whole story as full-viewport,
// scroll-snapped scenes, one idea per screen, in the brief's argument order:
// hero → 3 cases → how I work → proof → path → stack → own projects → contact.
// proximity snap (not mandatory) so scenes taller than the viewport on mobile
// don't trap scrolling.

import { getProtoCopy, PROTO_LINKS, type ProtoLocale } from "./copy"
import { StackGroups } from "./proto-icons"
import { KatakanaRain } from "./katakana-rain"
import { SceneIndex } from "./scene-index"
import { getProtoStory, SPEC_URL } from "./story"
import {
  GhostCta,
  OpenDot,
  PrimaryCta,
  ProtoContact,
  ProtoHeader,
  ProtoShell,
  StackTags,
  StateChip,
} from "./proto-chrome"

const SCENE = "relative flex min-h-dvh snap-start flex-col justify-center overflow-hidden px-5 py-24 md:px-16"
const INNER = "relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-10"

export function VariantBScenes({ locale }: { locale: ProtoLocale }) {
  const copy = getProtoCopy(locale)
  const story = getProtoStory(locale)
  const L = story.labels

  const index = [
    { id: "top", label: L.top },
    ...copy.cases.map((c, i) => ({ id: i === 0 ? "cases" : `case-${c.id}`, label: c.name })),
    { id: "how", label: L.how },
    { id: "proof", label: L.proof },
    { id: "journey", label: L.journey },
    { id: "stack", label: L.stack },
    { id: "projects", label: L.projects },
    { id: "contact", label: L.contact },
  ]

  return (
    <ProtoShell id="scenes-root" className="h-dvh snap-y snap-proximity overflow-y-auto scroll-smooth">
      <ProtoHeader copy={copy} locale={locale} fixed />
      <SceneIndex items={index} rootId="scenes-root" variant="dots" />

      <section id="top" className={`${SCENE} items-center text-center`}>
        <KatakanaRain />
        <div className="relative z-10 flex max-w-5xl flex-col items-center gap-8">
          <span className="inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 font-mono text-xs">
            <OpenDot />
            {copy.hero.open}
          </span>
          <h1 className="text-[clamp(2.25rem,6.5vw,6rem)] font-black leading-[0.98] tracking-tight">
            {copy.hero.h1}
          </h1>
          <p className="font-mono text-sm text-[var(--muted)]">{copy.hero.sub}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <PrimaryCta href={PROTO_LINKS.email}>{copy.hero.email}</PrimaryCta>
            <GhostCta href="#cases">{copy.hero.work}</GhostCta>
          </div>
        </div>
      </section>

      {copy.cases.map((c, i) => (
        <section key={c.id} id={i === 0 ? "cases" : `case-${c.id}`} className={SCENE}>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none text-[clamp(10rem,32vw,28rem)] font-black leading-none text-transparent [-webkit-text-stroke:1px_var(--line)]"
          >
            {c.id}
          </span>
          <div className={INNER}>
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-3xl font-black md:text-5xl">{c.name}</h2>
              <StateChip state={c.state} label={c.stateLabel} />
              <span className="font-mono text-xs text-[var(--muted)]">{c.kind}</span>
            </div>
            <Beat label={copy.labels.problem} text={c.problem} />
            <Beat label={copy.labels.decision} text={c.decision} accent />
            <Beat label={copy.labels.status} text={c.status} />
            <StackTags items={c.stack} />
          </div>
        </section>
      ))}

      <section id="how" className={SCENE}>
        <div className={INNER}>
          <Label>{L.how}</Label>
          <h2 className="max-w-4xl text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.02] tracking-tight">
            {story.how.stance}
          </h2>
          <ol className="grid gap-8 md:grid-cols-3">
            {story.how.principles.map((p, i) => (
              <li key={p.title} className="flex flex-col gap-3 border-t border-[var(--line)] pt-5">
                <span className="font-mono text-xs text-[var(--orange)]">0{i + 1}</span>
                <h3 className="text-xl font-black">{p.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--text)]/80">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="proof" className={SCENE}>
        <div className={INNER}>
          <Label>{L.proof}</Label>
          <a
            href={SPEC_URL}
            className="group flex flex-col gap-6 rounded-2xl border border-[var(--orange)]/60 bg-[var(--surface)] p-8 transition hover:border-[var(--orange)] md:p-12"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">Serg-Ale/matrix-rain</p>
            <p className="text-2xl font-black leading-tight md:text-4xl">{story.how.proofNote}</p>
            <span className="font-mono text-sm text-[var(--orange)] transition group-hover:translate-x-1">
              {story.how.proofCta}
            </span>
          </a>
          <ul className="grid gap-4 md:grid-cols-3">
            {story.how.quality.map((q) => (
              <li key={q} className="border-l-2 border-[var(--teal)] pl-4 text-sm leading-relaxed text-[var(--text)]/80">
                {q}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="journey" className={SCENE}>
        <div className={INNER}>
          <Label>{L.journey}</Label>
          <ol className="grid gap-8 md:grid-cols-4">
            {story.journey.items.map((it) => (
              <li key={it.year} className="flex flex-col gap-3 border-t border-[var(--line)] pt-5">
                <span className="text-6xl font-black text-transparent [-webkit-text-stroke:1px_var(--muted)]">
                  {it.year}
                </span>
                <h3 className="flex items-center gap-2 text-lg font-black">
                  {it.now && <span className="h-2 w-2 rounded-full bg-[var(--teal)]" />}
                  {it.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text)]/80">{it.body}</p>
              </li>
            ))}
          </ol>
          <p className="max-w-3xl font-mono text-sm leading-relaxed text-[var(--muted)]">{story.journey.fundamentals}</p>
        </div>
      </section>

      <section id="stack" className={SCENE}>
        <div className={INNER}>
          <Label>{L.stack}</Label>
          <StackGroups groups={story.stack.groups} />
        </div>
      </section>

      <section id="projects" className={SCENE}>
        <div className={INNER}>
          <Label>{L.projects}</Label>
          <ul className="flex flex-col">
            {story.projects.items.map((p) => (
              <li key={p.name} className="grid gap-4 border-t border-[var(--line)] py-6 md:grid-cols-[14rem_1fr_auto] md:gap-8">
                <h3 className="text-2xl font-black">{p.name}</h3>
                <div className="flex flex-col gap-3">
                  <p className="text-sm leading-relaxed text-[var(--text)]/80">{p.blurb}</p>
                  <StackTags items={p.tags} />
                </div>
                <div className="flex gap-4 font-mono text-xs">
                  <a href={p.repo} className="text-[var(--muted)] hover:text-[var(--text)]">repo ↗</a>
                  {p.live && <a href={p.live} className="text-[var(--orange)]">live ↗</a>}
                </div>
              </li>
            ))}
          </ul>
          <a
            href={`/${locale}/saerix`}
            className="group flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[var(--line)] px-6 py-5 transition hover:border-[var(--orange)]"
          >
            <span className="text-lg font-bold md:text-2xl">{story.projects.music.text}</span>
            <span className="font-mono text-sm text-[var(--orange)]">{story.projects.music.cta}</span>
          </a>
        </div>
      </section>

      <section id="contact" className="flex min-h-dvh snap-start flex-col justify-center">
        <ProtoContact
          copy={copy}
          locale={locale}
          lead={
            <div className="flex flex-col gap-6">
              <h2 className="max-w-4xl text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.02] tracking-tight">
                {story.contact.line}
              </h2>
              <p className="font-mono text-xs text-[var(--muted)]">
                {story.contact.location} · {story.contact.languages}
              </p>
            </div>
          }
        />
      </section>
    </ProtoShell>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">// {children}</p>
}

function Beat({ label, text, accent = false }: { label: string; text: string; accent?: boolean }) {
  return (
    <div className="grid gap-2 md:grid-cols-[8rem_1fr] md:gap-8">
      <p
        className={`pt-2 font-mono text-[11px] uppercase tracking-widest ${accent ? "text-[var(--orange)]" : "text-[var(--muted)]"}`}
      >
        {label}
      </p>
      <p
        className={
          accent
            ? "text-xl font-bold leading-snug md:text-3xl"
            : "text-base leading-relaxed text-[var(--text)]/80 md:text-xl"
        }
      >
        {text}
      </p>
    </div>
  )
}
