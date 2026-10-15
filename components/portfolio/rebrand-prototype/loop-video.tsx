"use client"

// A muted loop that downloads and plays only while it is on screen, so a page with
// several of them does not fetch every video up front. Without JavaScript, or for
// people who prefer less motion, the poster image stands in.

import { useEffect, useRef } from "react"

export function LoopVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string
  poster: string
  label: string
  className?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!el.getAttribute("src")) el.src = src
          el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { rootMargin: "150px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [src])

  return <video ref={ref} className={className} poster={poster} aria-label={label} loop muted playsInline preload="none" />
}
