"use client";
import { useState, useEffect, useCallback } from "react";
import ProductList from "./product-list";
import Footer from "./footer";
import PixModal from "./pix-modal";
import ConfirmationModal from "./confirmation-modal";

export default function Menu() {
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [event, setEvent] = useState(null);
  const [orders, setOrders] = useState([]);
  const [resetTrigger, setResetTrigger] = useState(false);
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateTotal = useCallback((updateFunction) => {
    setTotal((prevTotal) => {
      const newTotal = updateFunction(prevTotal);
      if (newTotal !== prevTotal) return newTotal;
      return prevTotal;
    });
  }, []);

  const updateOrder = useCallback((newOrder) => {
    setOrders((prevOrders) => {
      const existingOrderIndex = prevOrders.findIndex(
        (order) => order.productId === newOrder.productId
      );

      if (existingOrderIndex !== -1) {
        const updatedOrders = [...prevOrders];
        if (newOrder.quantity === 0) {
          updatedOrders.splice(existingOrderIndex, 1);
        } else {
          updatedOrders[existingOrderIndex] = newOrder;
        }
        return updatedOrders;
      } else {
        return newOrder.quantity > 0 ? [...prevOrders, newOrder] : prevOrders;
      }
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

  const fetchEvent = async () => {
    try {
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error("Erro ao carregar evento");
      }
      const events = await response.json();
      for (const event of events) {
        if (event.active) {
          setEvent(event);
          break
        }
      }
      
    } catch (error) {
      console.error("Erro ao carregar evento", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchProducts();
      fetchEvent();
    }
  }, []);

  const saveOrders = async (orders, saleId) => {
    const updatedOrders = orders.map((order) => ({ ...order, saleId }));
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrders),
      });
      if (!response.ok) {
        throw new Error("Erro ao salvar pedidos");
      }
    } catch (error) {
      console.error("Erro ao salvar pedidos", error);
    }
  };

  const saveSales = async (event, total) => {
    const sale = { eventId: event.id, total: total };
    try {
      const response = await fetch("/api/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sale),
      });
      if (!response.ok) {
        setIsSuccess(false);
        setModalMessage("Ocorreu um erro ao salvar a venda e os pedidos.");
        setIsModalOpen(true);
        throw new Error(response.body);
      }

      setIsSuccess(true);
      setModalMessage("A venda foi concluída com sucesso!");
      setIsModalOpen(true);

      return response.json();
    } catch (error) {
      setIsSuccess(false);
      setModalMessage("Ocorreu um erro ao salvar a venda e os pedidos.");
      setIsModalOpen(true);
      console.error("Erro ao salvar vendas", error);
    }
  };

  const handleCompleteSale = async (event, total, orders) => {
    try {
      setIsLoading(true);
      const saleId = await saveSales(event, total);

      await saveOrders(orders, saleId);
      setOrders([]);
      setTotal(0);
      setResetTrigger((prev) => !prev);
    } catch (error) {
      console.error("Erro ao salvar vendas", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePix = () => {
    setIsPixModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4 pb-24 min-h-screen flex flex-col justify-between">
      <h1 className="text-2xl font-bold mb-4">{event ? event.name : "Menu"}</h1>
      <div className="flex-grow mb-24">
        <ProductList
          products={products}
          updateTotal={updateTotal}
          total={total}
          updateOrder={updateOrder}
          resetTrigger={resetTrigger}
        />
      </div>

      <Footer
        total={total}
        orders={orders}
        handleCompleteSale={handleCompleteSale}
        handleGeneratePix={handleGeneratePix}
        event={event}
        isLoading={isLoading}
      />
      <PixModal
        isOpen={isPixModalOpen}
        onClose={() => setIsPixModalOpen(false)}
        total={total}
      />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
        isSuccess={isSuccess}
      />
    </div>
  );
}
