"use client"

// Every image on the page is a link to the real thing: the live site for a product or
// app, the repository for a command-line tool. This frame gives it a window around it,
// a browser for sites and a terminal for tools, with a switch when there is more than one
// image. A short muted loop plays when there is a video; reduced motion gets the poster.

import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { LoopVideo } from "./loop-video"
import type { MediaItem } from "./linked-media"

// The frame is at most about 700px wide on desktop; 2x covers retina screens.
const SIZES = "(min-width: 1024px) 720px, calc(100vw - 2.5rem)"

function Media({ item }: { item: MediaItem }) {
  if (!item.video) {
    return <Image src={item.src} alt={item.alt} width={1600} height={900} sizes={SIZES} loading="lazy" className="h-auto w-full" />
  }
  return (
    <>
      <Image
        src={item.src}
        alt={item.alt}
        width={1600}
        height={900}
        sizes={SIZES}
       
        loading="lazy"
        className="hidden h-auto w-full motion-reduce:block"
      />
      <LoopVideo src={item.video} poster={item.src} label={item.alt} className="h-auto w-full motion-reduce:hidden" />
    </>
  )
}

export function MediaFrame({
  items,
  href,
  label,
  cta,
  variant = "browser",
  accent = "var(--orange)",
}: {
  items: MediaItem[]
  href?: string
  label: string
  cta?: string
  variant?: "browser" | "terminal"
  accent?: string
}) {
  const [i, setI] = useState(0)
  const item = items[i]

  const chrome = (
    <div className="flex items-center gap-3 border-b border-[var(--line)] bg-[var(--surface)] px-3.5 py-2.5">
      <span aria-hidden="true" className="flex shrink-0 gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
      </span>
      <span
        className={`min-w-0 flex-1 truncate font-mono text-[11px] text-[var(--muted)] ${
          variant === "browser" ? "rounded-[0.375rem] bg-[var(--bg)] px-3 py-1" : ""
        }`}
      >
        {variant === "terminal" && <span style={{ color: accent }}>$ </span>}
        {label}
      </span>
      {href && cta && (
        <span
          className="hidden shrink-0 items-center gap-1 font-mono text-[11px] transition group-hover:translate-x-0.5 sm:flex"
          style={{ color: accent }}
        >
          {cta}
          <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
        </span>
      )}
    </div>
  )

  const window = (
    <>
      {chrome}
      <div className="bg-black">
        <Media key={item.src} item={item} />
      </div>
    </>
  )
  const frame = "group block overflow-hidden rounded-[0.75rem] border border-[var(--line)] bg-[var(--bg)] transition"

  return (
    <div className="flex flex-col gap-2.5">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${frame} hover:border-[color-mix(in_srgb,var(--a,var(--orange))_70%,transparent)]`}
        >
          {window}
        </a>
      ) : (
        <div className={frame}>{window}</div>
      )}
      {(items.length > 1 || item.note) && (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          {items.length > 1 && (
            <div
              role="group"
              aria-label={label}
              className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-[var(--line)] bg-[var(--surface)] p-1 [scrollbar-width:none]"
            >
              {items.map((it, n) => (
                <button
                  key={it.src}
                  type="button"
                  aria-pressed={n === i}
                  onClick={() => setI(n)}
                  className={`shrink-0 rounded-full px-3.5 py-1 font-mono text-[11px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--teal)] ${
                    n === i ? "font-bold text-black" : "text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                  style={n === i ? { background: accent } : undefined}
                >
                  {it.tab ?? n + 1}
                </button>
              ))}
            </div>
          )}
          {item.note && <span className="font-mono text-[11px] text-[var(--muted)]">{item.note}</span>}
        </div>
      )}
    </div>
  )
}
