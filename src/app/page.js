"use client";
import { useState, useEffect } from "react";
import Product from "../components/product";
import Total from "../components/total";

export default function Home() {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);

  const updateTotal = (newTotal) => {
    setTotal(newTotal);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Erro ao carregar os produtos");
      }
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar os produtos", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="mb-4">
        {products.map((item) => (
          <Product key={item.id} item={item} updateTotal={updateTotal} />
        ))}
      </div>
      <Total total={total} />
    </div>
  );
}
