"use client";
import { Button } from "../components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
import { Checkbox } from "../components/ui/checkbox";
import { ChevronDown } from "lucide-react";

export default function MultiSelectDropdown({
  label,
  options,
  selected,
  onSelect,
}) {
  const displayLabel = selected.includes("todos")
    ? "Todos"
    : selected.length > 0
    ? `Selecionados: ${selected.length}`
    : "Selecione...";

  return (
    <div className="flex flex-col space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[200px] flex justify-between">
            {displayLabel}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-2">
          <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {options.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
                onClick={() => onSelect(item.id)}
              >
                <span>{item.name}</span>
                <Checkbox checked={selected.includes(item.id)} />
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
