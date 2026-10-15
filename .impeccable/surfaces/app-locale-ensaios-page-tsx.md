---
version: 1
slug: "app-locale-ensaios-page-tsx"
primary_target: "app/[locale]/ensaios/page.tsx"
related_targets: ["app/[locale]/laboratorio/page.tsx","app/[locale]/ensaios/[slug]/page.tsx"]
---

# Área editorial (ensaios + laboratório)

Modo: Read. Escopo: /ensaios, /laboratorio e os artigos de ambos. O /blog antigo deixa de existir como superfície e redireciona.

Público: recrutador técnico e leitor autoral. Chegam por link direto de um currículo ou pela nav, querem ler um texto inteiro ou entender em segundos que tipo de cabeça escreve isso. A prova está nos textos e no método de organizá-los, não em métricas.

Conteúdo real: 14 textos em pt-BR (6 LAB, 8 ENS), 4 a 25 min de leitura, links reais entre eles. EN cai no fallback pt-BR.

Fora do escopo: nenhuma alteração no /dev, na home e no SAERIX. Nenhuma afirmação nova sobre o autor.

## Direction contract

THESIS: o site mostra como o autor pensa pelas ligações entre os textos, igual ao cofre Mneme de onde eles saem. Recusa o blog em grade de cartões iguais com tags roxas.

OWN-WORLD: cofre de notas. Duas séries com cor própria, LAB em laranja de sinal e ENS em violeta, sobre grafite azulado escuro ou cinza-gelo claro. Códigos LAB-001 e ENS-001 em mono tabular. Painel de propriedades como metadado. Leitura ENS em serifa de livro (Literata), LAB em Geist, código em Geist Mono. Sem Bebas, sem sombra dura.

STORY: o visitante entende na primeira tela que há duas séries ligadas, abre um texto, e ao terminar vê quem o cita e para onde ele aponta.

FIRST VIEWPORT: na listagem, título da série à esquerda, o mapa de notas (SVG com os 14 nós e as ligações reais) ocupando a metade direita e a lista de entradas logo abaixo. No artigo, painel de propriedades à esquerda, título e coluna de 66ch ao centro, notas ligadas à direita.

FORM: jardim digital, candidato 1 da lista de 7, escolhido pelo usuário. Seed 05da2170, kind pick.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
