import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OptionsProps {
  value: any | string;
  label: any | string;
}

interface Props {
  formControl: any;
  name: string;
  label?: string;
  itens?: OptionsProps[];
  placeholder?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
}
export const InputSelectForm = ({
  formControl,
  itens,
  name,
  label,
  placeholder,
  description,
  className,
  disabled
}: Props) => {
  
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => {        
        return(
        <FormItem className={className}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <Select disabled={disabled} onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder ? placeholder : ""} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-white max-h-[150px] overflow-auto">
              {itens?.map((x) => (
                <SelectItem key={x.value} value={x.value}>
                  {x.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}}
    />
  );
};
