import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const supabase = createClient(
  "https://ahyzapevaprliizmhswh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
);

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");

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
      const response = await fetch(
        "/api/update-products"
      );

      const result = await response.json();

      console.log(result);

      await loadProducts();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch = product.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "Todas" ||
        product.category === category;

      return (
        matchesSearch && matchesCategory
      );
    }
  );

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
        Inteligência de produtos virais para ecommerce e
        dropshipping
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
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

          <p style={{ fontSize: "32px" }}>
            {products.length}
          </p>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "16px"
          }}
        >
          <h3>Marketplace</h3>

          <p style={{ fontSize: "24px" }}>
            Global Marketplace
          </p>
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
                (acc, item) =>
                  acc +
                  (item.trend_score || 0),
                0
              ) /
                (products.length || 1)
            )}
          </p>
        </div>
      </div>

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
            borderRadius: "8px",
            border: "none",
            width: "300px"
          }}
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "none"
          }}
        >
          <option>Todas</option>

          {[...new Set(
            products.map(
              (product) => product.category
            )
          )].map((cat) => (
            <option key={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          onClick={updateProducts}
          style={{
            padding: "12px 20px",
            background: "#00c853",
            border: "none",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
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
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "18px",
              border:
                "1px solid #334155",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.25)"
            }}
          >
            <img
              src={product.image_url}
              alt={product.name}
              style={{
                width: "100%",
                height: "260px",
                objectFit: "contain",
                background: "white",
                borderRadius: "14px",
                marginBottom: "15px",
                padding: "10px"
              }}
            />

            <h2
              style={{
                fontSize: "20px",
                marginBottom: "12px",
                minHeight: "50px"
              }}
            >
              #{product.ranking} -{" "}
              {product.name}
            </h2>

            <p>
              Marketplace:{" "}
              {product.marketplace}
            </p>

            <p>
              Categoria: {product.category}
            </p>

            <p>Vendas: {product.sales}</p>

            <p>
              Preço médio: R${" "}
              {product.price_avg}
            </p>

            <p>
              Lucro estimado: R${" "}
              {Math.floor(
                product.price_avg -
                  product.price_min
              )}
            </p>

            <p>
              Opportunity Score:{" "}
              <strong>
                {Math.floor(
                  (product.sales *
                    product.trend_score) /
                    1000
                )}
              </strong>
            </p>

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
                  textDecoration:
                    "none",
                  display: "inline-block"
                }}
              >
                Ver fornecedor no{" "}
                {product.supplier}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
