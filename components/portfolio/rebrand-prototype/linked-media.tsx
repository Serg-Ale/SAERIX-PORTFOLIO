// One rule for every image on the page: it is a link to the real thing. A live site
// for products and apps, the repository for command-line tools. Same frame, same caption.
// A short muted loop plays when there is a video (only while on screen), and the poster
// stands in for anyone who prefers less motion.

import Image from "next/image"
import { LoopVideo } from "./loop-video"

export interface MediaItem {
  src: string
  alt: string
  video?: string
}

function Frame({ item, width, height }: { item: MediaItem; width: number; height: number }) {
  if (!item.video) {
    return <Image src={item.src} alt={item.alt} width={width} height={height} loading="lazy" className="h-auto w-full" />
  }
  return (
    <>
      <Image
        src={item.src}
        alt={item.alt}
        width={width}
        height={height}
        loading="lazy"
        className="hidden h-auto w-full motion-reduce:block"
      />
      <LoopVideo src={item.video} poster={item.src} label={item.alt} className="h-auto w-full motion-reduce:hidden" />
    </>
  )
}

export function LinkedMedia({
  items,
  href,
  label,
  cta,
  size = "full",
}: {
  items: MediaItem[]
  href?: string
  label: string
  cta?: string
  size?: "full" | "compact"
}) {
  const body = (
    <>
      <div className={`grid ${items.length > 1 ? "md:grid-cols-2" : ""}`}>
        {items.map((item) => (
          <Frame key={item.src} item={item} width={1200} height={675} />
        ))}
      </div>
      <span className="flex items-center justify-between gap-4 px-5 py-3 font-mono text-xs text-[var(--muted)] transition group-hover:text-[var(--text)]">
        <span className="truncate">{label}</span>
        {cta && <span className="shrink-0 text-[var(--orange)]">{cta}</span>}
      </span>
    </>
  )
  const frame = `group overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)] transition ${size === "compact" ? "md:max-w-md" : ""}`
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${frame} hover:border-[var(--orange)]`}>
      {body}
    </a>
  ) : (
    <div className={frame}>{body}</div>
  )
}
