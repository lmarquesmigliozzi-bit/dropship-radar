import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://dummyjson.com/products?limit=20"
    );

    const data = await response.json();

    const products = data.products.map(
      (item, index) => {
        const salePrice = item.price;

        const supplierPrice = Math.floor(
          salePrice * 0.45
        );

        const monthlySales =
          Math.floor(Math.random() * 9000) +
          1000;

        const trend =
          Math.floor(Math.random() * 100);

        return {
          name: item.title,
          category: item.category,
          marketplace: "Global Marketplace",
          ranking: index + 1,
          sales: monthlySales,
          monthly_sales: monthlySales,
          price_min: supplierPrice,
          price_max: Math.floor(
            salePrice * 1.3
          ),
          price_avg: salePrice,
          supplier_price: supplierPrice,
          estimated_profit:
            salePrice - supplierPrice,
          roi: Math.floor(
            ((salePrice - supplierPrice) /
              supplierPrice) *
              100
          ),
          supplier: "AliExpress",
          supplier_link:
            "https://pt.aliexpress.com",
          trend_score: trend,
          opportunity_score:
            Math.floor(
              (monthlySales * trend) /
                1000
            ),
          image_url: item.thumbnail
        };
      }
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
