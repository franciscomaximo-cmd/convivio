// PostToolUse: garante que src/data/site.json continua a ser JSON válido.
// Sai com código 2 para que o erro volte ao Claude e seja corrigido logo.
import { readFileSync } from 'node:fs';

const entrada = JSON.parse(readFileSync(0, 'utf8') || '{}');
const ficheiro = entrada.tool_input?.file_path ?? entrada.tool_response?.filePath ?? '';

if (!/[\\/]src[\\/]data[\\/]site\.json$/i.test(ficheiro)) process.exit(0);

try {
  JSON.parse(readFileSync(ficheiro, 'utf8'));
} catch (erro) {
  console.error(`site.json ficou com JSON inválido: ${erro.message}. Corrige antes de continuar.`);
  process.exit(2);
}
