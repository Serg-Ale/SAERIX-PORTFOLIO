// The "how I work with Claude Code" block: the loop as a diagram, a replay of a real
// session, and the keyboard setup. Text lives in story.ts, in both languages.

import { AgentLoop } from "./agent-loop"
import { KeyCluster } from "./key-cluster"
import { TerminalReplay } from "./terminal-replay"
import type { ProtoStory } from "./story"

export function ClaudeSetup({ setup, replayLabel }: { setup: ProtoStory["setup"]; replayLabel: string }) {
  return (
    <div className="mt-14 border-t border-[var(--line)] pt-8">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">{setup.label}</p>
      <h3 className="mb-2 text-base font-bold">{setup.title}</h3>
      <p className="mb-6 max-w-prose text-sm leading-relaxed text-[var(--text)]/80">{setup.lead}</p>
      <div className="flex flex-col gap-6">
        <AgentLoop steps={setup.loop} lanes={setup.review.lanes} lanesLabel={setup.review.label} memory={setup.memory} />
        <div className="grid gap-6 lg:grid-cols-2">
          <TerminalReplay cwd={setup.terminal.cwd} lines={setup.terminal.lines} label={replayLabel} />
          <KeyCluster
            title={setup.keys.title}
            cluster={setup.keys.cluster}
            combos={setup.keys.combos}
            text={setup.keys.text}
          />
        </div>
        <a
          href={setup.credit.href}
          className="w-fit font-mono text-xs text-[var(--muted)] transition hover:text-[var(--orange)]"
        >
          {setup.credit.text} ↗
        </a>
      </div>
    </div>
  )
}
