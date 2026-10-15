"use client"

import { useEffect, useRef } from "react"
import { useLocale, useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowDown, ArrowUpRight, Download, Github, Linkedin, Terminal } from "lucide-react"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

type HeroMetric = {
  value: string
  label: string
}

type HeroSignal = {
  label: string
  value: string
}

export function PortfolioIntro() {
  const t = useTranslations("hero")
  const sectionRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const consoleRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null)
  const metrics = t.raw("metrics") as HeroMetric[]
  const signals = t.raw("signals") as HeroSignal[]
  const stack = t.raw("stack") as string[]

  const locale = useLocale()
  const cvHref = locale === "pt-BR" ? "/cv-pt-br.pdf" : "/cv-en.pdf"

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const hero = heroRef.current
    const consolePanel = consoleRef.current
    const scrollIndicator = scrollIndicatorRef.current

    if (!hero || !scrollIndicator) return

    const ctx = gsap.context(() => {
      const sel = gsap.utils.selector(hero)

      if (prefersReducedMotion()) {
        gsap.set(sel("[data-dev-anim]"), { opacity: 1, y: 0, x: 0 })
        if (consolePanel) {
          gsap.set(consolePanel, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" })
        }
        return
      }

      gsap.set(sel("[data-dev-anim]"), { opacity: 0, y: 34 })
      gsap.set(sel("[data-dev-name-left]"), { x: -80 })
      gsap.set(sel("[data-dev-name-right]"), { x: 80 })
      gsap.set(sel("[data-dev-line]"), { scaleX: 0, transformOrigin: "left" })
      if (consolePanel) {
        gsap.set(consolePanel, { opacity: 0, y: 40, clipPath: "inset(12% 0% 12% 0%)" })
      }

      const tl = gsap.timeline({ delay: 0.2 })

      tl.to(sel("[data-dev-name-left]"), { opacity: 1, x: 0, y: 0, duration: 1, ease: "power3.out" })
        .to(sel("[data-dev-name-right]"), { opacity: 1, x: 0, y: 0, duration: 1, ease: "power3.out" }, "-=0.72")
        .to(sel("[data-dev-line]"), { scaleX: 1, duration: 0.55, ease: "power2.out" }, "-=0.55")
        .to(sel("[data-dev-anim]:not([data-dev-name-left]):not([data-dev-name-right])"), {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.65,
          ease: "power3.out",
        }, "-=0.35")
        .to(consolePanel, {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.9,
          ease: "power3.inOut",
        }, "-=0.55")

      gsap.to(scrollIndicator, {
        y: 10,
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      })

      gsap.to(hero, {
        y: -80,
        scale: 0.96,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      gsap.to(hero, {
        opacity: 0.35,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center top",
          end: "bottom top",
          scrub: 1,
        },
      })

      gsap.to(sel("[data-dev-name-left]"), {
        y: -44,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      gsap.to(sel("[data-dev-name-right]"), {
        y: -72,
        rotation: -0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, hero)

    return () => ctx.revert()
  }, [])

  const handleScrollDown = () => {
    scrollToSection("projects")
  }

  return (
    <>
      <section
        ref={sectionRef}
        id="intro"
        className="relative min-h-screen overflow-hidden bg-[#050505] text-white"
        data-theme="dark"
      >
        <div className="grain-overlay absolute inset-0 z-0" />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.075)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.075)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="absolute left-0 top-0 z-0 h-full w-px bg-[var(--lxndr-cyan)]/60" />
        <div className="absolute right-6 top-24 z-0 hidden h-32 w-px bg-white/20 md:block" />
        <div className="absolute bottom-0 left-0 right-0 z-0 h-px bg-white/15" />

        <div
          ref={heroRef}
          className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1160px] grid-cols-1 gap-12 px-6 pb-24 pt-28 md:px-12 md:pt-32 lg:grid-cols-[minmax(0,640px)_380px] lg:items-center xl:grid-cols-[minmax(0,680px)_400px]"
        >
          <div className="flex min-w-0 flex-col justify-center">
            <div data-dev-anim className="mb-8 flex flex-wrap items-center gap-3 opacity-0">
              <span className="h-2 w-2 bg-[var(--lxndr-green)]" />
              <p className="font-mono text-xs font-bold uppercase tracking-[0.38em] text-white/58">
                {t("systemLabel")}
              </p>
              <div data-dev-line className="h-px min-w-16 flex-1 bg-white/28" />
            </div>

            <h1 className="flex flex-col">
              <span
                data-dev-anim
                data-dev-name-left
                className="font-bebas text-[clamp(5.6rem,16vw,12.5rem)] leading-[0.78] tracking-normal text-white"
              >
                {t("firstName")}
              </span>
              <span
                data-dev-anim
                data-dev-name-right
                className="font-space text-[clamp(3.5rem,7vw,6.5rem)] font-black leading-[0.82] tracking-normal text-outlined"
              >
                {t("lastName")}
              </span>
            </h1>

            <div data-dev-anim className="mt-8 max-w-3xl opacity-0">
              <p className="font-mono text-sm font-bold uppercase tracking-[0.34em] text-[var(--lxndr-cyan)] md:text-lg">
                {t("role")}
              </p>
              <p className="mt-5 max-w-2xl font-space text-xl font-semibold leading-snug text-white/84 md:text-3xl">
                {t("tagline")}
              </p>
              <p className="mt-5 max-w-2xl font-mono text-sm uppercase leading-relaxed tracking-[0.2em] text-white/46">
                {t("location")} / {t("availability")}
              </p>
            </div>

            <div data-dev-anim className="mt-9 flex flex-col flex-wrap gap-3 opacity-0 sm:flex-row md:mt-11">
              <button
                type="button"
                onClick={() => scrollToSection("projects")}
                className="inline-flex items-center justify-center gap-3 border-2 border-[var(--lxndr-green)] bg-[var(--lxndr-green)] px-6 py-4 font-mono text-xs font-black uppercase tracking-widest text-black transition-all duration-200 hover:bg-transparent hover:text-[var(--lxndr-green)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--lxndr-green)] focus-visible:outline-offset-2"
              >
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                {t("ctaSeeWork")}
              </button>
              <a
                href={cvHref}
                download
                className="inline-flex items-center justify-center gap-3 border-2 border-white/24 bg-transparent px-6 py-4 font-mono text-xs font-black uppercase tracking-widest text-white transition-all duration-200 hover:border-[var(--lxndr-cyan)] hover:text-[var(--lxndr-cyan)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--lxndr-cyan)] focus-visible:outline-offset-2"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {t("ctaDownloadCV")}
              </a>
              <a
                href="https://github.com/Serg-Ale"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border-2 border-white/14 bg-transparent px-6 py-4 font-mono text-xs font-black uppercase tracking-widest text-white/62 transition-all duration-200 hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/serg-alexandre"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border-2 border-white/14 bg-transparent px-6 py-4 font-mono text-xs font-black uppercase tracking-widest text-white/62 transition-all duration-200 hover:border-white hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
            </div>

            <div data-dev-anim className="mt-8 flex flex-wrap border border-white/14 bg-black/35 opacity-0">
              {metrics.map((metric) => (
                <div key={metric.label} className="min-w-[9.5rem] flex-1 border-b border-r border-white/10 p-4 last:border-r-0 sm:border-b-0">
                  <p className="font-bebas text-4xl leading-none text-white md:text-5xl">{metric.value}</p>
                  <p className="mt-2 max-w-[9rem] font-mono text-[9px] font-bold uppercase leading-relaxed tracking-[0.22em] text-white/42">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={consoleRef}
            data-dev-anim
            className="relative border border-white/28 bg-black/78 p-5 opacity-0 shadow-[0_0_70px_rgba(0,234,255,0.09)] md:p-6"
          >
            <div className="flex items-center justify-between border-b border-white/14 pb-4">
              <div className="flex items-center gap-3">
                <Terminal className="h-5 w-5 text-[var(--lxndr-green)]" aria-hidden="true" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.28em] text-white/76">
                  {t("console.title")}
                </span>
              </div>
              <span className="h-2 w-2 bg-[var(--lxndr-green)]" />
            </div>

            <div className="mt-6 space-y-5">
              {signals.map((signal) => (
                <div key={signal.label} className="border-b border-white/10 pb-5 last:border-b-0 last:pb-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
                    {signal.label}
                  </p>
                  <p className="mt-2 font-space text-base font-semibold leading-snug text-white/84">
                    {signal.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-7 border border-white/14 bg-white/[0.03] p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-white/44">
                  {t("console.stackLabel")}
                </p>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--lxndr-cyan)]">
                  {t("console.status")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="border border-white/16 bg-black px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-white/12 pt-4">
              <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-white/42">
                {t("console.footer")}
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          ref={scrollIndicatorRef}
          onClick={handleScrollDown}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4"
          aria-label={t("scrollDown")}
        >
          <div className="group flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/34 transition-colors group-hover:text-white/68">
              {t("scrollDown")}
            </span>
            <div className="flex h-10 w-10 items-center justify-center border border-white/18">
              <ArrowDown className="h-4 w-4 text-white/50" aria-hidden="true" />
            </div>
          </div>
        </button>
      </section>
    </>
  )
}
