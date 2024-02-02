import { useState } from "react";
import { Button } from "../ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { DateRange } from "react-day-picker";
import { addDays, format, formatISO, parseISO, parseJSON, toDate } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

interface Props {
  formControl: any;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  description?: string;
  className?: string;
}
export const InputSimpleDate = ({
  formControl,
  type,
  name,
  label,
  placeholder,
  description,
  className,
}: Props) => {

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => {      
        const tipo = typeof field.value
        
        
        return(
        <FormItem className={className}>
          {label && <FormLabel className="text-muted-foreground" htmlFor={name}>{label}</FormLabel>}
          <FormControl>
            <div className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      tipo === 'string' ? format(parseISO(field.value), "dd/MM/yyyy") : format(field.value, "dd/MM/yyyy")
                    ) : (
                      <span>{placeholder ? placeholder : 'Selecione'}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    locale={ptBR}
                    mode="single"
                    selected={field.value}
                    onSelect={(e) => field.onChange(e && formatISO(e))}
                    initialFocus
                    className=" bg-white"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}}
    />
  );
};
