"use client"

// Shared by the blocks that step through a list on their own while they are on screen
// (the voice pipeline and the key tiler): an index that advances on a timer, stops when
// the reader picks one, and does not run under reduced motion. `playing` is true only
// while the block is visible and motion is allowed, for animations that should pause.

import { useEffect, useRef, useState } from "react"

export function useAutoStep({
  count,
  intervalMs,
  threshold,
}: {
  count: number
  intervalMs: number
  threshold: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const [manual, setManual] = useState(false)
  // Starts true so the server render and the first paint never animate.
  const [reduced, setReduced] = useState(true)

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  useEffect(() => {
    if (reduced || manual || !inView) return
    const timer = setInterval(() => setActive((a) => (a + 1) % count), intervalMs)
    return () => clearInterval(timer)
  }, [reduced, manual, inView, count, intervalMs])

  // A pick by the reader ends the autoplay for good.
  const select = (i: number) => {
    setManual(true)
    setActive(i)
  }

  return { ref, active, select, playing: inView && !reduced }
}
