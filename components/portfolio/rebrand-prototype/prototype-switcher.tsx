// PROTOTYPE — throwaway. Floating bottom bar; ←/→ cycle variants.
// Hidden in production builds.

"use client"

import { useCallback, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const PROTO_VARIANTS = [
  { key: "B", name: "Scenes" },
  { key: "C", name: "Decision log" },
] as const

export function PrototypeSwitcher({ current }: { current: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const go = useCallback(
    (dir: 1 | -1) => {
      const i = PROTO_VARIANTS.findIndex((v) => v.key === current)
      const next = PROTO_VARIANTS[(i + dir + PROTO_VARIANTS.length) % PROTO_VARIANTS.length]
      const sp = new URLSearchParams(params.toString())
      sp.set("variant", next.key)
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false })
    },
    [current, params, pathname, router],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return
      if (e.key === "ArrowLeft") go(-1)
      if (e.key === "ArrowRight") go(1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  if (process.env.NODE_ENV === "production") return null

  const active = PROTO_VARIANTS.find((v) => v.key === current)
  return (
    <div className="fixed bottom-4 left-1/2 z-[999] flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/30 bg-white px-3 py-2 font-mono text-xs text-black shadow-xl">
      <button onClick={() => go(-1)} aria-label="Previous variant" className="px-2 text-base">
        ←
      </button>
      <span className="min-w-[10rem] text-center font-bold">
        {active?.key} — {active?.name}
      </span>
      <button onClick={() => go(1)} aria-label="Next variant" className="px-2 text-base">
        →
      </button>
    </div>
  )
}
