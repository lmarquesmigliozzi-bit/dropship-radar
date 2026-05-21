export default function Home() {
  return (
    <div
      style={{
        fontFamily: "Arial",
        padding: "40px",
        background: "#111",
        minHeight: "100vh",
        color: "white"
      }}
    >
      <h1>Dropship Radar</h1>

      <p>Sistema iniciado com sucesso.</p>

      <button
        style={{
          padding: "12px 20px",
          background: "#00c853",
          border: "none",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Atualizar Produtos
      </button>
    </div>
  );
}
