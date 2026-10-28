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

// Lê a resposta em JSON. Se a IA não obedecer o formato, usa o texto como fala (sem quebrar a conversa).
export function lerResposta(conteudo) {
  const inicio = conteudo.indexOf("{");
  const fim = conteudo.lastIndexOf("}");
  if (inicio !== -1 && fim > inicio) {
    try {
      const obj = JSON.parse(conteudo.slice(inicio, fim + 1));
      return {
        fala: String(obj.fala ?? "").trim(),
        dica: obj.dica ? String(obj.dica).trim() : null,
        missaoProgresso: Number.isFinite(obj.missaoProgresso) ? Math.min(Math.max(obj.missaoProgresso, 0), 3) : null,
        missaoConcluida: obj.missaoConcluida === true,
        opcoes: Array.isArray(obj.opcoes) ? obj.opcoes.slice(0, 3).map(String) : [],
        vocabulario: Array.isArray(obj.vocabulario)
          ? obj.vocabulario.filter((v) => v && v.en && v.pt).slice(0, 2)
          : [],
      };
    } catch {
      // cai no formato de texto abaixo
    }
  }

  // Formato antigo: fala + "CORRECTION: dica"
  const [fala, dica] = conteudo.split("CORRECTION:");
  return {
    fala: fala.trim(),
    dica: dica ? dica.trim() : null,
    missaoProgresso: null,
    missaoConcluida: false,
    opcoes: [],
    vocabulario: [],
  };
}
