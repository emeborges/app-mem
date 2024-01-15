"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "../ui/badge";

interface OptionsProps {
  value: string | any;
  label: string | any;
}

interface Props {
  formControl: any;
  name: string;
  label?: string;
  itens?: OptionsProps[];
  placeholder?: string;
  description?: string;
  className?: string;
  maxItens?: number;
  maxItensLabel?: boolean;
  badgeType?: "destructive";
}
export const InputMultiSelectForm = ({
  formControl,
  itens,
  name,
  label,
  placeholder,
  description,
  className,
  maxItens,
  maxItensLabel,
  badgeType,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => {
        
        const validation = (obj: OptionsProps) => {
          if (field.value) {
            if (field.value.length) {
              return field.value?.find(
                (x: OptionsProps) =>
                  x.value === obj.value || x.label === obj.label
              );
            }
          }
        };

        return (
          <FormItem className={cn(className, "h-full")}>
            {label && (
              <FormLabel  htmlFor={name} className=" text-muted-foreground p-0 m-0">
                {label}{" "}
                {maxItensLabel &&
                  `(${field.value ? field.value.length : 0}/${maxItens})`}
              </FormLabel>
            )}

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                asChild
                className="w-full m-0 flex-wrap h-full min-h-[100%] gap-2"
              >
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={`"w-full justify-between`}
                >
                  <div className="max-w-[80%] flex flex-wrap gap-2">
                    {field.value?.length > 0 ? (
                      field.value?.map((value: any) => {
                        return (
                          <Badge
                            variant={badgeType}
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
                  <CommandInput placeholder={`Procure por ${placeholder}`} />
                  <CommandEmpty>Não há opções.</CommandEmpty>
                  <CommandGroup>
                    {itens?.map((framework) => (
                      <CommandItem
                        key={framework.label}
                        onSelect={(currentValueLow: any) => {
                        
                          const currentValue =
                            currentValueLow.toLocaleUpperCase();

                          const validacao = field?.value
                            ? field.value?.find((arr: any) => {
                                const validacao = typeof arr.label;

                                if (validacao == "string") {
                                  return (
                                    arr.label.toLocaleUpperCase() ==
                                    currentValue
                                  );
                                } else {
                                  return arr.label == currentValue;
                                }
                              })
                            : null;

                          if (validacao) {
                            const newValues = field.value?.filter((el: any) => {
                              const validacao = typeof el.label;

                              if (validacao == "string") {
                                return (
                                  el.label.toLocaleUpperCase() != currentValue
                                );
                              } else {
                                return el.label != currentValue;
                              }
                            });

                            field.onChange(newValues);
                          } else {
                            if (maxItens) {
                              if (field?.value?.length >= maxItens) {
                                if (field.value.lenght) {
                                  const novoObj = field.value.shift();

                                  const objSelecionado = itens.find(
                                    (arr) =>
                                      arr.label.toLocaleUpperCase() ==
                                      currentValue
                                  );

                                  novoObj.push(objSelecionado);
                                  return;
                                } else {
                                  const objSelecionado = itens.find(
                                    (arr) =>
                                      arr.label.toLocaleUpperCase() ==
                                      currentValue
                                  );

                                  field.onChange([objSelecionado]);
                                  return;
                                }
                              }
                            }

                            const objSelecionado = itens.find(
                              (arr) =>
                                arr.label.toLocaleUpperCase() == currentValue
                            );
                            const novoObj = field.value ? field.value : [];

                            novoObj.push(objSelecionado);

                            field.onChange(novoObj);
                          }

                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            validation(framework) ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
