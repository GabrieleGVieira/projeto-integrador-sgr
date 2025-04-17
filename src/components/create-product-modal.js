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

const CreateProductModal = ({ isOpen, onClose, onSave, isLoading }) => {
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});

  const [newProduct, setNewProduct] = useState({
    price: "",
    category: "",
    active: true,
  });
    
  const validate = () => {
    const newErrors = {};
    if (!String(newProduct.category || "").trim()) {
      newErrors.category = "A categoria é obrigatória";
    }
    if (newProduct.price === "" || isNaN(newProduct.price)) {
      newErrors.price = "O preço deve ser um número válido";
    }
    if (!String(newProduct.name || "").trim()) {
      newErrors.name = "O nome é obrigatório";
    }
    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  };

  useEffect(() => {
    if (isOpen) {
      setNewProduct({
        price: "",
        category: "",
        active: true,
      });
    }
  }, [isOpen]);
    
    useEffect(() => {
      validate();
    }, [newProduct]);


  const handleSave = () => {
    onSave({ ...newProduct });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Produto</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="price">Nome</Label>
            <Input
              id="name"
              type="text"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  name: e.target.value,
                })
              }
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Preço</Label>
            <Input
              id="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: parseFloat(e.target.value) || 0,
                })
              }
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              type="text"
              value={newProduct.category}
              onChange={(e) =>
                setNewProduct({ ...newProduct, category: e.target.value })
              }
            />
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category}</p>
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

export default CreateProductModal;
