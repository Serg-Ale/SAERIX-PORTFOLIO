// "How I work" of variant C. One idea, shown instead of told: I talk to Claude, and the
// spec comes out of the conversation. Order: the voice pipeline (the hook), a real session
// replay, the four principles, the public proof with its numbers, where the mental model
// comes from, then the keyboard setup. Text lives in story.ts, in both languages.

import { Brain, Bot, Compass, Eye, Gamepad2, Megaphone, PenLine, Zap } from "lucide-react"
import { KeyTiler } from "./key-tiler"
import { SPEC_URL, type ProtoStory } from "./story"
import { TerminalReplay } from "./terminal-replay"
import { VoicePipeline } from "./voice-pipeline"

const PRINCIPLE_ICONS = [Compass, Bot, Eye, Megaphone]
const ORIGIN_ICONS = [Gamepad2, PenLine, Brain]

export function SpeakDriven({ how, setup, replayLabel }: { how: ProtoStory["how"]; setup: ProtoStory["setup"]; replayLabel: string }) {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h2 className="text-[clamp(1.9rem,4.4vw,2.9rem)] font-bold leading-[1.02] tracking-tight">
          <span className="text-[var(--orange)]">Speak</span>
          {how.stance.replace(/^Speak/, "")}
        </h2>
        <p className="max-w-prose text-base leading-relaxed text-[var(--text)]/85 md:text-lg">{how.tagline}</p>
      </header>

      <VoicePipeline setup={setup} />

      <figure className="flex flex-col gap-3">
        <TerminalReplay cwd={setup.terminal.cwd} lines={setup.terminal.lines} label={replayLabel} />
        <figcaption className="font-mono text-[11px] leading-relaxed text-[var(--muted)]">{replayLabel}</figcaption>
      </figure>

      <ol className="grid gap-4 sm:grid-cols-2">
        {how.principles.map((p, i) => {
          const Icon = PRINCIPLE_ICONS[i]
          return (
            <li key={p.title} className="flex flex-col gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)]/40 p-5">
              <span className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--orange)]/40 text-[var(--orange)]">
                  <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                </span>
                <span className="font-mono text-xs text-[var(--muted)]">0{i + 1}</span>
              </span>
              <h3 className="text-base font-bold leading-snug">{p.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--text)]/80">{p.body}</p>
            </li>
          )
        })}
      </ol>

      <div className="flex flex-col gap-4">
        <a
          href={SPEC_URL}
          className="group flex flex-col gap-3 rounded-xl border border-[var(--orange)]/60 bg-[var(--surface)] p-5 transition hover:border-[var(--orange)] md:p-6"
        >
          <p className="text-base font-semibold leading-snug">{how.proofNote}</p>
          <span className="font-mono text-xs text-[var(--orange)] transition group-hover:translate-x-1">{how.proofCta}</span>
        </a>
        <ul className="grid grid-cols-3 gap-3">
          {how.metrics.map((m) => (
            <li key={m.value} className="flex flex-col gap-1.5 rounded-xl border border-[var(--line)] border-t-2 border-t-[var(--teal)] bg-[var(--surface)]/40 p-3.5 sm:p-4">
              <span className="font-mono text-lg font-bold text-[var(--teal)] sm:text-2xl">{m.value}</span>
              <span className="text-[11px] leading-snug text-[var(--text)]/75 sm:text-xs">{m.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <ul className="grid gap-3 sm:grid-cols-3">
          {how.origin.map((o, i) => {
            const Icon = ORIGIN_ICONS[i]
            return (
              <li key={o.title} className="flex flex-col gap-2 rounded-xl border border-dashed border-[var(--line)] p-4">
                <Icon aria-hidden="true" className="h-[18px] w-[18px] text-[var(--muted)]" />
                <h3 className="text-sm font-bold">{o.title}</h3>
                <p className="text-xs leading-relaxed text-[var(--text)]/75">{o.body}</p>
              </li>
            )
          })}
        </ul>
        <div className="flex gap-3 rounded-xl border-l-2 border-[var(--teal)] bg-[var(--surface)]/40 p-4">
          <Zap aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--teal)]" />
          <div className="flex flex-col gap-1">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--teal)]">{how.hyperfocus.label}</p>
            <p className="text-sm leading-relaxed text-[var(--text)]/80">{how.hyperfocus.body}</p>
          </div>
        </div>
      </div>

      <KeyTiler title={setup.keys.title} cluster={setup.keys.cluster} combos={setup.keys.combos} text={setup.keys.text} />

      <a
        href={setup.credit.href}
        className="w-fit font-mono text-xs text-[var(--muted)] transition hover:text-[var(--orange)]"
      >
        {setup.credit.text} ↗
      </a>
    </div>
  )
}
