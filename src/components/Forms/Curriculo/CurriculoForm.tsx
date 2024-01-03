"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import "../../react-datepicker.css";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { CurriculumObj, MedicI } from "@/types/geralsI";

import { InputDocForm } from "@/components/Inputs/InputDocForm";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { TextInput } from "@/components/Inputs/TextInput";
import { formatISO } from "date-fns";

const REG_Mai =
  /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g;

const formSchema = z.object({
  file: z.object(
    {
      type: z.string({
        required_error: "É necessário um currículo",
      }),
      content: z.string({
        required_error: "É necessário um currículo",
      }),
    },
    { required_error: "É necessário um currículo" }
  ),
  description: z
    .string({ required_error: "É necessário uma descrição" }),
});

interface Props {
  initialValues?: CurriculumObj;
}

export function CurriculoForm({ initialValues }: Props) {
  const { toast } = useToast();
  const route = useRouter();
  const [load, setLoad] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const axiosAuth = useAxiosAuth();

  const onSubmit = async (values: any) => {
    setLoad(true);

    const newValues: any = {
      name_tag: formatISO(new Date()),
      ...values,
    };

    console.log(newValues);

    initialValues
      ? axiosAuth
          .patch(`/curriculum/${initialValues.id}`, { curriculum: newValues })
          .then((e) => {
            toast({
              title: "Sucesso!",
              description:
                "Perfil editado com sucesso, você será redirecionado em 3 segundos.",
            });

            return setTimeout(() => route.push("/app"), 3000);
          })
          .catch((e) => {
            toast({
              title: "Erro!",
              description: "Algo deu errado, por gentileza, tente mais tarde.",
            });

            return;
          })
      : axiosAuth
          .post("/curriculum", { curriculum: newValues })
          .then((e) => {
            toast({
              title: "Sucesso!",
              description:
                "Perfil editado com sucesso, você será redirecionado em 3 segundos.",
            });

            return setTimeout(() => route.push("/app"), 3000);
          })
          .catch((e) => {
            toast({
              title: "Erro!",
              description: "Algo deu errado, por gentileza, tente mais tarde.",
            });

            return;
          });
  };

  useEffect(() => {
    initialValues &&
      form.reset({
        description: initialValues.description,
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CardContent>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className="py-2">
              <h2 className="text-3xl">
                {initialValues ? "Editar Currículo" : "Cadastrar Currículo"}:
              </h2>
            </div>

            <TextInput
              label="Descreva um pouco sobre você:"
              formControl={form.control}
              className="py-2"
              name={`description`}
              placeholder={"Fale um pouco sobre você e suas experiências"}
            />

            <InputDocForm
              label={"Currículo em pdf:"}
              formControl={form.control}
              name={"file"}
              className="py-2"
              accept="application/pdf"
            />

            <Button className="w-full" disabled={load} type="submit">
              {load ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Salvar"
              )}
            </Button>
            {initialValues ? null : (
              <Button
                variant={"outline"}
                className="mt-2 mb-4 w-full"
                onClick={() => route.replace("/auth/signin")}
              >
                Voltar
              </Button>
            )}
          </form>
        </Form>
      </div>
    </CardContent>
  );
}
