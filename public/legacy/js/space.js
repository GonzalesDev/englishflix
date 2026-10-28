// ==========================================
// === MÓDULO 4: SPACE WORDS (ARCADE ENGINE) =
// ==========================================

// 1. SINTETIZADOR DE ÁUDIO (sons criados no navegador, sem arquivos MP3)
// O AudioContext só é criado depois do primeiro clique do usuário (regra de autoplay dos navegadores).
let audioCtx = null;

function obterAudioCtx() {
    if (!audioCtx) {
        const Contexto = window.AudioContext || window.webkitAudioContext;
        audioCtx = new Contexto();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
}

function tocarSomArcade(tipo) {
    const ctx = obterAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const agora = ctx.currentTime;

    if (tipo === "laser") {
        osc.type = "square";
        osc.frequency.setValueAtTime(880, agora);
        osc.frequency.exponentialRampToValueAtTime(110, agora + 0.1);
        gain.gain.setValueAtTime(0.1, agora);
        gain.gain.exponentialRampToValueAtTime(0.001, agora + 0.1);
        osc.start(agora); osc.stop(agora + 0.1);
    } else if (tipo === "explosao") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(150, agora);
        osc.frequency.exponentialRampToValueAtTime(10, agora + 0.3);
        gain.gain.setValueAtTime(0.2, agora);
        gain.gain.exponentialRampToValueAtTime(0.001, agora + 0.3);
        osc.start(agora); osc.stop(agora + 0.3);
    } else if (tipo === "dano") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(150, agora);
        osc.frequency.setValueAtTime(100, agora + 0.1);
        gain.gain.setValueAtTime(0.3, agora);
        gain.gain.linearRampToValueAtTime(0.001, agora + 0.2);
        osc.start(agora); osc.stop(agora + 0.2);
    }
}

// 2. ESTADO DO JOGO
const SPACE_VIDAS_INICIAIS = 3;
const SPACE_MAX_METEOROS = 3;

let jogoAtivo = false;
let vidas = SPACE_VIDAS_INICIAIS;
let pontos = 0;
let meteorosAtivos = [];
let palavrasDoJogo = [];
let velocidadeQueda = 1;
let tempoSpawn = 2000;

// Timers guardados para poderem ser cancelados (evita intervalos acumulando entre partidas)
let timerFisica = null;
let timerSpawn = null;
let timerDificuldade = null;

function prepararSeletorSpace() {
    const select = document.getElementById("deck-select");
    if (select.options.length <= 1) {
        select.innerHTML = "";
        Object.keys(baralhosFixos).forEach(key => {
            const opcao = document.createElement("option");
            opcao.value = key;
            opcao.textContent = baralhosFixos[key].nome;
            select.appendChild(opcao);
        });
    }
}

function pararTimers() {
    clearInterval(timerFisica);
    clearTimeout(timerSpawn);
    clearInterval(timerDificuldade);
    timerFisica = timerSpawn = timerDificuldade = null;
}

function prepararJogo() {
    obterAudioCtx();

    const deckKey = document.getElementById("deck-select").value;
    if (!deckKey) return alert("Por favor, escolha um baralho para começar!");

    // Só usa cartões curtos (até 3 palavras), para caberem nos meteoros
    palavrasDoJogo = baralhosFixos[deckKey].cartoes
        .filter(c => c.front.split(" ").length <= 3 && c.back.split(" ").length <= 3)
        .map(c => ({ ...c, respostas: variantesResposta(c.front) }));

    if (palavrasDoJogo.length === 0) return alert("Baralho sem palavras curtas. Escolha outro.");

    pararTimers();
    vidas = SPACE_VIDAS_INICIAIS;
    pontos = 0;
    velocidadeQueda = 2;
    tempoSpawn = 2500;
    meteorosAtivos.forEach(m => m.elemento.remove());
    meteorosAtivos = [];
    atualizarHUD();

    document.getElementById("start-screen").style.display = "none";
    const input = document.getElementById("typing-input");
    input.disabled = false;
    input.value = "";
    input.placeholder = "Digite a tradução...";
    input.focus();

    jogoAtivo = true;
    iniciarGameLoop();
}

function iniciarGameLoop() {
    timerFisica = setInterval(atualizarFisica, 50);
    agendarProximoMeteoro();

    timerDificuldade = setInterval(() => {
        if (!jogoAtivo) return;
        velocidadeQueda += 0.5;
        if (tempoSpawn > 800) tempoSpawn -= 200;
    }, 15000);
}

function agendarProximoMeteoro() {
    if (!jogoAtivo) return;
    criarMeteoro();
    timerSpawn = setTimeout(agendarProximoMeteoro, Math.random() * 1000 + tempoSpawn);
}

function criarMeteoro() {
    if (meteorosAtivos.length >= SPACE_MAX_METEOROS) return;

    const cartao = palavrasDoJogo[Math.floor(Math.random() * palavrasDoJogo.length)];

    const div = document.createElement("div");
    div.className = "meteor";
    div.innerHTML = `<div class="meteor-img"></div><span></span>`;
    div.querySelector("span").textContent = cartao.back;

    const arena = document.getElementById("game-arena");
    const leftPos = Math.max(20, Math.min(arena.offsetWidth - 100, Math.random() * arena.offsetWidth));
    div.style.left = leftPos + "px";
    div.style.top = "-80px";
    arena.appendChild(div);

    meteorosAtivos.push({ elemento: div, respostas: cartao.respostas, y: -80 });
}

// 3. FÍSICA E DANO
function atualizarFisica() {
    if (!jogoAtivo) return;
    const arena = document.getElementById("game-arena");
    const arenaHeight = arena.offsetHeight;

    for (let i = meteorosAtivos.length - 1; i >= 0; i--) {
        const m = meteorosAtivos[i];
        m.y += velocidadeQueda;
        m.elemento.style.top = m.y + "px";

        if (m.y > arenaHeight - 90) {
            m.elemento.remove();
            meteorosAtivos.splice(i, 1);
            perderVida();
        }
    }
}

function perderVida() {
    vidas--;
    atualizarHUD();
    tocarSomArcade("dano");

    const arena = document.getElementById("game-arena");
    arena.classList.add("shake-screen");
    setTimeout(() => arena.classList.remove("shake-screen"), 400);

    if (vidas <= 0) gameOver();
}

function atualizarHUD() {
    document.getElementById("score-display").innerText = "Pontos: " + pontos;
    document.getElementById("lives-display").innerText = "❤️".repeat(vidas) + "🖤".repeat(SPACE_VIDAS_INICIAIS - vidas);
}

function gameOver() {
    jogoAtivo = false;
    pararTimers();

    const input = document.getElementById("typing-input");
    input.disabled = true;
    input.placeholder = "Game Over!";

    const startScreen = document.getElementById("start-screen");
    startScreen.style.display = "flex";
    startScreen.innerHTML = `
        <h2 style="color: var(--accent); margin-bottom: 10px; font-size: 32px;">GAME OVER</h2>
        <p style="color: white; font-size: 20px; margin-bottom: 20px;">Pontuação Final: ${pontos}</p>
        <select id="deck-select" style="padding: 12px; border-radius: 8px; background: var(--card-bg); color: white; border: 1px solid var(--border-color); margin-bottom: 25px; width: 80%; max-width: 300px; font-size: 16px;">
            ${Object.keys(baralhosFixos).map(key => `<option value="${key}">${escapeHtml(baralhosFixos[key].nome)}</option>`).join("")}
        </select>
        <button class="btn-start" onclick="prepararJogo()">▶ Tentar Novamente</button>`;
}

// 4. TIRO E COLISÃO
function iniciarEventosSpace() {
    const input = document.getElementById("typing-input");

    input.addEventListener("keypress", e => {
        if (e.key === "Enter") e.preventDefault();
    });

    input.addEventListener("input", e => {
        if (!jogoAtivo) return;
        const textoDigitado = normalizarResposta(e.target.value);
        const indexAlvo = meteorosAtivos.findIndex(m => m.respostas.includes(textoDigitado));
        if (indexAlvo === -1) return;

        const meteoro = meteorosAtivos[indexAlvo];
        const arena = document.getElementById("game-arena");

        tocarSomArcade("laser");
        setTimeout(() => tocarSomArcade("explosao"), 100);

        const explosao = document.createElement("img");
        explosao.src = "https://i.gifer.com/origin/d7/d7aa42bf80b852db23fcbafb00fdfb55_w200.gif";
        explosao.alt = "";
        explosao.style.position = "absolute";
        explosao.style.left = meteoro.elemento.style.left;
        explosao.style.top = meteoro.elemento.style.top;
        explosao.style.width = "80px";
        explosao.style.zIndex = "15";
        arena.appendChild(explosao);
        setTimeout(() => explosao.remove(), 400);

        const laser = document.createElement("div");
        laser.className = "laser";
        laser.style.height = "100%";
        arena.appendChild(laser);
        setTimeout(() => laser.remove(), 100);

        meteoro.elemento.remove();
        meteorosAtivos.splice(indexAlvo, 1);

        pontos += 10;
        atualizarHUD();
        e.target.value = "";
    });
}
