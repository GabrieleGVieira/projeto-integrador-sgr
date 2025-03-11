"use client";
import { useState, useEffect, useCallback } from "react";
import ProductList from "../components/product-list";

export default function Home() {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  
  const updateTotal = useCallback((updateFunction) => {
    setTotal((prevTotal) => {
      const newTotal = updateFunction(prevTotal);
      if (newTotal !== prevTotal) return newTotal;
      return prevTotal;
    });
  }, []);

  
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Erro ao carregar os produtos");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar os produtos", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchProducts();
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="mb-4">
        <ProductList
          products={products}
          updateTotal={updateTotal}
          total={total}
        />
      </div>
    </div>
  );
}
