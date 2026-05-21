import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://ahyzapevaprliizmhswh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoeXphcGV2YXBybGlpem1oc3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzMTM4NzUsImV4cCI6MjA5NDg4OTg3NX0.Ejke6GrAqLHDWTwkp6i2QtTv-kyH9BTu1ChZ7VbzUNc"
);

export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://dummyjson.com/products?limit=20"
    );

    const data = await response.json();

    const products = data.products.map(
      (item, index) => ({
        name: item.title,
        category: item.category,
        marketplace: "Global Marketplace",
        ranking: index + 1,
        sales: Math.floor(
          Math.random() * 50000
        ),
        price_avg: item.price,
        supplier: "AliExpress",
        supplier_link:
          "https://pt.aliexpress.com",
        trend_score: Math.floor(
          Math.random() * 100
        ),
        image_url: item.thumbnail
      })
    );

    await supabase
      .from("products")
      .delete()
      .neq("id", 0);

    await supabase
      .from("products")
      .insert(products);

    return res.status(200).json({
      success: true,
      total: products.length
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
