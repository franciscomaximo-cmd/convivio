# Contexto

Site do Café Convívio, café-bar em Aveiro com mais de 40 anos.
Feito em Astro, alojamento previsto no Cloudflare Pages.

Serve também de template: o objetivo é reutilizá-lo para outros
restaurantes e comércio local, trocando apenas src/data/site.json,
as fotos em public/images/ e os tokens de cor em src/styles/global.css.

## Regras
- Escrever sempre em português europeu, nunca do Brasil.
- Todo o conteúdo vive em src/data/site.json. Nenhum componente
  deve ter texto escrito por dentro.
- Paleta: verde de pano de bilhar, latão, creme. Ver :root em global.css.
- Tipografia: Bricolage Grotesque (títulos), Newsreader (corpo).

## Por fazer
- Links reais do Facebook e Instagram (estão com SUBSTITUIR)
- Fotos reais, sobretudo de comida
- Embed do Facebook para o prato do dia

## Publicar (GitHub + Cloudflare Pages)

Quando pedido para publicar o site, segue esta sequência:

1. Confirma se já existe um repositório git (git status). Se não existir:
   git init
   git add .
   git commit -m "primeira versão"

2. Pergunta-me se já tenho um repositório no GitHub criado para este
   projeto. Se não tiver, pede-me para criar um em github.com (pode
   ser privado) chamado "convivio" e colar aqui o URL que aparece em
   "push an existing repository".

3. Com o URL, corre:
   git remote add origin <URL-DO-REPOSITORIO>
   git branch -M main
   git push -u origin main

4. Explica-me os passos finais, que tenho de fazer manualmente no
   browser porque exigem login na Cloudflare:
   - dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
   - Autorizar o GitHub e escolher o repositório "convivio"
   - Build command: npm run build
   - Output directory: dist
   - Save and Deploy

5. Depois do primeiro deploy, cada git push para "main" publica
   automaticamente uma nova versão. Lembra-me disto sempre que fizer
   alterações que queira publicar.

Nunca te tentes autenticar no GitHub ou na Cloudflare por conta
própria, nem gerar tokens de acesso. O login é sempre feito por mim,
no browser.
