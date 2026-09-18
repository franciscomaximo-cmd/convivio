# Convívio — site em Astro

Site estático de uma página para o Café Convívio (Aveiro). Serve também de
template base: para um cliente novo, troca-se o `site.json`, as fotos e as
quatro cores no `global.css`.

## Arrancar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # gera dist/
```

## Onde mexer

| Quero mudar | Ficheiro |
|---|---|
| Textos, menu, preços, contactos, horário | `src/data/site.json` |
| Cores e tipografia | `src/styles/global.css` (bloco `:root`) |
| Ordem das secções | `src/pages/index.astro` |
| Uma secção em concreto | `src/components/` |
| Fotografias | `public/images/` |

Praticamente tudo o que um cliente pede é uma alteração no `site.json`.
Não é preciso abrir nenhum `.astro`.

## Prato do dia

Está em `site.json`, no objeto `pratoDoDia`. Muda todos os dias, por isso
decide já quem o atualiza:

1. **Tu, manualmente.** Editas o JSON e fazes push. Só funciona se cobrares
   manutenção mensal.
2. **Embeber o Facebook** (recomendado para este cliente). Eles já publicam
   o prato do dia lá todos os dias. Substitui o conteúdo do `Quadro.astro`
   por um *Page Plugin* do Facebook e nunca mais tocas no assunto.
3. **Painel mínimo.** Uma página protegida que escreve num ficheiro JSON.
   Só vale a pena a partir do terceiro ou quarto cliente.

## Prato do dia e almoço via Google Sheets

Em alternativa a editar `pratoDoDia` e `almoco` no `site.json` à mão, o
quadro e a secção de almoço podem ir buscar os dados a folhas do Google
Sheets publicadas como CSV. Enquanto o respetivo `folhaCSV` estiver vazio
no `site.json`, o site usa sempre o conteúdo de reserva desse ficheiro.

Há duas folhas independentes:

| Folha | Campo no `site.json` | Cabeçalhos do CSV |
|---|---|---|
| Prato do dia | `pratoDoDia.folhaCSV` | `data,prato,sopa,preco` |
| Almoço (menu de sempre) | `almoco.folhaCSV` | `data,tipo,nome,meia,inteira` |

### Como o dono do café atualiza a folha do prato do dia

1. Abre a folha do Google Sheets partilhada para este efeito.
2. A primeira linha tem os cabeçalhos: `data,prato,sopa,preco`.
3. Cada linha seguinte é um dia, no formato:

   ```
   17/09/2026,Coxinhas de frango assadas,Creme de legumes,"8,80 €"
   ```

   - A data é sempre `DD/MM/AAAA`.
   - O preço leva aspas à volta porque tem vírgula a separar euros de
     cêntimos (senão o Google Sheets confundia-a com uma vírgula do CSV).
4. Pode preencher vários dias com antecedência (ex.: a semana toda) — o
   site escolhe sozinho a linha com a data de hoje.
5. Se não houver nenhuma linha para o dia de hoje, o site usa a última
   linha preenchida da folha.
6. Não precisa de tocar em código nenhum nem fazer deploy — a folha é lida
   diretamente pelo browser de quem visita o site.

### Como o dono do café atualiza a folha do almoço

1. Abre a folha do Google Sheets do menu de almoço.
2. A primeira linha tem os cabeçalhos: `data,tipo,nome,meia,inteira`.
3. Cada prato do dia é uma linha, no formato:

   ```
   17/09/2026,Peixe,Bacalhau,"10,00 €","19,00 €"
   17/09/2026,Carne,Prego no prato,,"9,50 €"
   ```

   - A data repete-se em todas as linhas desse dia (`DD/MM/AAAA`).
   - `tipo` é sempre um destes quatro: `Sopa`, `Salada`, `Peixe` ou
     `Carne` — é o que agrupa os pratos na página.
   - Quando o prato tem meia dose e dose inteira, preenche as duas
     colunas `meia` e `inteira`.
   - Quando o prato só tem um preço, deixa uma das colunas vazia
     (como no exemplo do Prego no prato acima) — o site mostra só esse
     preço, sem o símbolo `½`.
4. Só entram na página as linhas com a data de hoje. Se não houver
   nenhuma linha para hoje, o site mostra o menu de reserva do
   `site.json` em vez de ficar com a secção vazia.

### Como publicar uma folha em CSV

1. No Google Sheets: **Ficheiro → Partilhar → Publicar no Web**.
2. Em "Link", escolhe a folha correta e o formato **Valores separados
   por vírgulas (.csv)**.
3. Clica em **Publicar** e confirma.
4. Copia o link gerado (algo como
   `https://docs.google.com/spreadsheets/d/e/.../pub?output=csv`).
5. Cola esse link em `src/data/site.json`:
   - link da folha do prato do dia → `pratoDoDia.folhaCSV`
   - link da folha do almoço → `almoco.folhaCSV`

A partir daí, sempre que uma folha for editada e guardada, o site mostra
o conteúdo atualizado automaticamente, sem precisar de novo deploy. Se
uma folha ficar indisponível ou o link estiver mal copiado, o site
continua a mostrar o conteúdo de reserva do `site.json`, sem mostrar
nenhum erro a quem visita.

## Antes de publicar

- [ ] Meter os links reais do Facebook e Instagram no `site.json`
      (neste momento estão com `SUBSTITUIR`)
- [ ] Trocar `public/images/fachada.jpg` por uma foto a sério
- [ ] Acrescentar fotos de comida — é o que converte num restaurante
- [ ] Confirmar a morada e o código postal com o cliente
- [ ] Pôr o domínio final em `astro.config.mjs` e em `site.json`
- [ ] Reclamar / atualizar o perfil de Google Business e ligá-lo ao site

## Deploy (Cloudflare Pages, grátis)

1. Põe o projeto num repositório no GitHub
2. Cloudflare Pages → Create → Connect to Git
3. Build command: `npm run build` · Output directory: `dist`
4. Domínio próprio em Custom domains

Serve o mesmo para Netlify e Vercel. Custo de alojamento: zero.

## SEO local

O `Base.astro` já gera marcação `schema.org/Restaurant` com morada, telefone,
horário e mapa. É o que faz o Google mostrar o cartão do restaurante.
Se mudares o horário no `site.json`, muda também o `horarioSchema` (formato
`"Mo-Sa 09:00-02:00"`).
