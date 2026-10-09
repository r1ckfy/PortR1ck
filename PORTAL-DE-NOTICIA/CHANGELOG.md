# CHANGELOG — Responsividade

Estratégia: **Desktop-First com `max-width`**. O CSS original do desktop
**não foi alterado**; toda a responsividade vive em `styles/responsive.css`
(importado por último). O desktop continua igual.

Breakpoints (apenas 3, escolhidos pela mudança de forma do layout):
`1024px` (tablets/notebooks) · `768px` (tablet retrato) · `480px` (celulares).

---

## Arquivos modificados

### `styles/responsive.css` — **NOVO**
Toda a camada responsiva. Cada regra está comentada explicando o porquê.
Principais mudanças por largura:
- **Base fluida (sem mexer no desktop):** `img { display:block; height:auto }`;
  `.container` com `padding-inline: clamp(16px,5vw,32px)`; título do hero com
  `font-size: clamp(20px,4.5vw,24px)`; imagem de IA com `clamp(112px,22vw,176px)`.
- **`#weekly`:** trocado `repeat(4, 292px)` (colunas fixas que estouravam) por
  `repeat(4, minmax(0,1fr))` — corrige scroll lateral pré-existente.
- **≤1024px:** `main` vira 1 coluna (a barra lateral desce); `#weekly` 4→2 colunas;
  menu de categorias com `flex-wrap`; `overflow-x:hidden` de segurança.
- **≤768px:** `#featured` empilha (hero em cima, grade embaixo).
- **≤480px:** logo pode encolher; gaps menores.

### `styles/index.css`
- `+ @import url(responsive.css);` (última linha, para poder sobrescrever).

### `index.html` (correções de bug, mínimas)
- 4 `<img>` da seção de IA (Image 10–13) estavam **sem o `>` de fechamento** —
  isso engolia o `</div>` seguinte e quebrava o DOM. Fechados + `alt` adicionado.
- `assets/ads.png` → `assets/Ads.png` (o arquivo real é com **A** maiúsculo;
  quebrava em hosts case-sensitive como GitHub Pages).
- Removido `class="..."` de uma tag **de fechamento** `</header>` (HTML inválido).

### `styles/sections.css` (correção de bug)
- `url(../assets/icons/...)` → `url(../assets/Icons/...)` (2x). A pasta real é
  `Icons` com **I** maiúsculo; as setas "Ver tudo" não carregavam em
  servidores case-sensitive.

---

## NÃO foi alterado (de propósito)
- `global.css`, `utility.css`, `header.css`: intactos.
- O visual do desktop (tipografia, cores, espaçamentos, hierarquia, efeitos).
- O menu de categorias no desktop continua sem `gap` (como no original).
- A seta "Ver tudo" usa um `<span>` inline com `width/height` (inline ignora
  isso) — comportamento original mantido; não fizemos a seta "aparecer" para
  não mudar o visual do desktop.
