"use client";

import useData from "../../hooks/data";
import ProductsTable from "@/components/products-table";

export default function Produtos() {
  const { products, reloadProducts} = useData({
    loadProducts: true,
  });

  return <ProductsTable products={products} reloadProducts={reloadProducts} />;
}
