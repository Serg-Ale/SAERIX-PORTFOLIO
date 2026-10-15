"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"

export function ReadingProgress() {
  useEffect(() => {
    const bar = document.getElementById("ed-progress")
    if (!bar) return
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      bar.style.setProperty("--ed-progress", String(max > 0 ? Math.min(window.scrollY / max, 1) : 0))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <div id="ed-progress" className="ed-progress" aria-hidden="true" />
}

export function ShareRow({ title, url }: { title: string; url: string }) {
  const t = useTranslations("editorial")
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="ed-share">
      <span>{t("share")}</span>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <a href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`} target="_blank" rel="noopener noreferrer">
        WhatsApp
      </a>
      <button type="button" onClick={copy}>
        {copied ? t("copied") : t("copyLink")}
      </button>
    </div>
  )
}
