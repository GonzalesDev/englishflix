import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import SeriesGrid from "./components/SeriesGrid.jsx";
import EpisodeChat from "./components/EpisodeChat.jsx";
import AbaAntiga from "./components/AbaAntiga.jsx";
import { carregarProgresso, salvarProgresso, registrarAtividade } from "./lib/storage.js";

export default function App() {
  const [aba, setAba] = useState("series");
  const [modo, setModo] = useState("dia"); // "dia" | "universos"
  const [episodio, setEpisodio] = useState(null); // objeto do episódio aberto, ou null (lista)
  const [progresso, setProgresso] = useState(carregarProgresso);

  // Salva a cada mudança de progresso
  useEffect(() => {
    salvarProgresso(progresso);
  }, [progresso]);

  // Atualiza XP e o progresso do episódio atual; também conta a sequência de dias
  function atualizarEpisodio(xpGanho, serieNova) {
    if (!episodio) return;
    setProgresso((atual) => {
      const comAtividade = registrarAtividade(atual);
      return {
        ...comAtividade,
        xp: comAtividade.xp + xpGanho,
        series: { ...comAtividade.series, [episodio.id]: serieNova },
      };
    });
  }

  function mudarAba(novaAba) {
    setAba(novaAba);
    setEpisodio(null);
  }

  return (
    <div className="app">
      <Sidebar abaAtiva={aba} onMudar={mudarAba} progresso={progresso} />

      <main className="conteudo">
        {aba === "series" && episodio === null && (
          <SeriesGrid modo={modo} onModo={setModo} progresso={progresso} onAbrir={setEpisodio} />
        )}

        {aba === "series" && episodio !== null && (
          <EpisodeChat
            key={episodio.id}
            episodio={episodio}
            progresso={progresso}
            onAtualizar={atualizarEpisodio}
            onVoltar={() => setEpisodio(null)}
          />
        )}

        {aba !== "series" && <AbaAntiga aba={aba} />}
      </main>
    </div>
  );
}
