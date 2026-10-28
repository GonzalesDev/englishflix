import cenarios from "../data/cenarios.js";

// Tela inicial da aba Séries: grade de episódios, com o progresso de cada um
export default function SeriesGrid({ progresso, onAbrir }) {
  const chaves = Object.keys(cenarios);

  return (
    <section className="pagina">
      <header className="cabecalho-pagina">
        <h1>Séries</h1>
        <p>Escolha um episódio e viva uma conversa em inglês. Cada mensagem rende XP.</p>
      </header>

      <div className="grade-series">
        {chaves.map((chave) => {
          const cenario = cenarios[chave];
          const serie = progresso.series[chave];
          const percentual = serie ? Math.min(serie.mensagens / 8, 1) : 0;

          return (
            <button key={chave} className="card-serie" onClick={() => onAbrir(chave)}>
              <img
                src={cenario.img}
                alt=""
                loading="lazy"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <div className="card-serie-info">
                <span className="card-serie-titulo">{cenario.titulo}</span>
                <div className="barra-progresso fina">
                  <div style={{ width: `${percentual * 100}%` }} />
                </div>
                {serie?.concluido && <span className="selo">Concluído</span>}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
