// Small flow diagram for a case: steps connected by a line, down on a phone and across
// from the sm breakpoint. A step that is a list is a split into parallel branches.
// Reads as a list for assistive tech; the connectors are decoration.

export function DecisionFlow({
  label,
  steps,
  accent = "var(--orange)",
}: {
  label: string
  steps: (string | string[])[]
  accent?: string
}) {
  const node = "rounded-[0.5rem] border bg-[var(--bg)] px-3 py-2 font-mono text-[11px] font-bold leading-snug"
  return (
    <figure className="rounded-[0.75rem] border border-[var(--line)] bg-[var(--surface)] p-5">
      <figcaption className="mb-4 font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">{label}</figcaption>
      <ol className="flex flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex flex-col items-start gap-1 sm:flex-row sm:items-center">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="ml-5 h-3 w-px sm:ml-0 sm:h-px sm:w-5"
                style={{ background: `color-mix(in srgb, ${accent} 60%, transparent)` }}
              />
            )}
            {Array.isArray(step) ? (
              <ul className="flex flex-col gap-1.5 border-l-2 pl-2.5" style={{ borderColor: `color-mix(in srgb, ${accent} 55%, transparent)` }}>
                {step.map((b) => (
                  <li key={b} className={node} style={{ borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`, color: accent }}>
                    {b}
                  </li>
                ))}
              </ul>
            ) : (
              <span className={`${node} border-[var(--line)]`}>{step}</span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  )
}
