import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  "https://ahyzapevaprliizmhswh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoeXphcGV2YXBybGlpem1oc3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMTM4NzUsImV4cCI6MjA5NDg4OTg3NX0.Ejke6GrAqLHDWTwkp6i2QtTv-kyH9BTu1ChZ7VbzUNc"
);

export default function Home() {
  const [products, setProducts] = useState([]);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("ranking", { ascending: true });

    if (!error) {
      setProducts(data);
    }
  }

 async function updateProducts() {
  try {
    await fetch("/api/update-products");

    loadProducts();
  } catch (error) {
    console.log(error);
  }
}
];
await supabase.from("products").delete().neq("id", 0);
await supabase.from("products").insert(realProducts);

    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >
      <h1
  style={{
    fontSize: "42px",
    marginBottom: "10px"
  }}
>
  Dropship Radar AI
</h1>

    <p
  style={{
    color: "#94a3b8",
    marginBottom: "30px"
  }}
>
  Inteligência de produtos virais para ecommerce e dropshipping
</p>

    <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginBottom: "30px"
  }}
>
  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "16px"
    }}
  >
    <h3>Total Produtos</h3>
    <p style={{ fontSize: "32px" }}>{products.length}</p>
  </div>

  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "16px"
    }}
  >
    <h3>Marketplace Top</h3>
    <p style={{ fontSize: "24px" }}>Shopee</p>
  </div>

  <div
    style={{
      background: "#1e293b",
      padding: "20px",
      borderRadius: "16px"
    }}
  >
    <h3>Tendência Média</h3>
    <p style={{ fontSize: "32px" }}>
      {Math.floor(
        products.reduce(
          (acc, item) => acc + item.trend_score,
          0
        ) / (products.length || 1)
      )}
    </p>
  </div>
</div>

      <button
        onClick={updateProducts}
        style={{
          padding: "12px 20px",
          background: "#00c853",
          border: "none",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "30px"
        }}
      >
        Atualizar Produtos
      </button>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #334155",
            marginBottom: "20px"
          }}
        >
          <h2>
            #{product.ranking} - {product.name}
          </h2>

          <p>Marketplace: {product.marketplace}</p>

          <p>Categoria: {product.category}</p>

          <p>Vendas: {product.sales}</p>

          <p>Preço médio: R$ {product.price_avg}</p>
          <p>
  Lucro estimado: R${" "}
  {Math.floor(product.price_avg - product.price_min)}
</p>

<p>
  Opportunity Score:{" "}
  <strong>
    {Math.floor(
      (product.sales * product.trend_score) / 1000
    )}
  </strong>
</p>

          <p>
           <div
  style={{
    marginTop: "15px"
  }}
>
  <a
    href={product.supplier_link}
    target="_blank"
    style={{
      background: "#00c853",
      padding: "10px 16px",
      borderRadius: "8px",
      color: "white",
      textDecoration: "none",
      display: "inline-block"
    }}
  >
    Ver fornecedor no {product.supplier}
  </a>
</div>
            <a
              href={product.supplier_link}
              target="_blank"
              style={{ color: "#00c853" }}
            >
              {product.supplier}
            </a>
          </p>
        </div>
      ))}
    </div>
  );
}
