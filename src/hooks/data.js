import { useState, useEffect } from "react";

export default function useData(options = {}) {
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
      console.log(error);
    }
  };

  const reloadProducts = () => {
    fetchResource("/api/products", setProducts);
  };
  const reloadEvents = () => {
    fetchResource("/api/events", setEvents);
  };

  return { products, events, sales, orders, reloadProducts, reloadEvents };
}
