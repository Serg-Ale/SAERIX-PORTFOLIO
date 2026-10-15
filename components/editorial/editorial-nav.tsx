"use client"

import { useEffect, useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { Link, usePathname, useRouter } from "@/i18n/routing"

const LINKS = [
  { href: "/ensaios", key: "essays", series: "essay" },
  { href: "/laboratorio", key: "laboratory", series: "lab" },
  { href: "/dev", key: "dev", series: null },
] as const

function Sun() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="10" cy="10" r="3.5" />
      <path d="M10 2.5v2M10 15.5v2M2.5 10h2M15.5 10h2M4.7 4.7l1.4 1.4M13.9 13.9l1.4 1.4M4.7 15.3l1.4-1.4M13.9 6.1l1.4-1.4" />
    </svg>
  )
}

function Moon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16.5 11.6A6.8 6.8 0 0 1 8.4 3.5a6.8 6.8 0 1 0 8.1 8.1z" />
    </svg>
  )
}

/** Top bar for the editorial area. Same destinations as the site nav, drawn in the vault palette. */
export function EditorialNav() {
  const t = useTranslations("nav")
  const te = useTranslations("editorial")
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => setMounted(true), [])
  useEffect(() => setOpen(false), [pathname])

  const label = (key: (typeof LINKS)[number]["key"]) => {
    if (key === "dev") return te("navDev")
    const text = t(key).toLocaleLowerCase(locale)
    return text.charAt(0).toLocaleUpperCase(locale) + text.slice(1)
  }

  const controls = (
    <>
      <button
        type="button"
        className="ed-nav-btn"
        onClick={() => router.replace(pathname, { locale: locale === "en" ? "pt-BR" : "en" })}
        aria-label={locale === "en" ? "Mudar para português" : "Switch to English"}
      >
        {locale === "en" ? "EN" : "PT"}
      </button>
      <button
        type="button"
        className="ed-nav-btn"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        aria-label={te("theme")}
      >
        {mounted && resolvedTheme === "dark" ? <Sun /> : <Moon />}
      </button>
    </>
  )

  return (
    <header className="ed-nav">
      <div className="ed-nav-inner">
        <Link href="/" className="ed-nav-logo">
          {t("logo")}
        </Link>

        <nav className="ed-nav-links" aria-label={te("siteNav")}>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-series={link.series ?? undefined}
              aria-current={pathname.startsWith(link.href) ? "page" : undefined}
            >
              {label(link.key)}
            </Link>
          ))}
        </nav>

        <div className="ed-nav-controls">{controls}</div>

        <button
          type="button"
          className="ed-nav-btn ed-nav-burger"
          aria-expanded={open}
          aria-controls="ed-nav-sheet"
          aria-label={te("menu")}
          onClick={() => setOpen(!open)}
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M5 5l10 10M15 5L5 15" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
          </svg>
        </button>
      </div>

      <div id="ed-nav-sheet" className="ed-nav-sheet" hidden={!open}>
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} data-series={link.series ?? undefined} aria-current={pathname.startsWith(link.href) ? "page" : undefined}>
            {label(link.key)}
          </Link>
        ))}
        <div className="ed-nav-controls">{controls}</div>
      </div>
    </header>
  )
}
