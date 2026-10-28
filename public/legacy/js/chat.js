// ==========================================
// === MÓDULO 1: ROLEPLAY CHAT & CENÁRIOS ===
// ==========================================

let historicoChat = [];
let cenarioAtual = "";

function renderCatalog() {
    const grid = document.getElementById("catalog-grid");
    grid.innerHTML = "";
    Object.keys(cenarios).forEach(key => {
        const cenario = cenarios[key];
        const card = document.createElement("div");
        card.className = "scenario-card";
        card.innerHTML = `
            <img src="${escapeHtml(cenario.img)}" class="scenario-img" alt="${escapeHtml(cenario.titulo)}" onerror="this.style.display='none'">
            <div class="scenario-info"><div class="scenario-title">${escapeHtml(cenario.titulo)}</div></div>
            <div class="play-icon"></div>`;
        card.addEventListener("click", () => iniciarCenario(key));
        grid.appendChild(card);
    });
}

function iniciarCenario(key) {
    cenarioAtual = key;
    historicoChat = [];
    document.getElementById("chat-title").innerText = cenarios[key].titulo;
    document.getElementById("input-wrapper").style.display = "none";

    const container = document.getElementById("chat-container");
    container.innerHTML = "";
    const intro = document.createElement("div");
    intro.className = "intro-card";
    intro.innerHTML = `<h3>${escapeHtml(cenarios[key].titulo)}</h3><p>${escapeHtml(cenarios[key].contexto)}</p>`;
    const botao = document.createElement("button");
    botao.className = "btn-start";
    botao.innerText = "▶ Iniciar Simulação";
    botao.addEventListener("click", comecarConversa);
    intro.appendChild(botao);
    container.appendChild(intro);

    document.getElementById("corrections-list").innerHTML =
        `<p style="color: var(--text-muted); font-size: 13px; text-align: center; margin-top: 20px;">Seus erros e correções aparecerão aqui durante a conversa.</p>`;
    switchTab("chat");
}

function comecarConversa() {
    document.getElementById("chat-container").innerHTML = "";
    document.getElementById("input-wrapper").style.display = "flex";
    chamarAPI("Hello! Let's start the simulation.");
}

function handleKeyPress(event) {
    if (event.key === "Enter") enviarMensagem();
}

async function enviarMensagem() {
    const inputField = document.getElementById("user-input");
    const texto = inputField.value.trim();
    if (!texto) return;

    adicionarMensagemNaTela("user", texto);
    historicoChat.push({ role: "user", content: texto });
    inputField.value = "";

    const ok = await chamarAPI();
    // Se a chamada falhou, remove a mensagem do histórico para não ficar dois turnos "user" seguidos
    if (!ok) historicoChat.pop();
}

// Retorna true se recebeu resposta, false em caso de erro
async function chamarAPI(msgOculta = null) {
    const botaoEnviar = document.getElementById("send-btn");
    botaoEnviar.disabled = true;
    botaoEnviar.innerText = "...";

    const msgs = [{
        role: "system",
        content: cenarios[cenarioAtual].prompt + " IMPORTANT: DO NOT output any internal system logs, safety metrics (like 'User Safety: safe'), or metadata. Output ONLY the dialogue in English and the CORRECTION in Portuguese."
    }].concat(historicoChat);
    if (msgOculta) msgs.push({ role: "user", content: msgOculta });

    try {
        if (!API_KEY) throw new Error("Configure a API_KEY em js/config.js.");

        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({ model: MODELO, messages: msgs })
        });
        const dados = await res.json();
        if (dados.error) throw new Error(dados.error.message);

        const resp = dados.choices[0].message.content;
        if (resp.includes("User Safety:") || resp.includes("Response Safety:") || resp.trim() === "") {
            throw new Error("O servidor da IA falhou e enviou um log de segurança. Por favor, clique em 'Send' para tentar novamente.");
        }

        if (msgOculta) historicoChat.push({ role: "user", content: msgOculta });
        historicoChat.push({ role: "assistant", content: resp });
        adicionarMensagemNaTela("ai", resp);
        return true;
    } catch (e) {
        adicionarMensagemNaTela("system", "❌ Erro: " + e.message);
        return false;
    } finally {
        botaoEnviar.disabled = false;
        botaoEnviar.innerText = "Send";
    }
}

// Usa textContent (nunca innerHTML) para o texto do usuário e da IA: nada é interpretado como HTML.
function adicionarMensagemNaTela(remetente, texto) {
    const chatContainer = document.getElementById("chat-container");
    const div = document.createElement("div");
    div.className = `message ${remetente}`;

    if (remetente === "ai" && texto.includes("CORRECTION:")) {
        const partes = texto.split("CORRECTION:");
        div.textContent = partes[0].trim();

        const correctionsList = document.getElementById("corrections-list");
        if (correctionsList.innerHTML.includes("aparecerão aqui")) correctionsList.innerHTML = "";

        const corrCard = document.createElement("div");
        corrCard.className = "correction-card";
        const titulo = document.createElement("strong");
        titulo.textContent = "💡 Dica do Tutor";
        const corpo = document.createElement("p");
        corpo.textContent = partes[1].trim();
        corrCard.append(titulo, corpo);
        correctionsList.prepend(corrCard);
    } else {
        div.textContent = texto;
    }

    chatContainer.appendChild(div);
    const wrapper = document.getElementById("chat-wrapper");
    wrapper.scrollTo({ top: wrapper.scrollHeight, behavior: "smooth" });
}
