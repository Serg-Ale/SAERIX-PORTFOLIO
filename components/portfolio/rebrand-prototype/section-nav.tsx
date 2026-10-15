// PROTOTYPE — throwaway. Wayfinding for variant C.
// Desktop: a `~/slug` prompt, numbered index, scroll progress and j/k hint in the
// pinned column. Mobile: a fixed top bar with prev/next, counter and progress.
// Active section is computed from scroll position (not IntersectionObserver) so
// the intro (mobile, before the first section) and the page end both resolve.
// The URL hash follows the active section after the first user scroll.

"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface Item {
  id: string
  label: string
}

const pad = (n: number) => String(n).padStart(2, "0")

export function SectionNav({
  items,
  introLabel,
  prevLabel,
  nextLabel,
}: {
  items: Item[]
  introLabel: string
  prevLabel: string
  nextLabel: string
}) {
  const [idx, setIdx] = useState(-1) // -1 = intro
  const [pct, setPct] = useState(0)
  const idxRef = useRef(-1)
  const scrolled = useRef(false)
  const key = items.map((i) => i.id).join()

  const compute = useCallback(() => {
    const ids = key.split(",")
    const threshold = window.innerHeight * 0.35
    let next = -1
    ids.forEach((id, i) => {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top <= threshold) next = i
    })
    const max = document.documentElement.scrollHeight - window.innerHeight
    if (max > 0 && window.scrollY >= max - 2) next = ids.length - 1
    idxRef.current = next
    setIdx(next)
    setPct(max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0)
  }, [key])

  const goTo = useCallback(
    (i: number) => {
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const behavior = smooth ? "smooth" : "auto"
      if (i < 0) return window.scrollTo({ top: 0, behavior })
      document.getElementById(key.split(",")[i])?.scrollIntoView({ behavior })
    },
    [key],
  )

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      scrolled.current = true
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [compute])

  useEffect(() => {
    if (!scrolled.current) return
    const hash = idx < 0 ? "" : `#${key.split(",")[idx]}`
    history.replaceState(null, "", `${location.pathname}${location.search}${hash}`)
  }, [idx, key])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const el = document.activeElement as HTMLElement | null
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return
      if (e.key === "j") goTo(Math.min(items.length - 1, idxRef.current + 1))
      if (e.key === "k") goTo(Math.max(-1, idxRef.current - 1))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [goTo, items.length])

  const current = idx < 0 ? null : items[idx]
  const counter = `${pad(idx + 1)}/${pad(items.length)}`

  return (
    <>
      <nav aria-label="Sections" className="hidden flex-col gap-4 font-mono text-xs lg:flex">
        <p className="text-[var(--muted)]" aria-hidden="true">
          ~/<span className="text-[var(--text)]">{current?.id ?? ""}</span>
          <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-[var(--orange)] motion-safe:animate-pulse" />
        </p>
        <ul className="flex flex-col gap-1.5">
          {items.map((it, n) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={n === idx ? "location" : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  goTo(n)
                }}
                className={`flex gap-3 border-l-2 pl-3 transition ${n === idx ? "border-[var(--orange)] text-[var(--text)]" : "border-transparent text-[var(--muted)] hover:text-[var(--text)]"}`}
              >
                <span className={n === idx ? "text-[var(--orange)]" : ""}>{pad(n + 1)}</span>
                {it.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3 text-[var(--muted)] [@media(max-height:820px)]:hidden">
          <div className="h-px flex-1 bg-[var(--line)]">
            <div className="h-px bg-[var(--orange)] transition-[width]" style={{ width: `${pct}%` }} />
          </div>
          <span className="w-9 text-right">{pct}%</span>
          <span className="rounded border border-[var(--line)] px-1.5 py-0.5">j/k</span>
        </div>
      </nav>

      <div className="fixed inset-x-0 top-0 z-50 flex h-11 items-center justify-between gap-2 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_85%,transparent)] px-2 font-mono text-xs backdrop-blur lg:hidden">
        <button
          onClick={() => goTo(idx - 1)}
          disabled={idx < 0}
          aria-label={prevLabel}
          className="px-3 py-2 text-base disabled:opacity-30"
        >
          ‹
        </button>
        <p className="min-w-0 flex-1 truncate text-center" aria-live="polite">
          <span className="text-[var(--orange)]">{counter}</span>
          <span className="text-[var(--muted)]"> · </span>
          {current?.label ?? introLabel}
        </p>
        <button
          onClick={() => goTo(idx + 1)}
          disabled={idx >= items.length - 1}
          aria-label={nextLabel}
          className="px-3 py-2 text-base disabled:opacity-30"
        >
          ›
        </button>
        <div className="absolute inset-x-0 bottom-0 h-px bg-[var(--line)]">
          <div className="h-px bg-[var(--orange)]" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </>
  )
}
