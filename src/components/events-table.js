"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { useState } from "react";
import ConfirmationModal from "./confirmation-modal";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import EditEventModal from "./edit-event-modal";
import CreateEventModal from "./create-event-modal";

export default function EventsTable({ events, reloadEvents }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenEditModal(event) {
    setSelectedEvent(event);
    setIsEditModalOpen(true);
  }

  const handleSaveEdit = async (updatedEvent) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/events", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

      if (response.ok) {
        setIsSuccess(true);
        setModalMessage("Evento atualizado com sucesso");
      } else {
        setIsSuccess(false);
        setModalMessage("Erro ao tentar atualizar o evento");
      }
    } catch (error) {
      console.log(error);
      setIsSuccess(false);
      setModalMessage("Erro ao tentar atualizar o evento");
    } finally {
      setIsLoading(false);
      setIsEditModalOpen(false);
      setIsModalOpen(true);
      reloadEvents();
    }
  };

  const handleSaveCreate = async (newEvent) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        setIsSuccess(true);
        setModalMessage("Evento criado com sucesso");
      } else {
        setIsSuccess(false);
        setModalMessage("Erro ao tentar criar o evento");
      }
    } catch (error) {
      console.error(error);
      setIsSuccess(false);
      setModalMessage("Erro ao tentar criar o evento");
    } finally {
      setIsLoading(false);
      setIsCreateModalOpen(false);
      setIsModalOpen(true);
      reloadEvents();
    }
  };
    
    const handleActivateEvent = async (event) => {
    setIsLoading(true);
        try {
      const response = await fetch("/api/events/active", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: event.id }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setModalMessage("Evento ativado com sucesso");
      } else {
        setIsSuccess(false);
        setModalMessage("Erro ao tentar ativar o evento");
      }
    } catch (error) {
      console.log(error);
      setIsSuccess(false);
      setModalMessage("Erro ao tentar ativar o evento");
    } finally {
      setIsLoading(false);
      setIsModalOpen(true);
      reloadEvents();
    }
    };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">Eventos</h1>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 text-white"
        >
          Adicionar Evento
        </Button>
      </header>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
        isSuccess={isSuccess}
      />

      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        event={selectedEvent}
        onSave={handleSaveEdit}
        isLoading={isLoading}
      />
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveCreate}
        isLoading={isLoading}
      />

      <main>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead> Status </TableHead>
              <TableHead>Criado Em</TableHead>
              <TableHead>Atualizado Em</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{event.name}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>
                  {event.active ? (
                    <FiCheckCircle className="text-green-600" />
                  ) : (
                    <FiXCircle className="text-red-600" />
                  )}
                </TableCell>
                <TableCell>{formatDate(event.createdAt)}</TableCell>
                <TableCell>{formatDate(event.updatedAt)}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenEditModal(event)}
                    size="sm"
                    className="bg-amber-500 hover:bg-amber-600"
                            variant="outline"
                            disabled={isLoading}
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => handleActivateEvent(event)}
                    size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            disabled={isLoading}
                  >
                    Ativar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}

function formatDate(isoString) {
  const date = new Date(isoString);
  const options = {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  return date.toLocaleString("pt-BR", options).replace(",", " às");
}
