// Progresso do usuário, guardado no navegador (localStorage).
// Todas as leituras e escritas são protegidas: se o navegador bloquear o storage, o app continua funcionando.

const CHAVE = "englishflix:v2";

const progressoInicial = {
  xp: 0,
  streak: 0,
  ultimoDia: null,
  series: {}, // { [chave]: { mensagens: number, concluido: boolean } }
};

export function carregarProgresso() {
  try {
    const salvo = localStorage.getItem(CHAVE);
    return salvo ? { ...progressoInicial, ...JSON.parse(salvo) } : { ...progressoInicial };
  } catch {
    return { ...progressoInicial };
  }
}

export function salvarProgresso(progresso) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(progresso));
  } catch {
    // Storage indisponível (modo privado, por exemplo): ignora
  }
}

// Dia de hoje e de ontem no formato AAAA-MM-DD (fuso local do usuário)
function diaLocal(data) {
  const y = data.getFullYear();
  const m = String(data.getMonth() + 1).padStart(2, "0");
  const d = String(data.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Chamada a cada atividade: mantém a sequência de dias seguidos.
export function registrarAtividade(progresso) {
  const hoje = diaLocal(new Date());
  if (progresso.ultimoDia === hoje) return progresso;

  const ontem = diaLocal(new Date(Date.now() - 86400000));
  return {
    ...progresso,
    streak: progresso.ultimoDia === ontem ? progresso.streak + 1 : 1,
    ultimoDia: hoje,
  };
}
