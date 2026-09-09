# Relatório Eleitoral Interativo — Amazonas / Manaus (2018–2026)

Site estático criado a partir do relatório fornecido pelo usuário e inspirado na organização visual do painel de referência indicado na conversa.

## Como abrir

Basta abrir `index.html` em um navegador moderno. O site foi construído para funcionar sem servidor local e sem bibliotecas JavaScript externas.

O pacote não depende de bibliotecas externas nem de conexão com a internet para funcionar.

## Estrutura

- `index.html` — página principal
- `assets/css/styles.css` — estilos responsivos e temas claro/escuro
- `assets/js/data.js` — base de dados extraída do relatório
- `assets/js/app.js` — interações, gráficos, filtros e exportação CSV
- `assets/img/favicon.svg` — ícone do site
- `docs/relatorio-fonte.pdf` — relatório original

## Recursos

- Alternância entre 2018, 2020 e 2024
- KPIs de eleitorado, comparecimento, votos válidos, votação e abstenção
- Gráficos em HTML/CSS/JavaScript puro
- Comparação 2020 × 2024
- Linha do tempo 2018–2026
- Explorador das 13 zonas eleitorais com busca, filtro e ordenação
- Ranking dos municípios destacados em 2018
- Visualização demográfica e projeção para 2026
- Exportação de resumo em CSV
- Tema claro/escuro
- Notas metodológicas sobre divergências aritméticas encontradas no relatório

## Publicação

Pode ser hospedado como site estático em GitHub Pages, Hostinger, Vercel, Netlify ou servidor Apache/Nginx. Não exige build.
