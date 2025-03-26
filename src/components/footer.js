import Total from "../components/total";
import { Button } from "../components/ui/button";
import { Loader } from "lucide-react";

const Footer = ({
  total,
  orders,
  handleCompleteSale,
  handleGeneratePix,
  event,
  isLoading,
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white p-4 border-t shadow-md">
      {/* Exibe o total */}
      <div className="text-lg font-bold whitespace-nowrap">
        <Total total={total} />
      </div>

      {/* Botões de ação */}
      {orders.length > 0 && (
        <div className="flex gap-4">
          <Button
            onClick={() => handleCompleteSale(event, total, orders)}
            variant="outline"
            className="bg-green-600 w-1/2 ml-2"
            size="lg"
          >
            {isLoading ? (
              <Loader className="animate-spin w-5 h-5 mr-2" />
            ) : null}
            Concluir Venda
          </Button>
          <Button
            onClick={() => handleGeneratePix()}
            variant="outline"
            className="bg-orange-600 w-1/2 ml-2"
            size="lg"
            disabled={isLoading}
          >
            Gerar Pix
          </Button>
        </div>
      )}
    </div>
  );
};

export default Footer;
