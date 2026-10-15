// Small flow diagram for a case: steps left to right, with a split when a step is a
// list (parallel branches). Reads as a list for assistive tech; the arrows are decoration.

export function DecisionFlow({ label, steps }: { label: string; steps: (string | string[])[] }) {
  return (
    <figure className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <figcaption className="mb-4 font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">
        {label}
      </figcaption>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
        {steps.map((step, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="font-mono text-xs text-[var(--orange)]">
                →
              </span>
            )}
            {Array.isArray(step) ? (
              <ul className="flex flex-col gap-1.5 border-l-2 border-[var(--orange)]/50 pl-2.5">
                {step.map((b) => (
                  <li
                    key={b}
                    className="rounded-md border border-[var(--orange)]/40 px-2.5 py-1 font-mono text-[11px] font-bold"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            ) : (
              <span className="rounded-md border border-[var(--line)] bg-[var(--bg)] px-2.5 py-1.5 font-mono text-[11px] font-bold">
                {step}
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  )
}
