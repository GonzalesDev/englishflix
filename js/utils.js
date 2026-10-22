// === FUNÇÕES AUXILIARES ===

// Escapa texto antes de inserir em HTML (evita que o texto digitado ou a IA injetem tags).
function escapeHtml(texto) {
    return String(texto)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Normaliza uma resposta para comparação: minúsculas, sem pontuação e espaços extras.
function normalizarResposta(texto) {
    return texto
        .toLowerCase()
        .replace(/[.,!?'"]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

// Gera todas as respostas aceitas para um cartão em inglês.
// Ex.: "Layover / Stopover" -> ["layover", "stopover", "layover / stopover"]
//      "Over-the-counter (OTC)" -> ["over-the-counter (otc)", "over-the-counter", "otc"]
function variantesResposta(frente) {
    const variantes = new Set();
    const completo = normalizarResposta(frente);
    variantes.add(completo);

    // Texto entre parênteses vira alternativa própria (sigla, complemento opcional)
    const semParenteses = normalizarResposta(frente.replace(/\([^)]*\)/g, ""));
    if (semParenteses) variantes.add(semParenteses);
    const dentroParenteses = frente.match(/\(([^)]*)\)/g);
    if (dentroParenteses) {
        dentroParenteses.forEach(p => variantes.add(normalizarResposta(p.slice(1, -1))));
    }

    // Cada alternativa separada por "/" também é aceita
    frente.split("/").forEach(parte => {
        const limpa = normalizarResposta(parte.replace(/\([^)]*\)/g, ""));
        if (limpa) variantes.add(limpa);
    });

    variantes.delete("");
    return [...variantes];
}
