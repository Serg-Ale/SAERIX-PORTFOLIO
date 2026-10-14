// PROTOTYPE — throwaway. Stack icons (Sérgio asked for icons). react-icons/si for
// brands; lucide for the two concepts that have no logo (agents, CI/CD).

import {
  SiClaude, SiDocker, SiFastapi, SiGit, SiGreensock, SiJavascript, SiJest, SiLinux, SiNeovim, SiPnpm,
  SiReactquery, SiSupabase, SiTailwindcss, SiTypeorm, SiVitest, SiJunit5, SiN8N, SiNestjs, SiNextdotjs, SiNodedotjs,
  SiPostgresql, SiPrisma, SiPython, SiReact, SiTrpc, SiTypescript, SiWhatsapp,
} from "react-icons/si"
import { Bot, Drama, GitBranch, MessageSquare } from "lucide-react"
import type { IconKey } from "./story"

// Cast: react-icons' IconType returns ReactNode, which this repo's @types/react rejects.
const ICONS = {
  ts: SiTypescript, js: SiJavascript, py: SiPython, react: SiReact, next: SiNextdotjs,
  nest: SiNestjs, fastapi: SiFastapi, node: SiNodedotjs, pg: SiPostgresql, prisma: SiPrisma,
  trpc: SiTrpc, docker: SiDocker, n8n: SiN8N, whatsapp: SiWhatsapp, junit: SiJunit5,
  agents: Bot, cicd: GitBranch, chatbot: MessageSquare, jest: SiJest, playwright: Drama,
  tailwind: SiTailwindcss, gsap: SiGreensock, reactquery: SiReactquery, supabase: SiSupabase, typeorm: SiTypeorm,
  vitest: SiVitest, git: SiGit, neovim: SiNeovim, linux: SiLinux, claude: SiClaude, pnpm: SiPnpm,
} as unknown as Record<IconKey, React.ElementType>

export function StackIcon({ name, size = 18 }: { name: IconKey; size?: number }) {
  const Icon = ICONS[name]
  return <Icon size={size} className="shrink-0 text-[var(--muted)]" />
}

export function StackGroups({
  groups,
  className = "",
}: {
  groups: { label: string; items: { name: string; icon: IconKey }[] }[]
  className?: string
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      {groups.map((g) => (
        <div
          key={g.label}
          className="grid gap-3 border-t border-[var(--line)] py-5 md:grid-cols-[11rem_1fr] md:gap-8"
        >
          <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">{g.label}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {g.items.map((i) => (
              <li key={i.name} className="flex items-center gap-2 text-sm font-bold">
                <StackIcon name={i.icon} />
                {i.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
