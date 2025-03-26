import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

const ConfirmationModal = ({ isOpen, onClose, message, isSuccess }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          {isSuccess ? (
            <CheckCircle className="text-green-600 w-12 h-12 mb-2" />
          ) : (
            <XCircle className="text-red-600 w-12 h-12 mb-2" />
          )}
          <DialogTitle>
            {isSuccess ? "Venda Concluída!" : "Erro ao Concluir Venda"}
          </DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
