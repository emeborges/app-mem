import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";



interface Props {
  formControl: any;
  name: string;
  label?: string | any;
  description?: string;
  className?: string;
}
export const InputCheckboxForm = ({
  formControl,
  name,
  label,
  className,
}: Props) => {

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }:any) => (
        <FormItem className={className}>
          <FormControl>
            <Checkbox className="mt-[8px] focus:outline-none" checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="leading-none align-middle">
            <FormLabel className="text-muted-foreground">{label}</FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};