import cenarios from "../data/cenarios.js";
import { universos } from "../data/universos.js";

// Quantas mensagens do usuário fecham um episódio do modo Dia a Dia
export const MENSAGENS_DIA = 8;
export const XP_POR_MENSAGEM = 10;
export const XP_POR_EPISODIO = 50;

// Converte os cenários do modo Dia a Dia para o mesmo formato dos episódios de Universos
export function episodiosDia() {
  return Object.keys(cenarios).map((chave) => {
    const c = cenarios[chave];
    return {
      id: `dia-${chave}`,
      modo: "dia",
      titulo: c.titulo,
      img: c.img,
      contexto: c.contexto,
      missao: "Converse com naturalidade até a situação terminar.",
      prompt: c.prompt + ` Reply ONLY with a JSON object with keys "fala" (your in-character English line), "dica" (short tip in PORTUGUESE or ""), "opcoes" (2 example replies in English). Keep the scene realistic.`,
    };
  });
}

// Um universo com seus episódios, já no formato comum
export function episodiosUniverso(universo) {
  return universo.episodios.map((ep) => ({
    ...ep,
    modo: "universo",
    universoId: universo.id,
    titulo: `${ep.titulo}`,
  }));
}

// Episódio liberado quando o anterior foi concluído (o primeiro sempre está liberado)
export function estaLiberado(lista, indice, progresso) {
  if (indice === 0) return true;
  return progresso.series[lista[indice - 1].id]?.concluido === true;
}

export function buscarEpisodio(id) {
  for (const ep of episodiosDia()) if (ep.id === id) return ep;
  for (const u of universos) for (const ep of episodiosUniverso(u)) if (ep.id === id) return ep;
  return null;
}

// Estrelas: menos dicas usadas, mais estrelas (1 a 3)
export function calcularEstrelas(dicas) {
  if (dicas <= 1) return 3;
  if (dicas <= 3) return 2;
  return 1;
}
