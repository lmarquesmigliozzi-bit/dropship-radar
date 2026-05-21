import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ahyzapevaprliizmhswh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoeXphcGV2YXBybGlpem1oc3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMTM4NzUsImV4cCI6MjA5NDg4OTg3NX0.Ejke6GrAqLHDWTwkp6i2QtTv-kyH9BTu1ChZ7VbzUNc"
);

export default function Home() {
  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  async function loadProducts() {
    const { data, error } =
      await supabase
        .from("products")
        .select("*")
        .order("ranking", {
          ascending: true
        });

    if (!error && data) {
      setProducts(data);
    }
  }

  async function updateProducts() {
    try {
      await fetch(
        "/api/update-products"
      );

      await loadProducts();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts =
    products.filter((product) =>
      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div
      style={{
        backgroundColor: "#0f172a",
        minHeight: "100vh",
        padding: "40px",
        color: "white",
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
        Produtos virais para ecommerce
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px"
        }}
      >
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          style={{
            padding: "12px",
            width: "300px",
            borderRadius: "8px",
            border: "none"
          }}
        />

        <button
          onClick={updateProducts}
          style={{
            backgroundColor: "#00c853",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Atualizar Produtos
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px"
        }}
      >
        {filteredProducts.map(
          (product) => (
            <div
              key={product.id}
              style={{
                backgroundColor:
                  "#1e293b",
                padding: "20px",
                borderRadius: "16px"
              }}
            >
              <img
                src={product.image_url}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit:
                    "contain",
                  backgroundColor:
                    "white",
                  borderRadius: "12px",
                  marginBottom:
                    "15px",
                  padding: "10px"
                }}
              />

              <h2>
                #{product.ranking} -{" "}
                {product.name}
              </h2>

              <p>
                Categoria:{" "}
                {product.category}
              </p>

              <p>
                Marketplace:{" "}
                {
                  product.marketplace
                }
              </p>

              <p>
                Vendas:{" "}
                {product.sales}
              </p>

              <p>
                Preço médio: R${" "}
                {product.price_avg}
              </p>

              <p>
                Trend Score:{" "}
                {
                  product.trend_score
                }
              </p>

              <a
                href={
                  product.supplier_link
                }
                target="_blank"
                style={{
                  display:
                    "inline-block",
                  marginTop: "15px",
                  backgroundColor:
                    "#00c853",
                  color: "white",
                  padding:
                    "10px 15px",
                  borderRadius:
                    "8px",
                  textDecoration:
                    "none"
                }}
              >
                Ver fornecedor
              </a>
            </div>
          )
        )}
      </div>
    </div>
  );
}
