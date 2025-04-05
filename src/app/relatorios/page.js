"use client";
import FiltersModal from "@/components/filters-modal";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import ConfirmationModal from "../../components/confirmation-modal";




export default function Relatorios() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [events, setEvents] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
       const data = await response.json();
       setEvents(data);
     } catch (error) {
       console.error("Erro ao carregar evento", error);
     }
   };
  
   const downloadExcel = async (selectedProducts, selectedEvents) => {
     setIsDownloading(true);
     try {
       const response = await fetch("/api/download", {
         method: "POST",
         body: JSON.stringify({
           products: selectedProducts,
           events: selectedEvents,
         }),
         headers: {
           "Content-Type": "application/json",
         },
       });

       if (!response.ok) {
         setIsDownloading(false);
         setIsFiltersModalOpen(false);
         setIsSuccess(false);
         setModalMessage("Ocorreu um erro ao baixar relatório.");
         setIsModalOpen(true);
         throw new Error("Erro ao gerar Excel");
       }

       const blob = await response.blob();
       const url = window.URL.createObjectURL(blob);
       const link = document.createElement("a");
       link.href = url;
       link.download = "relatorio.xlsx";
       link.click();
       setIsDownloading(false);
       setIsFiltersModalOpen(false);
       setIsSuccess(true);
       setModalMessage("Download concluído com sucesso!");
       setIsModalOpen(true);
     } catch (error) {
       setIsDownloading(false);
       setIsFiltersModalOpen(false);
       setIsSuccess(false);
       setModalMessage("Ocorreu um erro ao baixar relatório.");
       setIsModalOpen(true);
       console.error("Erro ao baixar relatório", error);
     }
   };

    useEffect(() => {
      if (typeof window !== "undefined") {
        fetchProducts();
        fetchEvent();
      }
    }, []);


   const handleFilterModal = () => {
     setIsFiltersModalOpen(true);
   };

  return (
    <div className="flex h-screen">
      <div className="flex-1 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Relatórios</h1>
        <Button
          onClick={() => handleFilterModal()}
          variant="outline"
          className="bg-blue-500 ml-2"
          size="lg"
        >
          Baixar relatórios
        </Button>
        <FiltersModal
          isOpen={isFiltersModalOpen}
          onClose={() => setIsFiltersModalOpen(false)}
          products={products}
          events={events}
          downloadExcel={downloadExcel}
          downloading={isDownloading}
        />
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          message={modalMessage}
          isSuccess={isSuccess}
        />
      </div>
    </div>
  );
};