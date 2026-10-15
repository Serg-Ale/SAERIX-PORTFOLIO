// PROTOTYPE — throwaway. The rest of the narrative (docs/REBRAND-BRIEF.md §4–§7):
// how I work, path, stack, own projects, contact. Cases and hero live in copy.ts.
// Only facts from the brief/resume; the TCS client stays unnamed.

import type { ProtoLocale } from "./copy"
import type { MediaItem } from "./linked-media"

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
  labels: { top: string; how: string; proof: string; journey: string; stack: string; projects: string; work: string; team: string; own: string; contact: string }
  setup: {
    label: string
    title: string
    lead: string
    voice: { label: string; caption: string; stepsLabel: string }
    loop: { skill: string; short: string; title: string; body: string }[]
    review: { label: string; lanes: [string, string] }
    memory: string
    terminal: { cwd: string; lines: { kind: "cmd" | "you" | "q" | "opt" | "ok"; text: string }[] }
    keys: {
      title: string
      cluster: { key: string; arrow: string; does: string }[]
      combos: { keys: string; does: string }[]
      text: string
    }
    credit: { text: string; href: string }
  }
  how: {
    stance: string
    tagline: string
    origin: { title: string; body: string }[]
    hyperfocus: { label: string; body: string }
    principles: { title: string; body: string }[]
    proofCta: string
    proofNote: string
    quality: string[]
    metrics: { value: string; label: string }[]
  }
  journey: {
    // Only levels the page already states, and no years, so there is one source of dates.
    ladder: { level: string; org: string }[]
    items: {
      year: string; org: string; title: string; body: string; tags: string[]
      kind: "school" | "uni" | "night" | "work" | "now"
      level?: string; now?: boolean
    }[]
    fundamentals: string
  }
  stack: { groups: StackGroup[] }
  projects: {
    intro: string
    // `featured` items get a decision line and the narrative card; the rest stay compact rows.
    // `repo` is omitted for private repos, which show `privateLabel` instead.
    items: {
      name: string; blurb: string; decision?: string; tags: string[]
      repo?: string; live?: string; featured?: boolean
      // The project's own color, sampled from its screenshots.
      accent?: string
      // Web apps first, then command-line tools; the image links to the live app or, for a tool, the repo.
      group: "web" | "cli"
      media?: MediaItem[]
    }[]
    groups: { web: string; cli: string }
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
  labels: { top: "Intro", how: "How I work", proof: "Proof", journey: "Path", stack: "Stack", projects: "On my own", work: "Work", team: "With a team", own: "On my own", contact: "Contact" },
  setup: {
    label: "Setup",
    title: "How I work with Claude Code",
    lead: "The same loop on every piece of work that has decisions still open.",
    voice: { label: "I talk", caption: "I describe the problem out loud, then answer Claude's questions the same way.", stepsLabel: "Then the same five steps, every time" },
    loop: [
      { skill: "/grill-me", short: "grill", title: "Grill the plan", body: "One question at a time, each with a recommended answer, until no decision is left open." },
      { skill: "/to-spec", short: "spec", title: "Write the spec", body: "The conversation becomes a spec." },
      { skill: "/to-tickets", short: "tickets", title: "Cut the tickets", body: "Small vertical slices, each one saying what blocks what." },
      { skill: "/tdd", short: "tdd", title: "Test first", body: "Red, green, refactor on the seams we agreed on." },
      { skill: "/code-review", short: "review", title: "Review in a clean context", body: "The review does not inherit the blind spots of the build." },
    ],
    review: { label: "two sub-agents, in parallel", lanes: ["Standards", "Spec"] },
    memory: "Each repo keeps a CLAUDE.md and docs for the agent, so the context lives in git and not in my head.",
    terminal: {
      cwd: "~/portfolio",
      lines: [
        { kind: "cmd", text: "claude" },
        { kind: "you", text: "/grill-me rework the /dev page" },
        { kind: "q", text: "Where does the origin story live?" },
        { kind: "opt", text: "a) opening of How I work  <- recommended" },
        { kind: "opt", text: "b) a new About section" },
        { kind: "opt", text: "c) the hero signature" },
        { kind: "you", text: "a" },
        { kind: "ok", text: "Decided. Next question." },
      ],
    },
    keys: {
      title: "Keyboard first",
      cluster: [
        { key: "H", arrow: "←", does: "tile left" },
        { key: "J", arrow: "↓", does: "tile bottom" },
        { key: "K", arrow: "↑", does: "tile top" },
        { key: "L", arrow: "→", does: "tile right" },
      ],
      combos: [
        { keys: "Meta + H J K L", does: "tile the window" },
        { keys: "Meta + Alt + H J K L", does: "switch window" },
        { keys: "Meta + Shift + H L", does: "send it to another screen" },
      ],
      text: "My KDE shortcuts follow Vim and tiling window managers, so I move between windows and screens without the mouse. I keep many things open at once and know the whole system, so I can document one bug while I fix another. Neovim, in kitty, with fish and starship.",
    },
    credit: { text: "Built on Matt Pocock's open-source skills, plus a few of my own.", href: "https://github.com/mattpocock/skills" },
  },
  how: {
    stance: "Speak-driven development.",
    tagline: "I talk, Claude asks, and the spec comes out of the conversation. It is not prompt engineering.",
    origin: [
      { title: "Java in high school", body: "Through Alura, pulled in by Minecraft." },
      { title: "Exams on paper", body: "Data structures on paper, Java in Notepad." },
      { title: "The whole in my head", body: "I started college before AI wrote code. Typing is the fast part now." },
    ],
    hyperfocus: { label: "ADHD, as a strength", body: "Hyperfocus keeps the mental model loaded. I follow the logs, a deploy and a merge while I talk to Claude, and still answer a message in the gap." },
    principles: [
      { title: "Align on the whole", body: "I ask before I code. The team and the PO share one vision before the first ticket." },
      { title: "AI executes, I direct", body: "It researches and executes faster than I do, and it flags risks early. But it has bias and does not always show every option. The mental model and the questions stay mine." },
      { title: "Prove it in the open", body: "Spec, tickets, TDD and review in a public repository. Anyone can check." },
      { title: "Speak up when something is off", body: "In the payments module and see an auth problem elsewhere? I say so, and since code is cheap now, I fix it or write it up right then." },
    ],
    proofCta: "Read spec #14 ↗",
    proofNote: "matrix-rain: spec #14, tickets #15 to #22, 15 merged PRs and unit tests.",
    quality: [
      ">80% test coverage on Aeon Tech's product",
      "CI/CD with pre-commit hooks",
      "Mentoring an intern with a structured development plan",
    ],
    metrics: [
      { value: ">80%", label: "test coverage on Aeon Tech's product" },
      { value: "CI/CD", label: "with pre-commit hooks" },
      { value: "Mentoring", label: "an intern, with a structured plan" },
    ],
  },
  journey: {
    ladder: [
      { level: "Intern", org: "TCS" },
      { level: "Jr", org: "Aeon Tech" },
      { level: "Mid-level", org: "Aeon Tech" },
    ],
    items: [
      { year: "School", org: "Alura", kind: "school", title: "Java, because of Minecraft", body: "The state of Paraná gave students access to Alura. I wanted to change what was around me with code.", tags: ["Java"] },
      { year: "2022", org: "UTFPR + TCS", kind: "uni", level: "Intern", title: "College and a first job, before ChatGPT", body: "First job in June, degree in July. I made class assignments bigger, with console menus and ASCII art. At work I touched front end, back end, tests and Scrum.", tags: ["Java", "Tests", "Scrum"] },
      { year: "2023", org: "TCS", kind: "night", title: "Night on-call", body: "Critical systems of a large retail chain. In incident war rooms I was the technical link between engineering and managers.", tags: ["Incidents"] },
      { year: "2024", org: "Aeon Tech", kind: "work", level: "Jr", title: "Rebuilt the product", body: "A team of four to five. I delivered the front end, with feedback, profiles, auth and the landing page, plus a self-hosted WhatsApp automation base.", tags: ["Next.js", "React", "GSAP", "n8n"] },
      { year: "2026", org: "Aeon Tech + Kaizen", kind: "now", level: "Mid-level", now: true, title: "Corta-ai and Atrium", body: "Mid-level at Aeon Tech since March, on Corta-ai across web, API, billing and analytics. Partner-dev at Kaizen, on Atrium.", tags: ["NestJS", "Next.js", "Prisma", "PostgreSQL"] },
    ],
    fundamentals:
      "I like understanding how technology works underneath. It is the closest thing to magic we have: with a computer and an idea, I can change what is around me.",
  },
  stack: {
    groups: stackGroups({
      lang: "Languages", front: "Front end", back: "Back end and data", auto: "Automation & AI",
      qa: "Quality & delivery", tools: "Daily tools", chatbots: "Chatbots", agents: "AI agent orchestration", cicd: "CI/CD",
    }),
  },
  projects: {
    intro: "Most of these began as tools for my own routine. I like changing what is around me, and music works the same way. Many were built at night, when the ideas show up. Each image opens the live app, or the repository for a command-line tool.",
    items: [
      {
        name: "gym-stuff",
        accent: "#4F7CFF",
        featured: true,
        group: "web",
        blurb: "A workout assistant for the phone: one exercise at a time, set logging, an adjustable rest timer, and it works without a signal.",
        decision: "Write to the device first and sync later, so a missing signal never loses a workout. One tap per set, and only the current exercise on screen.",
        tags: ["PWA", "offline-first", "Supabase", "Vercel"],
        repo: "https://github.com/Serg-Ale/gym-stuff",
        live: "https://gym-stuff-five.vercel.app",
        media: [{ src: "/projects/gym-stuff.webp", alt: "Four phone screens of the workout app: the current exercise with sets and reps, the rest timer, and the list of exercises for the day." }],
      },
      {
        name: "SAERIX portfolio",
        accent: "#E83FBF",
        featured: true,
        group: "web",
        blurb: "This site. Next.js 16 and React 19 with GSAP, in English and Portuguese. It holds two identities, the engineer page you are reading and SAERIX, the page for my music.",
        decision: "Keep the two identities apart. Each has its own voice, layout and motion, and neither borrows the tone of the other.",
        tags: ["Next.js", "TypeScript", "GSAP", "Tailwind", "i18n"],
        repo: "https://github.com/Serg-Ale/SAERIX-PORTFOLIO",
        live: "https://saerix.vercel.app/en/saerix",
        media: [{ tab: "Tour", src: "/projects/saerix-tour-poster.webp", video: "/projects/saerix-tour.webm", alt: "A scroll through the SAERIX page: the name in large type, the manifesto lines, the sound meter and the booking section." }, { tab: "Hero", src: "/projects/saerix-hero.webp", alt: "The SAERIX page: the name in large type next to a poster-style portrait, with buttons to book a set and to listen on SoundCloud." }],
      },
      {
        name: "Como-Eles-Votaram",
        featured: true,
        group: "web",
        blurb: "A transparency tool to see how politicians voted, simply and clearly.",
        decision: "Prisma and tRPC keep the types from the database to the screen. It has tests, lint and typecheck scripts, and Husky and commitlint on every commit.",
        tags: ["T3 Stack", "Next.js", "Prisma", "tRPC", "Jest"],
        repo: "https://github.com/Serg-Ale/Como-Eles-Votaram",
      },
      {
        name: "matrix-rain",
        accent: "#2BD96B",
        group: "cli",
        blurb: "Matrix rain for the terminal in Python and curses, now becoming a multi-mode visualizer. I run it like a product. Spec first, then tickets, TDD and review, all public.",
        tags: ["Python", "curses", "TDD"],
        repo: "https://github.com/Serg-Ale/matrix-rain",
        media: [{ tab: "Pulse", src: "/projects/matrix-rain-pulse-poster.webp", video: "/projects/matrix-rain-pulse.webm", alt: "Pulse mode: a circular wave of falling Japanese characters and symbols pulses across the terminal." }, { tab: "Network", src: "/projects/matrix-rain-network-poster.webp", video: "/projects/matrix-rain-network.webm", alt: "Network mode: glowing nodes and links appear and fade across the terminal." }],
      },
      {
        name: "lightsync",
        accent: "#B44CF5",
        group: "cli",
        blurb: "A local service that makes a smart bulb follow the screen and the music playing on the computer. It runs without the cloud and has four modes: screen sync, white, color and music.",
        tags: ["Python", "PipeWire", "Tuya"],
        media: [{ tab: "Modes", src: "/projects/lightsync-modes-poster.webp", video: "/projects/lightsync-modes.webm", alt: "The lightsync terminal panel in its modes: music with a spectrum and detected kick, five color themes, screen sync, fixed color and fixed white." }, { tab: "Music", src: "/projects/lightsync.webp", alt: "The lightsync terminal panel in music mode: the lamp's last 60 seconds as a color strip, the detected kick and a bass, mid and treble spectrum." }],
      },
    ],
    groups: { web: "Web and apps", cli: "Command line" },
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
  labels: { top: "Início", how: "Como eu trabalho", proof: "Prova", journey: "Trajetória", stack: "Stack", projects: "Por conta própria", work: "Trabalho", team: "Com um time", own: "Por conta própria", contact: "Contato" },
  setup: {
    label: "Setup",
    title: "Como eu trabalho com o Claude Code",
    lead: "O mesmo ciclo em todo trabalho que ainda tem decisão em aberto.",
    voice: { label: "Eu falo", caption: "Descrevo o problema em voz alta e respondo as perguntas do Claude do mesmo jeito.", stepsLabel: "Depois, os mesmos cinco passos, sempre" },
    loop: [
      { skill: "/grill-me", short: "grill", title: "Interrogar o plano", body: "Uma pergunta por vez, cada uma com a resposta recomendada, até não sobrar decisão em aberto." },
      { skill: "/to-spec", short: "spec", title: "Escrever a spec", body: "A conversa vira uma spec." },
      { skill: "/to-tickets", short: "tickets", title: "Cortar os tickets", body: "Fatias verticais pequenas, cada uma dizendo o que bloqueia o quê." },
      { skill: "/tdd", short: "tdd", title: "Teste primeiro", body: "Vermelho, verde, refatorar nos pontos que combinamos." },
      { skill: "/code-review", short: "review", title: "Revisar com contexto limpo", body: "A revisão não herda os pontos cegos de quem construiu." },
    ],
    review: { label: "dois sub-agentes, em paralelo", lanes: ["Padrões", "Spec"] },
    memory: "Cada repo guarda um CLAUDE.md e docs para o agente, então o contexto fica no git e não na minha cabeça.",
    terminal: {
      cwd: "~/portfolio",
      lines: [
        { kind: "cmd", text: "claude" },
        { kind: "you", text: "/grill-me refazer a página /dev" },
        { kind: "q", text: "Onde mora a tese de origem?" },
        { kind: "opt", text: "a) abertura de Como eu trabalho  <- recomendada" },
        { kind: "opt", text: "b) uma seção nova Sobre mim" },
        { kind: "opt", text: "c) a assinatura do hero" },
        { kind: "you", text: "a" },
        { kind: "ok", text: "Decidido. Próxima pergunta." },
      ],
    },
    keys: {
      title: "Teclado primeiro",
      cluster: [
        { key: "H", arrow: "←", does: "encaixar à esquerda" },
        { key: "J", arrow: "↓", does: "encaixar embaixo" },
        { key: "K", arrow: "↑", does: "encaixar em cima" },
        { key: "L", arrow: "→", does: "encaixar à direita" },
      ],
      combos: [
        { keys: "Meta + H J K L", does: "encaixar a janela" },
        { keys: "Meta + Alt + H J K L", does: "trocar de janela" },
        { keys: "Meta + Shift + H L", does: "mandar para outra tela" },
      ],
      text: "Meus atalhos no KDE seguem o Vim e os gerenciadores de janela em tiling, então me movo entre janelas e telas sem o mouse. Mantenho muita coisa aberta e conheço o sistema inteiro, então documento um bug enquanto resolvo outro. Neovim, no kitty, com fish e starship.",
    },
    credit: { text: "Feito sobre os skills open-source de Matt Pocock, mais alguns meus.", href: "https://github.com/mattpocock/skills" },
  },
  how: {
    stance: "Speak-driven development.",
    tagline: "Eu falo, o Claude pergunta, e a spec sai da conversa. Não é engenharia de prompt.",
    origin: [
      { title: "Java no ensino médio", body: "Pela Alura, puxado pelo Minecraft." },
      { title: "Provas no papel", body: "Estrutura de dados no papel, Java no bloco de notas." },
      { title: "O todo na cabeça", body: "Entrei na faculdade antes de a IA escrever código. Digitar é a parte rápida." },
    ],
    hyperfocus: { label: "TDAH, como força", body: "O hiperfoco mantém o modelo mental carregado. Acompanho os logs, um deploy e um merge enquanto converso com o Claude, e ainda respondo uma mensagem no intervalo." },
    principles: [
      { title: "Alinhar o todo", body: "Pergunto antes de codar. Time e PO com a mesma visão antes do primeiro ticket." },
      { title: "A IA executa, eu dirijo", body: "Ela pesquisa e executa mais rápido que eu, e aponta riscos cedo. Mas tem viés e nem sempre mostra todas as opções. O modelo mental e as perguntas continuam meus." },
      { title: "Provar em aberto", body: "Spec, tickets, TDD e revisão num repositório público. Qualquer um confere." },
      { title: "Falar quando algo está errado", body: "Estou em pagamentos e vejo um problema de auth em outro lugar? Eu aviso, e como código está barato hoje, corrijo ou documento na hora." },
    ],
    proofCta: "Ler a spec #14 ↗",
    proofNote: "matrix-rain: spec #14, tickets #15 a #22, 15 PRs mergeados e testes unitários.",
    quality: [
      ">80% de cobertura de testes no produto da Aeon Tech",
      "CI/CD com pre-commit hooks",
      "Mentoria de estagiário com PDI estruturado",
    ],
    metrics: [
      { value: ">80%", label: "de cobertura de testes no produto da Aeon Tech" },
      { value: "CI/CD", label: "com pre-commit hooks" },
      { value: "Mentoria", label: "de estagiário, com PDI estruturado" },
    ],
  },
  journey: {
    ladder: [
      { level: "Estágio", org: "TCS" },
      { level: "Jr", org: "Aeon Tech" },
      { level: "Pleno", org: "Aeon Tech" },
    ],
    items: [
      { year: "Escola", org: "Alura", kind: "school", title: "Java, por causa do Minecraft", body: "O governo do Paraná liberou a Alura para os alunos. Eu queria mudar o que estava ao meu redor com código.", tags: ["Java"] },
      { year: "2022", org: "UTFPR + TCS", kind: "uni", level: "Estágio", title: "Faculdade e primeiro emprego, antes do ChatGPT", body: "Primeiro emprego em junho, graduação em julho. Eu aumentava os trabalhos da faculdade, com menus no console e arte ASCII. No trabalho, passei por front-end, back-end, testes e Scrum.", tags: ["Java", "Testes", "Scrum"] },
      { year: "2023", org: "TCS", kind: "night", title: "Plantão noturno", body: "Sistemas críticos de uma grande rede varejista. Nas war rooms de incidente, eu fazia a ponte técnica entre engenharia e gestores.", tags: ["Incidentes"] },
      { year: "2024", org: "Aeon Tech", kind: "work", level: "Jr", title: "Reconstrução do produto", body: "Time de quatro a cinco pessoas. Entreguei o front-end, com feedback, perfis, auth e a landing page, e uma base de automação WhatsApp self-hosted.", tags: ["Next.js", "React", "GSAP", "n8n"] },
      { year: "2026", org: "Aeon Tech + Kaizen", kind: "now", level: "Pleno", now: true, title: "Corta-ai e Atrium", body: "Pleno na Aeon Tech desde março, no Corta-ai em web, API, cobrança e analytics. Sócio-dev na Kaizen, no Atrium.", tags: ["NestJS", "Next.js", "Prisma", "PostgreSQL"] },
    ],
    fundamentals:
      "Gosto de entender como a tecnologia funciona por baixo. É o mais próximo de mágica que temos: com um computador e uma ideia, posso mudar o que está ao meu redor.",
  },
  stack: {
    groups: stackGroups({
      lang: "Linguagens", front: "Front-end", back: "Back-end e dados", auto: "Automação e IA",
      qa: "Qualidade e entrega", tools: "Ferramentas do dia a dia", chatbots: "Chatbots", agents: "Orquestração de agentes de IA", cicd: "CI/CD",
    }),
  },
  projects: {
    intro: "A maioria nasceu como ferramenta para a minha rotina. Gosto de mudar o que está ao meu redor, e a música funciona do mesmo jeito. Muitos foram feitos de madrugada, quando as ideias aparecem. Cada imagem abre o app no ar, ou o repositório quando é uma ferramenta de linha de comando.",
    items: [
      {
        name: "gym-stuff",
        accent: "#4F7CFF",
        featured: true,
        group: "web",
        blurb: "Assistente de treino para o celular: um exercício por vez, registro de séries, timer de descanso ajustável, e funciona sem sinal.",
        decision: "Gravar primeiro no aparelho e sincronizar depois, para que falta de sinal nunca perca um treino. Um toque por série, e só o exercício atual na tela.",
        tags: ["PWA", "offline-first", "Supabase", "Vercel"],
        repo: "https://github.com/Serg-Ale/gym-stuff",
        live: "https://gym-stuff-five.vercel.app",
        media: [{ src: "/projects/gym-stuff.webp", alt: "Quatro telas de celular do app de treino: o exercício atual com séries e repetições, o timer de descanso e a lista de exercícios do dia." }],
      },
      {
        name: "SAERIX portfolio",
        accent: "#E83FBF",
        featured: true,
        group: "web",
        blurb: "Este site. Next.js 16 e React 19 com GSAP, em inglês e português. Ele abriga duas identidades, a página de engenharia que você está lendo e a SAERIX, a página da minha música.",
        decision: "Manter as duas identidades separadas. Cada uma tem a própria voz, layout e movimento, e nenhuma pega o tom da outra.",
        tags: ["Next.js", "TypeScript", "GSAP", "Tailwind", "i18n"],
        repo: "https://github.com/Serg-Ale/SAERIX-PORTFOLIO",
        live: "https://saerix.vercel.app/pt-BR/saerix",
        media: [{ tab: "Passeio", src: "/projects/saerix-tour-poster.webp", video: "/projects/saerix-tour.webm", alt: "Uma rolagem pela página SAERIX: o nome em letras grandes, as frases do manifesto, o medidor de som e a seção para chamar para tocar." }, { tab: "Hero", src: "/projects/saerix-hero.webp", alt: "A página SAERIX: o nome em letras grandes ao lado de um retrato em estilo de pôster, com botões para chamar para tocar e ouvir no SoundCloud." }],
      },
      {
        name: "Como-Eles-Votaram",
        featured: true,
        group: "web",
        blurb: "Ferramenta de transparência para ver como os políticos votaram, de forma simples e clara.",
        decision: "Prisma e tRPC mantêm os tipos do banco até a tela. Tem testes, scripts de lint e typecheck, e Husky e commitlint em todo commit.",
        tags: ["T3 Stack", "Next.js", "Prisma", "tRPC", "Jest"],
        repo: "https://github.com/Serg-Ale/Como-Eles-Votaram",
      },
      {
        name: "matrix-rain",
        accent: "#2BD96B",
        group: "cli",
        blurb: "Chuva Matrix para terminal em Python e curses, hoje virando um visualizador multi-modo. Toco como produto. Spec primeiro, depois tickets, TDD e revisão, tudo público.",
        tags: ["Python", "curses", "TDD"],
        repo: "https://github.com/Serg-Ale/matrix-rain",
        media: [{ tab: "Pulse", src: "/projects/matrix-rain-pulse-poster.webp", video: "/projects/matrix-rain-pulse.webm", alt: "Modo Pulse: uma onda circular de caracteres japoneses e símbolos pulsa pelo terminal." }, { tab: "Network", src: "/projects/matrix-rain-network-poster.webp", video: "/projects/matrix-rain-network.webm", alt: "Modo Network: nós e ligações brilhantes aparecem e somem pelo terminal." }],
      },
      {
        name: "lightsync",
        accent: "#B44CF5",
        group: "cli",
        blurb: "Um serviço local que faz uma lâmpada inteligente acompanhar a tela e a música que toca no computador. Roda sem nuvem e tem quatro modos: sincronizar com a tela, branco, cor e música.",
        tags: ["Python", "PipeWire", "Tuya"],
        media: [{ tab: "Modos", src: "/projects/lightsync-modes-poster.webp", video: "/projects/lightsync-modes.webm", alt: "O painel de terminal do lightsync nos seus modos: música com espectro e kick detectado, cinco temas de cor, sincronizar com a tela, cor fixa e branco fixo." }, { tab: "Música", src: "/projects/lightsync.webp", alt: "O painel de terminal do lightsync no modo música: os últimos 60 segundos da lâmpada como faixa de cor, o kick detectado e um espectro de graves, médios e agudos." }],
      },
    ],
    groups: { web: "Web e apps", cli: "Linha de comando" },
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
