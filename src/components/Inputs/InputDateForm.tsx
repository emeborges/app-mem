import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { getMonth, getYear } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import { ReactNode } from "react";

registerLocale("ptBR", ptBR);
setDefaultLocale("ptBR");


interface Props {
  formControl: any;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  description?: string;
  className?: string;
}
export const InputDateForm = ({
  formControl,
  name,
  label,
  placeholder,
  className,
}: Props) => {

  function yearsF() {
     const anoAtual = new Date().getFullYear();
     const anos = [];

     for (let ano = 1940; ano <= anoAtual; ano++) {
       anos.push(`${ano}`);
     }

     return anos;
  }
  
  const years = yearsF();

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex flex-col ${className}`}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <DatePicker
            selected={field.value}
            className={
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            }
            dateFormat="dd/MM/yyyy"
            placeholderText={placeholder}
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                  variant={"ghost"}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <select
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  value={getYear(date)}
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                  onChange={({ target: { value } }) => changeYear(+value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <Button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                  variant={"ghost"}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
            onChange={field.onChange}
            locale={"ptBR"}
            withPortal
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};