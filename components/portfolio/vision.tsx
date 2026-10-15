"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { GlitchText } from "@/components/shared/glitch-text"
import { prefersReducedMotion } from "@/lib/gsap-config"

gsap.registerPlugin(ScrollTrigger)

export function PortfolioVision() {
  const t = useTranslations("vision")
  const sectionRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const list = listRef.current

    if (!section) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(list, { opacity: 1, y: 0 })
        return
      }

      if (list) {
        gsap.from(list.children, {
          x: -50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: list,
            start: "top bottom-=50",
            toggleActions: "play none none reverse",
          },
        })

        Array.from(list.children).forEach((child, index) => {
          const speed = 0.9 - index * 0.05
          gsap.to(child, {
            y: -40 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          })
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const lookingFor = [
    t("lookingFor.item1"),
    t("lookingFor.item2"),
    t("lookingFor.item3"),
  ]

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="relative min-h-screen flex items-center px-6 md:px-12 py-32 md:py-48 bg-foreground text-background overflow-hidden"
      data-theme="dark"
    >
      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0" />

      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-background rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[32rem] h-[32rem] bg-background rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-16 md:mb-24">
          <SplitTextReveal
            as="h2"
            className="text-[clamp(3rem,10vw,8rem)] font-black leading-none tracking-tighter"
            triggerOnScroll
            staggerFrom="start"
          >
            {t("title")}
          </SplitTextReveal>
        </div>

        {/* What I'm Looking For */}
        <div>
          <GlitchText
            as="h3"
            className="text-2xl md:text-4xl font-black mb-8 md:mb-12 tracking-tight"
            delay={0.2}
            intensity={2}
          >
            {t("lookingFor.title")}
          </GlitchText>

          <div ref={listRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {lookingFor.map((item, index) => (
              <div
                key={index}
                className="relative border-4 border-background p-6 md:p-8 shadow-brutalist group"
              >
                <span className="block text-5xl md:text-7xl font-black text-accent mb-4 leading-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base md:text-lg font-semibold leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
