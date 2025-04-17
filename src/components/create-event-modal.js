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

export default function CreateEventModal({ isOpen, onClose, onSave, isLoading }) {
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});

  const [newEvent, setNewEvent] = useState({
      name: "",
      description: ""
  });
    
  const validate = () => {
    const newErrors = {};
    if (!String(newEvent.description || "").trim()) {
      newErrors.description= "A descrição é obrigatória";
    }
    if (!String(newEvent.name || "").trim()) {
      newErrors.name = "O nome é obrigatório";
    }
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    if (isOpen) {
      setNewEvent({
        name: "",
        description: "",
      });
    }
  }, [isOpen]);
    
    useEffect(() => {
      validate();
    }, [newEvent]);


  const handleSave = () => {
    onSave({ ...newEvent });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Evento</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              value={newEvent.name}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  name: e.target.value,
                })
              }
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="descriptioin"
              type="text"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!isValid || isLoading}>
            {isLoading ? (
              <Loader className="animate-spin w-4 h-4 mr-2" />
            ) : (
              "Adicionar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
