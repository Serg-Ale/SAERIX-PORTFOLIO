"use client"

import { useEffect, useRef } from "react"
import { useTranslations } from "next-intl"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitTextReveal } from "@/components/shared/split-text-reveal"
import { prefersReducedMotion } from "@/lib/gsap-config"
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2"

gsap.registerPlugin(ScrollTrigger)

interface ProfessionalCase {
  title: string
  company: string
  tagline: string
  tech: string[]
  url: string | null
}

interface PersonalProject {
  title: string
  tagline: string
  tech: string[]
  url: string | null
}

function ProjectCard({
  index,
  eyebrow,
  title,
  tagline,
  tech,
  url,
  variant,
  registerRef,
}: {
  index: number
  eyebrow: string
  title: string
  tagline: string
  tech: string[]
  url: string | null
  variant: "professional" | "personal"
  registerRef: (el: HTMLDivElement | null) => void
}) {
  return (
    <div
      ref={registerRef}
      className={`relative border-4 border-foreground bg-background p-8 text-foreground shadow-brutalist transition-shadow duration-300 hover:shadow-brutalist-lg ${
        variant === "professional" ? "md:p-12" : "md:p-10"
      }`}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <div className="grid gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-2">
          <span className="text-6xl font-black tracking-tight opacity-20 md:text-8xl">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="space-y-6 md:col-span-10">
          <div>
            <span className="mb-2 block text-xs font-black tracking-widest opacity-60">
              {eyebrow}
            </span>
            <h3
              className={
                variant === "professional"
                  ? "mb-3 text-2xl font-black tracking-tight md:text-4xl"
                  : "mb-3 text-3xl font-black tracking-tight md:text-5xl"
              }
            >
              {title}
            </h3>
            <p className="text-lg font-semibold opacity-80 md:text-xl">
              {tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t-2 border-current/10 pt-4">
            <div className="flex flex-1 flex-wrap gap-2">
              {tech.map((item) => (
                <span
                  key={item}
                  className="bg-foreground/10 px-2 py-1 text-xs font-bold tracking-wider"
                >
                  {item}
                </span>
              ))}
            </div>

            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-bold tracking-wider text-foreground transition-opacity duration-200 hover:opacity-70"
              >
                VIEW LIVE
                {HiMiniArrowTopRightOnSquare({ className: "h-5 w-5" })}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function PortfolioProof() {
  const t = useTranslations("proof")
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const professional = t.raw("professional") as ProfessionalCase[]
  const personal = t.raw("personal") as PersonalProject[]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(cardRefs.current, { opacity: 1, y: 0 })
        return
      }

      cardRefs.current.forEach((card) => {
        if (!card) return

        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const centerX = rect.width / 2
          const centerY = rect.height / 2
          const rotateX = (y - centerY) / 20
          const rotateY = (centerX - x) / 20

          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.3,
            ease: "power2.out",
          })
        }

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out",
          })
        }

        card.addEventListener("mousemove", handleMouseMove)
        card.addEventListener("mouseleave", handleMouseLeave)

        gsap.from(card, {
          y: 100,
          scale: 0.95,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  let cardIndex = 0

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen flex items-center px-6 md:px-12 py-32 md:py-48 text-foreground"
      data-theme="light"
    >
      <div className="relative z-10 max-w-7xl mx-auto w-full">
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

        <div className="mb-12 md:mb-16">
          <h3 className="mb-6 text-sm font-black tracking-widest opacity-60 md:mb-8">
            {t("professionalLabel")}
          </h3>
          <div className="space-y-8 md:space-y-12">
            {professional.map((item) => {
              const idx = cardIndex++
              return (
                <ProjectCard
                  key={item.title}
                  index={idx}
                  eyebrow={item.company}
                  title={item.title}
                  tagline={item.tagline}
                  tech={item.tech}
                  url={item.url}
                  variant="professional"
                  registerRef={(el) => {
                    cardRefs.current[idx] = el
                  }}
                />
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="mb-6 text-sm font-black tracking-widest opacity-60 md:mb-8">
            {t("personalLabel")}
          </h3>
          <div className="space-y-8 md:space-y-12">
            {personal.map((item) => {
              const idx = cardIndex++
              return (
                <ProjectCard
                  key={item.title}
                  index={idx}
                  eyebrow={t("personalLabel")}
                  title={item.title}
                  tagline={item.tagline}
                  tech={item.tech}
                  url={item.url}
                  variant="personal"
                  registerRef={(el) => {
                    cardRefs.current[idx] = el
                  }}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
