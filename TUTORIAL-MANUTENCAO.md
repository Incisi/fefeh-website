# Tutorial de manutenção — para a Fefeh

Esse guia é pra você, Fefeh! Aqui está o passo-a-passo completo de como atualizar o site sozinha, desde instalar as ferramentas até publicar uma alteração no ar. Não precisa saber programar — só seguir o roteiro.

---

## O que você vai precisar instalar (uma vez só)

### 1. GitHub Desktop

É um programa visual que faz toda a parte de versionamento e envio de arquivos pra você. Você não precisa usar terminal nem digitar comandos.

1. Acesse: <https://desktop.github.com>
2. Baixe a versão para o seu sistema (Windows ou Mac).
3. Instale normalmente (próximo, próximo, finalizar).
4. Ao abrir, faça login com a mesma conta do GitHub que tem o repositório do site.

### 2. Um editor de texto

Pra editar os arquivos do site. Recomendo o **VS Code** (gratuito, leve, intuitivo):

1. Acesse: <https://code.visualstudio.com>
2. Baixe e instale.

(Se preferir, dá pra usar até o Bloco de Notas em emergência, mas o VS Code mostra cores nos códigos e ajuda muito.)

---

## Como baixar o site pro seu computador (primeira vez)

1. Abra o **GitHub Desktop**.
2. Vá em **File → Clone repository**.
3. Procure pelo repositório do site (vai estar listado na sua conta).
4. Escolha uma pasta no seu computador pra ele salvar (ex: `Documentos/fefeh-website`).
5. Clica em **Clone** e espera baixar.

Pronto. Agora você tem o site inteiro no seu computador.

---

## Como abrir o site pra ver localmente

1. Abra a pasta onde você salvou o site.
2. Dê **duplo clique no arquivo `index.html`**.
3. Ele vai abrir no navegador. É exatamente como ele aparece no ar.

Toda vez que você editar algo, basta **dar F5 no navegador** pra ver o resultado atualizado.

---

## Como editar o site

1. Abra o **VS Code**.
2. Vá em **File → Open Folder** e selecione a pasta do site.
3. No lado esquerdo, você vê todos os arquivos. Clique em **`index.html`** pra abrir.
4. Pra encontrar o que quer editar rapidinho, use **Ctrl+F** (Cmd+F no Mac).

### Localizadores rápidos (Ctrl+F dentro do `index.html`)

| Você quer mexer em… | Procure por… |
|---|---|
| Adicionar trabalho ao portfólio | `🔵 BLOCO DE TRABALHOS` |
| Adicionar/editar pergunta do FAQ | `🟢 BLOCO DO FAQ` |
| Adicionar/editar depoimento | `🟡 BLOCO DE DEPOIMENTOS` |
| Trocar tagline do Hero | `TAGLINES ALTERNATIVAS` |
| Trocar texto sobre você | `TEXTO A — bio original` |
| Trocar contatos (WhatsApp, Insta) | `INSERIR_WHATSAPP` ou `INSERIR_LINKEDIN` etc. |

---

## Como adicionar um novo trabalho ao portfólio

### Passo 1 — Preparar as imagens

1. Crie uma pasta nova dentro de `assets/img/works/` chamada `work-04` (ou o próximo número da sequência).
2. Coloque dentro dela:
   - **`thumb.jpg`** — a imagem que aparece no portfólio (obrigatório).
   - Quaisquer **`extra-01.jpg`**, **`extra-02.jpg`**, etc. (opcional, se quiser mostrar mais imagens quando alguém clicar no trabalho).

**Dica:** salve as imagens em JPG com qualidade ~85% pra ficarem leves. Tamanho ideal de thumb: até **1200px** no maior lado.

### Passo 2 — Adicionar no código

1. Abra o `index.html` no VS Code.
2. Use **Ctrl+F** e procure por `🔵 BLOCO DE TRABALHOS`.
3. Você vai ver 3 templates (A — FULL, B — MINIMAL, C — MIX). Cada um é um bloco `<article>`.
4. **Copie o template mais parecido com o trabalho que você quer adicionar.**
5. **Cole logo abaixo do último `<article>`** que existe.
6. Edite os campos:
   - `data-category` → o tipo do trabalho. Valores aceitos: `ilustracao`, `animacao`, `3d`, `pintura`, `social-media`, `design-grafico`.
   - `data-tags` → palavras separadas por vírgula (opcional).
   - `data-title` → o nome do trabalho.
   - `data-category-label` → o nome bonito da categoria (ex: "Ilustração", "Design Gráfico").
   - `data-year` → o ano (opcional).
   - `data-description` → descrição curta (opcional).
   - `data-tools` → ferramentas usadas (opcional).
   - `data-images` → caminhos das imagens, no formato `'["assets/img/works/work-04/thumb.jpg","assets/img/works/work-04/extra-01.jpg"]'`. As aspas precisam ser **simples por fora** e **duplas por dentro**.
   - `src` da `<img>` → caminho da thumb.
   - `alt` da `<img>` → descrição da imagem pra acessibilidade e SEO (importante!).
   - `<h3>` dentro do `.work-overlay` → o título que aparece no hover.
   - `<span>` dentro do `.work-overlay` → categoria · ano.

### Passo 3 — Testar localmente

1. Salve o arquivo (**Ctrl+S**).
2. Volte ao navegador onde você abriu o `index.html` e dê **F5**.
3. Confirme que o trabalho aparece, e que clicando nele abre o lightbox certinho.

### Passo 4 — Publicar

Pule pra seção **"Como publicar no ar"** mais abaixo.

---

## Como adicionar uma pergunta no FAQ

1. No `index.html`, **Ctrl+F** → `🟢 BLOCO DO FAQ`.
2. Copie qualquer `<details class="faq-item">...</details>` existente.
3. Cole logo após o último.
4. Edite:
   - O texto dentro do `<summary><span>...</span>` → a pergunta.
   - O texto dentro do `<div class="faq-answer"><p>...</p></div>` → a resposta.
5. Salve e teste localmente (F5 no navegador).

---

## Como adicionar um depoimento

1. No `index.html`, **Ctrl+F** → `🟡 BLOCO DE DEPOIMENTOS`.
2. Copie qualquer `<li class="testimonial">...</li>` existente.
3. Cole logo após o último.
4. Edite:
   - O `<p>` dentro do `.balao` → o texto do depoimento.
   - O `<strong>` → o nome de quem deu o depoimento.
   - O `<span class="autor-handle">` → o @ do Instagram (opcional — se a pessoa não tem ou você não quer mostrar, **apague a linha inteira**).
5. Salve e teste.

---

## Como publicar no ar (enviar pro GitHub)

Toda vez que você quiser que suas alterações apareçam no site online:

1. Abra o **GitHub Desktop**.
2. Ele vai mostrar automaticamente todos os arquivos que você mudou.
3. No campo **Summary** (canto inferior esquerdo), escreva uma frase curta descrevendo a mudança. Exemplos:
   - "Adiciona novo trabalho de ilustração: Mitsuri"
   - "Atualiza FAQ com pergunta sobre prazos"
   - "Corrige typo na bio"
4. Clica no botão azul **Commit to main**.
5. Depois clica em **Push origin** (em cima, ou no botão "Push" que aparece).
6. Espera ~30 segundos a 2 minutos. O site no ar vai atualizar automaticamente.

Pronto! Você publicou uma alteração.

---

## E se eu fizer besteira?

Calma, dá pra desfazer tudo. Antes de **commitar**, no GitHub Desktop você pode:

- Ver exatamente o que mudou em cada arquivo (verde = adicionado, vermelho = removido).
- Clicar com botão direito num arquivo e escolher **Discard changes** pra voltar como estava.

E mesmo depois de publicar, dá pra reverter — basta chamar o David (Incisi).

---

## Resumo do fluxo "do zero até o ar"

```
1. Abrir GitHub Desktop → garantir que está atualizado (Fetch origin)
2. Abrir VS Code → editar index.html
3. Salvar (Ctrl+S)
4. F5 no navegador → conferir que ficou bom localmente
5. Voltar ao GitHub Desktop → escrever Summary → Commit to main → Push origin
6. Esperar 1 min → recarregar o site no ar
```

---

## Qualquer dúvida

Chama o **David (Incisi)**. Sempre. Sem vergonha.
