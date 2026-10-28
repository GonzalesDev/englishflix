import { useState } from "react";
import { universos, universosEmBreve } from "../data/universos.js";
import { episodiosDia, episodiosUniverso, estaLiberado, MENSAGENS_DIA } from "../lib/episodios.js";

// Tela da aba Séries: seletor de modo (Dia a Dia / Universos), grades e lista de episódios
export default function SeriesGrid({ modo, onModo, progresso, onAbrir }) {
  const [universoAberto, setUniversoAberto] = useState(null);

  return (
    <section className="pagina">
      <div className="cabecalho-linha">
        <div>
          <h1>Séries</h1>
          <p className="subtitulo">
            {modo === "dia"
              ? "Situações do dia a dia em países de língua inglesa."
              : "Histórias fora do comum. Você entra na cena como personagem e cumpre uma missão falando inglês."}
          </p>
        </div>
      </div>

      <div className="seletor-modo" role="tablist">
        <button
          role="tab"
          aria-selected={modo === "dia"}
          className={`modo ${modo === "dia" ? "ativo" : ""}`}
          onClick={() => { onModo("dia"); setUniversoAberto(null); }}
        >
          🏙️ Dia a Dia <small>realista</small>
        </button>
        <button
          role="tab"
          aria-selected={modo === "universos"}
          className={`modo universos ${modo === "universos" ? "ativo" : ""}`}
          onClick={() => onModo("universos")}
        >
          🌌 Universos <small>fictício</small>
        </button>
      </div>

      {modo === "dia" && (
        <div className="grade-series">
          {episodiosDia().map((ep) => {
            const serie = progresso.series[ep.id];
            const percentual = serie ? Math.min(serie.mensagens / MENSAGENS_DIA, 1) : 0;
            return (
              <button key={ep.id} className="card-serie" onClick={() => onAbrir(ep)}>
                <img src={ep.img} alt="" loading="lazy" onError={(e) => (e.currentTarget.style.display = "none")} />
                <div className="card-serie-info">
                  <span className="card-serie-titulo">{ep.titulo}</span>
                  <div className="barra-progresso fina"><div style={{ width: `${percentual * 100}%` }} /></div>
                  {serie?.concluido && <span className="selo">Concluído</span>}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {modo === "universos" && universoAberto === null && (
        <>
          <div className="grade-universos">
            {universos.map((u) => {
              const concluidos = u.episodios.filter((ep) => progresso.series[ep.id]?.concluido).length;
              return (
                <button key={u.id} className="card-universo" onClick={() => setUniversoAberto(u.id)}>
                  <div className="card-universo-emoji">{u.emoji}</div>
                  <span className="tag azul">{u.genero}</span>
                  <h3>{u.titulo}</h3>
                  <p>{u.desc}</p>
                  <div className="barra-progresso fina">
                    <div style={{ width: `${(concluidos / u.episodios.length) * 100}%` }} />
                  </div>
                  <span className="rodape-card">Temporada 1 · {concluidos}/{u.episodios.length} episódios</span>
                </button>
              );
            })}
          </div>

          <h2 className="subtitulo-secao">Em breve</h2>
          <div className="grade-universos">
            {universosEmBreve.map((u) => (
              <div key={u.id} className="card-universo bloqueado">
                <div className="card-universo-emoji">{u.emoji}</div>
                <span className="tag">{u.genero}</span>
                <h3>{u.titulo}</h3>
                <span className="rodape-card">🔒 Em breve</span>
              </div>
            ))}
          </div>
        </>
      )}

      {modo === "universos" && universoAberto !== null && (() => {
        const u = universos.find((x) => x.id === universoAberto);
        const lista = episodiosUniverso(u);
        return (
          <div className="temporada">
            <button className="botao-voltar" onClick={() => setUniversoAberto(null)}>← Universos</button>
            <div className="temporada-topo">
              <div className="card-universo-emoji grande">{u.emoji}</div>
              <div>
                <span className="tag azul">{u.genero}</span>
                <h2>{u.titulo}</h2>
                <p className="subtitulo">{u.desc}</p>
              </div>
            </div>

            <ol className="lista-episodios">
              {lista.map((ep, i) => {
                const serie = progresso.series[ep.id];
                const liberado = estaLiberado(lista, i, progresso);
                return (
                  <li key={ep.id}>
                    <button
                      className={`episodio-item ${liberado ? "" : "bloqueado"}`}
                      disabled={!liberado}
                      onClick={() => onAbrir(ep)}
                    >
                      <span className="numero">{i + 1}</span>
                      <span className="episodio-texto">
                        <strong>{ep.titulo}</strong>
                        <small>{ep.missao}</small>
                      </span>
                      <span className="episodio-estado">
                        {!liberado && "🔒"}
                        {liberado && serie?.concluido && (
                          <span className="estrelas">{"★".repeat(serie.estrelas)}{"☆".repeat(3 - serie.estrelas)}</span>
                        )}
                        {liberado && !serie?.concluido && (serie ? "Em andamento" : "Começar")}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })()}
    </section>
  );
}
