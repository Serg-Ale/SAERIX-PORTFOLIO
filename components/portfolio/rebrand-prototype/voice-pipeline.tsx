"use client"

// The hook of "How I work": a microphone and a live waveform (I talk), then the five
// steps the conversation goes through. The steps advance on their own while the block
// is on screen, and a tap on any step takes over. Reduced motion: no autoplay, static bars.

import { AudioLines, FileText, FlaskConical, ListChecks, MessageCircleQuestion, Mic, ShieldCheck } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import type { ProtoStory } from "./story"

const STEP_ICONS = [MessageCircleQuestion, FileText, ListChecks, FlaskConical, ShieldCheck]
const BARS = 36
const STEP_MS = 3400

// Deterministic pseudo-random bar heights, so server and client render the same thing.
const barHeight = (i: number) => 22 + Math.round(((Math.sin(i * 1.7) + Math.sin(i * 0.63 + 1)) / 2 + 1) * 34)

export function VoicePipeline({ setup }: { setup: ProtoStory["setup"] }) {
  const { voice, loop, review, memory } = setup
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const [manual, setManual] = useState(false)
  const [reduced, setReduced] = useState(true)

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || manual || !inView) return
    const t = setInterval(() => setActive((a) => (a + 1) % loop.length), STEP_MS)
    return () => clearInterval(t)
  }, [reduced, manual, inView, loop.length])

  const step = loop[active]
  const last = active === loop.length - 1
  const speaking = inView && !reduced

  return (
    <div ref={rootRef} className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]/40">
      <style>{`
        @keyframes vp-bar { 0%, 100% { transform: scaleY(.28) } 50% { transform: scaleY(1) } }
        @keyframes vp-rise { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: none } }
        .vp-bar { animation: vp-bar 1.15s ease-in-out infinite; transform-origin: center }
        .vp-panel { animation: vp-rise .35s ease-out }
        @media (prefers-reduced-motion: reduce) { .vp-bar, .vp-panel { animation: none !important } }
      `}</style>

      <div className="flex flex-col gap-4 p-5 md:p-6">
        <div className="flex items-center gap-4">
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--orange)] text-black">
            {speaking && (
              <>
                <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-[var(--orange)]/50" />
                <span
                  aria-hidden="true"
                  className="absolute -inset-2 animate-ping rounded-full border border-[var(--orange)]/40 [animation-delay:400ms]"
                />
              </>
            )}
            <Mic aria-hidden="true" className="relative h-6 w-6" strokeWidth={2.4} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--orange)]">
              <AudioLines aria-hidden="true" className="h-3.5 w-3.5" />
              {voice.label}
            </p>
            <div aria-hidden="true" className="flex h-10 items-center justify-between gap-[3px]">
              {Array.from({ length: BARS }, (_, i) => (
                <span
                  key={i}
                  className={`vp-bar w-[3px] flex-1 rounded-full ${i % 7 === 0 ? "bg-[var(--teal)]" : "bg-[var(--orange)]"} ${speaking ? "" : "[animation-play-state:paused]"}`}
                  style={{ height: `${barHeight(i)}%`, animationDelay: `${-((i * 137) % 1150)}ms`, opacity: 0.45 + (barHeight(i) / 100) * 0.55 }}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="max-w-prose text-sm leading-relaxed text-[var(--text)]/80">{voice.caption}</p>
      </div>

      <div className="border-t border-[var(--line)] px-5 pb-5 pt-6 md:px-6">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">{voice.stepsLabel}</p>

        <div role="tablist" aria-label={voice.stepsLabel} className="relative grid grid-cols-5">
          <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-[22px] h-0.5 bg-[var(--line)]" />
          <span
            aria-hidden="true"
            className="absolute left-[10%] top-[22px] h-0.5 bg-[var(--orange)] transition-[width] duration-500"
            style={{ width: `${(80 * active) / (loop.length - 1)}%` }}
          />
          {loop.map((s, i) => {
            const Icon = STEP_ICONS[i]
            const on = i === active
            const done = i < active
            return (
              <button
                key={s.skill}
                role="tab"
                id={`vp-tab-${i}`}
                aria-selected={on}
                aria-controls="vp-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => {
                  setManual(true)
                  setActive(i)
                }}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
                  e.preventDefault()
                  const next = (i + (e.key === "ArrowRight" ? 1 : loop.length - 1)) % loop.length
                  setManual(true)
                  setActive(next)
                  document.getElementById(`vp-tab-${next}`)?.focus()
                }}
                className="group relative flex flex-col items-center gap-2 outline-none"
              >
                <span
                  className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 bg-[var(--bg)] transition group-focus-visible:ring-2 group-focus-visible:ring-[var(--teal)] ${
                    on
                      ? "scale-110 border-[var(--orange)] text-[var(--orange)] shadow-[0_0_24px_color-mix(in_srgb,var(--orange)_45%,transparent)]"
                      : done
                        ? "border-[var(--orange)]/60 text-[var(--orange)]/80"
                        : "border-[var(--line)] text-[var(--muted)] group-hover:border-[var(--orange)]/50"
                  }`}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className={`font-mono text-[10px] sm:text-[11px] ${on ? "font-bold text-[var(--text)]" : "text-[var(--muted)]"}`}>
                  {s.short}
                </span>
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id="vp-panel"
          aria-labelledby={`vp-tab-${active}`}
          key={active}
          className="vp-panel mt-6 flex min-h-[10.5rem] flex-col gap-2 rounded-xl border border-[var(--line)] bg-[var(--bg)] p-5 sm:min-h-[8rem]"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[11px] text-[var(--orange)]">{String(active + 1).padStart(2, "0")}</span>
            <code className="rounded-md border border-[var(--orange)]/40 px-2 py-0.5 font-mono text-[11px] font-bold">{step.skill}</code>
          </div>
          <h4 className="text-base font-bold leading-snug">{step.title}</h4>
          <p className="text-sm leading-relaxed text-[var(--text)]/80">{step.body}</p>
          {last && (
            <div className="mt-1 flex flex-wrap items-center gap-2 border-l-2 border-[var(--teal)] pl-3">
              {review.lanes.map((l) => (
                <span key={l} className="rounded border border-[var(--teal)]/50 px-2 py-0.5 font-mono text-[10px] text-[var(--teal)]">
                  {l}
                </span>
              ))}
              <span className="font-mono text-[10px] text-[var(--muted)]">{review.label}</span>
            </div>
          )}
        </div>

        <p className="mt-5 flex items-start gap-2 font-mono text-[11px] leading-relaxed text-[var(--muted)]">
          <span aria-hidden="true" className="text-[var(--teal)]">●</span>
          {memory}
        </p>
      </div>
    </div>
  )
}
