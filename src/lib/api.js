// Comunicação com a IA (OpenRouter).
// A chave vem de VITE_OPENROUTER_API_KEY (arquivo .env.local, que não vai para o GitHub).

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODELO = "openrouter/free";

// Pede uma resposta da IA e devolve um objeto com fala, dica, progresso da missão, opções e vocabulário.
export async function pedirResposta(promptDaCena, historico) {
  const chave = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!chave) {
    throw new Error("Configure VITE_OPENROUTER_API_KEY no arquivo .env.local para usar as séries.");
  }

  const mensagens = [
    {
      role: "system",
      content:
        promptDaCena +
        " IMPORTANT: DO NOT output internal system logs, safety metrics (like 'User Safety: safe'), or metadata.",
    },
    ...historico,
  ];

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${chave}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: MODELO, messages: mensagens }),
  });

  const dados = await res.json();
  if (dados.error) throw new Error(dados.error.message);

  const conteudo = dados.choices?.[0]?.message?.content ?? "";
  if (
    conteudo.includes("User Safety:") ||
    conteudo.includes("Response Safety:") ||
    conteudo.trim() === ""
  ) {
    throw new Error("A IA devolveu uma resposta vazia ou com log interno. Tente enviar a mensagem de novo.");
  }
  return lerResposta(conteudo);
}

// Extrai o valor de uma string JSON pelo nome do campo, mesmo se o JSON estiver quebrado.
function campoTexto(texto, nome) {
  const m = texto.match(new RegExp(`"${nome}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
  if (!m) return null;
  try {
    return JSON.parse(`"${m[1]}"`);
  } catch {
    return m[1];
  }
}

// Lê a resposta da IA. Tenta JSON completo; se estiver quebrado, pega cada campo separadamente.
// Nunca devolve JSON cru para a conversa.
export function lerResposta(conteudo) {
  // Remove cercas de código (```json ... ```) que alguns modelos colocam
  const limpo = conteudo.replace(/```(?:json)?/gi, "").trim();

  const inicio = limpo.indexOf("{");
  const fim = limpo.lastIndexOf("}");
  if (inicio !== -1 && fim > inicio) {
    try {
      const obj = JSON.parse(limpo.slice(inicio, fim + 1));
      return formatar(obj);
    } catch {
      // JSON quebrado: cai na leitura campo a campo
    }
  }

  if (/"fala"\s*:/.test(limpo)) {
    const opcoesBloco = limpo.match(/"opcoes"\s*:\s*\[([\s\S]*?)\]/);
    const opcoes = opcoesBloco
      ? [...opcoesBloco[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]).slice(0, 3)
      : [];
    const progresso = limpo.match(/"missaoProgresso"\s*:\s*(\d+)/);
    return formatar({
      fala: campoTexto(limpo, "fala"),
      dica: campoTexto(limpo, "dica"),
      missaoProgresso: progresso ? Number(progresso[1]) : null,
      missaoConcluida: /"missaoConcluida"\s*:\s*true/.test(limpo),
      opcoes,
      vocabulario: [],
    });
  }

  // Texto puro (formato antigo): fala + "CORRECTION: dica"
  const [fala, dica] = limpo.split("CORRECTION:");
  return formatar({ fala, dica, missaoProgresso: null, missaoConcluida: false, opcoes: [], vocabulario: [] });
}

function formatar(obj) {
  const fala = String(obj.fala ?? "").trim();
  if (!fala) throw new Error("A IA não enviou a fala desta vez. Tente enviar de novo.");
  return {
    fala,
    dica: obj.dica ? String(obj.dica).trim() || null : null,
    missaoProgresso: Number.isFinite(obj.missaoProgresso) ? Math.min(Math.max(obj.missaoProgresso, 0), 3) : null,
    missaoConcluida: obj.missaoConcluida === true,
    opcoes: Array.isArray(obj.opcoes) ? obj.opcoes.map(String).filter(Boolean).slice(0, 3) : [],
    vocabulario: Array.isArray(obj.vocabulario)
      ? obj.vocabulario.filter((v) => v && v.en && v.pt).slice(0, 2)
      : [],
  };
}
