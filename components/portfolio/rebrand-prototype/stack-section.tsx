// Stack section of variant C: a decorative marquee strip on top, and below it the
// same skills grouped in brand-colored badges (the readable version). Only skills
// the resume backs; the order follows what the target job posts ask for most.

import { StackIcon } from "./proto-icons"
import { MARQUEE_ORDER, type IconKey, type StackGroup } from "./story"

export const BRAND: Record<IconKey, string> = {
  ts: "#3178C6", js: "#F7DF1E", py: "#FFD43B", react: "#61DAFB", next: "#E6E6E6",
  nest: "#E0234E", fastapi: "#09B39F", node: "#5FA04E", pg: "#6F93E6", prisma: "#8C9BFF",
  trpc: "#398CCB", docker: "#2496ED", n8n: "#EA4B71", whatsapp: "#25D366", junit: "#25A162",
  agents: "#FF5B1F", cicd: "#2DD4BF", chatbot: "#FF5B1F", jest: "#C21325",
  tailwind: "#38BDF8", gsap: "#88CE02", reactquery: "#FF4154", supabase: "#3ECF8E", typeorm: "#E83524",
  vitest: "#8FC13A", playwright: "#2EAD33", git: "#F05032", neovim: "#57A143", linux: "#FCC624",
  claude: "#D97757", pnpm: "#F69220",
}

const brandStyle = (icon: IconKey) => ({ "--b": BRAND[icon] }) as React.CSSProperties

function BrandIcon({ icon, size }: { icon: IconKey; size: number }) {
  return (
    <span style={{ color: BRAND[icon] }} className="inline-flex">
      <StackIcon name={icon} size={size} />
    </span>
  )
}

export function StackSection({ groups, highlightLabel }: { groups: StackGroup[]; highlightLabel: string }) {
  const all = groups.flatMap((g) => g.items)
  const byIcon = new Map(all.map((i) => [i.icon, i]))
  const ordered = MARQUEE_ORDER.map((k) => byIcon.get(k)).filter((i): i is (typeof all)[number] => !!i)
  // Alternate items between the two rows so each row mixes web and automation skills.
  const rows = [ordered.filter((_, i) => i % 2 === 0), ordered.filter((_, i) => i % 2 === 1)]

  return (
    <div>
      <style>{`
        @keyframes stack-marquee { to { transform: translateX(-50%) } }
        .stack-marquee:hover .stack-marquee-row { animation-play-state: paused }
        @media (prefers-reduced-motion: reduce) { .stack-marquee-row { animation: none !important } }
      `}</style>

      {/* Decorative: the grouped list below carries the same information as text. */}
      <div
        aria-hidden="true"
        className="stack-marquee mb-8 mt-6 space-y-3 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      >
        {rows.map((row, r) => (
          <div
            key={r}
            className="stack-marquee-row flex w-max gap-3"
            style={{ animation: `stack-marquee ${r ? 38 : 30}s linear infinite ${r ? "reverse" : "normal"}` }}
          >
            {[...row, ...row, ...row, ...row].map((i, n) => (
              <span
                key={`${i.name}-${n}`}
                style={brandStyle(i.icon)}
                className="flex items-center gap-3 rounded-2xl border border-[color-mix(in_srgb,var(--b)_30%,transparent)] bg-[color-mix(in_srgb,var(--b)_7%,transparent)] px-5 py-3 text-base font-bold"
              >
                <BrandIcon icon={i.icon} size={24} />
                {i.name}
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-col">
        {groups.map((g) => (
          <div
            key={g.label}
            className="grid gap-3 border-t border-[var(--line)] py-5 md:grid-cols-[11rem_1fr] md:gap-8"
          >
            <div className="flex flex-col gap-1">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">{g.label}</p>
              {g.highlight && (
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--orange)]">{highlightLabel}</p>
              )}
            </div>
            <ul className="flex flex-wrap gap-2.5">
              {g.items.map((i) => (
                <li
                  key={i.name}
                  style={brandStyle(i.icon)}
                  className="flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--b)_35%,transparent)] bg-[color-mix(in_srgb,var(--b)_8%,transparent)] py-1.5 pl-2.5 pr-3.5 text-sm font-bold transition hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--b)_16%,transparent)] hover:shadow-[0_0_20px_color-mix(in_srgb,var(--b)_35%,transparent)]"
                >
                  <BrandIcon icon={i.icon} size={18} />
                  {i.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
