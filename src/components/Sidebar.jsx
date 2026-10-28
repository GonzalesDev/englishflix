// Menu principal: vira barra inferior no celular (ver styles.css)
const ITENS = [
  { id: "series", rotulo: "Séries", icone: "🎬" },
  { id: "cartas", rotulo: "Cartas", icone: "🃏" },
  { id: "musica", rotulo: "Música", icone: "🎵" },
  { id: "arcade", rotulo: "Arcade", icone: "🚀" },
];

export default function Sidebar({ abaAtiva, onMudar, progresso }) {
  return (
    <aside className="menu">
      <div className="marca">
        <span>English</span>Flix
      </div>

      <nav className="menu-itens">
        {ITENS.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${abaAtiva === item.id ? "ativo" : ""}`}
            onClick={() => onMudar(item.id)}
          >
            <span className="menu-icone">{item.icone}</span>
            <span>{item.rotulo}</span>
          </button>
        ))}
      </nav>

      <div className="resumo">
        <div className="chip" title="Dias seguidos estudando">🔥 {progresso.streak} dias</div>
        <div className="chip" title="Pontos de experiência">⭐ {progresso.xp} XP</div>
      </div>
    </aside>
  );
}
