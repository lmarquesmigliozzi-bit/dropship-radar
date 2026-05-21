import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ahyzapevaprliizmhswh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoeXphcGV2YXBybGlpem1oc3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMTM4NzUsImV4cCI6MjA5NDg4OTg3NX0.Ejke6GrAqLHDWTwkp6i2QtTv-kyH9BTu1ChZ7VbzUNc"
);

export default async function handler(req, res) {
  try {
    const products = [
  {
    name: "Fone Bluetooth Gamer",
    category: "Eletrônicos",
    marketplace: "Mercado Livre",
    ranking: 1,
    sales: 54000,
    price_min: 49,
    price_max: 199,
    price_avg: 129,
    supplier: "AliExpress",
    supplier_link: "https://pt.aliexpress.com",
    trend_score: 97,
    image_url:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
  },
  {
    name: "Smartwatch Ultra",
    category: "Wearables",
    marketplace: "Mercado Livre",
    ranking: 2,
    sales: 43000,
    price_min: 80,
    price_max: 299,
    price_avg: 189,
    supplier: "Temu",
    supplier_link: "https://www.temu.com",
    trend_score: 94,
    image_url:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12"
  },
  {
    name: "Massageador Cervical",
    category: "Saúde",
    marketplace: "Mercado Livre",
    ranking: 3,
    sales: 39000,
    price_min: 35,
    price_max: 149,
    price_avg: 99,
    supplier: "CJ Dropshipping",
    supplier_link: "https://cjdropshipping.com",
    trend_score: 92,
    image_url:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15"
  }
];
    await supabase.from("products").delete().neq("id", 0);

    await supabase.from("products").insert(products);

    res.status(200).json({
      success: true,
      message: "Produtos atualizados",
      total: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
