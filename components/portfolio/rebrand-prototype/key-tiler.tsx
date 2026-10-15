"use client"

// The Vim home-row keys driving a mock screen: press H, J, K or L and the window snaps
// to that side, like my KDE tiling shortcuts. It cycles on its own while on screen and
// a hover or tap takes over. Reduced motion: no cycling, the keys still work on tap.

import { useAutoStep } from "./use-auto-step"

interface Key {
  key: string
  arrow: string
  does: string
}

// Where the window lands for each key, as inset percentages: top right bottom left.
const SNAP: Record<string, string> = {
  H: "2% 51% 2% 2%",
  J: "51% 2% 2% 2%",
  K: "2% 2% 51% 2%",
  L: "2% 2% 2% 51%",
}

export function KeyTiler({
  title,
  cluster,
  combos,
  text,
}: {
  title: string
  cluster: Key[]
  combos: { keys: string; does: string }[]
  text: string
}) {
  const { ref, active, select: pick } = useAutoStep({ count: cluster.length, intervalMs: 1900, threshold: 0.4 })
  const current = cluster[active]

  return (
    <div ref={ref} className="grid gap-6 rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_40%,transparent)] p-5 md:p-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">{title}</p>
        <div
          aria-hidden="true"
          className="relative aspect-[16/10] w-full overflow-hidden rounded-[0.5rem] border border-[var(--line)] bg-[var(--bg)]"
        >
          <span className="absolute inset-0 grid place-items-center font-mono text-[10px] text-[color-mix(in_srgb,var(--muted)_50%,transparent)]">desktop</span>
          <div
            className="absolute rounded-[0.375rem] border border-[var(--orange)] bg-[color-mix(in_srgb,var(--orange)_10%,transparent)] transition-[inset] duration-500 ease-out"
            style={{ inset: SNAP[current.key] }}
          >
            <div className="flex items-center gap-1 border-b border-[color-mix(in_srgb,var(--orange)_40%,transparent)] px-2 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--orange)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[color-mix(in_srgb,var(--orange)_50%,transparent)]" />
              <span className="ml-auto font-mono text-[9px] text-[var(--orange)]">{current.arrow}</span>
            </div>
          </div>
        </div>
        <p aria-live="polite" className="font-mono text-[11px] text-[var(--muted)]">
          <span className="text-[var(--orange)]">{current.key}</span> → {current.does}
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <ul className="grid grid-cols-4 gap-2">
          {cluster.map((k, i) => {
            const on = i === active
            return (
              <li key={k.key}>
                <button
                  type="button"
                  aria-pressed={on}
                  aria-label={`${k.key}, ${k.does}`}
                  onMouseEnter={() => pick(i)}
                  onClick={() => pick(i)}
                  className={`flex h-12 w-full items-center justify-center rounded-[0.5rem] border bg-[var(--bg)] font-mono text-base font-bold outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--teal)] ${
                    on
                      ? "translate-y-[3px] border-[var(--orange)] border-b-[var(--orange)] text-[var(--orange)] shadow-[0_0_18px_color-mix(in_srgb,var(--orange)_35%,transparent)]"
                      : "border-b-4 border-[var(--line)] border-b-[color-mix(in_srgb,var(--orange)_60%,transparent)]"
                  }`}
                >
                  {k.key}
                </button>
              </li>
            )
          })}
        </ul>
        <ul className="flex flex-col gap-2 border-t border-dashed border-[var(--line)] pt-4">
          {combos.map((c) => (
            <li key={c.keys} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 text-xs">
              <span className="flex flex-wrap items-center gap-1">
                {c.keys.split(" + ").map((part, n) => (
                  <span key={part} className="flex items-center gap-1">
                    {n > 0 && <span aria-hidden="true" className="text-[var(--muted)]">+</span>}
                    <kbd className="rounded border border-b-2 border-[var(--line)] bg-[var(--bg)] px-1.5 py-0.5 font-mono text-[11px]">{part}</kbd>
                  </span>
                ))}
              </span>
              <span className="text-[color-mix(in_srgb,var(--text)_75%,transparent)]">{c.does}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm leading-relaxed text-[color-mix(in_srgb,var(--text)_80%,transparent)] sm:col-span-2">{text}</p>
    </div>
  )
}
