// === NAVEGAÇÃO GLOBAL ===

// Mapa: aba -> { botão do menu, tela }
const ABAS = {
    catalog:    { botao: 0, view: "view-catalog" },
    chat:       { botao: 0, view: "view-chat" },
    flashcards: { botao: 1, view: "view-flashcards" },
    music:      { botao: 2, view: "view-music" },
    space:      { botao: 3, view: "view-space" }
};

function switchTab(tabName) {
    const aba = ABAS[tabName];
    if (!aba) return;

    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelectorAll(".app-view").forEach(view => view.classList.remove("active"));

    document.querySelectorAll(".nav-btn")[aba.botao].classList.add("active");
    document.getElementById(aba.view).classList.add("active");

    if (tabName === "catalog") renderCatalog();
    if (tabName === "flashcards") initFlashcards();
    if (tabName === "music") initMusicLab();
    if (tabName === "space") prepararSeletorSpace();
}

function iniciarNavegacao() {
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", () => switchTab(btn.dataset.tab));
    });
}
