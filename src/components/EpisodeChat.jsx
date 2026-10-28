import { useEffect, useRef, useState } from "react";
import cenarios from "../data/cenarios.js";
import { pedirResposta, separarDica } from "../lib/api.js";

// Quantas mensagens do usuário fecham um episódio
const MENSAGENS_POR_EPISODIO = 8;
const XP_POR_MENSAGEM = 10;
const XP_POR_EPISODIO = 50;

export default function EpisodeChat({ cenarioKey, progresso, onAtualizar, onVoltar }) {
  const cenario = cenarios[cenarioKey];
  const serie = progresso.series[cenarioKey] ?? { mensagens: 0, concluido: false };

  const [iniciado, setIniciado] = useState(false);
  const [mensagens, setMensagens] = useState([]); // { papel: "ai" | "user" | "sistema", texto, dica }
  const [historico, setHistorico] = useState([]); // formato da API
  const [digitando, setDigitando] = useState("");
  const [aguardando, setAguardando] = useState(false);
  const fimRef = useRef(null);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mensagens, aguardando]);

  async function responder(novoHistorico) {
    setAguardando(true);
    try {
      const texto = await pedirResposta(cenario.prompt, novoHistorico);
      const { fala, dica } = separarDica(texto);
      setMensagens((atual) => [...atual, { papel: "ai", texto: fala, dica }]);
      setHistorico([...novoHistorico, { role: "assistant", content: texto }]);
    } catch (erro) {
      setMensagens((atual) => [...atual, { papel: "sistema", texto: `Erro: ${erro.message}` }]);
      // Mantém o histórico sem a última fala do usuário, para o próximo envio não duplicar turnos
      setHistorico(novoHistorico.slice(0, -1));
    } finally {
      setAguardando(false);
    }
  }

  function comecarEpisodio() {
    setIniciado(true);
    responder([{ role: "user", content: "Hello! Let's start the simulation." }]);
  }

  function enviar(evento) {
    evento.preventDefault();
    const texto = digitando.trim();
    if (!texto || aguardando) return;

    setDigitando("");
    setMensagens((atual) => [...atual, { papel: "user", texto }]);
    const novoHistorico = [...historico, { role: "user", content: texto }];
    setHistorico(novoHistorico);

    // Progresso: XP por mensagem; ao chegar no limite, o episódio conclui e dá bônus
    const contagem = serie.mensagens + 1;
    const concluiuAgora = !serie.concluido && contagem >= MENSAGENS_POR_EPISODIO;
    onAtualizar(
      XP_POR_MENSAGEM + (concluiuAgora ? XP_POR_EPISODIO : 0),
      { mensagens: contagem, concluido: serie.concluido || concluiuAgora }
    );

    if (concluiuAgora) {
      setMensagens((atual) => [
        ...atual,
        { papel: "sistema", texto: `🏆 Episódio concluído! +${XP_POR_EPISODIO} XP de bônus.` },
      ]);
    }

    responder(novoHistorico);
  }

  const progressoEpisodio = Math.min(serie.mensagens / MENSAGENS_POR_EPISODIO, 1);
  const dicas = mensagens.filter((m) => m.dica);

  return (
    <section className="episodio">
      <header className="episodio-topo">
        <button className="botao-voltar" onClick={onVoltar}>← Séries</button>
        <div className="episodio-titulo">
          <h2>{cenario.titulo}</h2>
          <div className="barra-progresso" aria-label="Progresso do episódio">
            <div style={{ width: `${progressoEpisodio * 100}%` }} />
          </div>
        </div>
        {serie.concluido && <span className="selo">Concluído</span>}
      </header>

      {!iniciado ? (
        <div className="intro">
          <p className="intro-contexto">{cenario.contexto}</p>
          <button className="botao-primario" onClick={comecarEpisodio}>▶ Começar episódio</button>
        </div>
      ) : (
        <div className="episodio-corpo">
          <div className="conversa">
            {mensagens.map((m, i) => (
              <div key={i} className={`bolha bolha-${m.papel}`}>{m.texto}</div>
            ))}
            {aguardando && <div className="bolha bolha-ai bolha-digitando">…</div>}
            <div ref={fimRef} />
          </div>

          <aside className="legendas" aria-label="Dicas de correção">
            <h3>Legendas</h3>
            {dicas.length === 0 ? (
              <p className="vazio">As dicas de correção aparecem aqui conforme você conversa.</p>
            ) : (
              dicas.map((m, i) => (
                <div key={i} className="dica">
                  <strong>💡 Dica</strong>
                  <p>{m.dica}</p>
                </div>
              ))
            )}
          </aside>
        </div>
      )}

      {iniciado && (
        <form className="entrada" onSubmit={enviar}>
          <input
            type="text"
            value={digitando}
            onChange={(e) => setDigitando(e.target.value)}
            placeholder="Responda em inglês..."
            autoComplete="off"
            disabled={aguardando}
          />
          <button type="submit" className="botao-primario" disabled={aguardando || !digitando.trim()}>
            Enviar
          </button>
        </form>
      )}
    </section>
  );
}
