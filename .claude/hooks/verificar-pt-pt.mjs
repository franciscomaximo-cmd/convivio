// PostToolUse: procura termos de português do Brasil em site.json e nos .astro.
// É um aviso: sai com código 2 para o Claude rever, mas pode haver falsos positivos.
import { readFileSync } from 'node:fs';

const entrada = JSON.parse(readFileSync(0, 'utf8') || '{}');
const ficheiro = entrada.tool_input?.file_path ?? entrada.tool_response?.filePath ?? '';

if (!/([\\/]src[\\/]data[\\/]site\.json|[\\/]src[\\/].*\.astro)$/i.test(ficheiro)) process.exit(0);

// termo do Brasil → sugestão em português europeu
const termos = {
  'você': 'tu / o senhor, ou reformular',
  'vocês': 'vós / os senhores, ou reformular',
  'celular': 'telemóvel',
  'café da manhã': 'pequeno-almoço',
  'cardápio': 'ementa / carta',
  'garçom': 'empregado de mesa',
  'garçons': 'empregados de mesa',
  'banheiro': 'casa de banho',
  'ônibus': 'autocarro',
  'equipe': 'equipa',
  'geladeira': 'frigorífico',
  'sorvete': 'gelado',
  'suco': 'sumo',
  'xícara': 'chávena',
  'lanchonete': 'snack-bar',
  'chope': 'fino / imperial',
  'chopp': 'fino / imperial',
  'contato': 'contacto',
  'contatos': 'contactos',
  'registro': 'registo',
  'usuário': 'utilizador',
  'arquivo': 'ficheiro',
  'aplicativo': 'aplicação / app',
  'trem': 'comboio',
};

// Acento circunflexo antes de m/n a meio da palavra costuma ser grafia brasileira
// (econômico, gênero, Antônio). No fim da palavra é PT-PT correto (têm, vêm, contêm).
const excecoesCircunflexo = new Set(['cêntimo', 'cêntimos', 'estômago', 'estômagos']);

const texto = readFileSync(ficheiro, 'utf8');
const achados = new Set();

for (const [termo, sugestao] of Object.entries(termos)) {
  const padrao = new RegExp(`(?<!\\p{L})${termo}(?!\\p{L})`, 'giu');
  if (padrao.test(texto)) achados.add(`"${termo}" → ${sugestao}`);
}

for (const [palavra] of texto.matchAll(/\p{L}*[êô][mn]\p{L}+/giu)) {
  if (!excecoesCircunflexo.has(palavra.toLowerCase())) {
    achados.add(`"${palavra}" → acento agudo em PT-PT (ex.: económico, género)`);
  }
}

// Gerúndio com estar/ficar ("estamos fazendo") → "estamos a fazer"
const gerundio = /(?<!\p{L})(estou|está|estás|estamos|estão|estava|estavam|fica|ficamos)\s+\p{L}+(ando|endo|indo)(?!\p{L})/giu;
for (const [expressao] of texto.matchAll(gerundio)) {
  achados.add(`"${expressao}" → estar a + infinitivo`);
}

if (achados.size) {
  console.error(
    `Possível português do Brasil em ${ficheiro}:\n- ${[...achados].join('\n- ')}\n` +
    'Corrige para português europeu, ou ignora se for um falso positivo.'
  );
  process.exit(2);
}
