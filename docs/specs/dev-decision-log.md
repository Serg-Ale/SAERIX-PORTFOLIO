# Spec: /dev, variante C (Decision log)

Origem: entrevista (/grilling) de 2026-10-14. Sem nomes de empresas nem de vagas: este repo é público.

## Problema
O lado DEV é menos criativo que o lado DJ e lê como "dev de WhatsApp". Precisa converter para vaga de full-stack pleno (remoto ou Londrina), mostrando identidade e o que as vagas pedem.

## Decisões
1. **Base:** variante C (hero fixo à esquerda, índice estilo terminal, portfólio como registro de decisões).
2. **Posicionamento (revisado em 2026-10-14, após levantamento do git dos repos de trabalho):** pleno full-stack web, que entrega produto de ponta a ponta (front, API, cobrança, auth, testes). Chatbot e WhatsApp são um capítulo, não o título: ~12% dos commits do Corta-ai e ~21% da API tocam WhatsApp.
3. **Casos:** 01 Corta-ai como SaaS inteiro (admin web, API, papéis com OTP, cobrança Pix, analytics por plano, WhatsApp como mais uma porta, híbrido fluxos fixos + LLM); 02 Kaizen; 03 front-end da Aeon Audio (Next.js, design system, player SoundCloud, testes, acessibilidade). A base WhatsApp/Evolution vira uma linha na trajetória e no status do Corta-ai.
4. **Só o que o currículo comprova.** Fora do site: AWS, Azure, GCP, Kubernetes, Terraform, Go, .NET, PHP, Angular, Vue; Java não é vendido como forte.
5. **Uma versão só** (sem personalização por vaga). Dados estruturados para permitir isso depois.
6. **Nível:** badge "open to work · mid-level" fica; a trajetória (Path) mostra estagiário → Jr (TCS) → Jr (Aeon) → pleno (mar/2026), como no currículo (ver item 24).
7. **Stack:** faixa Marquee (decorativa, `aria-hidden`, pausa no hover, respeita `prefers-reduced-motion`) + versão agrupada em badges de marca logo abaixo. Ordem por relevância de mercado; testes e CI/CD em destaque.
8. **Diagramas:** diagramas em código mostrando o fluxo da decisão. A regra "sem screenshots de produto de empresa" foi substituída pelo item 22.
9. **Projetos próprios (revisado):** destaque (card com decisão) para os projetos web com demo: `gym-stuff` e `Como-Eles-Votaram`. `matrix-rain` e `lightsync` viram linhas compactas. Link só para repo público; `lightsync` mostra "repo privado". HushNote (clone de projeto de terceiros, 2 commits meus) vira uma linha curta com crédito ao autor original, sem card.
10. **Vídeo:** botão "Watch intro" que só aparece quando `INTRO_VIDEO[locale]` tiver URL (em `story.ts`).

## Fora de escopo
Publicar issues no GitHub; personalização por vaga; mexer na variante B e na B1a de produção.

## Critérios de aceite
- `npm run build` e `tsc` sem erros novos.
- EN e PT-BR completos.
- Nenhuma menção às tecnologias do item 4.
- "WhatsApp" deixa de ser título de caso; "chatbot" aparece só como capítulo (Stack e casos), nunca no hero.
- Jest consta na Stack: os repos de trabalho o comprovam (front da Aeon, API, Como-Eles-Votaram), embora o currículo cite só JUnit.
- Mobile (390px) sem scroll horizontal.

## Adendo (2026-10-14, 2ª rodada)
11. **Ordem de leitura (substituída pelo item 21):** Stack, Trabalho (produtos com um time e, logo abaixo, projetos por conta própria, numerados 01 a 08, cada um num cartão), Como eu trabalho, Trajetória, Contato. Os dois blocos de prova ficam juntos; o texto de mindset vem depois. A Stack e a trajetória respondem "esse cara serve?" antes das leituras longas.
12. **Hero:** foto (avatar 44 px, `public/avatar.webp`), tese, linha de fatos ("TypeScript, React, Next.js and NestJS. Aeon Tech and Kaizen. Remote or Londrina.") e a assinatura menor.
13. **Casos com resultado na frente:** a manchete é o resultado (campo `outcome`); a decisão abre num bloco próprio. Sem números inventados.
14. **Contato:** botões Email, LinkedIn e GitHub visíveis também no mobile (a coluna esquerda fica no topo no celular).
15. **WebSocket não pode aparecer:** não existe no código do Corta-ai nem da API.
16. **Tese de origem:** Java no ensino médio (Alura, Minecraft), faculdade em jul/2022 antes da IA escrever código, fundamentos sem IA, modelo mental do todo. Mora no parágrafo de abertura de "Como eu trabalho" e na trajetória (entradas "Escola" e 2022). Sem afirmar nada sobre AWS.
17. **Ferramentas para a própria rotina:** introdução curta em "On my own"; setup com atalhos de janela no KDE (lógica do Vim e de tiling) e fluxo com o Claude Code.
18. **Claude e IA, visual:** o loop de trabalho em cinco passos com a revisão em duas faixas paralelas (Standards e Spec), um replay animado de uma sessão real de `/grill-me` (com `prefers-reduced-motion` mostrando tudo parado) e o teclado com H J K L e os atalhos do KDE. Texto em `story.ts`. Componentes: `voice-pipeline.tsx`, `key-tiler.tsx` e `speak-driven.tsx` (a 3ª rodada trocou o antigo `claude-setup.tsx`; ver item 20).
19. **Regra das imagens:** toda imagem é um link para a coisa real (site no ar, ou repositório nas ferramentas de linha de comando); a mídia principal é um print nítido; vídeo só onde o movimento é a prova (ver item 23).

## Adendo (2026-10-15, 3ª rodada)
20. **How I work como "Speak-driven development":** a fala por voz é a ideia central (confirmado pelo Sérgio). Um microfone com onda sonora abre a seção, os cinco passos viram um pipeline interativo que avança sozinho quando visível, o replay do terminal mostra falas com ícone de microfone, e o teclado vira um mini monitor em que a janela encaixa com H J K L. Os parágrafos longos viraram cartões de princípio, métricas e chamadas curtas. Substitui a parte visual do item 18.
21. **Ordem de leitura:** faixa de provas, Trabalho, Stack, Como eu trabalho, Trajetória, Contato. Prova antes de afirmação: o hero já traz as quatro tecnologias, então a Stack deixa de abrir a página e resume o que os casos mostraram. A faixa tem só fatos que o currículo ou um repositório público sustentam (4+ anos, >80% de cobertura na Aeon Tech, pleno desde mar/2026, EF SET 72/100). Substitui o item 11.
22. **Screenshots de produto:** passam a ser permitidos, de três origens: sites públicos (Atrium, Aeon Audio, Corta Aí); o admin do Corta-ai rodando num banco local descartável com seed fictício e nomes e telefones anonimizados, sempre com a nota "dados de demonstração"; e capturas dos próprios projetos. Nunca rosto ou nome de terceiro sem confirmação (por isso a seção Masterclass da Aeon fica de fora dos prints). Substitui a regra do item 8.
23. **Mídia:** prints de 1600 px em webp são o visual principal, com abas para alternar. Vídeo só onde o movimento é a prova (matrix-rain e lightsync), gravado em 30 fps ou mais. Os loops de rolagem de baixa resolução saíram dos casos. Substitui o "duas mídias, loop curto" do item 19.
24. **Trajetória:** uma escada de níveis (estágio TCS, Jr TCS, Jr Aeon, pleno Aeon) sem anos, seguida de uma timeline vertical que se preenche ao rolar. Os níveis seguem o currículo (`REBRAND-BRIEF.md`, "Seguir o currículo").
25. **Trabalho:** cada caso tem cor própria (amostrada do site do produto), moldura de navegador com abas, "o que fiz" em chips, status em checklist e a stack em badges de marca. Projetos próprios: cartões largos para web e cartões de terminal para ferramentas de linha de comando.
26. **Armadilhas do tema (aprendidas):** o Tailwind 3.4 não gera `border-[var(--x)]/NN` (usar `color-mix`), e `rounded-sm|md|lg|xl` valem zero neste tema porque as variáveis `--radius-*` não existem (usar valores em rem).
