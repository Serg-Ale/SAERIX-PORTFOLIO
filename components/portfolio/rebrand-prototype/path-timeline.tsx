"use client"

// "Path" of variant C: a level ladder for the glance (intern, Jr, mid-level), then a
// vertical timeline whose line fills as you scroll and whose nodes light up as they
// reach the middle of the screen. Reduced motion: the line is full and every node lit.

import { Briefcase, GraduationCap, Moon, Rocket, BookOpen } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { ProtoStory } from "./story"

type Item = ProtoStory["journey"]["items"][number]

const KIND_ICON: Record<Item["kind"], typeof Briefcase> = {
  school: BookOpen,
  uni: GraduationCap,
  night: Moon,
  work: Briefcase,
  now: Rocket,
}

export function PathTimeline({ journey, currentLabel }: { journey: ProtoStory["journey"]; currentLabel: string }) {
  const listRef = useRef<HTMLOListElement>(null)
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const [fill, setFill] = useState(0)
  const [lit, setLit] = useState<boolean[]>(() => journey.items.map(() => true))

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setFill(1)
      return
    }
    setLit(journey.items.map(() => false))
    let raf = 0
    const update = () => {
      raf = 0
      const list = listRef.current
      if (!list) return
      const mid = window.innerHeight * 0.55
      const box = list.getBoundingClientRect()
      setFill(Math.min(1, Math.max(0, (mid - box.top) / box.height)))
      setLit(
        itemRefs.current.map((el) => {
          if (!el) return false
          const node = el.getBoundingClientRect()
          return node.top + 20 < mid
        }),
      )
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [journey.items])

  return (
    <div className="flex flex-col gap-10">
      <ol aria-hidden="true" className="grid grid-cols-4 items-end gap-1.5 sm:gap-3">
        {journey.ladder.map((step, i) => (
          <li key={`${step.level}-${step.org}`} className="flex flex-col justify-end">
            <div
              className="flex flex-col justify-end rounded-t-[0.75rem] border border-b-0 border-[var(--line)] p-2 sm:p-4"
              style={{
                height: `${4.5 + i * 1.75}rem`,
                background: `color-mix(in srgb, var(--orange) ${7 + i * 7}%, var(--surface))`,
              }}
            >
              <span className="font-mono text-[9px] text-[var(--muted)] sm:text-[11px]">{step.org}</span>
              <span className="text-[13px] font-bold leading-tight sm:text-xl">{step.level}</span>
            </div>
            <span className="h-1 rounded-b bg-[var(--orange)]" style={{ opacity: 0.4 + i * 0.2 }} />
          </li>
        ))}
      </ol>

      <ol ref={listRef} className="relative">
        <span aria-hidden="true" className="absolute bottom-3 left-5 top-3 w-px -translate-x-1/2 bg-[var(--line)]" />
        <span
          aria-hidden="true"
          className="absolute left-5 top-3 w-0.5 -translate-x-1/2 bg-[var(--orange)]"
          style={{ height: `calc((100% - 1.5rem) * ${fill})` }}
        />
        {journey.items.map((it, i) => {
          const Icon = KIND_ICON[it.kind]
          const on = lit[i]
          return (
            <li
              key={it.year}
              ref={(el) => {
                itemRefs.current[i] = el
              }}
              className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 pb-8 last:pb-0 sm:gap-5"
            >
              <span
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-[var(--bg)] transition-colors duration-500 ${
                  on ? (it.now ? "border-[var(--teal)] text-[var(--teal)]" : "border-[var(--orange)] text-[var(--orange)]") : "border-[var(--line)] text-[var(--muted)]"
                }`}
              >
                {it.now && on && <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full border border-[color-mix(in_srgb,var(--teal)_60%,transparent)] motion-reduce:hidden" />}
                <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
              </span>
              <article
                className={`flex flex-col gap-3 rounded-2xl border bg-[color-mix(in_srgb,var(--surface)_40%,transparent)] p-5 transition-[border-color,opacity,transform] duration-500 ${
                  on ? "translate-y-0 opacity-100" : "translate-y-2 opacity-60"
                } ${it.now ? "border-[color-mix(in_srgb,var(--teal)_50%,transparent)]" : "border-[var(--line)]"}`}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs">
                  <span className={it.now ? "font-bold text-[var(--teal)]" : "font-bold text-[var(--orange)]"}>{it.year}</span>
                  <span className="text-[var(--muted)]">{it.org}</span>
                  {it.level && (
                    <span className="rounded-full border border-[var(--line)] px-2.5 py-0.5 text-[11px] uppercase tracking-widest text-[color-mix(in_srgb,var(--text)_80%,transparent)]">
                      {it.level}
                    </span>
                  )}
                  {it.now && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[var(--teal)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--teal)]" />
                      {currentLabel}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold leading-snug md:text-lg">{it.title}</h3>
                <p className="text-sm leading-relaxed text-[color-mix(in_srgb,var(--text)_80%,transparent)]">{it.body}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {it.tags.map((t) => (
                    <li key={t} className="rounded-[0.375rem] border border-[var(--line)] bg-[var(--bg)] px-2 py-0.5 font-mono text-[11px] text-[var(--muted)]">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          )
        })}
      </ol>

      <p className="font-mono text-sm leading-relaxed text-[var(--muted)]">{journey.fundamentals}</p>
    </div>
  )
}
