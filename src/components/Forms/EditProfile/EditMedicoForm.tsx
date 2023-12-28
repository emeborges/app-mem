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
import {  MedicI } from "@/types/geralsI";
import { InputForm } from "@/components/Inputs/InputForm";
import { InputMaskForm } from "@/components/Inputs/InputMaskForm";
import { InputDateForm } from "@/components/Inputs/InputDateForm";
import { InputDocForm } from "@/components/Inputs/InputDocForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPrimeiraLetra } from "@/utils/functions";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

const REG_Mai =
  /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g;

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
  professional_certificate: z.string({
    required_error: "É necessário um CRM",
  }),
  federative_unit_professional_certificate: z
    .string({
      required_error: "É necessário um Estado",
    })
    .or(
      z
        .object(
          {
            label: z.string(),
            value: z.string(),
          },
          {
            required_error: "Semetre Máximo é necessário",
          }
        )
        .array()
        .transform((id) => Number(id[0].label))
    ),
});

interface Props {
  initialValues?: MedicI;
  height?: string;
}

export function EditMedicoForm({ initialValues, height }: Props) {
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
      phone_number: values.phone_number,
      birthdate: formatISO(values.birthdate),
    };

    if (values.picture) {
      newValues["picture"] = values.picture;
    }

    console.log(newValues);

    axiosAuth
      .patch("/medic", { medic: newValues })
      .then((e) => {
        route.push('/app')
      })
      .catch((e) => {
        toast({
          title: "Erro!",
          description: "Algo deu errado, por gentileza, tente mais tarde.",
        });
      });

    
  };

  useEffect(() => {
    initialValues &&
      form.reset({
        name: initialValues.name,
        email: initialValues.email,
        phone_number: initialValues.phone_number,
        birthdate: initialValues.birthdate
          ? new Date(initialValues.birthdate)
          : new Date(),
        tax_document: initialValues.tax_document,
        professional_certificate: initialValues.professional_certificate,
        federative_unit_professional_certificate:
          initialValues?.federative_unit_professional_certificate,
      });
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
              disable
            />
            <InputForm
              formControl={form.control}
              name={"email"}
              placeholder="Digite seu melhor e-mail"
              className="py-2"
              disable
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

              <InputForm
                formControl={form.control}
                className="w-full max-w-[50%]"
                name={"tax_document"}
                placeholder="Digite seu CPF"
                disable
              />
            </div>

            <div className=" py-2 flex gap-2 w-full">
              <InputForm
                formControl={form.control}
                name={"professional_certificate"}
                type="number"
                placeholder="Digite seu CRM"
                className="w-full max-w-[50%]"
                disable
              />
              <InputForm
                formControl={form.control}
                placeholder="Estado do CRM"
                name={"federative_unit_professional_certificate"}
                className="w-full max-w-[50%]"
                disable
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
