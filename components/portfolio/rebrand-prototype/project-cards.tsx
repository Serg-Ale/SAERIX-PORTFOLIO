// Projects I built on my own, in two shapes so the section has rhythm. Web apps are
// wide cards with the live app in a browser frame and the one decision that shaped
// them. Command-line tools sit side by side in a terminal frame. Each carries its own
// color, sampled from its screenshots.

import { ArrowUpRight, Github, Lock, Zap } from "lucide-react"
import type { ProtoCopy } from "./copy"
import { MediaFrame } from "./media-frame"
import { StackBadges } from "./stack-badges"
import type { ProtoStory } from "./story"

type Project = ProtoStory["projects"]["items"][number]
type Labels = ProtoCopy["labels"]

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[11px] text-[var(--muted)] transition hover:border-[var(--a)] hover:text-[var(--text)]"

function Links({ p, privateLabel }: { p: Project; privateLabel: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {p.live && (
        <a href={p.live} target="_blank" rel="noopener noreferrer" className={`${pill} !text-[var(--text)]`} style={{ borderColor: "color-mix(in srgb, var(--a) 60%, transparent)" }}>
          live <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
        </a>
      )}
      {p.repo ? (
        <a href={p.repo} target="_blank" rel="noopener noreferrer" className={pill}>
          <Github aria-hidden="true" className="h-3 w-3" /> repo
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[var(--muted)]">
          <Lock aria-hidden="true" className="h-3 w-3" /> {privateLabel}
        </span>
      )}
    </div>
  )
}

function Glow() {
  return (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-[.18] blur-3xl"
        style={{ background: "var(--a)" }}
      />
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5" style={{ background: "linear-gradient(90deg, var(--a), transparent 70%)" }} />
    </>
  )
}

function mediaTarget(p: Project, labels: Labels, privateLabel: string) {
  const href = p.live ?? p.repo
  return {
    href,
    label: href ? href.replace(/^https?:\/\//, "").replace(/\/$/, "") : privateLabel,
    cta: href ? (p.live ? labels.openSite : labels.openRepo) : undefined,
  }
}

export function WebProject({ p, index, labels, privateLabel }: { p: Project; index: number; labels: Labels; privateLabel: string }) {
  const t = mediaTarget(p, labels, privateLabel)
  return (
    <li
      style={{ "--a": p.accent ?? "var(--teal)" } as React.CSSProperties}
      className="relative flex flex-col gap-5 overflow-hidden rounded-3xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_40%,transparent)] p-5 md:p-7"
    >
      <Glow />
      <div className="relative flex flex-wrap items-center gap-x-4 gap-y-3">
        <span className="font-mono text-sm font-bold" style={{ color: "var(--a)" }}>{String(index).padStart(2, "0")}</span>
        <h5 className="text-xl font-bold md:text-2xl">{p.name}</h5>
        <span className="ml-auto"><Links p={p} privateLabel={privateLabel} /></span>
      </div>
      <p className="relative max-w-prose text-sm leading-relaxed text-[color-mix(in_srgb,var(--text)_80%,transparent)] md:text-base">{p.blurb}</p>
      {p.media && (
        <div className="relative">
          <MediaFrame items={p.media} href={t.href} label={t.label} cta={t.cta} accent="var(--a)" />
        </div>
      )}
      {p.featured && p.decision && (
        <div className="relative flex gap-3 rounded-[0.75rem] border-l-2 bg-[var(--bg)] p-4" style={{ borderColor: "var(--a)" }}>
          <Zap aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--a)" }} />
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--a)" }}>{labels.decision}</p>
            <p className="text-sm leading-relaxed text-[color-mix(in_srgb,var(--text)_90%,transparent)]">{p.decision}</p>
          </div>
        </div>
      )}
      <div className="relative"><StackBadges items={p.tags} /></div>
    </li>
  )
}

export function CliProject({ p, index, labels, privateLabel }: { p: Project; index: number; labels: Labels; privateLabel: string }) {
  const t = mediaTarget(p, labels, privateLabel)
  return (
    <li
      style={{ "--a": p.accent ?? "var(--teal)" } as React.CSSProperties}
      className="relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_40%,transparent)] p-5"
    >
      <Glow />
      <div className="relative flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="font-mono text-sm font-bold" style={{ color: "var(--a)" }}>{String(index).padStart(2, "0")}</span>
        <h5 className="text-lg font-bold">{p.name}</h5>
        <span className="ml-auto"><Links p={p} privateLabel={privateLabel} /></span>
      </div>
      {p.media && (
        <div className="relative">
          <MediaFrame items={p.media} href={t.href} label={p.name} cta={t.cta} variant="terminal" accent="var(--a)" />
        </div>
      )}
      <p className="relative text-sm leading-relaxed text-[color-mix(in_srgb,var(--text)_80%,transparent)]">{p.blurb}</p>
      <div className="relative mt-auto"><StackBadges items={p.tags} /></div>
    </li>
  )
}
