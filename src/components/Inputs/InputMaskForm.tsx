import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { InputMask } from "@react-input/mask";

interface Props {
  formControl: any;
  name: string;
  label?: string;
  mask?: string;
  placeholder?: string;
  description?: string;
  className?: string;
}
export const InputMaskForm = ({
  formControl,
  mask,
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
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <FormControl>
            <InputMask
              className={
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              }
              mask={mask}
              replacement={{ _: /\d/ }}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};