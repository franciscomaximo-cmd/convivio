const MESES = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

export function analisarCSV(texto) {
  const linhas = [];
  let linha = [];
  let campo = '';
  let dentroAspas = false;

  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];

    if (dentroAspas) {
      if (c === '"') {
        if (texto[i + 1] === '"') {
          campo += '"';
          i++;
        } else {
          dentroAspas = false;
        }
      } else {
        campo += c;
      }
      continue;
    }

    if (c === '"') {
      dentroAspas = true;
    } else if (c === ',') {
      linha.push(campo);
      campo = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && texto[i + 1] === '\n') i++;
      linha.push(campo);
      linhas.push(linha);
      linha = [];
      campo = '';
    } else {
      campo += c;
    }
  }

  if (campo !== '' || linha.length) {
    linha.push(campo);
    linhas.push(linha);
  }

  return linhas.filter((l) => l.some((c) => c.trim() !== ''));
}

export function paraObjetos(linhas) {
  const [cabecalho, ...resto] = linhas;
  const chaves = cabecalho.map((c) => c.trim().toLowerCase());
  return resto.map((linha) => {
    const obj = {};
    chaves.forEach((chave, i) => {
      obj[chave] = (linha[i] ?? '').trim();
    });
    return obj;
  });
}

export function dataDeHoje() {
  const hoje = new Date();
  const dia = String(hoje.getDate()).padStart(2, '0');
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const ano = hoje.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

export function ehDomingo() {
  return new Date().getDay() === 0;
}

export function fraseSopa(sopa) {
  const texto = (sopa || '').trim();
  if (!texto) return '';
  const minusc = texto.toLowerCase();
  return minusc.startsWith('sopa') ? `com ${minusc}` : `com sopa de ${minusc}`;
}

export function porExtenso(dataStr) {
  const partes = dataStr.split('/');
  if (partes.length !== 3) return dataStr;
  const dia = parseInt(partes[0], 10);
  const mes = parseInt(partes[1], 10) - 1;
  if (Number.isNaN(dia) || !MESES[mes]) return dataStr;
  return `${dia} de ${MESES[mes]}`;
}
