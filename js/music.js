// ==========================================
// === MÓDULO 2: MUSIC LAB ==================
// ==========================================

let musicEstado = { nivel: "genero", genre: null, artista: null };

function initMusicLab() {
    document.getElementById("music-catalog-view").style.display = "block";
    document.getElementById("music-player-view").style.display = "none";
    document.getElementById("music-back-btn").style.display = "none";
    document.getElementById("music-main-title").innerText = "🎵 Music Lab: Escolha um Gênero";
    musicEstado = { nivel: "genero", genre: null, artista: null };

    const grid = document.getElementById("music-grid");
    grid.className = "story-grid";
    grid.innerHTML = "";

    Object.keys(musicLibrary).forEach(genreKey => {
        const genre = musicLibrary[genreKey];
        grid.appendChild(criarCardStory(genre.img, genre.nome, "Explorar Artistas", () => renderArtistas(genreKey)));
    });
}

function renderArtistas(genreKey) {
    musicEstado.nivel = "artista";
    musicEstado.genre = genreKey;
    document.getElementById("music-main-title").innerText = `Artistas de ${musicLibrary[genreKey].nome}`;
    document.getElementById("music-back-btn").style.display = "block";

    const grid = document.getElementById("music-grid");
    grid.className = "story-grid";
    grid.innerHTML = "";

    const artistas = musicLibrary[genreKey].artistas;
    Object.keys(artistas).forEach(artistaName => {
        const artista = artistas[artistaName];
        grid.appendChild(criarCardStory(artista.img, artistaName, "Ver Músicas", () => renderMusicas(genreKey, artistaName)));
    });
}

function renderMusicas(genreKey, artistaName) {
    musicEstado.nivel = "musica";
    musicEstado.artista = artistaName;
    document.getElementById("music-main-title").innerText = `Músicas de ${artistaName}`;

    const grid = document.getElementById("music-grid");
    grid.className = "";
    grid.innerHTML = "";

    const musicas = musicLibrary[genreKey].artistas[artistaName].musicas;
    musicas.forEach((musicaObj, index) => {
        const row = document.createElement("div");
        row.className = "track-row";
        row.innerHTML = `
            <div class="track-info"><div class="track-title">${escapeHtml(musicaObj.titulo)}</div></div>
            <div class="track-play-btn">▶</div>`;
        row.addEventListener("click", () => carregarMusica(genreKey, artistaName, index));
        grid.appendChild(row);
    });
}

function voltarNivelMusica() {
    if (musicEstado.nivel === "artista") initMusicLab();
    else if (musicEstado.nivel === "musica") renderArtistas(musicEstado.genre);
}

function carregarMusica(genreKey, artistaName, indexMusica) {
    const musicaObj = musicLibrary[genreKey].artistas[artistaName].musicas[indexMusica];

    document.getElementById("music-catalog-view").style.display = "none";
    document.getElementById("music-player-view").style.display = "block";
    document.getElementById("track-name").innerText = musicaObj.titulo;
    document.getElementById("track-artist").innerText = artistaName;

    const youtube = document.getElementById("youtube-container");
    youtube.innerHTML = "";
    const iframe = document.createElement("iframe");
    iframe.width = "100%";
    iframe.height = "500";
    iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(musicaObj.yt)}?autoplay=0`;
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    iframe.allowFullscreen = true;
    iframe.style.borderRadius = "8px";
    youtube.appendChild(iframe);

    // Trecho com lacunas: cada {palavra} vira um campo de preenchimento
    const letraFormatada = musicaObj.letra.replace(/\{([^}]+)\}/g, (match, word) =>
        `<input type="text" class="lyric-blank" data-word="${escapeHtml(word.toLowerCase())}" oninput="checkWord(this)" autocomplete="off">`
    );
    document.getElementById("lyrics-container").innerHTML = letraFormatada;
}

function voltarParaMusicas() {
    document.getElementById("youtube-container").innerHTML = "";
    document.getElementById("music-player-view").style.display = "none";
    document.getElementById("music-catalog-view").style.display = "block";
}

function checkWord(inputElement) {
    const palavraCorreta = inputElement.getAttribute("data-word");
    const palavraDigitada = inputElement.value.trim().toLowerCase();
    if (palavraDigitada === palavraCorreta) inputElement.classList.add("correct");
}

// Card no formato "story" usado em gêneros e artistas
function criarCardStory(imagem, titulo, subtitulo, aoClicar) {
    const card = document.createElement("div");
    card.className = "story-card";
    card.innerHTML = `
        <img src="${escapeHtml(imagem)}" class="scenario-img" alt="${escapeHtml(titulo)}" onerror="this.style.display='none'">
        <div class="scenario-info">
            <div class="scenario-title">${escapeHtml(titulo)}</div>
            <div style="font-size: 14px; color: #e5e5e5; font-weight: 500;">${escapeHtml(subtitulo)}</div>
        </div>
        <div class="play-icon"></div>`;
    card.addEventListener("click", aoClicar);
    return card;
}
