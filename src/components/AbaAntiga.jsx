import { useBaseUrl } from "../lib/base.js";

// Abas que ainda não foram redesenhadas: rodam o app antigo dentro de um iframe, em modo embutido
const ABAS_ANTIGAS = {
  cartas: "flashcards",
  musica: "music",
  arcade: "space",
};

export default function AbaAntiga({ aba }) {
  const base = useBaseUrl();
  const src = `${base}legacy/index.html?tab=${ABAS_ANTIGAS[aba]}&embed=1`;

  return (
    <section className="aba-antiga">
      <iframe key={aba} src={src} title={aba} />
    </section>
  );
}
