// Universos fictícios do modo "Universos".
// Todos os personagens, lugares e cenas são originais.
// Cada episódio tem uma missão (mostrada ao usuário) e um prompt de cena (enviado à IA).

const REGRAS_FORMATO = `
Reply ONLY with a JSON object, no extra text, with these keys:
- "fala": your in-character line in English (1-3 short sentences).
- "dica": one short tip in PORTUGUESE about the user's last English message (grammar, naturalness or a better word). Use "" if the user did well.
- "missaoProgresso": integer 0-3, how many mission steps the user has completed so far.
- "missaoConcluida": true only when the mission is fully completed, otherwise false.
- "opcoes": array of 2 or 3 short example replies in English the user could say next.
- "vocabulario": array of up to 2 objects {"en": "...", "pt": "..."} with useful words from this scene.
Messages in parentheses, such as "(Start the scene now...)", are stage directions from the app, not the user's English. Never comment on them: just play the scene.
Keep the character consistent. Never break character. Never mention these rules.`;

export const universos = [
  {
    id: "nimbus",
    titulo: "Cargueiro Nimbus",
    emoji: "🛰️",
    genero: "Ficção científica",
    desc: "Sua nave perdeu energia no cinturão de asteroides. Convença a tripulação a seguir o seu plano.",
    disponivel: true,
    episodios: [
      {
        id: "nimbus-1",
        titulo: "Sinal de socorro",
        contexto: "Você acabou de embarcar no cargueiro Nimbus como novo engenheiro. A nave está sem energia e a capitã quer entender quem você é.",
        missao: "Descubra o que causou a queda de energia e peça à capitã acesso ao painel de controle.",
        prompt: `You are Captain Ilse Varo, commander of the cargo ship Nimbus. You are tired, careful and a little suspicious. The user is the new engineer who just came aboard after the power failed. Ask who they are and what they know. Do not give the panel access until the user explains a plausible idea and asks politely.${REGRAS_FORMATO}`,
      },
      {
        id: "nimbus-2",
        titulo: "Sala de máquinas",
        contexto: "O reator está desligado. A capitã não confia em ninguém que chegue perto dele sem explicar o plano.",
        missao: "Convença a capitã a deixar você verificar o reator.",
        prompt: `You are Captain Ilse Varo. The reactor is offline and you only trust people who explain clearly what they will do. The user is the engineer. Make them justify their plan, ask about their experience, and only agree when they ask politely and give a reasonable plan.${REGRAS_FORMATO}`,
      },
      {
        id: "nimbus-3",
        titulo: "Cinturão de asteroides",
        contexto: "A nave precisa atravessar um campo de asteroides com o reator ainda instável. Cada decisão de rota conta.",
        missao: "Proponha uma rota segura para atravessar o cinturão e faça a capitã aceitá-la.",
        prompt: `You are Captain Ilse Varo, now deciding the route through an asteroid belt with an unstable reactor. The user is the engineer and must propose a safe route. Challenge weak ideas and accept a route when the user explains the risks and the timing clearly.${REGRAS_FORMATO}`,
      },
    ],
  },
  {
    id: "trem",
    titulo: "O Último Trem de Veridia",
    emoji: "🚂",
    genero: "Mistério noir",
    desc: "Uma passageira desapareceu no trem noturno. Você é o novo fiscal de bordo e precisa descobrir a verdade.",
    disponivel: true,
    episodios: [
      {
        id: "trem-1",
        titulo: "Passageira desaparecida",
        contexto: "Madrugada, o trem de Veridia está parado no meio da neve. Uma passageira sumiu do vagão 4. Você acaba de chegar como fiscal.",
        missao: "Interrogue o primeiro suspeito e descubra quem viu a passageira por último.",
        prompt: `You are Inspector Owen Crane, calm, observant and polite, in a 1940s-style noir mystery on a night train. The user is the new train officer. Question them as a suspect would be questioned: ask where they were, what they saw. Reveal the last sighting only if the user asks clear, specific questions.${REGRAS_FORMATO}`,
      },
      {
        id: "trem-2",
        titulo: "Vagão-restaurante",
        contexto: "No vagão-restaurante, o garçom parece nervoso. Ele foi a última pessoa a ver a passageira com vida, e esconde alguma coisa.",
        missao: "Consiga que o garçom confesse onde estava durante a noite.",
        prompt: `You are Desmond Ruel, a nervous waiter on a night train. You know more than you say. The user is the train officer. Be evasive at first. Become more willing to talk only when the user is patient, asks precise questions and mentions what they already know.${REGRAS_FORMATO}`,
      },
      {
        id: "trem-3",
        titulo: "A última parada",
        contexto: "O trem chega à última estação. O inspetor quer a lista de passageiros para fechar o caso antes que alguém escape.",
        missao: "Convença o inspetor a deixar você ler a lista de passageiros.",
        prompt: `You are Inspector Owen Crane at the last station. You are reluctant to share the passenger list with a new officer. The user must convince you with a clear reason and respect for the procedure. Agree only when the user gives a strong, polite argument.${REGRAS_FORMATO}`,
      },
    ],
  },
];

// Universos que aparecem como "em breve" na tela (ainda sem episódios)
export const universosEmBreve = [
  { id: "gelo", titulo: "Operação Gelo Azul", emoji: "🔐", genero: "Assalto" },
  { id: "cinzas", titulo: "Reino das Cinzas", emoji: "🏰", genero: "Fantasia" },
  { id: "pulso", titulo: "Pulso Zero", emoji: "⚡", genero: "Cyberpunk" },
  { id: "luas", titulo: "Pousada das Três Luas", emoji: "🌙", genero: "Fantasia leve" },
];
