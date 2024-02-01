"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { InputForm } from "../../Inputs/InputForm";
import { TextInput } from "../../Inputs/TextInput";
import { InputMaskForm } from "@/components/Inputs/InputMaskForm";
import { InputSelectForm } from "@/components/Inputs/InputSelectForm";
import { Estados, Modalidade, optionsSelects } from "@/utils/options";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { SpecialityI } from "@/types/geralsI";

const formSchema = z.object({
  name: z.string({
    required_error: "É necessário um nome.",
  }),
  
});

interface Props {
  initialValues?: SpecialityI
}

export function EspecialidadesForm({initialValues}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const route = useRouter();

  const onSubmit = (values: any) => {

    axiosAuth
      .post("/speciality",  {speciality: values} )
      .then((e) => {
        toast({
          title: "Sucesso!",
          description:
            "Especialidade adicionada com sucesso, você será redirecionado em 3 segundos.",
        });

        return setTimeout(() => route.push("/admin/especialidades"), 3000);
      })
      .catch((e) => {
        toast({
          title: "Erro!",
          description: "Algo deu errado, por gentileza, tente mais tarde.",
        });

        return;
      });
  };

  return (
    <div className="w-full m-auto max-w-[450px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <InputForm
            formControl={form.control}
            type={"text"}
            label={"Nome"}
            name="name"
          />
          
          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      </Form>
    </div>
  );
}
