import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";


export default function EditEventModal({ isOpen, onClose, event, onSave, isLoading }) {
  const [editedEvent, setEditedEvent] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (event && isOpen) {
      setEditedEvent({
        name: event.name ?? "",
        description: event.description ?? "",
      });
    }
  }, [event, isOpen]);

  const handleSave = () => {
    onSave({ ...event, ...editedEvent });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Evento</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              value={editedEvent.name}
              onChange={(e) =>
                setEditedEvent({
                  ...editedEvent,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              type="text"
              value={editedEvent.description}
              onChange={(e) =>
                setEditedEvent({ ...editedEvent, description: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            {isLoading ? (
              <Loader className="animate-spin w-4 h-4 mr-2" />
            ) : (
              "Salvar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
