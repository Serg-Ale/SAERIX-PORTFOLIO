// Stack as small brand badges: a logo and its brand color where we have one, a plain
// tag where we do not (Pix billing, Hikvision, curses). Names match the stack section.

import { StackIcon } from "./proto-icons"
import { BRAND } from "./stack-section"
import type { IconKey } from "./story"

const ICON_BY_NAME: Record<string, IconKey> = {
  "Next.js": "next", NestJS: "nest", PostgreSQL: "pg", n8n: "n8n", WhatsApp: "whatsapp", Prisma: "prisma",
  React: "react", TypeScript: "ts", Tailwind: "tailwind", GSAP: "gsap", "React Query": "reactquery",
  Jest: "jest", Supabase: "supabase", tRPC: "trpc", Python: "py",
}

export function StackBadges({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((name) => {
        const icon = ICON_BY_NAME[name]
        if (!icon) {
          return (
            <li key={name} className="rounded-full border border-[var(--line)] bg-[var(--bg)] px-3 py-1 font-mono text-[11px] text-[var(--muted)]">
              {name}
            </li>
          )
        }
        const brand = BRAND[icon]
        return (
          <li
            key={name}
            style={{ "--b": brand } as React.CSSProperties}
            className="flex items-center gap-1.5 rounded-full border border-[color-mix(in_srgb,var(--b)_35%,transparent)] bg-[color-mix(in_srgb,var(--b)_8%,transparent)] py-1 pl-2 pr-3 text-xs font-bold"
          >
            <span style={{ color: brand }} className="inline-flex">
              <StackIcon name={icon} size={14} />
            </span>
            {name}
          </li>
        )
      })}
    </ul>
  )
}
