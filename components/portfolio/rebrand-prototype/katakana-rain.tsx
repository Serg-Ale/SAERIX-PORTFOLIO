// PROTOTYPE — throwaway. Hero-only katakana rain (decision 3): discreet,
// masked so headline text stays readable, static frame under reduced motion,
// paused while off screen.

"use client"

import { useEffect, useRef } from "react"

const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789"
const SIZE = 16

export function KatakanaRain({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    const ctx = canvas?.getContext("2d")
    if (!canvas || !parent || !ctx) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let drops: number[] = []
    let timer: ReturnType<typeof setInterval> | undefined
    let visible = true

    const resize = () => {
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
      drops = Array.from({ length: Math.ceil(canvas.width / SIZE) }, () =>
        Math.floor((Math.random() * canvas.height) / SIZE),
      )
      ctx.fillStyle = "#0D0D0F"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const draw = () => {
      if (!visible) return
      ctx.fillStyle = "rgba(13,13,15,0.12)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${SIZE}px ui-monospace, monospace`
      drops.forEach((y, i) => {
        const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ctx.fillStyle = "rgba(46,196,182,0.55)"
        ctx.fillText(glyph, i * SIZE, y * SIZE)
        drops[i] = y * SIZE > canvas.height && Math.random() > 0.975 ? 0 : y + 1
      })
    }

    resize()
    if (reduced) {
      for (let i = 0; i < 40; i++) draw()
    } else {
      timer = setInterval(draw, 55)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(canvas)

    return () => {
      if (timer) clearInterval(timer)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full opacity-40 [mask-image:linear-gradient(to_bottom,black_20%,transparent_95%)] ${className}`}
    />
  )
}
