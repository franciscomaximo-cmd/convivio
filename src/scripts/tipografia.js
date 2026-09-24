const PALAVRAS_CURTAS = new Set([
  'a', 'à', 'ao', 'aos', 'às', 'as', 'o', 'os',
  'de', 'do', 'da', 'dos', 'das',
  'um', 'uma', 'uns', 'umas',
  'e', 'é', 'ou', 'se', 'que',
  'com', 'por', 'para', 'no', 'na', 'nos', 'nas', 'em', 'sem',
]);

export function semOrfas(texto) {
  if (!texto) return texto;
  return texto.replace(/(\S+)( +)(?=\S)/g, (match, palavra, espaco) => {
    const limpa = palavra.toLowerCase().replace(/[.,;:!?"'()]/g, '');
    return PALAVRAS_CURTAS.has(limpa) ? palavra + ' ' : match;
  });
}
