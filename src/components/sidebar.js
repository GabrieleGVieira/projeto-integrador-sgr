"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { AlignJustify } from "lucide-react";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const navigateTo = (path) => {
    setIsSidebarOpen(false);
    router.push(path);
  };

  return (
    <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="m-2">
          <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-white p-4">
        <nav className="flex flex-col gap-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigateTo("/")}
          >
            Início
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigateTo("/relatorios")}
          >
            Relatórios
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigateTo("/produtos")}
          >
            Produtos
          </Button>
          {/* <Button
            variant="outline"
            className="w-full"
            onClick={() => navigateTo("/configuracoes")}
          >
            Adicionar Eventos
          </Button> */}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
