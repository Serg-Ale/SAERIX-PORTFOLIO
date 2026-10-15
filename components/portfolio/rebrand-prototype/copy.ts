// PROTOTYPE — throwaway. Copy lives inline (not in messages/*.json) so the
// three variants can be compared without touching the translation files.
// Text follows docs/REBRAND-BRIEF.md sections 3 and 5; no numbers beyond the brief.

import type { MediaItem } from "./linked-media"

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
  // What I did on it, as short chips; the decision text keeps only the why.
  did: string[]
  status: string
  // The status as a checklist, so it reads at a glance instead of as a paragraph.
  highlights: string[]
  stack: string[]
  // The product's own color, sampled from its site; tints the card.
  accent: string
  // Public product page, with a screenshot of it; only set when the site is live.
  site?: { href: string; label: string; images: MediaItem[] }
  // A step is a label, or a list of labels when the flow splits into parallel branches.
  flow: { label: string; steps: (string | string[])[] }
}

export interface ProtoCopy {
  hero: { h1: string; facts: string; sub: string; open: string; email: string; work: string }
  labels: {
    problem: string
    decision: string
    did: string
    status: string
    stack: string
    cases: string
    casesIntro: string
    details: string
    openSite: string
    openRepo: string
    privateRepo: string
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
    did: "What I did",
    status: "Status",
    stack: "Stack",
    cases: "Cases",
    casesIntro: "Products I worked on with a team. Click an image to open the live site.",
    details: "Problem, decision and status",
    openSite: "open the site ↗",
    openRepo: "open the repo ↗",
    privateRepo: "private repo",
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
        "A barbershop runs its schedule, billing and analytics in one product. Its clients book by chat.",
      problem:
        "A barbershop needs one place for schedule, clients and billing. Its clients and barbers already live in a chat.",
      decision:
        "I proposed it, validated it with the team and the PO, and built it on the automation base I designed as a Jr. The chat is one more way in.",
      did: ["Web admin", "API", "Roles", "Billing", "Analytics"],
      status: "Two barbershops are testing it.",
      highlights: ["OTP login, roles per barbershop", "Schedule, services and cancellations", "Daily billing: Pix, trial, grace period, block", "Analytics by plan", "Chat: fixed flows, an LLM for the rest", "Self-hosted Evolution API, cheaper than Meta's"],
      stack: ["Next.js", "NestJS", "PostgreSQL", "n8n", "Pix billing", "WhatsApp"],
      accent: "#2FB4F0",
      site: { href: "https://corta-ai-barber.com.br/", label: "corta-ai-barber.com.br", images: [
        { tab: "Dashboard", src: "/cases/corta-ai-dashboard.webp", alt: "Corta Aí admin dashboard for the last 30 days: 92.48% occupancy, 90.2% completion rate, R$ 7,355.00 in revenue and a revenue chart over time.", note: "demo data" },
        { tab: "Schedule", src: "/cases/corta-ai-agenda.webp", alt: "Corta Aí monthly schedule: a calendar of the barbershop with the number of appointments per day, a barber filter and the list of appointments for the selected day.", note: "demo data" },
        { tab: "Barbers", src: "/cases/corta-ai-barbeiros.webp", alt: "Corta Aí barbers screen: cards for each barber with schedule days, enabled services, specialty and contact.", note: "demo data" },
        { tab: "Plan", src: "/cases/corta-ai-plano.webp", alt: "Corta Aí My Plan screen: the Premium plan, the next charge date, Pix payment and the invoice history.", note: "demo data" },
        { tab: "WhatsApp", src: "/cases/corta-ai-whatsapp.webp", alt: "Corta Aí WhatsApp screen: the field for the bot number and a checklist that tells the owner the barbershop is ready to receive bookings by chat.", note: "demo data" },
        { tab: "Landing", src: "/cases/corta-ai-landing.webp", alt: "Corta Aí landing page: the heading about scheduling through WhatsApp for barbershops, next to a demo of the chat menu." },
      ] },
      flow: {
        label: "One API, two entry points",
        steps: [["Web admin", "Chat"], "BFF", "NestJS API", "Schedule, billing, analytics"],
      },
    },
    {
      id: "02",
      name: "Kaizen",
      kind: "Face access for condominium guests, the Atrium product",
      state: "dev",
      stateLabel: "In development",
      outcome:
        "Atrium opens the door for a guest only between check-in and check-out. The host sends a link on WhatsApp, the guest registers with a selfie, and the reader does the rest.",
      problem:
        "Access depends on hardware from several makers, each with its own protocol. Managers and residents just want the door to open.",
      decision:
        "I own the flow from registering a person to the door opening. I build it with the founder and the other partners.",
      did: ["Registration", "Temporary access", "Automatic events"],
      status: "In active development, with a public site.",
      highlights: ["Public site live", "Team across Madrid, Mexico City and Brazil", "Hikvision and Control iD readers"],
      stack: ["NestJS", "Next.js", "Prisma", "Hikvision", "Control iD"],
      accent: "#3DDC97",
      site: { href: "https://atrium.kaizentechbr.com.br/", label: "atrium.kaizentechbr.com.br", images: [
        { tab: "Hero", src: "/cases/atrium-hero.webp", alt: "Atrium site hero: an entrance door with a face reader at night, the heading about the guest's access opening and closing by itself, and a stay timeline." },
        { tab: "Flow", src: "/cases/atrium-fluxo.webp", alt: "Atrium page about the flow from link to check-out: the host sends a link, the guest registers from the phone, and the reader receives the stay period." },
        { tab: "Camera", src: "/cases/atrium-camera.webp", alt: "Atrium page about the guided selfie: a phone with a face frame and a list of instructions shown one at a time until the photo is good." },
        { tab: "States", src: "/cases/atrium-estados.webp", alt: "Atrium page with four moments of one stay: check-in, a new attempt, the reader coming back online and the guest arriving, each with the status of the stay and of the reader." },
      ] },
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
        "I treated the front end as a product. The landing is its own piece, and the app is typed Next.js with its own components. One SoundCloud player stays mounted when the view toggles.",
      did: ["GSAP scroll animation", "Parallax system", "Kinetic text", "Radix mobile menu", "Tests with every feature"],
      status: "Live at aeonaudio.com.br.",
      highlights: ["Landing: hero, manifesto, masterclass, events, story", "Feedback with tag filters and search", "Profiles and auth", "Unit and behavior tests", "Accessibility pass", "Move to Tailwind v4"],
      stack: ["Next.js", "React", "TypeScript", "Tailwind", "GSAP", "React Query", "Jest"],
      accent: "#A5B8D0",
      site: { href: "https://aeonaudio.com.br/", label: "aeonaudio.com.br", images: [
        { tab: "Hero", src: "/cases/aeon-hero.webp", alt: "Aeon Audio landing hero: a dark carousel slide with the word Connection in large type and the buttons to start and to understand the process." },
        { tab: "Manifesto", src: "/cases/aeon-manifesto.webp", alt: "Aeon Audio manifesto: a large word, Identity, in a cycle of words, with the line 'for it to exist' and a short text about music starting in the process." },
        { tab: "Pillars", src: "/cases/aeon-pilares.webp", alt: "Aeon Audio pillars section: a carousel with the pillars of the community and a slide that reads 'we believe electronic music touches the soul'." },
        { tab: "Lab", src: "/cases/aeon-lab.webp", alt: "Aeon Audio section 'we are a lab of sound identity', with the brand symbol inside a rotating ring of words." },
      ] },
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
    did: "O que fiz",
    status: "Status",
    stack: "Stack",
    cases: "Casos",
    casesIntro: "Produtos em que trabalhei com um time. Clique numa imagem para abrir o site no ar.",
    details: "Problema, decisão e status",
    openSite: "abrir o site ↗",
    openRepo: "abrir o repo ↗",
    privateRepo: "repo privado",
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
        "Uma barbearia roda agenda, cobrança e analytics num produto só. Os clientes agendam pelo chat.",
      problem:
        "Uma barbearia precisa de um lugar só para agenda, clientes e cobrança. Os clientes e os barbeiros já vivem num chat.",
      decision:
        "Propus, validei com o time e o PO, e construí sobre a base de automação que desenhei como Jr. O chat é mais um jeito de entrar.",
      did: ["Admin web", "API", "Papéis", "Cobrança", "Analytics"],
      status: "Duas barbearias estão testando.",
      highlights: ["Login por OTP, com papéis por barbearia", "Agenda, serviços e cancelamentos", "Cobrança diária: Pix, trial, carência e bloqueio", "Analytics por plano", "Chat: fluxos fixos e um LLM para o resto", "Evolution API self-hosted, mais barata que a da Meta"],
      stack: ["Next.js", "NestJS", "PostgreSQL", "n8n", "Cobrança Pix", "WhatsApp"],
      accent: "#2FB4F0",
      site: { href: "https://corta-ai-barber.com.br/", label: "corta-ai-barber.com.br", images: [
        { tab: "Dashboard", src: "/cases/corta-ai-dashboard.webp", alt: "Dashboard do admin do Corta Aí nos últimos 30 dias: 92,48% de ocupação, 90,2% de taxa de conclusão, R$ 7.355,00 de faturamento e um gráfico de faturamento no período.", note: "dados de demonstração" },
        { tab: "Agenda", src: "/cases/corta-ai-agenda.webp", alt: "Agenda mensal do Corta Aí: o calendário da barbearia com o número de agendamentos por dia, um filtro por barbeiro e a lista de agendamentos do dia selecionado.", note: "dados de demonstração" },
        { tab: "Barbeiros", src: "/cases/corta-ai-barbeiros.webp", alt: "Tela de barbeiros do Corta Aí: um cartão por barbeiro com dias de agenda, serviços habilitados, especialidade e contato.", note: "dados de demonstração" },
        { tab: "Plano", src: "/cases/corta-ai-plano.webp", alt: "Tela Meu Plano do Corta Aí: o plano Premium, a data da próxima cobrança, o pagamento por Pix e o histórico de faturas.", note: "dados de demonstração" },
        { tab: "WhatsApp", src: "/cases/corta-ai-whatsapp.webp", alt: "Tela de WhatsApp do Corta Aí: o campo do número do bot e um checklist que avisa ao dono que a barbearia está pronta para receber agendamentos pelo chat.", note: "dados de demonstração" },
        { tab: "Landing", src: "/cases/corta-ai-landing.webp", alt: "Landing do Corta Aí: o título sobre agendamento pelo WhatsApp para barbearias, ao lado de uma demonstração do menu do chat." },
      ] },
      flow: {
        label: "Uma API, duas entradas",
        steps: [["Admin web", "Chat"], "BFF", "API NestJS", "Agenda, cobrança, analytics"],
      },
    },
    {
      id: "02",
      name: "Kaizen",
      kind: "Acesso facial para hóspedes de condomínios, o produto Atrium",
      state: "dev",
      stateLabel: "Em desenvolvimento",
      outcome:
        "O Atrium abre a porta para o hóspede só entre o check-in e o check-out. O anfitrião manda um link pelo WhatsApp, o hóspede se cadastra com uma selfie, e o leitor faz o resto.",
      problem:
        "O acesso depende de hardware de vários fabricantes, cada um com seu protocolo. Síndico e morador só querem a porta abrindo.",
      decision:
        "Sou dono do fluxo do cadastro da pessoa até a porta abrir. Construo com o fundador e os outros sócios.",
      did: ["Cadastro", "Acesso temporário", "Eventos automáticos"],
      status: "Em desenvolvimento ativo, com site público.",
      highlights: ["Site público no ar", "Time entre Madrid, Cidade do México e Brasil", "Leitores Hikvision e Control iD"],
      stack: ["NestJS", "Next.js", "Prisma", "Hikvision", "Control iD"],
      accent: "#3DDC97",
      site: { href: "https://atrium.kaizentechbr.com.br/", label: "atrium.kaizentechbr.com.br", images: [
        { tab: "Hero", src: "/cases/atrium-hero.webp", alt: "Hero do site do Atrium: uma porta de entrada com leitor facial à noite, o título sobre o acesso do hóspede abrir e fechar sozinho e uma linha do tempo da estadia." },
        { tab: "Fluxo", src: "/cases/atrium-fluxo.webp", alt: "Página do Atrium sobre o fluxo do link ao check-out: o anfitrião envia um link, o hóspede se cadastra pelo celular e o leitor recebe o período da estadia." },
        { tab: "Câmera", src: "/cases/atrium-camera.webp", alt: "Página do Atrium sobre a selfie guiada: um celular com moldura de rosto e uma lista de instruções mostradas uma de cada vez até a foto ficar boa." },
        { tab: "Estados", src: "/cases/atrium-estados.webp", alt: "Página do Atrium com quatro momentos de uma estadia: check-in, nova tentativa, o leitor voltando a ficar online e o hóspede chegando, cada um com o estado da estadia e do leitor." },
      ] },
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
        "Tratei o front-end como produto. A landing é uma peça própria, e o app é Next.js tipado, com componentes próprios. Um único player SoundCloud continua montado quando a visão troca.",
      did: ["Animação de scroll em GSAP", "Sistema de parallax", "Texto cinético", "Menu mobile em Radix", "Testes em cada funcionalidade"],
      status: "No ar em aeonaudio.com.br.",
      highlights: ["Landing: hero, manifesto, masterclass, eventos e história", "Feedback com filtro por tag e busca", "Perfis e auth", "Testes unitários e de comportamento", "Passada de acessibilidade", "Migração para o Tailwind v4"],
      stack: ["Next.js", "React", "TypeScript", "Tailwind", "GSAP", "React Query", "Jest"],
      accent: "#A5B8D0",
      site: { href: "https://aeonaudio.com.br/", label: "aeonaudio.com.br", images: [
        { tab: "Hero", src: "/cases/aeon-hero.webp", alt: "Hero da landing da Aeon Audio: um slide escuro de carrossel com a palavra Conexão em letras grandes e os botões para começar e entender o processo." },
        { tab: "Manifesto", src: "/cases/aeon-manifesto.webp", alt: "Manifesto da Aeon Audio: uma palavra grande, Identidade, num ciclo de palavras, com a frase 'para existir' e um texto curto sobre a música começar no processo." },
        { tab: "Pilares", src: "/cases/aeon-pilares.webp", alt: "Seção de pilares da Aeon Audio: um carrossel com os pilares da comunidade e um slide que diz 'acreditamos que música eletrônica toca a alma'." },
        { tab: "Lab", src: "/cases/aeon-lab.webp", alt: "Seção 'somos um laboratório de identidade sonora' da Aeon Audio, com o símbolo da marca dentro de um anel de palavras que gira." },
      ] },
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
