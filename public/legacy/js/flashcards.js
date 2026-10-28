// ==========================================
// === MÓDULO 3: FLASHCARDS =================
// ==========================================

// Cartões que o usuário errou voltam para a fila alguns cartões depois (revisão espaçada simples)
const INTERVALO_REVISAO = 3;

let baralhoAtualKey = "viagem";
let filaCartoes = [];
let totalCartoes = 0;
let acertos = 0;
let erros = 0;
let flashcardIniciado = false;

function initFlashcards() {
    if (flashcardIniciado) return;
    const listContainer = document.getElementById("decks-list");
    listContainer.innerHTML = "";
    Object.keys(baralhosFixos).forEach(key => {
        const btn = document.createElement("button");
        btn.className = `deck-btn ${key === baralhoAtualKey ? "active" : ""}`;
        btn.id = `deck-btn-${key}`;
        btn.innerText = baralhosFixos[key].nome;
        btn.addEventListener("click", () => carregarBaralho(key));
        listContainer.appendChild(btn);
    });
    carregarBaralho(baralhoAtualKey);
    flashcardIniciado = true;
}

function carregarBaralho(key) {
    baralhoAtualKey = key;
    document.querySelectorAll(".deck-btn").forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.getElementById(`deck-btn-${key}`);
    if (activeBtn) activeBtn.classList.add("active");

    document.getElementById("current-deck-title").innerText = baralhosFixos[key].nome;
    reiniciarRodada();
}

function reiniciarRodada() {
    const cartoes = baralhosFixos[baralhoAtualKey].cartoes;
    filaCartoes = [...cartoes];
    totalCartoes = cartoes.length;
    acertos = 0;
    erros = 0;
    renderizarCartao();
}

function renderizarCartao() {
    document.querySelector(".card-scene").classList.remove("is-flipped");
    document.getElementById("btn-again").style.display = "none";
    document.getElementById("btn-good").style.display = "none";

    if (filaCartoes.length === 0) return;

    const cartao = filaCartoes[0];
    document.getElementById("card-front-text").innerText = cartao.front;
    document.getElementById("card-front-example").innerText = cartao.ex || "";
    document.getElementById("card-back-text").innerText = cartao.back;
    document.getElementById("card-back-explanation").innerText = cartao.ex ? `Exemplo de uso:\n"${cartao.ex}"` : "";
    document.getElementById("card-counter").innerText =
        `${filaCartoes.length} restantes · ✅ ${acertos} · ❌ ${erros}`;
}

function flipCard() {
    if (filaCartoes.length === 0) return;
    const scene = document.querySelector(".card-scene");
    scene.classList.toggle("is-flipped");
    const mostrar = scene.classList.contains("is-flipped") ? "block" : "none";
    document.getElementById("btn-again").style.display = mostrar;
    document.getElementById("btn-good").style.display = mostrar;
}

// acertou = true remove o cartão da fila; false devolve ele para a fila algumas posições depois
function nextCard(acertou) {
    if (filaCartoes.length === 0) return;
    const cartao = filaCartoes.shift();

    if (acertou) {
        acertos++;
    } else {
        erros++;
        filaCartoes.splice(Math.min(INTERVALO_REVISAO, filaCartoes.length), 0, cartao);
    }

    if (filaCartoes.length === 0) {
        alert(`🎉 Rodada concluída! Acertos: ${acertos} · Erros: ${erros}. Vamos começar de novo.`);
        reiniciarRodada();
        return;
    }
    renderizarCartao();
}

function playAudio(event) {
    event.stopPropagation();
    if (filaCartoes.length === 0) return;
    const sotaque = new SpeechSynthesisUtterance(filaCartoes[0].front);
    sotaque.lang = "en-US";
    sotaque.rate = 0.85;
    window.speechSynthesis.speak(sotaque);
}
