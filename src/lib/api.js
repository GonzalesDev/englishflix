// Comunicação com a IA (OpenRouter).
// A chave vem de VITE_OPENROUTER_API_KEY (arquivo .env.local, que não vai para o GitHub).

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODELO = "openrouter/free";

export async function pedirResposta(promptDoCenario, historico) {
  const chave = import.meta.env.VITE_OPENROUTER_API_KEY;
  if (!chave) {
    throw new Error("Configure VITE_OPENROUTER_API_KEY no arquivo .env.local para usar as séries.");
  }

  const mensagens = [
    {
      role: "system",
      content:
        promptDoCenario +
        " IMPORTANT: DO NOT output any internal system logs, safety metrics (like 'User Safety: safe'), or metadata. Output ONLY the dialogue in English and the CORRECTION in Portuguese.",
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
  return conteudo;
}

// Separa a fala do personagem da dica de correção (marcada por "CORRECTION:")
export function separarDica(texto) {
  if (!texto.includes("CORRECTION:")) return { fala: texto.trim(), dica: null };
  const [fala, dica] = texto.split("CORRECTION:");
  return { fala: fala.trim(), dica: dica.trim() || null };
}
