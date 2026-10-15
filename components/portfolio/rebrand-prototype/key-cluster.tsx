// The Vim home-row keys as keycaps, with what they do in my KDE shortcuts. The arrows
// show the direction each key moves a window to.

export function KeyCluster({
  title,
  cluster,
  combos,
  text,
}: {
  title: string
  cluster: { key: string; arrow: string; does: string }[]
  combos: { keys: string; does: string }[]
  text: string
}) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-[var(--line)] bg-[var(--surface)]/40 p-5 md:p-6">
      <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">{title}</p>
      <ul className="grid grid-cols-4 gap-3">
        {cluster.map((k) => (
          <li key={k.key} className="flex flex-col items-center gap-2 text-center">
            <kbd className="flex h-12 w-12 items-center justify-center rounded-lg border border-b-4 border-[var(--line)] border-b-[var(--orange)] bg-[var(--bg)] font-mono text-base font-bold">
              {k.key}
            </kbd>
            <span aria-hidden="true" className="font-mono text-sm text-[var(--orange)]">{k.arrow}</span>
            <span className="font-mono text-[10px] leading-tight text-[var(--muted)]">{k.does}</span>
          </li>
        ))}
      </ul>
      <ul className="flex flex-col gap-2 border-t border-dashed border-[var(--line)] pt-4">
        {combos.map((c) => (
          <li key={c.keys} className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <kbd className="rounded border border-[var(--line)] bg-[var(--bg)] px-2 py-1 font-mono text-[11px]">{c.keys}</kbd>
            <span className="text-[var(--text)]/75">{c.does}</span>
          </li>
        ))}
      </ul>
      <p className="text-sm leading-relaxed text-[var(--text)]/80">{text}</p>
    </div>
  )
}
