"use client";

import useData from "../../hooks/data";
import Reports from "../../components/reports";

export default function Relatorios() {
  const { products, events, sales, orders } = useData({
    loadProducts: true,
    loadEvents: true,
    loadSales: true,
    loadOrders: true,
  });

  return (
    <Reports
      products={products}
      events={events}
      sales={sales}
      orders={orders}
    />
  );
}
