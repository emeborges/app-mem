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
import { formatISO, sub } from "date-fns";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { StudentI } from "@/types/geralsI";
import { InputForm } from "@/components/Inputs/InputForm";
import { InputMaskForm } from "@/components/Inputs/InputMaskForm";
import { InputDateForm } from "@/components/Inputs/InputDateForm";
import { InputDocForm } from "@/components/Inputs/InputDocForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPrimeiraLetra } from "@/utils/functions";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { InputMultiSelectForm } from "@/components/Inputs/InputMultiSelectForm";
import { Anos, optionsSelects } from "@/utils/options";
import axios from "@/lib/axios";


const formSchema = z.object({
  name: z.string({ required_error: "Nome é necessário" }).optional().nullable(),
  email: z
    .string({ required_error: "Email é necessário" })
    .email({ message: "E-mail inválido" })
    .optional()
    .nullable(),
  phone_number: z.string({ required_error: "É necessário um número" }),
  tax_document: z
    .string({ required_error: "É necessário um CPF" })
    .optional()
    .nullable(),
  birthdate: z
    .date({
      required_error: "É necessário uma data válida",
    })
    .max(sub(new Date(), { years: 18 }), {
      message: "É necessário ser maior de 18 anos",
    })
    .optional()
    .nullable(),
  picture: z
    .object(
      {
        type: z.string({ required_error: "É necessário uma foto de perfil" }),
        content: z.string({
          required_error: "É necessário uma foto de perfil",
        }),
      },
      { required_error: "É necessário uma foto de perfil" }
    )
    .optional()
    .nullable(),
  school_term: z
    .object(
      {
        label: z.string(),
        value: z.string(),
      },
      {
        required_error: "Semetre Mínimo é necessário",
      }
    )
    .array()
    .transform((id) => Number(id[0].label)),
});

interface Props {
  initialValues?: StudentI;
  admin?: boolean;
}

export function EditStudentForm({ initialValues, admin }: Props) {
  const { toast } = useToast();
  const route = useRouter();
  const [load, setLoad] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const axiosAuth = useAxiosAuth();
  const [universitys, setUniversitys] = useState<any[]>();

  const onSubmit = async (values: any) => {
    setLoad(true);

    const newValues: any = admin
      ? { ...values, school_term: values.school_term.toString() }
      : {
          phone_number: values.phone_number,
          birthdate: formatISO(values.birthdate),
          school_term: values.school_term.toString(),
        };

    if (values.picture) {
      newValues["picture"] = values.picture;
    }

    admin
      ? axiosAuth
          .patch(`/student/${initialValues?.id}`, { student: newValues })
          .then((e) => {
            toast({
              title: "Sucesso!",
              description:
                "Perfil editado com sucesso, você será redirecionado em 3 segundos.",
            });

            return setTimeout(() => route.back(), 3000);
          })
          .catch((e) => {
            toast({
              title: "Erro!",
              description: "Algo deu errado, por gentileza, tente mais tarde.",
            });
          })
      : axiosAuth
          .patch("/student", { student: newValues })
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
          });
  };

  async function getDados() {
    await axios.get("/university").then((e) => setUniversitys(e.data));
  }

  useEffect(() => {
    getDados();
    console.log(initialValues);
    initialValues &&
      form.reset({
        name: initialValues.name,
        email: initialValues.email,
        phone_number: initialValues.phone_number,
        birthdate: initialValues.birthdate
          ? new Date(initialValues.birthdate)
          : new Date(),
        tax_document: initialValues.tax_document,
        school_term: [
          {
            label: initialValues.school_term?.toString(),
            value: initialValues.school_term?.toString(),
          },
        ],
        university: admin
          ? [
              {
                label: initialValues?.university?.name,
                value: initialValues?.university?.id,
              },
            ]
          : initialValues?.university?.name,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CardContent>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="full max-w-[350px] m-auto  bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2"
            encType="multipart/form-data"
          >
            <div className="m-auto">
              <Avatar className="h-[10rem] w-[10rem] bg-red-500">
                {initialValues?.picture_url ? (
                  <AvatarImage src={initialValues.picture_url.toString()} />
                ) : (
                  <AvatarFallback className="bg-primary text-5xl">
                    {getPrimeiraLetra(initialValues?.name)}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            <div className="flex items-center flex-col w-full justify-between"></div>
            <InputForm
              formControl={form.control}
              name={"name"}
              placeholder="Digite seu Nome"
              className="py-2"
              disable={!admin}
            />
            <InputForm
              formControl={form.control}
              name={"email"}
              placeholder="Digite seu melhor e-mail"
              className="py-2"
              disable={!admin}
            />
            <InputMaskForm
              formControl={form.control}
              className="py-2"
              name={"phone_number"}
              mask={"(__) _ ____-____"}
              placeholder="Digite seu número de telefone"
            />

            <div className=" py-2 flex gap-2 w-full">
              <InputDateForm
                className="w-full max-w-[50%]"
                formControl={form.control}
                name={"birthdate"}
                placeholder="Data de Aniversario"
              />

              <InputMaskForm
                formControl={form.control}
                className="w-full max-w-[50%]"
                name={"tax_document"}
                mask={"___.___.___-__"}
                placeholder="Digite seu CPF"
                disable={!admin}
              />
            </div>

            <div className=" py-2 flex gap-2 w-full">
              {admin ? (
                <InputMultiSelectForm
                  formControl={form.control}
                  label={"Faculdade"}
                  name={"university"}
                  placeholder="Universidade"
                  maxItens={1}
                  className="w-full"
                  itens={
                    universitys && optionsSelects(universitys, "id", "name")
                  }
                />
              ) : (
                <InputForm
                  formControl={form.control}
                  name={"university"}
                  placeholder="Universidade"
                  className=" w-full"
                  label="Faculdade"
                  disable={!admin}
                />
              )}
            </div>
            <div className=" py-2 flex gap-2 w-full">
              <InputMultiSelectForm
                formControl={form.control}
                label={"Ano"}
                placeholder="Selecione"
                name={`school_term`}
                maxItens={1}
                className="w-full"
                itens={optionsSelects(Anos, "value", "label")}
              />
            </div>

            <div className="py-2">
              <InputDocForm
                label={"Foto de Perfil"}
                formControl={form.control}
                name={"picture"}
                accept="image/*"
              />
            </div>

            <Button className="w-full" disabled={load} type="submit">
              {load ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Editar"
              )}
            </Button>
            <Button
              variant={"outline"}
              className="mt-2 mb-4 w-full"
              onClick={() => route.replace("/auth/signin")}
            >
              Voltar
            </Button>
          </form>
        </Form>
      </div>
    </CardContent>
  );
}
