import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";


interface Props {
  formControl: any;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  description?: string;
  className?: string;
  disable?: boolean
}
export const InputForm = ({
  formControl,
  type,
  name,
  label,
  placeholder,
  description,
  className,
  disable
}: Props) => {

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel className="text-muted-foreground" htmlFor={name}>{label}</FormLabel>}
          <FormControl>
            <Input
              type={type ? type : "text"}
              placeholder={placeholder && placeholder}
              {...field}
              disabled={disable}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};