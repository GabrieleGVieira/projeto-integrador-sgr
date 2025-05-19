"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import FiltersModal from "./filters-modal";
import ConfirmationModal from "./confirmation-modal";
import DashboardCharts from "./dashboard";

export default function Reports({ products, events, sales, orders }) {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleFilterModal = () => setIsFiltersModalOpen(true);

  const downloadExcel = async (selectedProducts, selectedEvents) => {
    setIsDownloading(true);
    try {
      const response = await fetch("/api/download", {
        method: "POST",
        body: JSON.stringify({
          products: selectedProducts,
          events: selectedEvents,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Erro ao gerar Excel");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "relatorio.xlsx";
      link.click();

      setIsSuccess(true);
      setModalMessage("Download concluído com sucesso!");
    } catch (error) {
      setIsSuccess(false);
      setModalMessage("Ocorreu um erro ao baixar relatório.");
      console.log(error);
    } finally {
      setIsDownloading(false);
      setIsFiltersModalOpen(false);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">Relatórios</h1>
        <Button onClick={handleFilterModal} className="bg-blue-500 text-white">
          Baixar relatórios
        </Button>
      </header>

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

      <main className="flex-1 overflow-y-auto p-2">
        <DashboardCharts
          sales={sales}
          events={events}
          orders={orders}
          products={products}
        />
      </main>
    </div>
  );
}
