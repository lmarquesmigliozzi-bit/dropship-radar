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

  async function addFakeProducts() {
    const fakeProducts = Array.from({ length: 50 }, (_, i) => ({
  name: `Produto Viral ${i + 1}`,
  category: ["Gadgets", "Casa", "Fitness", "Pet", "Beleza"][
    Math.floor(Math.random() * 5)
  ],
  marketplace: ["Shopee", "Amazon", "Mercado Livre"][
    Math.floor(Math.random() * 3)
  ],
  ranking: i + 1,
  sales: Math.floor(Math.random() * 50000),
  price_min: Math.floor(Math.random() * 50) + 10,
  price_max: Math.floor(Math.random() * 300) + 100,
  price_avg: Math.floor(Math.random() * 200) + 50,
  supplier: ["AliExpress", "Temu", "CJ Dropshipping"][
    Math.floor(Math.random() * 3)
  ],
  supplier_link: "https://pt.aliexpress.com",
  trend_score: Math.floor(Math.random() * 100)
}));

    await supabase.from("products").insert(fakeProducts);

    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div
      style={{
        background: "#111",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >
      <h1>Dropship Radar</h1>

      <button
        onClick={addFakeProducts}
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
            background: "#1e1e1e",
            padding: "20px",
            borderRadius: "12px",
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
            Fornecedor:{" "}
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
