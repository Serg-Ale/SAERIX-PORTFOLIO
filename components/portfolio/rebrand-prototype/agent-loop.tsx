// The loop I run with Claude Code, drawn as five steps. The last one splits in two
// lanes, because the review runs as two sub-agents in parallel, each with a clean context.

export interface LoopStep {
  skill: string
  title: string
  body: string
}

export function AgentLoop({
  steps,
  lanes,
  lanesLabel,
  memory,
}: {
  steps: LoopStep[]
  lanes: [string, string]
  lanesLabel: string
  memory: string
}) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]/40 p-5 md:p-6">
      <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {steps.map((s, i) => {
          const last = i === steps.length - 1
          return (
            <li
              key={s.skill}
              className="relative flex flex-col gap-2 rounded-xl border border-[var(--line)] bg-[var(--bg)] p-4"
            >
              <span className="font-mono text-[11px] text-[var(--orange)]">{String(i + 1).padStart(2, "0")}</span>
              <code className="w-fit rounded-md border border-[var(--orange)]/40 px-2 py-0.5 font-mono text-[11px] font-bold">
                {s.skill}
              </code>
              <h4 className="text-sm font-bold leading-snug">{s.title}</h4>
              <p className="text-xs leading-relaxed text-[var(--text)]/75">{s.body}</p>
              {last && (
                <div className="mt-1 flex flex-col gap-1.5 border-l-2 border-[var(--teal)] pl-2.5">
                  {lanes.map((l) => (
                    <span
                      key={l}
                      className="w-fit rounded border border-[var(--teal)]/50 px-2 py-0.5 font-mono text-[10px] text-[var(--teal)]"
                    >
                      {l}
                    </span>
                  ))}
                  <span className="font-mono text-[10px] text-[var(--muted)]">{lanesLabel}</span>
                </div>
              )}
              {!last && (
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 hidden -translate-y-1/2 font-mono text-sm text-[var(--orange)] xl:block"
                >
                  →
                </span>
              )}
            </li>
          )
        })}
      </ol>
      <p className="mt-5 flex items-start gap-2 border-t border-dashed border-[var(--line)] pt-4 font-mono text-[11px] leading-relaxed text-[var(--muted)]">
        <span aria-hidden="true" className="text-[var(--teal)]">●</span>
        {memory}
      </p>
    </div>
  )
}
