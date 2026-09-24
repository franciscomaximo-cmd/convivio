const MIN_PALAVRAS_ULTIMA_LINHA = 3;
const MAX_TENTATIVAS = 12;

function partesTexto(texto) {
  return texto.split(/( )/).filter((parte) => parte !== '');
}

function medirUltimaLinha(spans) {
  const tops = spans.map((s) => s.offsetTop);
  const maxTop = Math.max(...tops);
  return {
    linhas: new Set(tops).size,
    contagemUltimaLinha: tops.filter((t) => t === maxTop).length,
    primeiroIndiceUltimaLinha: tops.indexOf(maxTop),
  };
}

function evitarViuvas(el) {
  if (!el || el.childNodes.length !== 1 || el.firstChild.nodeType !== Node.TEXT_NODE) return;

  const original = el.dataset.textoBase ?? el.textContent;
  el.dataset.textoBase = original;

  const partes = partesTexto(original);
  if (partes.length < 5) return;

  el.textContent = '';
  const nos = partes.map((parte) => {
    if (parte === ' ') return document.createTextNode(' ');
    const span = document.createElement('span');
    span.textContent = parte;
    return span;
  });
  nos.forEach((n) => el.appendChild(n));

  const spans = nos.filter((n) => n.nodeType === Node.ELEMENT_NODE);
  if (spans.length < 4) {
    el.textContent = original;
    return;
  }

  for (let tentativas = 0; tentativas < MAX_TENTATIVAS; tentativas++) {
    const { linhas, contagemUltimaLinha, primeiroIndiceUltimaLinha } = medirUltimaLinha(spans);
    if (linhas <= 1 || contagemUltimaLinha >= MIN_PALAVRAS_ULTIMA_LINHA || primeiroIndiceUltimaLinha <= 0) {
      break;
    }

    const spanAnterior = spans[primeiroIndiceUltimaLinha - 1];
    const indiceNoNos = nos.indexOf(spanAnterior);
    const separador = nos[indiceNoNos + 1];
    if (!separador || separador.nodeType !== Node.TEXT_NODE) break;

    separador.textContent = ' ';
  }

  el.textContent = nos.map((n) => n.textContent).join('');
}

export function equilibrarTextos() {
  document.querySelectorAll('.texto-equilibrado').forEach(evitarViuvas);
}

let temporizador;
export function equilibrarTextosComRedimensionamento() {
  equilibrarTextos();

  if (document.fonts?.ready) {
    document.fonts.ready.then(equilibrarTextos).catch(() => {});
  }

  window.addEventListener('resize', () => {
    clearTimeout(temporizador);
    temporizador = setTimeout(equilibrarTextos, 150);
  });
}
