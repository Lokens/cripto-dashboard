# Crypto Dashboard - Next.js + React Query

Dashboard para listar e visualizar detalhes das principais criptomoedas usando a API da CoinGecko.

---

## Tecnologias Utilizadas

- **Next.js** (React 18) — Framework React com SSR e SSG.
- **React Query (@tanstack/react-query)** — Gerenciamento de dados assíncronos, cache e revalidação.
- **Context API** — Gerenciamento global do estado da moeda selecionada (BRL/USD).
- **Error Boundaries** — Captura de erros para evitar que a aplicação trave.
- **Next Themes** — Suporte a temas claro e escuro com persistência.
- **Chart.js + react-chartjs-2** — Visualização de gráficos.
- **Tailwind CSS** — Estilização responsiva e modo escuro.
- **TypeScript** — Tipagem estática para maior segurança.

---

## Funcionalidades

- Listagem das 20 principais criptomoedas por capitalização de mercado.
- Busca dinâmica por nome da moeda.
- Página de detalhes da moeda com gráfico dos últimos 7 dias.
- Alternância entre tema claro e escuro.
- Seleção de moeda (BRL/USD) com contexto global.
- Tratamento de erros com mensagens amigáveis via Error Boundary.
- Estados de loading durante carregamento de dados.
- Deploy otimizado para Vercel.

---
