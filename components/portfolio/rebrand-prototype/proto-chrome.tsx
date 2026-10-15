// PROTOTYPE — throwaway. Shared shell: palette tokens (decision 2), a minimal
// header with the discreet SAERIX door (decision 1) and a footer carrying the
// demoted "Writing" link (decision 4). Layout itself stays per-variant.

import type { ReactNode } from "react"
import { PROTO_LINKS, type ProtoCopy, type ProtoLocale } from "./copy"
import { getProtoStory } from "./story"

const TOKENS = {
  "--bg": "#0D0D0F",
  "--surface": "#141417",
  "--line": "#26262B",
  "--orange": "#FF6B35",
  "--teal": "#2EC4B6",
  "--text": "#EDEDED",
  "--muted": "#8A8A8A",
} as React.CSSProperties

export function ProtoShell({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <div
      id={id}
      style={TOKENS}
      className={`bg-[var(--bg)] font-space text-[var(--text)] selection:bg-[var(--orange)] selection:text-black ${className}`}
    >
      {children}
    </div>
  )
}

export function OpenDot() {
  return (
    <span className="relative inline-flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--orange)] opacity-70" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--orange)]" />
    </span>
  )
}

export function StateChip({ state, label }: { state: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--teal)_40%,transparent)] px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-[var(--teal)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--teal)]" data-state={state} />
      {label}
    </span>
  )
}

export function StackTags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((s) => (
        <li
          key={s}
          className="rounded-[0.375rem] border border-[var(--line)] bg-[var(--surface)] px-2 py-1 font-mono text-[11px] text-[var(--muted)]"
        >
          {s}
        </li>
      ))}
    </ul>
  )
}

export function PrimaryCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center rounded-full bg-[var(--orange)] px-6 py-3 text-sm font-bold text-black transition hover:brightness-110"
    >
      {children}
    </a>
  )
}

export function GhostCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center rounded-full border border-[var(--line)] px-6 py-3 text-sm font-bold text-[var(--text)] transition hover:border-[var(--orange)]"
    >
      {children}
    </a>
  )
}

export function ProtoHeader({ copy, locale, fixed = false }: { copy: ProtoCopy; locale: ProtoLocale; fixed?: boolean }) {
  return (
    <header
      className={`${fixed ? "fixed inset-x-0 top-0 z-50 bg-[color-mix(in_srgb,var(--bg)_70%,transparent)] backdrop-blur" : "relative z-20"} flex items-center justify-between px-5 py-4 font-mono text-xs md:px-10`}
    >
      <span className="font-bold tracking-widest">SÉRGIO ALEXANDRE</span>
      <nav className="flex items-center gap-5 text-[var(--muted)]">
        <a href="#cases" className="hover:text-[var(--text)]">
          {copy.labels.cases}
        </a>
        <a href="#how" className="hover:text-[var(--text)]">
          {getProtoStory(locale).labels.how}
        </a>
        <a href="#contact" className="hover:text-[var(--text)]">
          {copy.labels.contact}
        </a>
        <a href={`/${locale}/saerix`} className="hover:text-[var(--text)]">
          {copy.labels.saerix} ↗
        </a>
      </nav>
    </header>
  )
}

export function ProtoContact({
  copy,
  locale,
  lead,
}: {
  copy: ProtoCopy
  locale: ProtoLocale
  lead?: ReactNode
}) {
  return (
    <footer id="contact" className="px-5 py-20 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        {lead}
        <div className="flex flex-wrap items-center gap-3">
          <PrimaryCta href={PROTO_LINKS.email}>{copy.hero.email}</PrimaryCta>
          <GhostCta href={PROTO_LINKS.linkedin}>LinkedIn</GhostCta>
          <GhostCta href={PROTO_LINKS.github}>GitHub</GhostCta>
        </div>
        <div className="flex flex-wrap gap-6 border-t border-[var(--line)] pt-6 font-mono text-xs text-[var(--muted)]">
          <a href={`/${locale}/blog`} className="hover:text-[var(--text)]">
            {copy.labels.writing}
          </a>
          <a href={`/${locale}/saerix`} className="hover:text-[var(--text)]">
            {copy.labels.saerix} ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
