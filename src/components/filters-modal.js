"use client";
import { useState } from "react";

import { Button } from "../components/ui/button";
import { Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";

import { Label } from "../components/ui/label";

import MultiSelectDropdown from "./multi-select-dropdown";

export default function FiltersModal({ isOpen, onClose, products, events, downloadExcel, downloading}) {
  const [product, setProductSelected] = useState([]);
  const [event, setEventSelected] = useState([]);

  products = [{ id: "todos", name: "Todos" }, ...products];
  events = [{ id: "todos", name: "Todos" }, ...events];

  const handleProductSelection = (id) => {
    if (id === "todos") {
      if (product.includes("todos")) {
        setProductSelected([]);
      } else {
        setProductSelected(products.map((o) => o.id));
      }
    } else {
      if (product.includes("todos")) {
        setProductSelected([id]);
      } else {
        const isSelected = product.includes(id);
        let newSelection = isSelected
          ? product.filter((item) => item !== id)
          : [...product.filter((item) => item !== "todos"), id];

        const allOptionsSelected = newSelection.length === products.length - 1;
        if (allOptionsSelected) {
          newSelection = [
            "todos",
            ...products.filter((o) => o.id !== "todos").map((o) => o.id),
          ];
        }

        setProductSelected(newSelection);
      }
    }
  };

  const handleEventSelection = (id) => {
    if (id === "todos") {
      if (event.includes("todos")) {
        setEventSelected([]);
      } else {
        setEventSelected(events.map((o) => o.id));
      }
    } else {
      if (event.includes("todos")) {
        setEventSelected([id]);
      } else {
        const isSelected = event.includes(id);
        let newSelection = isSelected
          ? event.filter((item) => item !== id)
          : [...event.filter((item) => item !== "todos"), id];

        const allOptionsSelected = newSelection.length === events.length - 1;
        if (allOptionsSelected) {
          newSelection = [
            "todos",
            ...events.filter((o) => o.id !== "todos").map((o) => o.id),
          ];
        }

        setEventSelected(newSelection);
      }
    }
  };

  const buttonProductLabel = product.includes("todos")
    ? "Todos"
    : product.length > 0
    ? `Selecionados: ${product.length}`
    : "Selecione...";

  const buttonEventLabel = event.includes("todos")
    ? "Todos"
    : event.length > 0
    ? `Selecionados: ${event.length}`
    : "Selecione...";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Baixar Relatórios</DialogTitle>
          <DialogDescription>
            Insira os filtros para fazer download dos relatórios:
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="grid w-full items-center gap-4">
            <div>
              <MultiSelectDropdown
                label="Produto"
                options={products}
                selected={product}
                onSelect={handleProductSelection}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <MultiSelectDropdown
                label="Evento"
                options={events}
                selected={event}
                onSelect={handleEventSelection}
              />
            </div>
            <div>
              <Label htmlFor="framework">Data do Evento</Label>
            </div>
          </div>
        </form>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => downloadExcel(product, event)}
        >
          {downloading ? (
            <>
              <Loader className="animate-spin w-4 h-4 mr-2" />
              Baixando...
            </>
          ) : (
            "Baixar"
          )}
        </Button>
        <Button
          variant="outline"
          className="mt-4"
          onClick={onClose}
          disabled={downloading}
        >
          Voltar
        </Button>
      </DialogContent>
    </Dialog>
  );
}

