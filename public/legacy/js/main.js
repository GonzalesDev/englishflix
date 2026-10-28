// === INICIALIZAÇÃO ===
// Scripts são carregados no fim do <body>, então os elementos já existem aqui.
iniciarNavegacao();
iniciarEventosSpace();
renderCatalog();

// Modo embutido: o app React abre esta página num iframe e escolhe a aba pela URL
// Ex.: legacy/index.html?tab=flashcards&embed=1
const parametros = new URLSearchParams(window.location.search);
if (parametros.get("embed")) document.body.classList.add("embed");
if (parametros.get("tab")) switchTab(parametros.get("tab"));
