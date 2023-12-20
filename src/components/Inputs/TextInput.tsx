import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

interface Props {
  formControl: any;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  className?: string;
}
export const TextInput = ({formControl, name, label, placeholder, description, className}: Props) => {
    return (
      <FormField
        control={formControl}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Textarea
                placeholder={placeholder}
                className={`resize-none ${className}`}
                {...field}
              />
            </FormControl>
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    );
}