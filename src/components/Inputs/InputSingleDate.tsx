'use client'

import { cn } from "@/lib/utils";
import { Button } from "../ui/button"
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";

interface Props {
    label?: string;
    value?: Date | null;
    setValue: (e:any) => void;
}

export const SingleDate = ({label, value, setValue}: Props) => {
    return(
        <div className="flex flex-col">
            <Label>
                {label}
            </Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                    >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "dd/MM/yyyy") : <span>Selecione...</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <Calendar
                    mode="single"
                    selected={value ? value : undefined}
                    onSelect={(e) => setValue(e)}
                    initialFocus
                    className=" bg-white"
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}