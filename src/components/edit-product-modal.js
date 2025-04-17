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
import { Checkbox } from "@/components/ui/checkbox";


const EditProductModal = ({ isOpen, onClose, product, onSave, isLoading }) => {
  const [editedProduct, setEditedProduct] = useState({
    price: "",
      category: "",
    active: true,
  });

  useEffect(() => {
    if (product && isOpen) {
      setEditedProduct({
        price: product.price ?? "",
        category: product.category ?? "",
        active: product.active ?? true,
      });
    }
  }, [product, isOpen]);

  const handleSave = () => {
    onSave({ ...product, ...editedProduct });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="price">Preço</Label>
            <Input
              id="price"
              type="number"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  price: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              type="text"
              value={editedProduct.category}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, category: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="active">Status</Label>
            <div className="flex items-center gap-3">
              <Checkbox
                id="active"
                checked={editedProduct.active}
                onCheckedChange={(checked) =>
                  setEditedProduct({ ...editedProduct, active: !!checked })
                }
              />
              <Label htmlFor="active" className="text-sm font-normal">
                Marque se o produto estiver ativo
              </Label>
            </div>
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

export default EditProductModal;
