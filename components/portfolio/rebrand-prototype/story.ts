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
  labels: { top: string; how: string; proof: string; journey: string; stack: string; projects: string; contact: string }
  setup: {
    label: string
    tools: string
    workflow: string
    claudeTitle: string
    claude: { title: string; body: string }[]
    credit: { text: string; href: string }
  }
  how: {
    stance: string
    lead: string
    focus: string
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
    intro: string
    // `featured` items get a decision line and the narrative card; the rest stay compact rows.
    // `repo` is omitted for private repos, which show `privateLabel` instead.
    items: {
      name: string; blurb: string; decision?: string; tags: string[]
      repo?: string; live?: string; featured?: boolean
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
  labels: { top: "Intro", how: "How I work", proof: "Proof", journey: "Path", stack: "Stack", projects: "On my own", contact: "Contact" },
  setup: {
    label: "Setup",
    tools: "Neovim in kitty, with fish and starship, on Linux with KDE.",
    workflow: "My window shortcuts in KDE follow how Vim and tiling window managers work, so I move between windows and screens without the mouse. I keep many things open at once, and knowing the whole system lets me document a bug while I fix another.",
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
    lead: "I learned Java in high school, drawn in by Minecraft, and I started college before AI wrote code. My data structures exams were on paper, and my Java was in Notepad. So I know abstraction and how memory works, and today typing is the fast part. What I bring is the mental model of the whole.",
    focus: "I have ADHD, and in this field it works as a strength. Hyperfocus keeps the mental model loaded for me, so I can follow the logs, the deployment and a merge while I talk to Claude, and still answer a message in the gap.",
    principles: [
      { title: "Align on the whole", body: "Questions before code. A shared vision with the team and the PO before the first ticket." },
      {
        title: "AI executes, I direct",
        body: "AI executes and researches faster than I do, and it surfaces risks and failure modes quickly. It also has bias and doesn't always show every option. The mental model and the questions stay mine.",
      },
      { title: "Prove it in the open", body: "Spec, tickets, TDD and review in a public repository, for anyone to check." },
      { title: "Speak up when something is off", body: "I might be in the payments module and spot an authentication problem somewhere else. I say so, and since code is cheap now, I fix it or write it up right then. The job is to solve the problem, and the technology is the tool." },
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
      { year: "School", title: "High school, Java", body: "The state of Paraná gave students access to Alura, and I started learning Java, mostly because of Minecraft. I wanted to change what was around me with code." },
      { year: "2022", title: "UTFPR + TCS, intern", body: "Started the first job in June and the degree in July, months before ChatGPT. I already knew Java, so I made class assignments bigger, with console menus and ASCII art. Data structures on paper, Java in Notepad. At work, front end, back end, tests and Scrum." },
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
      "I like understanding how technology works underneath. It is the closest thing to magic we have: with a computer and an idea, I can change what is around me.",
  },
  stack: {
    groups: stackGroups({
      lang: "Languages", front: "Front end", back: "Back end and data", auto: "Automation & AI",
      qa: "Quality & delivery", tools: "Daily tools", chatbots: "Chatbots", agents: "AI agent orchestration", cicd: "CI/CD",
    }),
  },
  projects: {
    intro: "Most of these began as tools for my own routine. I like changing what is around me, and music works the same way. When I compose, I change the room too. Many were built at night, when the ideas show up. An image opens the live app, or the repository when it is a command-line tool.",
    items: [
      {
        name: "gym-stuff",
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
        featured: true,
        group: "web",
        blurb: "This site. Next.js 16 and React 19 with GSAP, in English and Portuguese. It holds two identities, the engineer page you are reading and SAERIX, the page for my music.",
        decision: "Keep the two identities apart. Each has its own voice, layout and motion, and neither borrows the tone of the other.",
        tags: ["Next.js", "TypeScript", "GSAP", "Tailwind", "i18n"],
        repo: "https://github.com/Serg-Ale/SAERIX-PORTFOLIO",
        live: "https://saerix.vercel.app/en/saerix",
        media: [{ src: "/projects/saerix-hero.webp", alt: "The SAERIX page: the name in large type next to a poster-style portrait, with buttons to book a set and to listen on SoundCloud." }],
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
        group: "cli",
        blurb: "Matrix rain for the terminal in Python and curses, now becoming a multi-mode visualizer. I run it like a product. Spec first, then tickets, TDD and review, all public.",
        tags: ["Python", "curses", "TDD"],
        repo: "https://github.com/Serg-Ale/matrix-rain",
        media: [{ src: "/projects/matrix-rain-poster.webp", video: "/projects/matrix-rain.webm", alt: "A terminal filled with falling green Japanese characters, the Matrix rain effect." }],
      },
      {
        name: "lightsync",
        group: "cli",
        blurb: "A local service that makes a smart bulb follow the screen and the music playing on the computer. It runs without the cloud and has four modes: screen sync, white, color and music.",
        tags: ["Python", "PipeWire", "Tuya"],
        media: [{ src: "/projects/lightsync.webp", alt: "The lightsync terminal panel in music mode: the lamp's last 60 seconds as a color strip, the detected kick and a bass, mid and treble spectrum." }],
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
  labels: { top: "Início", how: "Como eu trabalho", proof: "Prova", journey: "Trajetória", stack: "Stack", projects: "Por conta própria", contact: "Contato" },
  setup: {
    label: "Setup",
    tools: "Neovim no kitty, com fish e starship, no Linux com KDE.",
    workflow: "Meus atalhos de janela no KDE seguem a lógica do Vim e dos gerenciadores de janela em tiling, então eu me movo entre janelas e telas sem o mouse. Mantenho muita coisa aberta ao mesmo tempo, e conhecer o sistema inteiro me deixa documentar um bug enquanto resolvo outro.",
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
    lead: "Aprendi Java no ensino médio, puxado pelo Minecraft, e entrei na faculdade antes de a IA escrever código. As provas de estrutura de dados eram no papel, e o Java era no bloco de notas. Então entendo abstração e como a memória funciona, e hoje digitar é a parte rápida. O que eu trago é o modelo mental do todo.",
    focus: "Tenho TDAH, e nessa área isso funciona como força. O hiperfoco mantém o modelo mental carregado para mim, então acompanho os logs, o deploy e um merge enquanto converso com o Claude, e ainda respondo uma mensagem no intervalo.",
    principles: [
      { title: "Alinhar o todo", body: "Perguntas antes do código. Visão compartilhada com o time e o PO antes do primeiro ticket." },
      {
        title: "A IA executa, eu dirijo",
        body: "A IA executa e pesquisa mais rápido que eu, e levanta riscos e modos de falha com rapidez. Mas tem viés e nem sempre mostra todas as opções. O modelo mental e as perguntas continuam sendo meus.",
      },
      { title: "Provar em aberto", body: "Spec, tickets, TDD e revisão num repositório público, para qualquer um conferir." },
      { title: "Falar quando algo está errado", body: "Posso estar no módulo de pagamento e notar um problema de autenticação em outro lugar. Eu aviso, e como código está barato hoje, corrijo ou documento na hora. O trabalho é resolver o problema, e a tecnologia é a ferramenta." },
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
      { year: "Escola", title: "Ensino médio, Java", body: "O governo do Paraná liberou a Alura para os alunos, e comecei a aprender Java, muito por causa do Minecraft. Eu queria mudar o que estava ao meu redor com código." },
      { year: "2022", title: "UTFPR + TCS, estágio", body: "Comecei o primeiro emprego em junho e a graduação em julho, meses antes do ChatGPT. Eu já sabia Java, então aumentava os trabalhos da faculdade, com menus no console e arte ASCII. Estrutura de dados no papel, Java no bloco de notas. No trabalho, front-end, back-end, testes e Scrum." },
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
      "Gosto de entender como a tecnologia funciona por baixo. É o mais próximo de mágica que temos: com um computador e uma ideia, posso mudar o que está ao meu redor.",
  },
  stack: {
    groups: stackGroups({
      lang: "Linguagens", front: "Front-end", back: "Back-end e dados", auto: "Automação e IA",
      qa: "Qualidade e entrega", tools: "Ferramentas do dia a dia", chatbots: "Chatbots", agents: "Orquestração de agentes de IA", cicd: "CI/CD",
    }),
  },
  projects: {
    intro: "A maioria nasceu como ferramenta para a minha rotina. Gosto de mudar o que está ao meu redor, e a música funciona do mesmo jeito. Quando componho, mudo o ambiente também. Muitos foram feitos de madrugada, quando as ideias aparecem. Uma imagem abre o app no ar, ou o repositório quando é uma ferramenta de linha de comando.",
    items: [
      {
        name: "gym-stuff",
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
        featured: true,
        group: "web",
        blurb: "Este site. Next.js 16 e React 19 com GSAP, em inglês e português. Ele abriga duas identidades, a página de engenharia que você está lendo e a SAERIX, a página da minha música.",
        decision: "Manter as duas identidades separadas. Cada uma tem a própria voz, layout e movimento, e nenhuma pega o tom da outra.",
        tags: ["Next.js", "TypeScript", "GSAP", "Tailwind", "i18n"],
        repo: "https://github.com/Serg-Ale/SAERIX-PORTFOLIO",
        live: "https://saerix.vercel.app/pt-BR/saerix",
        media: [{ src: "/projects/saerix-hero.webp", alt: "A página SAERIX: o nome em letras grandes ao lado de um retrato em estilo de pôster, com botões para chamar para tocar e ouvir no SoundCloud." }],
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
        group: "cli",
        blurb: "Chuva Matrix para terminal em Python e curses, hoje virando um visualizador multi-modo. Toco como produto. Spec primeiro, depois tickets, TDD e revisão, tudo público.",
        tags: ["Python", "curses", "TDD"],
        repo: "https://github.com/Serg-Ale/matrix-rain",
        media: [{ src: "/projects/matrix-rain-poster.webp", video: "/projects/matrix-rain.webm", alt: "Um terminal cheio de caracteres japoneses verdes caindo, o efeito de chuva Matrix." }],
      },
      {
        name: "lightsync",
        group: "cli",
        blurb: "Um serviço local que faz uma lâmpada inteligente acompanhar a tela e a música que toca no computador. Roda sem nuvem e tem quatro modos: sincronizar com a tela, branco, cor e música.",
        tags: ["Python", "PipeWire", "Tuya"],
        media: [{ src: "/projects/lightsync.webp", alt: "O painel de terminal do lightsync no modo música: os últimos 60 segundos da lâmpada como faixa de cor, o kick detectado e um espectro de graves, médios e agudos." }],
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
