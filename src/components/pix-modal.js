import dotenv from "dotenv";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import generatePixQRCode from "../lib/utils";

dotenv.config();

export default function PixModal({ isOpen, onClose, total }) {
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const chavePix = process.env.NEXT_PUBLIC_CHAVE_PIX;
      const nomePix = process.env.NEXT_PUBLIC_NOME_PIX;
      const identificador = process.env.NEXT_PUBLIC_ID_PIX;
      const tipoChavePix = process.env.NEXT_PUBLIC_TYPE_PIX;
      const cidadePix = process.env.NEXT_PUBLIC_CITY_PIX;
      const totalFloat = parseFloat(total).toFixed(2)

      generatePixQRCode(
        chavePix,
        totalFloat,
        nomePix,
        identificador,
        tipoChavePix,
        cidadePix
      )
        .then(setQrCode)
        .catch(console.error);
    }
  }, [isOpen, total]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pagamento via Pix</DialogTitle>
          <DialogDescription>
            Escaneie o QR Code abaixo para pagar:
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center">
          {qrCode ? (
            <img src={qrCode} alt="QR Code Pix" />
          ) : (
            <p>Carregando QR Code...</p>
          )}
          <p className="mt-4 text-xl">Valor: R$ {total}</p>
          <Button variant="outline" className="mt-4" onClick={onClose}>
            Voltar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
