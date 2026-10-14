// PROTOTYPE — throwaway. The rest of the narrative (docs/REBRAND-BRIEF.md §4–§7):
// how I work, path, stack, own projects, contact. Cases and hero live in copy.ts.
// Only facts from the brief/resume; the TCS client stays unnamed.

import type { ProtoLocale } from "./copy"

export type IconKey =
  | "ts" | "js" | "py" | "react" | "next" | "nest" | "fastapi" | "node"
  | "pg" | "prisma" | "trpc" | "docker" | "n8n" | "whatsapp" | "junit"
  | "agents" | "cicd" | "chatbot" | "jest"
  | "tailwind" | "gsap" | "reactquery" | "supabase" | "typeorm" | "vitest" | "playwright"
  | "git" | "neovim" | "linux" | "claude" | "pnpm"

export interface StackGroup {
  label: string
  items: { name: string; icon: IconKey }[]
  // Testing and CI/CD show up in about half of the target job posts, so this group is marked.
  highlight?: boolean
}

export interface ProtoStory {
  labels: { top: string; how: string; proof: string; journey: string; stack: string; projects: string; contact: string }
  setup: {
    label: string
    tools: string
    claudeTitle: string
    claude: { title: string; body: string }[]
    credit: { text: string; href: string }
  }
  how: {
    stance: string
    principles: { title: string; body: string }[]
    proofCta: string
    proofNote: string
    quality: string[]
  }
  journey: {
    items: { year: string; title: string; body: string; now?: boolean }[]
    fundamentals: string
  }
  stack: { groups: StackGroup[] }
  projects: {
    // `featured` items get a decision line and the narrative card; the rest stay compact rows.
    // `repo` is omitted for private repos, which show `privateLabel` instead.
    items: {
      name: string; blurb: string; decision?: string; tags: string[]
      repo?: string; live?: string; featured?: boolean
    }[]
    privateLabel: string
    music: { text: string; cta: string }
    borrowed: { text: string; cta: string; href: string }
  }
  contact: { line: string; location: string; languages: string }
}

export const SPEC_URL = "https://github.com/Serg-Ale/matrix-rain/issues/14"

// Intro video (EN and PT-BR). The "Watch intro" button only renders when a URL is set.
export const INTRO_VIDEO: Record<ProtoLocale, string> = { en: "", "pt-BR": "" }

// Marquee order: what the target job posts ask for most comes first. Only skills
// the resume backs; no cloud providers, Go, .NET or Java.
export const MARQUEE_ORDER: IconKey[] = [
  "ts", "react", "next", "tailwind", "node", "nest", "pg", "jest", "cicd", "docker", "reactquery", "prisma",
  "playwright", "vitest", "git", "neovim", "linux", "claude", "agents", "n8n", "whatsapp", "py", "fastapi",
  "typeorm", "supabase", "trpc", "gsap", "js", "junit", "pnpm", "chatbot",
]

const stackGroups = (l: {
  lang: string; front: string; back: string; auto: string; qa: string; tools: string
  chatbots: string; agents: string; cicd: string
}) => [
  { label: l.lang, items: [{ name: "TypeScript", icon: "ts" }, { name: "JavaScript", icon: "js" }, { name: "Python", icon: "py" }] },
  {
    label: l.front,
    items: [
      { name: "React", icon: "react" }, { name: "Next.js", icon: "next" }, { name: "Tailwind CSS", icon: "tailwind" },
      { name: "React Query", icon: "reactquery" }, { name: "GSAP", icon: "gsap" },
    ],
  },
  {
    label: l.back,
    items: [
      { name: "Node.js", icon: "node" }, { name: "NestJS", icon: "nest" }, { name: "FastAPI", icon: "fastapi" },
      { name: "PostgreSQL", icon: "pg" }, { name: "Prisma", icon: "prisma" }, { name: "TypeORM", icon: "typeorm" },
      { name: "tRPC", icon: "trpc" }, { name: "Supabase", icon: "supabase" },
    ],
  },
  {
    label: l.auto,
    items: [
      { name: l.agents, icon: "agents" }, { name: "n8n", icon: "n8n" },
      { name: "WhatsApp API", icon: "whatsapp" }, { name: l.chatbots, icon: "chatbot" },
    ],
  },
  {
    label: l.qa,
    highlight: true,
    items: [
      { name: "Jest", icon: "jest" }, { name: "Vitest", icon: "vitest" }, { name: "Playwright", icon: "playwright" },
      { name: "JUnit", icon: "junit" }, { name: l.cicd, icon: "cicd" }, { name: "Docker", icon: "docker" },
    ],
  },
  {
    label: l.tools,
    items: [
      { name: "Linux", icon: "linux" }, { name: "Neovim", icon: "neovim" }, { name: "Git", icon: "git" },
      { name: "pnpm", icon: "pnpm" }, { name: "Claude Code", icon: "claude" },
    ],
  },
] as StackGroup[]

const en: ProtoStory = {
  labels: { top: "Intro", how: "How I work", proof: "Proof", journey: "Path", stack: "Stack", projects: "On my own", contact: "Contact" },
  setup: {
    label: "Setup",
    tools: "Neovim in kitty, with fish and starship, on Linux.",
    claudeTitle: "How I work with Claude Code",
    claude: [
      { title: "Interview before code", body: "I run a skill that grills me about the plan. It asks one question at a time, with its own recommended answer, until no decision is left open." },
      { title: "Spec, then tickets", body: "The conversation becomes a spec, and the spec becomes tickets that say what blocks what. Skills handle the format. I decide what goes in." },
      { title: "Tests first, review with a clean context", body: "TDD on the seams we agreed on. Then two sub-agents review the work with a fresh context, one against the repo's standards and one against the spec." },
      { title: "Memory lives in the repo", body: "Each repo has a CLAUDE.md and docs for the agent, so context stays in git and not in my head." },
    ],
    credit: { text: "Built on Matt Pocock's open-source skills, plus a few of my own.", href: "https://github.com/mattpocock/skills" },
  },
  how: {
    stance: "Spec-driven development, not prompt engineering.",
    principles: [
      { title: "Align on the whole", body: "Questions before code. A shared vision with the team and the PO before the first ticket." },
      {
        title: "AI executes, I direct",
        body: "AI executes and researches faster than I do, and it surfaces risks and failure modes quickly. It also has bias and doesn't always show every option. The mental model and the questions stay mine.",
      },
      { title: "Prove it in the open", body: "Spec, tickets, TDD and review in a public repository, for anyone to check." },
    ],
    proofCta: "Read spec #14 ↗",
    proofNote: "matrix-rain: spec #14, tickets #15 to #22, 15 merged PRs and unit tests.",
    quality: [
      ">80% test coverage on Aeon Tech's product",
      "CI/CD with pre-commit hooks",
      "Mentoring an intern with a structured development plan",
    ],
  },
  journey: {
    items: [
      { year: "2022", title: "UTFPR + TCS, intern", body: "Started the degree and the first job together. Front end, back end, tests and Scrum." },
      {
        year: "2023",
        title: "TCS, night on-call",
        body: "Night on-call for a large retail chain's critical systems. In incident war rooms I was the technical link between engineering and managers.",
      },
      { year: "2024", title: "Aeon Tech, Jr", body: "Rebuilt the product with a team of four to five. I delivered the front end, with feedback, profiles, auth and the landing page, and a self-hosted WhatsApp automation base." },
      {
        year: "2026",
        title: "Aeon Tech mid-level + Kaizen",
        body: "Mid-level at Aeon Tech since March, working on Corta-ai across web, API, billing and analytics. Partner-dev at Kaizen.",
        now: true,
      },
    ],
    fundamentals:
      "I like understanding how technology works underneath, and it never stopped being fun. With a computer and an idea, I can build something new every day.",
  },
  stack: {
    groups: stackGroups({
      lang: "Languages", front: "Front end", back: "Back end and data", auto: "Automation & AI",
      qa: "Quality & delivery", tools: "Daily tools", chatbots: "Chatbots", agents: "AI agent orchestration", cicd: "CI/CD",
    }),
  },
  projects: {
    items: [
      {
        name: "gym-stuff",
        featured: true,
        blurb: "A workout assistant for the phone: one exercise at a time, set logging, an adjustable rest timer, and it works without a signal.",
        decision: "Write to the device first and sync later, so a missing signal never loses a workout. One tap per set, and only the current exercise on screen.",
        tags: ["PWA", "offline-first", "Supabase", "Vercel"],
        repo: "https://github.com/Serg-Ale/gym-stuff",
        live: "https://gym-stuff-five.vercel.app",
      },
      {
        name: "Como-Eles-Votaram",
        featured: true,
        blurb: "A transparency tool to see how politicians voted, simply and clearly.",
        decision: "Prisma and tRPC keep the types from the database to the screen. It has tests, lint and typecheck scripts, and Husky and commitlint on every commit.",
        tags: ["T3 Stack", "Next.js", "Prisma", "tRPC", "Jest"],
        repo: "https://github.com/Serg-Ale/Como-Eles-Votaram",
      },
      {
        name: "matrix-rain",
        blurb: "Matrix rain for the terminal in Python and curses, now becoming a multi-mode visualizer. I run it like a product. Spec first, then tickets, TDD and review, all public.",
        tags: ["Python", "curses", "TDD"],
        repo: "https://github.com/Serg-Ale/matrix-rain",
      },
      {
        name: "lightsync",
        blurb: "A local service that makes a smart bulb follow the screen and the music playing on the computer. It runs without the cloud and has four modes: screen sync, white, color and music.",
        tags: ["Python", "PipeWire", "Tuya"],
      },
    ],
    privateLabel: "private repo",
    music: { text: "Off the keyboard, I produce music and DJ as SAERIX.", cta: "Open SAERIX →" },
    borrowed: {
      text: "I also use HushNote, an open-source local meeting transcriber by Peter Jackson. I adapted it to call claude -p instead of Ollama and added a recording terminal UI.",
      cta: "Original repo ↗",
      href: "https://github.com/peteonrails/hushnote",
    },
  },
  contact: {
    line: "Open to work as a mid-level full-stack engineer.",
    location: "Londrina, Brazil",
    languages: "Portuguese native · English: EF SET 72/100",
  },
}

const ptBR: ProtoStory = {
  labels: { top: "Início", how: "Como eu trabalho", proof: "Prova", journey: "Trajetória", stack: "Stack", projects: "Por conta própria", contact: "Contato" },
  setup: {
    label: "Setup",
    tools: "Neovim no kitty, com fish e starship, no Linux.",
    claudeTitle: "Como eu trabalho com o Claude Code",
    claude: [
      { title: "Entrevista antes do código", body: "Rodo um skill que me interroga sobre o plano. Ele faz uma pergunta por vez, com a própria resposta recomendada, até não sobrar decisão em aberto." },
      { title: "Spec, depois tickets", body: "A conversa vira spec, e a spec vira tickets que dizem o que bloqueia o quê. Os skills cuidam do formato. Eu decido o que entra." },
      { title: "Testes primeiro, revisão com contexto limpo", body: "TDD nos pontos que combinamos. Depois dois sub-agentes revisam o trabalho com contexto novo, um contra os padrões do repo e outro contra a spec." },
      { title: "A memória mora no repo", body: "Cada repo tem um CLAUDE.md e docs para o agente, então o contexto fica no git e não na minha cabeça." },
    ],
    credit: { text: "Feito sobre os skills open-source de Matt Pocock, mais alguns meus.", href: "https://github.com/mattpocock/skills" },
  },
  how: {
    stance: "Desenvolvimento orientado por especificação, não engenharia de prompt.",
    principles: [
      { title: "Alinhar o todo", body: "Perguntas antes do código. Visão compartilhada com o time e o PO antes do primeiro ticket." },
      {
        title: "A IA executa, eu dirijo",
        body: "A IA executa e pesquisa mais rápido que eu, e levanta riscos e modos de falha com rapidez. Mas tem viés e nem sempre mostra todas as opções. O modelo mental e as perguntas continuam sendo meus.",
      },
      { title: "Provar em aberto", body: "Spec, tickets, TDD e revisão num repositório público, para qualquer um conferir." },
    ],
    proofCta: "Ler a spec #14 ↗",
    proofNote: "matrix-rain: spec #14, tickets #15 a #22, 15 PRs mergeados e testes unitários.",
    quality: [
      ">80% de cobertura de testes no produto da Aeon Tech",
      "CI/CD com pre-commit hooks",
      "Mentoria de estagiário com PDI estruturado",
    ],
  },
  journey: {
    items: [
      { year: "2022", title: "UTFPR + TCS, estágio", body: "Comecei a graduação e o primeiro emprego juntos. Front-end, back-end, testes e Scrum." },
      {
        year: "2023",
        title: "TCS, plantão noturno",
        body: "Plantão noturno nos sistemas críticos de uma grande rede varejista. Nas war rooms de incidente, eu fazia a ponte técnica entre engenharia e gestores.",
      },
      { year: "2024", title: "Aeon Tech, Jr", body: "Reconstrução do produto num time de quatro a cinco pessoas. Entreguei o front-end, com feedback, perfis, auth e a landing page, e uma base de automação WhatsApp self-hosted." },
      {
        year: "2026",
        title: "Aeon Tech pleno + Kaizen",
        body: "Pleno na Aeon Tech desde março, trabalhando no Corta-ai em web, API, cobrança e analytics. Sócio-dev na Kaizen.",
        now: true,
      },
    ],
    fundamentals:
      "Gosto de entender como a tecnologia funciona por baixo, e isso nunca perdeu a graça. Com um computador e uma ideia, posso criar algo novo todo dia.",
  },
  stack: {
    groups: stackGroups({
      lang: "Linguagens", front: "Front-end", back: "Back-end e dados", auto: "Automação e IA",
      qa: "Qualidade e entrega", tools: "Ferramentas do dia a dia", chatbots: "Chatbots", agents: "Orquestração de agentes de IA", cicd: "CI/CD",
    }),
  },
  projects: {
    items: [
      {
        name: "gym-stuff",
        featured: true,
        blurb: "Assistente de treino para o celular: um exercício por vez, registro de séries, timer de descanso ajustável, e funciona sem sinal.",
        decision: "Gravar primeiro no aparelho e sincronizar depois, para que falta de sinal nunca perca um treino. Um toque por série, e só o exercício atual na tela.",
        tags: ["PWA", "offline-first", "Supabase", "Vercel"],
        repo: "https://github.com/Serg-Ale/gym-stuff",
        live: "https://gym-stuff-five.vercel.app",
      },
      {
        name: "Como-Eles-Votaram",
        featured: true,
        blurb: "Ferramenta de transparência para ver como os políticos votaram, de forma simples e clara.",
        decision: "Prisma e tRPC mantêm os tipos do banco até a tela. Tem testes, scripts de lint e typecheck, e Husky e commitlint em todo commit.",
        tags: ["T3 Stack", "Next.js", "Prisma", "tRPC", "Jest"],
        repo: "https://github.com/Serg-Ale/Como-Eles-Votaram",
      },
      {
        name: "matrix-rain",
        blurb: "Chuva Matrix para terminal em Python e curses, hoje virando um visualizador multi-modo. Toco como produto. Spec primeiro, depois tickets, TDD e revisão, tudo público.",
        tags: ["Python", "curses", "TDD"],
        repo: "https://github.com/Serg-Ale/matrix-rain",
      },
      {
        name: "lightsync",
        blurb: "Um serviço local que faz uma lâmpada inteligente acompanhar a tela e a música que toca no computador. Roda sem nuvem e tem quatro modos: sincronizar com a tela, branco, cor e música.",
        tags: ["Python", "PipeWire", "Tuya"],
      },
    ],
    privateLabel: "repo privado",
    music: { text: "Fora do teclado, produzo música e toco como SAERIX.", cta: "Abrir SAERIX →" },
    borrowed: {
      text: "Também uso o HushNote, transcritor local de reuniões open-source de Peter Jackson. Adaptei para chamar o claude -p no lugar do Ollama e adicionei um terminal de gravação.",
      cta: "Repo original ↗",
      href: "https://github.com/peteonrails/hushnote",
    },
  },
  contact: {
    line: "Aberto a propostas como engenheiro full-stack pleno.",
    location: "Londrina, Brasil",
    languages: "Português nativo · Inglês: EF SET 72/100",
  },
}

export function getProtoStory(locale: ProtoLocale): ProtoStory {
  return locale === "pt-BR" ? ptBR : en
}
