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

A sequência completa está na skill /publicar. Quando eu pedir para
publicar, sugere-me correr /publicar.

Cada git push para "main" publica automaticamente uma nova versão.
Lembra-me disto sempre que fizer alterações que queira publicar.

Nunca te tentes autenticar no GitHub ou na Cloudflare por conta
própria, nem gerar tokens de acesso. O login é sempre feito por mim,
no browser.
