"use client"

import { useEffect, useState } from "react"
import type { TOCHeading } from "@/lib/blog/types"

export function TocList({ headings }: { headings: TOCHeading[] }) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const targets = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((node): node is HTMLElement => node !== null)
    if (targets.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-96px 0px -65% 0px" },
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [headings])

  return (
    <ul className="ed-toc">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a href={`#${heading.id}`} aria-current={active === heading.id ? "true" : undefined}>
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  )
}
