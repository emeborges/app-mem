'use client'

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { editarString } from "@/utils/functions";


interface Props {
  label?: string;
  maxItens?: number;
  value: any;
  placeholder: string;
  itens?: any[];
  onChange: any;
}
export const MultiSelect = ({
  label,
  maxItens,
  value,
  placeholder,
  itens,
  onChange,
}: Props) => {

  const [open, setOpen] = useState(false);
  const validation = (itm: any) => {
    if (value) {
      if (value.length) {
        return value?.find(
          (x: any) => x.id === editarString(itm)
        );
      }
    }
  };

  return (
    <>
      {label && (
        <Label className="p-0 m-0 text-muted-foreground">
          {label} {maxItens && `(${value ? value : 0}/${maxItens})`}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          className="w-full m-0 flex-wrap h-full  min-h-[2.5rem] gap-1 p-2"
        >
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`"w-full justify-between`}
          >
            <div className="max-w-[80%] flex flex-wrap gap-2 text-muted-foreground">
              {value.length > 0 ? (
                value?.map((value: any) => {
                  return (
                    <Badge
                      variant={"default"}
                      key={value.value}
                      className="mr-1"
                    >
                      {value.label}
                    </Badge>
                  );
                })
              ) : placeholder ? (
                placeholder
              ) : (
                <span className="w-full">{}</span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={`w-full min-w-[20rem] p-0 bg-white`}
          align="start"
        >
          <Command>
            <CommandInput className="text-muted-foreground" placeholder={`Procure por ${placeholder}`} />
            <CommandEmpty>Não há opções.</CommandEmpty>
            <CommandGroup className="max-h-full">
              {itens?.map((itm) => (
                <CommandItem
                  key={itm}
                  onSelect={(currentValueLow: any) => {
                    onChange(currentValueLow.toUpperCase())
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      validation(itm) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {itm.toUpperCase()}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
};
