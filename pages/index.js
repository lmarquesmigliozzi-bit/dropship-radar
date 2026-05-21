import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
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
        Inteligência de produtos para
        ecommerce
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap"
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
            "repeat(auto-fit, minmax(320px, 1fr))",
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
                  height: "240px",
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
                Vendas 30d:{" "}
                {
                  product.monthly_sales
                }
              </p>

              <p>
                Preço médio: R${" "}
                {product.price_avg}
              </p>

              <p>
                Custo fornecedor:
                R${" "}
                {
                  product.supplier_price
                }
              </p>

              <p>
                Lucro estimado:
                R${" "}
                {
                  product.estimated_profit
                }
              </p>

              <p>
                ROI: {product.roi}%
              </p>

              <p>
                Trend Score:{" "}
                {
                  product.trend_score
                }
              </p>

              <p>
                Opportunity Score:{" "}
                {
                  product.opportunity_score
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
                Comprar no fornecedor
              </a>
            </div>
          )
        )}
      </div>
    </div>
  );
}
