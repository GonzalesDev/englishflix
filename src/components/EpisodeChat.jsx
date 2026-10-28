import { useEffect, useRef, useState } from "react";
import { pedirResposta } from "../lib/api.js";
import { MENSAGENS_DIA, XP_POR_EPISODIO, XP_POR_MENSAGEM, calcularEstrelas } from "../lib/episodios.js";

// Tela de um episódio: conversa com a IA, missão, legendas, opções rápidas e resumo
export default function EpisodeChat({ episodio, progresso, onAtualizar, onVoltar }) {
  const serieSalva = progresso.series[episodio.id] ?? { mensagens: 0, concluido: false, dicas: 0, estrelas: 0, missao: 0 };

  const [iniciado, setIniciado] = useState(false);
  const [mensagens, setMensagens] = useState([]); // { papel: "ai" | "user" | "sistema", texto, dica }
  const [historico, setHistorico] = useState([]); // formato da API
  const [opcoes, setOpcoes] = useState([]);
  const [vocabulario, setVocabulario] = useState([]);
  const [missao, setMissao] = useState(serieSalva.missao ?? 0);
  const [concluido, setConcluido] = useState(serieSalva.concluido);
  const [digitando, setDigitando] = useState("");
  const [aguardando, setAguardando] = useState(false);
  const fimRef = useRef(null);

  useEffect(() => {
    fimRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mensagens, aguardando]);

  async function responder(novoHistorico, contagemMensagens, dicasAtuais) {
    setAguardando(true);
    setOpcoes([]);
    try {
      const r = await pedirResposta(episodio.prompt, novoHistorico);

      const dicas = dicasAtuais + (r.dica ? 1 : 0);
      if (r.dica) setMensagens((atual) => [...atual, { papel: "sistema-dica", texto: r.dica }]);

      setMensagens((atual) => [...atual, { papel: "ai", texto: r.fala }]);
      setHistorico([...novoHistorico, { role: "assistant", content: r.fala }]);
      setOpcoes(r.opcoes);
      if (r.vocabulario.length) setVocabulario((atual) => [...atual, ...r.vocabulario].slice(-10));

      // Progresso da missão: universos usam o que a IA informa; o modo Dia a Dia usa o número de mensagens
      const novaMissao = episodio.modo === "universo"
        ? (r.missaoProgresso ?? missao)
        : Math.min(Math.floor((contagemMensagens / MENSAGENS_DIA) * 3), 3);
      setMissao(novaMissao);

      const terminou = episodio.modo === "universo"
        ? r.missaoConcluida || novaMissao >= 3
        : contagemMensagens >= MENSAGENS_DIA;

      const primeiraVez = terminou && !concluido;
      if (terminou) setConcluido(true);

      onAtualizar(
        XP_POR_MENSAGEM + (primeiraVez ? XP_POR_EPISODIO : 0),
        {
          mensagens: contagemMensagens,
          concluido: concluido || terminou,
          dicas,
          estrelas: terminou ? calcularEstrelas(dicas) : 0,
          missao: novaMissao,
        }
      );

      if (primeiraVez) {
        setMensagens((atual) => [
          ...atual,
          { papel: "sistema", texto: `🏆 Missão cumprida! +${XP_POR_EPISODIO} XP de bônus.` },
        ]);
      }
    } catch (erro) {
      setMensagens((atual) => [...atual, { papel: "sistema", texto: `Erro: ${erro.message}` }]);
      setHistorico(novoHistorico.slice(0, -1));
    } finally {
      setAguardando(false);
    }
  }

  function comecarEpisodio() {
    setIniciado(true);
    setMensagens([]);
    responder([{ role: "user", content: "Hello! Let's start the scene." }], 0, 0);
  }

  function enviarTexto(texto) {
    const limpo = texto.trim();
    if (!limpo || aguardando || concluido) return;

    setDigitando("");
    setMensagens((atual) => [...atual, { papel: "user", texto: limpo }]);
    const novoHistorico = [...historico, { role: "user", content: limpo }];
    setHistorico(novoHistorico);
    responder(novoHistorico, serieSalva.mensagens + 1, serieSalva.dicas);
  }

  function enviar(evento) {
    evento.preventDefault();
    enviarTexto(digitando);
  }

  const dicas = mensagens.filter((m) => m.papel === "sistema-dica");
  const progressoMissao = Math.min(missao / 3, 1);
  const estrelas = concluido ? (serieSalva.estrelas || calcularEstrelas(serieSalva.dicas)) : 0;

  return (
    <section className="episodio">
      <header className="episodio-topo">
        <button className="botao-voltar" onClick={onVoltar}>← Voltar</button>
        <div className={`missao-box ${episodio.modo === "universo" ? "universo" : ""}`}>
          <small>{episodio.titulo}</small>
          <p>{episodio.missao}</p>
          <div className="barra-progresso fina"><div style={{ width: `${progressoMissao * 100}%` }} /></div>
        </div>
        {concluido && <span className="estrelas grande">{"★".repeat(estrelas)}{"☆".repeat(3 - estrelas)}</span>}
      </header>

      {!iniciado ? (
        <div className="intro">
          <p className="intro-contexto">{episodio.contexto}</p>
          <button className="botao-primario" onClick={comecarEpisodio}>▶ Começar</button>
        </div>
      ) : (
        <div className="episodio-corpo">
          <div className="conversa-col">
            <div className="conversa">
              {mensagens.map((m, i) => {
                if (m.papel === "sistema-dica") return null;
                if (m.papel === "sistema") return <div key={i} className="bolha bolha-sistema">{m.texto}</div>;
                if (m.papel === "user") return <div key={i} className="bolha bolha-user">{m.texto}</div>;
                return <div key={i} className="bolha bolha-ai">{m.texto}</div>;
              })}
              {aguardando && <div className="bolha bolha-ai bolha-digitando">…</div>}
              <div ref={fimRef} />
            </div>

            {!concluido && opcoes.length > 0 && (
              <div className="opcoes">
                {opcoes.map((o, i) => (
                  <button key={i} className="opcao" onClick={() => enviarTexto(o)} disabled={aguardando}>{o}</button>
                ))}
              </div>
            )}

            {concluido ? (
              <div className="resumo-episodio">
                <h3>Resumo do episódio</h3>
                {vocabulario.length > 0 ? (
                  <div className="vocab">
                    {vocabulario.map((v, i) => <span key={i}>{v.en} <small>{v.pt}</small></span>)}
                  </div>
                ) : (
                  <p className="vazio">Nenhuma palavra nova registrada nesta cena.</p>
                )}
                <p className="vazio">As palavras entram na aba Cartas.</p>
                <button className="botao-primario" onClick={onVoltar}>Continuar</button>
              </div>
            ) : (
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
          </div>

          <aside className="legendas" aria-label="Legendas">
            <h3>Legendas</h3>
            {dicas.length === 0 ? (
              <p className="vazio">As dicas de correção aparecem aqui conforme você conversa.</p>
            ) : (
              dicas.map((m, i) => (
                <div key={i} className="dica">
                  <strong>💡 Dica</strong>
                  <p>{m.texto}</p>
                </div>
              ))
            )}
          </aside>
        </div>
      )}
    </section>
  );
}
