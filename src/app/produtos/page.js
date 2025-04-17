"use client";

import useData from "../../hooks/data";
import Products from "@/components/products";

export default function Produtos() {
  const { products, reloadProducts} = useData({
    loadProducts: true,
  });

  return <Products products={products} reloadProducts={reloadProducts} />;
}
