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
6. **Nível:** badge "open to work · mid-level" fica; a trajetória (Path) mostra júnior → pleno (mar/2026).
7. **Stack:** faixa Marquee (decorativa, `aria-hidden`, pausa no hover, respeita `prefers-reduced-motion`) + versão agrupada em badges de marca logo abaixo. Ordem por relevância de mercado; testes e CI/CD em destaque.
8. **Diagramas:** diagramas em código mostrando o fluxo da decisão; sem screenshots de produto de empresa.
9. **Projetos próprios (revisado):** destaque (card com decisão) para os projetos web com demo: `gym-stuff` e `Como-Eles-Votaram`. `matrix-rain` e `lightsync` viram linhas compactas. Link só para repo público; `lightsync` mostra "repo privado". HushNote (clone de projeto de terceiros, 2 commits meus) vira uma linha curta com crédito ao autor original, sem card.
10. **Vídeo:** botão "Watch intro" que só aparece quando `INTRO_VIDEO[locale]` tiver URL (em `story.ts`).

## Fora de escopo
Publicar issues no GitHub; personalização por vaga; screenshots de produto; mexer na variante B e na B1a de produção.

## Critérios de aceite
- `npm run build` e `tsc` sem erros novos.
- EN e PT-BR completos.
- Nenhuma menção às tecnologias do item 4.
- "WhatsApp" deixa de ser título de caso; "chatbot" aparece só como capítulo (Stack e casos), nunca no hero.
- Jest consta na Stack: os repos de trabalho o comprovam (front da Aeon, API, Como-Eles-Votaram), embora o currículo cite só JUnit.
- Mobile (390px) sem scroll horizontal.

## Adendo (2026-10-14, 2ª rodada)
11. **Ordem de leitura:** Stack, Casos, Como eu trabalho, Projetos, Trajetória, Contato. A Stack e a trajetória respondem "esse cara serve?" antes das leituras longas.
12. **Hero:** foto (avatar 44 px, `public/avatar.webp`), tese, linha de fatos ("TypeScript, React, Next.js and NestJS. Aeon Tech and Kaizen. Remote or Londrina.") e a assinatura menor.
13. **Casos com resultado na frente:** a manchete é o resultado (campo `outcome`); a decisão abre num bloco próprio. Sem números inventados.
14. **Contato:** botões Email, LinkedIn e GitHub visíveis também no mobile (a coluna esquerda fica no topo no celular).
15. **WebSocket não pode aparecer:** não existe no código do Corta-ai nem da API.

