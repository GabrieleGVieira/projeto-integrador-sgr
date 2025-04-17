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
import EditProductModal from "./edit-product-modal";
import ConfirmationModal from "./confirmation-modal";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import CreateProductModal from "./create-product-modal";

export default function Products({ products, reloadProducts }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenEditModal(product) {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  }

  const handleSaveEdit = async (updatedProduct) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        setIsSuccess(true);
        setModalMessage("Produto atualizado com sucesso");
      } else {
        setIsSuccess(false);
        setModalMessage("Erro ao tentar atualizar o produto");
      }
    } catch (error) {
      console.log(error);
      setIsSuccess(false);
      setModalMessage("Erro ao tentar atualizar o produto");
    } finally {
      setIsLoading(false);
      setIsEditModalOpen(false);
      setIsModalOpen(true);
      reloadProducts();
    }
  };

const handleSaveCreate = async (newProduct) => {
  setIsLoading(true); 
  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      setIsSuccess(true);
      setModalMessage("Produto criado com sucesso"); 
    } else {
      setIsSuccess(false);
      setModalMessage("Erro ao tentar criar o produto");
    }
  } catch (error) {
    console.error(error);
    setIsSuccess(false); 
    setModalMessage("Erro ao tentar criar o produto"); 
  } finally {
    setIsLoading(false);
    setIsCreateModalOpen(false); 
    setIsModalOpen(true);
    reloadProducts(); 
  }
};


  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 text-white"
        >
          Adicionar Produto
        </Button>
      </header>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
        isSuccess={isSuccess}
      />

      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={selectedProduct}
        onSave={handleSaveEdit}
        isLoading={isLoading}
      />
      <CreateProductModal
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
              <TableHead>Preço</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead> Status </TableHead>
              <TableHead>Criado Em</TableHead>
              <TableHead>Atualizado Em</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>R$ {product.price.toFixed(2)}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  {product.active ? (
                    <FiCheckCircle className="text-green-600" />
                  ) : (
                    <FiXCircle className="text-red-600" />
                  )}
                </TableCell>
                <TableCell>{formatDate(product.createdAt)}</TableCell>
                <TableCell>{formatDate(product.updatedAt)}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenEditModal(product)}
                    size="sm"
                    className="bg-amber-500 hover:bg-amber-600"
                    variant="outline"
                  >
                    Editar
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
