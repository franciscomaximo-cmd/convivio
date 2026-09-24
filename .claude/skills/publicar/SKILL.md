---
name: publicar
description: Publica o site no GitHub e, por arrasto, no Cloudflare Pages. Verifica o build, faz commit das alterações pendentes e git push para main. Na primeira vez, prepara o repositório e explica a ligação à Cloudflare.
disable-model-invocation: true
---

# Publicar o site

Cada `git push` para `main` publica automaticamente uma nova versão no
Cloudflare Pages. Esta skill leva as alterações locais até lá.

Nunca te autentiques no GitHub ou na Cloudflare por conta própria, nem
geres tokens de acesso. O login é sempre feito pelo utilizador, no browser.

## 1. Estado do repositório

Corre `git status` e `git remote -v`.

- **Não há repositório git**: corre `git init`, depois segue para o passo 3
  e trata o resto como primeira publicação.
- **Não há remote `origin`**: é a primeira publicação. Vai ao passo 5 depois
  do commit.
- **Há remote `origin`**: publicação normal.

## 2. Verificar o build

Corre `npm run build`. Se falhar, para aqui, mostra o erro e corrige-o antes
de continuar. Nunca publicar um build partido.

## 3. Commit

Mostra ao utilizador a lista de ficheiros alterados (`git status --short`) e
um resumo do que mudou (`git diff --stat`). Se houver ficheiros que não
parecem pertencer ao site (rascunhos, capturas de ecrã, ficheiros
temporários), pergunta antes de os incluir.

Faz commit com uma mensagem curta em português europeu que descreva a
alteração do ponto de vista de quem visita o site (ex.: "Atualiza horário de
domingo"). Se não houver nada para commit mas houver commits por enviar,
passa ao push.

## 4. Push

Com `origin` configurado: `git push`. Se o push pedir autenticação, para e
pede ao utilizador que faça login pelo browser. Não tentes contornar.

## 5. Primeira publicação

Pergunta se já existe um repositório no GitHub para este projeto. Se não
existir, pede ao utilizador que crie um em github.com (pode ser privado)
chamado como a pasta do projeto e cole aqui o URL que aparece em "push an
existing repository". Com o URL:

```
git remote add origin <URL-DO-REPOSITORIO>
git branch -M main
git push -u origin main
```

Depois explica os passos finais, que o utilizador tem de fazer no browser
porque exigem login na Cloudflare:

- dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
- Autorizar o GitHub e escolher o repositório
- Build command: `npm run build`
- Output directory: `dist`
- Save and Deploy

## 6. Fecho

Diz em uma ou duas frases o que foi publicado e lembra que o Cloudflare
demora cerca de um minuto a pôr a nova versão no ar.
