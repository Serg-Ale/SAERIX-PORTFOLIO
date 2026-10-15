"use client"

// A short replay of a real grilling session, typed out line by line when it scrolls
// into view. The command and the first spoken line are always visible. With reduced
// motion, every line is shown.

import { Mic } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export interface TerminalLine {
  kind: "cmd" | "you" | "q" | "opt" | "ok"
  text: string
}

const STYLE: Record<TerminalLine["kind"], string> = {
  cmd: "text-[var(--text)]",
  you: "text-[var(--text)]",
  q: "font-bold text-[var(--teal)]",
  opt: "pl-4 text-[var(--muted)]",
  ok: "text-[var(--teal)]",
}

export function TerminalReplay({ cwd, lines, label }: { cwd: string; lines: TerminalLine[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(lines.length)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setShown(2)
    let timer: ReturnType<typeof setInterval> | undefined
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        let n = 2
        timer = setInterval(() => {
          n += 1
          setShown(n)
          if (n >= lines.length && timer) clearInterval(timer)
        }, 700)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (timer) clearInterval(timer)
    }
  }, [lines.length])

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className="overflow-hidden rounded-2xl border border-[var(--line)] bg-black/60"
    >
      <div className="flex items-center gap-1.5 border-b border-[var(--line)] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-3 font-mono text-[11px] text-[var(--muted)]">{cwd}</span>
      </div>
      <div className="space-y-1.5 p-5 font-mono text-[12px] leading-relaxed" aria-hidden="true">
        {lines.map((l, i) => (
          <p key={i} className={`${STYLE[l.kind]} transition-opacity duration-500 ${i < shown ? "opacity-100" : "opacity-0"}`}>
            {l.kind === "cmd" && <span className="mr-2 text-[var(--orange)]">$</span>}
            {l.kind === "you" && <Mic aria-hidden="true" className="mr-2 inline h-3 w-3 -translate-y-px text-[var(--orange)]" />}
            {l.kind === "ok" && <span className="mr-2">✓</span>}
            {l.text}
          </p>
        ))}
        <span className="inline-block h-4 w-2 animate-pulse bg-[var(--orange)] motion-reduce:animate-none" />
      </div>
    </div>
  )
}
