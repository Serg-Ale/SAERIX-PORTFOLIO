// "Work" of variant C: the three cases with a team, then what I built on my own.
// Text lives in copy.ts and story.ts, in both languages.

import type { ProtoCopy, ProtoLocale } from "./copy"
import { CaseCard } from "./case-card"
import { CliProject, WebProject } from "./project-cards"
import type { ProtoStory } from "./story"

function SubHeading({ title, count, intro }: { title: string; count: number; intro: string }) {
  return (
    <div className="mb-6 flex flex-col gap-2">
      <h3 className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[var(--orange)]">
        {title}
        <span className="rounded-full border border-[color-mix(in_srgb,var(--orange)_40%,transparent)] px-2 py-0.5 text-[10px]">{String(count).padStart(2, "0")}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-[var(--line)]" />
      </h3>
      <p className="max-w-prose text-sm leading-relaxed text-[color-mix(in_srgb,var(--text)_80%,transparent)]">{intro}</p>
    </div>
  )
}

export function WorkSection({ copy, story, locale }: { copy: ProtoCopy; story: ProtoStory; locale: ProtoLocale }) {
  const { projects } = story
  const web = projects.items.filter((p) => p.group === "web")
  const cli = projects.items.filter((p) => p.group === "cli")
  const first = copy.cases.length

  return (
    <>
      <SubHeading title={story.labels.team} count={copy.cases.length} intro={copy.labels.casesIntro} />
      <div className="flex flex-col gap-8">
        {copy.cases.map((c) => (
          <CaseCard key={c.id} c={c} labels={copy.labels} />
        ))}
      </div>

      <div className="mt-16">
        <SubHeading title={story.labels.own} count={projects.items.length} intro={projects.intro} />
        <p className="mb-4 font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">— {projects.groups.web}</p>
        <ul className="flex flex-col gap-8">
          {web.map((p, i) => (
            <WebProject key={p.name} p={p} index={first + i + 1} labels={copy.labels} privateLabel={projects.privateLabel} />
          ))}
        </ul>
        <p className="mb-4 mt-12 font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">— {projects.groups.cli}</p>
        <ul className="grid gap-6 md:grid-cols-2">
          {cli.map((p, i) => (
            <CliProject key={p.name} p={p} index={first + web.length + i + 1} labels={copy.labels} privateLabel={projects.privateLabel} />
          ))}
        </ul>
        <ul className="mt-8 flex flex-col">
          <li className="border-t border-[var(--line)] py-5">
            <a
              href={projects.borrowed.href}
              className="flex flex-wrap items-baseline justify-between gap-3 text-sm text-[var(--muted)] hover:text-[var(--text)]"
            >
              <span className="max-w-2xl leading-relaxed">{projects.borrowed.text}</span>
              <span className="font-mono text-xs text-[var(--orange)]">{projects.borrowed.cta}</span>
            </a>
          </li>
          <li className="border-t border-[var(--line)] pt-5">
            <a
              href={`/${locale}/saerix`}
              className="flex flex-wrap items-baseline justify-between gap-3 text-sm text-[var(--muted)] hover:text-[var(--text)]"
            >
              <span>{projects.music.text}</span>
              <span className="font-mono text-xs text-[var(--orange)]">{projects.music.cta}</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
