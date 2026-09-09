# Relatório Eleitoral Interativo — David Almeida (2018–2026)

Site estático produzido a partir do relatório-fonte fornecido pelo usuário.

## Identidade visual

A versão atual foi remodelada para seguir a mesma linguagem visual do painel de referência **“Painel Eleitoral Amazonas — 2018 e 2024”**: fundo claro em tons quentes, cartões brancos, bordas suaves, tipografia compacta e paleta terrosa com laranja e verde-água.

Paleta principal:
- Fundo: `#faf5ef`
- Cartões: `#ffffff`
- Texto: `#3d3634`
- Texto secundário: `#8a7f78`
- Laranja: `#e8955a` / `#c97a2e`
- Verde-água: `#7fb3ae`
- Bordas: `#ecdfd2`

## Como abrir

Abra `index.html` diretamente no navegador ou publique a pasta inteira em qualquer hospedagem estática (Hostinger, Vercel, Netlify, GitHub Pages etc.).

## Estrutura

- `index.html` — página principal
- `assets/css/styles.css` — identidade visual
- `assets/js/data.js` — dados do relatório
- `assets/js/app.js` — interações e gráficos
- `docs/relatorio-fonte.pdf` — relatório original

O site não depende de backend.


## Navegação (v1.3)

Foi adicionada uma navegação responsiva compartilhada:
- Desktop: menu superior sticky com links para Relatório, Campanhas, Evolução, Território e Estratégia 2026.
- Mobile: barra inferior fixa com os mesmos destinos e suporte a safe-area em iPhone.
- Páginas futuras já possuem arquivos-base para evitar links quebrados.


## Versão 1.3.3 — correção do menu mobile
- A barra de navegação inferior agora é carregada imediatamente após a abertura do `<body>`, antes dos scripts pesados do painel.
- `position: fixed` reforçado para permanecer visível desde o primeiro frame.
- Suporte a `viewport-fit=cover`, safe-area e `VisualViewport` para evitar que a barra do navegador móvel cubra o menu ao abrir a página.


## Ajuste 1.3.3 — menu mobile em camada de aplicativo
A barra inferior agora vive em uma camada fixa independente do conteúdo e é posicionada pela altura real do Visual Viewport. Isso evita que a barra do navegador esconda o menu no primeiro carregamento. O fallback usa `100svh`, garantindo visibilidade mesmo antes do JavaScript estabilizar o viewport.


Ordem do menu (desktop e mobile): Relatório → Campanhas → Evolução → Território → 2026.


## Versão 1.4.0 — página Relatório
- O conteúdo integral do PDF foi convertido em página web navegável em `relatorio.html`.
- Inclui sumário lateral, tabelas, Q&A expansível, referências clicáveis e acesso ao PDF original.
- Mantida a navegação responsiva do site (menu superior desktop e barra inferior mobile).


## Atualização 1.5.0 — Campanhas
- A antiga aba **Painel** passa a se chamar **Campanhas**.
- A página reúne agora os ciclos de **2018, 2020, 2024 e o cenário prospectivo de 2026**.
- Os blocos de 2020 e 2026 foram construídos exclusivamente a partir do relatório-fonte do projeto, com separação explícita entre resultados históricos e projeções.


## Atualização 1.6.0 — Eleitorado 2026

- A aba **Campanhas > 2026** passou a usar os quantitativos exatos da base eleitoral de 2026 do TSE.
- Eleitorado total: **2.801.182**.
- Voto obrigatório: **2.504.643 (89,41%)**.
- Voto facultativo: **296.539 (10,59%)**.
- Manaus: **1.472.138**; interior: **1.329.044**.
- Foi adicionado um mapa municipal de 2026 reutilizando a mesma malha cartográfica do painel de 2018, agora colorida pelo número de eleitores aptos nos 62 municípios.
- Os dados municipais somam exatamente 2.801.182 eleitores. A análise estratégica de 2026 continua baseada no relatório; os quantitativos eleitorais foram atualizados com a base TSE.
