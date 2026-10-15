// PROTOTYPE — throwaway. Copy lives inline (not in messages/*.json) so the
// three variants can be compared without touching the translation files.
// Text follows docs/REBRAND-BRIEF.md sections 3 and 5; no numbers beyond the brief.

export type ProtoLocale = "en" | "pt-BR"
export type CaseState = "pilot" | "dev" | "shipped"

export interface ProtoCase {
  id: string
  name: string
  kind: string
  state: CaseState
  stateLabel: string
  // One-line result, shown as the case headline; the decision and the rest open below it.
  outcome: string
  problem: string
  decision: string
  status: string
  stack: string[]
  // Public product page, with a screenshot of it; only set when the site is live.
  site?: { href: string; label: string; images: { src: string; alt: string }[] }
  // A step is a label, or a list of labels when the flow splits into parallel branches.
  flow: { label: string; steps: (string | string[])[] }
}

export interface ProtoCopy {
  hero: { h1: string; facts: string; sub: string; open: string; email: string; work: string }
  labels: {
    problem: string
    decision: string
    status: string
    stack: string
    cases: string
    contact: string
    writing: string
    saerix: string
  }
  cases: ProtoCase[]
}

export const PROTO_LINKS = {
  email: "mailto:sergioalexandre0716@gmail.com",
  linkedin: "https://linkedin.com/in/serg-alexandre",
  github: "https://github.com/Serg-Ale",
}

const en: ProtoCopy = {
  hero: {
    h1: "Full-stack engineer who owns the problem, not just the ticket.",
    facts: "TypeScript, React, Next.js and NestJS. Aeon Tech and Kaizen. Remote or Londrina.",
    sub: "I understand the whole before I write the first line.",
    open: "open to work · mid-level",
    email: "Email me",
    work: "See the work",
  },
  labels: {
    problem: "Problem",
    decision: "Decision",
    status: "Status",
    stack: "Stack",
    cases: "Cases",
    contact: "Contact",
    writing: "Writing",
    saerix: "SAERIX",
  },
  cases: [
    {
      id: "01",
      name: "Corta-ai",
      kind: "SaaS for barbershops",
      state: "pilot",
      stateLabel: "In pilot",
      outcome:
        "A barbershop runs its schedule, billing and analytics in one product, and its clients book by chat. In pilot.",
      problem:
        "A barbershop needs one place for schedule, clients and billing. Its clients and barbers already live in a chat.",
      decision:
        "I proposed it, checked it with the team and the PO, and built it on the automation base I designed as a Jr. I worked across the web admin and the API, including roles, billing and analytics. The chat is one more way in.",
      status:
        "Login by OTP, with roles per barbershop. Owners and barbers manage schedule, services and cancellations. Billing runs daily: Pix, trial, grace period, and a block when payment is late. Analytics depend on the plan. In the chat, fixed flows handle the common commands and an LLM handles the rest. It runs on a self-hosted Evolution API, which costs less than Meta's official one.",
      stack: ["Next.js", "NestJS", "PostgreSQL", "n8n", "Pix billing", "WhatsApp"],
      site: { href: "https://corta-ai-barber.com.br/", label: "corta-ai-barber.com.br", images: [{ src: "/cases/corta-ai.webp", alt: "Corta Aí landing page: the heading about scheduling through WhatsApp for barbershops, next to a demo of the chat menu." }] },
      flow: {
        label: "One API, two entry points",
        steps: [["Web admin", "Chat"], "BFF", "NestJS API", "Schedule, billing, analytics"],
      },
    },
    {
      id: "02",
      name: "Kaizen",
      kind: "Access control for condominiums",
      state: "dev",
      stateLabel: "In development",
      outcome:
        "One flow takes a person from registration to an open door, on hardware from several makers, temporary access included. In development.",
      problem:
        "Access depends on hardware from several makers, each with its own protocol. Managers and residents just want the door to open.",
      decision:
        "I own the flow from registering a person to the door opening, including temporary access and automatic events. I build it with the founder and the other partners.",
      status:
        "In active development. The team is spread across Madrid, Mexico City and Brazil.",
      stack: ["NestJS", "Next.js", "Prisma", "Hikvision", "Control iD"],
      flow: {
        label: "From registration to the door",
        steps: ["Person registered", "Temporary access", "Automatic events", ["Hikvision", "Control iD"], "Door opens"],
      },
    },
    {
      id: "03",
      name: "Aeon Audio landing and front end",
      kind: "Aeon Tech · built as a Jr",
      state: "shipped",
      stateLabel: "Delivered",
      outcome:
        "I built the Aeon Audio landing page and most of the front end behind it: feedback, profiles and auth. Typed and tested, with an accessibility pass.",
      problem:
        "Aeon Audio is a community for musical feedback. The MVP front end had to ship fast and stay safe to change.",
      decision:
        "I treated the front end as a product. The landing is its own piece, with GSAP scroll animation, a parallax system, kinetic text in the manifesto and a mobile menu on Radix. The app is a typed Next.js app with its own components, and one SoundCloud player stays mounted when the view toggles. Each feature ships with tests.",
      status:
        "The landing at aeonaudio.com.br has hero, manifesto, masterclass, events and story sections. The app has feedback with tag filters and search, profiles and auth. Along the way came unit and behavior tests, an accessibility pass and the move to Tailwind v4.",
      stack: ["Next.js", "React", "TypeScript", "Tailwind", "GSAP", "React Query", "Jest"],
      site: { href: "https://aeonaudio.com.br/", label: "aeonaudio.com.br", images: [{ src: "/cases/aeon-audio.webp", alt: "Aeon Audio landing page: a dark hero with the brand logo, the main menu and a slideshow." }, { src: "/cases/aeon-audio-manifesto.webp", alt: "Manifesto section of the landing: the line \"Music needs everyone to exist\" with one word cycling in large type." }] },
      flow: {
        label: "From form to player",
        steps: ["Form (React Hook Form + Zod)", "React Query", "API", "Feedback card", "SoundCloud player"],
      },
    },
  ],
}

const ptBR: ProtoCopy = {
  hero: {
    h1: "Engenheiro full-stack que assume o problema, não só o ticket.",
    facts: "TypeScript, React, Next.js e NestJS. Aeon Tech e Kaizen. Remoto ou Londrina.",
    sub: "Entendo o todo antes de escrever a primeira linha.",
    open: "aberto a propostas · pleno",
    email: "Me escreva",
    work: "Ver o trabalho",
  },
  labels: {
    problem: "Problema",
    decision: "Decisão",
    status: "Status",
    stack: "Stack",
    cases: "Casos",
    contact: "Contato",
    writing: "Escrita",
    saerix: "SAERIX",
  },
  cases: [
    {
      id: "01",
      name: "Corta-ai",
      kind: "SaaS para barbearias",
      state: "pilot",
      stateLabel: "Em piloto",
      outcome:
        "Uma barbearia roda agenda, cobrança e analytics num produto só, e os clientes agendam pelo chat. Em piloto.",
      problem:
        "Uma barbearia precisa de um lugar só para agenda, clientes e cobrança. Os clientes e os barbeiros já vivem num chat.",
      decision:
        "Propus, validei com o time e o PO, e construí sobre a base de automação que desenhei como Jr. Trabalhei no admin web e na API, incluindo papéis, cobrança e analytics. O chat é mais um jeito de entrar.",
      status:
        "Login por OTP, com papéis por barbearia. Donos e barbeiros gerenciam agenda, serviços e cancelamentos. A cobrança roda todo dia: Pix, trial, carência e bloqueio quando o pagamento atrasa. O analytics depende do plano. No chat, fluxos fixos cuidam dos comandos comuns e um LLM cuida do resto. Roda numa Evolution API self-hosted, que custa menos que a oficial da Meta.",
      stack: ["Next.js", "NestJS", "PostgreSQL", "n8n", "Cobrança Pix", "WhatsApp"],
      site: { href: "https://corta-ai-barber.com.br/", label: "corta-ai-barber.com.br", images: [{ src: "/cases/corta-ai.webp", alt: "Landing do Corta Aí: o título sobre agendamento pelo WhatsApp para barbearias, ao lado de uma demonstração do menu do chat." }] },
      flow: {
        label: "Uma API, duas entradas",
        steps: [["Admin web", "Chat"], "BFF", "API NestJS", "Agenda, cobrança, analytics"],
      },
    },
    {
      id: "02",
      name: "Kaizen",
      kind: "Controle de acesso para condomínios",
      state: "dev",
      stateLabel: "Em desenvolvimento",
      outcome:
        "Um fluxo leva a pessoa do cadastro até a porta aberta, com hardware de vários fabricantes e acesso temporário incluído. Em desenvolvimento.",
      problem:
        "O acesso depende de hardware de vários fabricantes, cada um com seu protocolo. Síndico e morador só querem a porta abrindo.",
      decision:
        "Sou dono do fluxo do cadastro da pessoa até a porta abrir, com acesso temporário e eventos automáticos. Construo com o fundador e os outros sócios.",
      status:
        "Em desenvolvimento ativo. O time está espalhado entre Madrid, Cidade do México e Brasil.",
      stack: ["NestJS", "Next.js", "Prisma", "Hikvision", "Control iD"],
      flow: {
        label: "Do cadastro até a porta",
        steps: ["Pessoa cadastrada", "Acesso temporário", "Eventos automáticos", ["Hikvision", "Control iD"], "Porta abre"],
      },
    },
    {
      id: "03",
      name: "Landing e front-end da Aeon Audio",
      kind: "Aeon Tech · feito como Jr",
      state: "shipped",
      stateLabel: "Entregue",
      outcome:
        "Construí a landing page da Aeon Audio e a maior parte do front-end por trás: feedback, perfis e auth. Tipado e testado, com uma passada de acessibilidade.",
      problem:
        "A Aeon Audio é uma comunidade de feedback musical. O front-end do MVP precisava sair rápido e continuar seguro de mudar.",
      decision:
        "Tratei o front-end como produto. A landing é uma peça própria, com animação de scroll em GSAP, um sistema de parallax, texto cinético no manifesto e menu mobile em Radix. O app é Next.js tipado, com componentes próprios, e um único player SoundCloud continua montado quando a visão troca. Cada funcionalidade sai com testes.",
      status:
        "A landing em aeonaudio.com.br tem as seções de hero, manifesto, masterclass, eventos e história. O app tem feedback com filtro por tag e busca, perfis e auth. No caminho vieram testes unitários e de comportamento, uma passada de acessibilidade e a migração para o Tailwind v4.",
      stack: ["Next.js", "React", "TypeScript", "Tailwind", "GSAP", "React Query", "Jest"],
      site: { href: "https://aeonaudio.com.br/", label: "aeonaudio.com.br", images: [{ src: "/cases/aeon-audio.webp", alt: "Landing da Aeon Audio: um hero escuro com o logo, o menu principal e um slideshow." }, { src: "/cases/aeon-audio-manifesto.webp", alt: "Seção do manifesto da landing: a frase \"A música precisa de todos para existir\" com uma palavra trocando em letras grandes." }] },
      flow: {
        label: "Do formulário ao player",
        steps: ["Formulário (React Hook Form + Zod)", "React Query", "API", "Card de feedback", "Player SoundCloud"],
      },
    },
  ],
}

export function getProtoCopy(locale: ProtoLocale): ProtoCopy {
  return locale === "pt-BR" ? ptBR : en
}
