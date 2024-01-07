'use client'

import { SelectGroup } from "@radix-ui/react-select";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


interface Props {
  label?: string;
  value: any;
  placeholder: string;
  itens: any[];
  onChange: any;
}
export const SelectSimple = ({
  label,
  value,
  placeholder,
  itens,
  onChange,
}: Props) => {


  return (
    <>
      {label && <Label className="text-muted-foreground">{label}</Label>}
      <Select onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue className="text-muted-foreground"  placeholder={placeholder ? placeholder : 'Selecione'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {itens.map((x:string) => 
          <SelectItem className="text-muted-foreground" key={x} value={x}>{x}</SelectItem>
            
            )}
        </SelectGroup>
      </SelectContent>
    </Select>
    </>
  );
};
