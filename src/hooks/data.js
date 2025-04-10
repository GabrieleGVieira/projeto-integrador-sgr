import { useState, useEffect } from "react";

export default function useDashboardData(options = {}) {
  const {
    loadProducts = false,
    loadEvents = false,
    loadSales = false,
    loadOrders = false,
  } = options;

  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [sales, setSales] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (loadProducts) fetchResource("/api/products", setProducts);
    if (loadEvents) fetchResource("/api/events", setEvents);
    if (loadSales) fetchResource("/api/sales", setSales);
    if (loadOrders) fetchResource("/api/orders", setOrders);
  }, [loadProducts, loadEvents, loadSales, loadOrders]);

  const fetchResource = async (url, setState) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Erro ao carregar ${url}`);
      const data = await res.json();
      setState(data);
    } catch (error) {
      console.error(error);
    }
  };

  return { products, events, sales, orders };
}
