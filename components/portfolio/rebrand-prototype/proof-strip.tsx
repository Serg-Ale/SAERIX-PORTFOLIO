// Four checkable facts at the top of the story, so a skimmer gets proof before the long
// sections. Only what the resume or a public repo backs; text lives in story.ts.

export function ProofStrip({ items }: { items: { value: string; label: string }[] }) {
  return (
    <ul className="mb-14 grid grid-cols-2 gap-3 md:grid-cols-4">
      {items.map((p) => (
        <li
          key={p.value}
          className="flex flex-col gap-1.5 rounded-[0.75rem] border border-[var(--line)] border-t-2 border-t-[var(--orange)] bg-[color-mix(in_srgb,var(--surface)_40%,transparent)] p-4"
        >
          <span className="font-mono text-xl font-bold text-[var(--orange)] md:text-2xl">{p.value}</span>
          <span className="text-xs leading-snug text-[color-mix(in_srgb,var(--text)_75%,transparent)]">{p.label}</span>
        </li>
      ))}
    </ul>
  )
}
