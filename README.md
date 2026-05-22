# Fefeh — Portfolio

Site estático para o portfólio de **Fernanda Viana (Fefeh)** — designer e artista visual com foco em ilustração, animação, 3D e design gráfico no universo geek.

Estética monocromática (preto/branco/cinza), mangá + glitch + linhas finas de anime moderno. Single-page com 8 seções, toggle dark/light, masonry portfolio com filtro e lightbox, carrossel de depoimentos, FAQ em acordeão.

---

## Como rodar localmente

Abra o `index.html` no navegador. Pronto. Sem build, sem dependências, sem servidor.

---

## Stack

- HTML5 semântico
- CSS3 vanilla (custom properties para tema, masonry via `column-count`)
- JavaScript vanilla (IntersectionObserver, sem libs)
- Fontes: Anton, Space Grotesk, Space Mono (Google Fonts via `<link>`)

---

## Guia de manutenção

Para o passo-a-passo completo da Fefeh com Git/GitHub, consulte **[TUTORIAL-MANUTENCAO.md](./TUTORIAL-MANUTENCAO.md)**.

A maior parte da manutenção do conteúdo é feita editando o `index.html`. Cada bloco editável tem um comentário visual destacado para localização rápida.

### Como adicionar um novo trabalho ao portfólio

1. Crie a pasta `assets/img/works/work-XX/` (use o próximo número da sequência).
2. Coloque `thumb.jpg` dentro da pasta (obrigatório) e quaisquer `extra-01.jpg`, `extra-02.jpg`, etc. (opcionais).
3. Abra `index.html` e localize o comentário `🔵 BLOCO DE TRABALHOS DO PORTFÓLIO`.
4. Escolha um dos 3 templates já presentes como referência:
   - **Template A — FULL**: todos os campos preenchidos (ano, descrição, ferramentas, tags, múltiplas imagens).
   - **Template B — MINIMAL**: apenas obrigatórios (título, categoria, uma imagem).
   - **Template C — MIX**: alguns opcionais.
5. Copie o `<article>` mais próximo do trabalho que você quer adicionar, cole logo após o último e ajuste os campos.
6. O atributo `data-category` deve bater exatamente com um dos filtros: `ilustracao`, `animacao`, `3d`, `pintura`, `social-media`, `design-grafico`.

### Como adicionar uma pergunta no FAQ

1. No `index.html`, localize `🟢 BLOCO DO FAQ`.
2. Copie qualquer `<details class="faq-item">...</details>` existente, cole logo após o último.
3. Edite a pergunta no `<summary>` e a resposta no `<div class="faq-answer">`.

### Como adicionar um depoimento

1. No `index.html`, localize `🟡 BLOCO DE DEPOIMENTOS`.
2. Copie qualquer `<li class="testimonial">...</li>`, cole logo após o último.
3. Edite o texto do depoimento, o nome (`<strong>`) e — opcionalmente — o handle (`<span class="autor-handle">`).
4. Se o depoente não tiver handle do Instagram, simplesmente remova a linha `<span class="autor-handle">`.

### Como trocar a tagline do Hero

A tagline em uso é a opção C (`transformando cultura pop em traço monocromático`). As opções A e B estão **comentadas logo abaixo** no `index.html`. Para trocar, descomente a desejada e comente a atual.

### Como trocar o texto da seção "Sobre"

A bio em uso é a versão adaptada (texto B). A bio original formal está **comentada logo abaixo**. Mesmo processo: descomenta a desejada e comenta a atual.

---

## Placeholders a substituir antes de publicar

Todos os placeholders são facilmente encontráveis via Ctrl+F nos arquivos. Lista completa:

| Placeholder | Onde aparece | O que substituir |
|---|---|---|
| `INSERIR_WHATSAPP` | `index.html` (vários botões) | Número no formato `5511987654321` (DDI+DDD+número, sem espaços) |
| `INSERIR_BEHANCE` | `index.html` (footer + Schema.org) | URL completa do Behance |
| `INSERIR_ARTSTATION` | `index.html` (footer + Schema.org) | URL completa do ArtStation |
| `INSERIR_LINKEDIN` | `index.html` (footer + Schema.org) | URL completa do LinkedIn |
| `INSERIR_URL_FINAL` | `index.html`, `sitemap.xml`, `robots.txt` | URL final do site (`https://incisi.github.io/fefeh-website` ou domínio próprio) |
| `INSERIR_AVATAR` | `index.html` (seção Sobre) | Arquivo `assets/img/hero/avatar.png` deve existir; senão, o `onerror` esconde a imagem |
| `INSERIR_TIMELAPSE` | `index.html` (seção Processo) | Arquivo `assets/img/process/timelapse.mp4` (e opcionalmente `.webm`) |
| `INSERIR_FAVICON` | `favicon.svg` | Substituir o SVG placeholder por um favicon definitivo |
| `INSERIR_DESCRICAO_DA_IMAGEM` | `index.html` (atributos `alt` das obras) | Descrição curta de cada imagem (importante para SEO e acessibilidade) |

---

## Estrutura de arquivos

```
website-portfolio/
├── index.html                  ← Página única (estrutura + conteúdo)
├── favicon.svg                 ← Favicon placeholder
├── robots.txt                  ← SEO
├── sitemap.xml                 ← SEO
├── .nojekyll                   ← Garante que GitHub Pages sirva tudo
├── .gitignore
├── LICENSE                     ← All Rights Reserved
├── README.md                   ← Este arquivo
├── TUTORIAL-MANUTENCAO.md      ← Guia passo-a-passo para a Fefeh
├── css/
│   └── styles.css              ← Todo o CSS
├── js/
│   └── script.js               ← Todo o JS
└── assets/
    └── img/
        ├── hero/               ← Avatar / imagens do hero
        ├── process/            ← Vídeo timelapse
        ├── works/              ← Trabalhos do portfólio (1 pasta por trabalho)
        │   ├── work-01/
        │   ├── work-02/
        │   └── work-03/
        ├── testimonials/       ← (atualmente vazio — depoimentos não usam avatar)
        └── icons/              ← (reservado para futuros ícones customizados)
```

---

## Créditos

- **Design e arte:** [Fefeh](https://instagram.com/fefeh_art_)
- **Desenvolvimento:** [Incisi](https://incisi.dev.br/)

---

## Licença

Todos os direitos reservados. Veja [LICENSE](./LICENSE) para detalhes.
