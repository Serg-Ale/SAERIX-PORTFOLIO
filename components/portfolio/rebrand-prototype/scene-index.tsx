// PROTOTYPE — throwaway. Tracks which section is in view. B: dots on the right
// (observes inside the snap container). C: a text list in the pinned column.

"use client"

import { useEffect, useState } from "react"

export function SceneIndex({
  items,
  rootId,
  variant,
}: {
  items: { id: string; label: string }[]
  rootId?: string
  variant: "dots" | "list"
}) {
  const [active, setActive] = useState(items[0]?.id)
  const key = items.map((i) => i.id).join()

  useEffect(() => {
    const root = rootId ? document.getElementById(rootId) : null
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { root, rootMargin: "-45% 0px -45% 0px" },
    )
    key.split(",").forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [key, rootId])

  if (variant === "dots") {
    return (
      <nav aria-label="Scenes" className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        {items.map((i) => (
          <a
            key={i.id}
            href={`#${i.id}`}
            title={i.label}
            aria-label={i.label}
            className={`h-2 w-2 rounded-full transition ${i.id === active ? "scale-150 bg-[var(--orange)]" : "bg-[var(--line)] hover:bg-[var(--muted)]"}`}
          />
        ))}
      </nav>
    )
  }

  return (
    <nav aria-label="Sections" className="hidden font-mono text-xs lg:block">
      <ul className="flex flex-col gap-1.5">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={i.id === active ? "text-[var(--text)]" : "text-[var(--muted)] hover:text-[var(--text)]"}
            >
              <span className="inline-block w-4 text-[var(--orange)]">{i.id === active ? "→" : ""}</span>
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
