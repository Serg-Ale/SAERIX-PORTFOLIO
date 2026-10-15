// A case with a team, shown as a product and not as a form: the product's own color,
// a big index, the live site in a browser frame, then problem and decision side by side,
// what I did as chips, the status as a checklist, the flow and the stack. Nothing is
// collapsed, and no block is longer than two or three lines.

import { Check } from "lucide-react"
import { DecisionFlow } from "./decision-flow"
import { MediaFrame } from "./media-frame"
import { StackBadges } from "./stack-badges"
import { StateChip } from "./proto-chrome"
import type { ProtoCase, ProtoCopy } from "./copy"

export function CaseCard({ c, labels }: { c: ProtoCase; labels: ProtoCopy["labels"] }) {
  return (
    <article
      id={`case-${c.id}`}
      style={{ "--a": c.accent } as React.CSSProperties}
      className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)]/40"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--a)" }}
      />
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5" style={{ background: "linear-gradient(90deg, var(--a), transparent 70%)" }} />

      <div className="relative flex flex-col gap-6 p-5 md:p-8">
        <header className="flex items-start gap-4 md:gap-5">
          <span
            aria-hidden="true"
            className="font-mono text-5xl font-bold leading-none text-transparent md:text-6xl"
            style={{ WebkitTextStroke: "1px var(--a)" }}
          >
            {c.id}
          </span>
          <div className="flex min-w-0 flex-col gap-2">
            <h4 className="text-2xl font-bold leading-tight md:text-3xl">{c.name}</h4>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="font-mono text-xs text-[var(--muted)]">{c.kind}</span>
              <StateChip state={c.state} label={c.stateLabel} />
            </div>
          </div>
        </header>

        <p className="max-w-prose text-base font-medium leading-snug text-[var(--text)]/90 md:text-lg">{c.outcome}</p>

        {c.site && (
          <MediaFrame items={c.site.images} href={c.site.href} label={c.site.label} cta={labels.openSite} accent="var(--a)" />
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">{labels.problem}</p>
            <p className="text-sm leading-relaxed text-[var(--text)]/85">{c.problem}</p>
          </div>
          <div className="flex flex-col gap-3 rounded-xl border bg-[var(--surface)] p-5" style={{ borderColor: "color-mix(in srgb, var(--a) 45%, var(--line))" }}>
            <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--a)" }}>
              {labels.decision}
            </p>
            <p className="text-sm leading-relaxed text-[var(--text)]/90">{c.decision}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">{labels.did}</p>
          <ul className="flex flex-wrap gap-2">
            {c.did.map((d) => (
              <li
                key={d}
                className="rounded-full border px-3 py-1 text-xs font-bold"
                style={{ borderColor: "color-mix(in srgb, var(--a) 50%, transparent)", background: "color-mix(in srgb, var(--a) 10%, transparent)" }}
              >
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
          <p className="flex flex-wrap items-baseline gap-x-3 font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">
            {labels.status}
            <span className="normal-case tracking-normal text-[var(--text)]/80">{c.status}</span>
          </p>
          <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {c.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm leading-snug text-[var(--text)]/85">
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--a)" }} strokeWidth={3} />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <DecisionFlow label={c.flow.label} steps={c.flow.steps} accent="var(--a)" />
        <StackBadges items={c.stack} />
      </div>
    </article>
  )
}
