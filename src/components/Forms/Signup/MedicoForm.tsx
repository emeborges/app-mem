"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import '../../react-datepicker.css'
import { formatISO, sub } from "date-fns";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { FileRequestI } from "@/types/geralsI";
import axios from "@/lib/axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { InputForm } from "@/components/Inputs/InputForm";
import { InputMaskForm } from "@/components/Inputs/InputMaskForm";
import { InputDateForm } from "@/components/Inputs/InputDateForm";
import { InputSelectForm } from "@/components/Inputs/InputSelectForm";
import { InputDocForm } from "@/components/Inputs/InputDocForm";
import { InputCheckboxForm } from "@/components/Inputs/InputCheckBoxForm";
import { Estados } from "@/utils/options";

const REG_Mai =
  /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g;

const formSchema = z
  .object({
    name: z.string({ required_error: "Nome é necessário" }),
    email: z
      .string({ required_error: "Email é necessário" })
      .email({ message: "E-mail inválido" }),
    phone_number: z.string({ required_error: "É necessário um número" }),
    tax_document: z.string({ required_error: "É necessário um CPF" }),
    birthdate: z
      .date({
        required_error: "É necessário uma data válida",
      })
      .max(sub(new Date(), { years: 18 }), {
        message: "É necessário ser maior de 18 anos",
      }),
    picture: z.object(
      {
        type: z.string({ required_error: "É necessário uma foto de perfil" }),
        content: z.string({
          required_error: "É necessário uma foto de perfil",
        }),
      },
      { required_error: "É necessário uma foto de perfil" }
    ),
    professional_certificate: z.string({
      required_error: "É necessário um CRM",
    }),
    federative_unit_professional_certificate: z.string({
      required_error: "É necessário um Estado",
    }),
    password: z
      .string({ required_error: "É necessário uma senha" })
      .min(8, { message: "Sua senha é muito curta" })
      .regex(new RegExp(REG_Mai), {
        message: "A senha deve conter pelo menos um caractere maiúsculo, um caractere especial e um número",
      }),
    confirmPassword: z
      .string({ required_error: "É necessário uma senha" })
      .min(8, { message: "Sua senha é muito curta" }),
    usage_terms: z.literal(true, {
      errorMap: () => ({ 
        message: "É necessário confirmar os termos de uso",
      })
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não combinam",
  });

interface Props {
  handleUseSelectedTab: (number: number) => void;
}

interface ValuesProps {
  name: string;
  email: string;
  phone_number: string;
  birthdate: Date;
  tax_document: string;
  picture: FileRequestI;
  professional_certificate: string;
  federative_unit_professional_certificate: string;
  password: string;
  usage_terms: boolean;
}

export function MedicoSignup({ handleUseSelectedTab }: Props) {
  const { toast } = useToast();
  const route = useRouter();
  const [load, setLoad] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: ValuesProps) => {
    const data = {
      email: values.email,
      password: values.password,
      details: {
        name: values.name,
        birthdate: formatISO(values.birthdate),
        phone_number: values.phone_number,
        tax_document: values.tax_document,
        //picture: values.picture,
        professional_certificate: values.professional_certificate,
        federative_unit_professional_certificate:
          values.federative_unit_professional_certificate,
        usage_terms: values.usage_terms,
      },
    };
    setLoad(true);
    await axios
      .post(`/auth/signup/medic`, data)
      .then((e) => {
        toast({
          title: "Sucesso!",
          description:
            "Seu cadastro foi recebido, iremos enviar um e-mail para confirmação",
        });

        return setTimeout(() => handleUseSelectedTab(2), 1000);
      })
      .catch((e) => {
        toast({
          title: "Erro!",
          description: "Algo deu errado, por gentileza, tente mais tarde.",
        });
        setLoad(false);
        return;
      });
  };

  return (
    <div>
      <CardContent className="grid gap-2 py-2">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex-col"
              encType="multipart/form-data"
            >
              <ScrollArea className="h-[350px] overflow-auto">
                <InputForm
                  formControl={form.control}
                  name={"name"}
                  placeholder="Digite seu Nome"
                  className="py-2"
                />
                <InputForm
                  formControl={form.control}
                  name={"email"}
                  placeholder="Digite seu melhor e-mail"
                  className="py-2"
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
                  />
                </div>

                <div className=" py-2 flex gap-2 w-full">
                  <InputForm
                    formControl={form.control}
                    name={"professional_certificate"}
                    type="number"
                    placeholder="Digite seu CRM"
                    className="w-full max-w-[50%]"
                  />
                  <InputSelectForm
                    formControl={form.control}
                    placeholder="Estado do CRM"
                    name={"federative_unit_professional_certificate"}
                    className="w-full max-w-[50%]"
                    itens={Estados}
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

                <InputForm
                  formControl={form.control}
                  name={"password"}
                  type="password"
                  className="py-2"
                  placeholder="Digite uma senha"
                />

                <InputForm
                  formControl={form.control}
                  name={"confirmPassword"}
                  type="password"
                  className="py-2"
                  placeholder="Confirme sua senha"
                />

                <div className="py-4 pt-2">
                  <InputCheckboxForm
                    formControl={form.control}
                    name={"usage_terms"}
                    className="flex py-2 items-center gap-2"
                    label={
                      <div>
                        Estou ciente e concordo com os{" "}
                        <span
                        className={'cursor-pointer mr-1 text-bold underline'}
                          onClick={() =>
                            window.open(
                              "https://s3.sa-east-1.amazonaws.com/dev.mem.publicread/static/TERMOS+E+CONDIC%CC%A7O%CC%83ES+DE+USO+MEM+FINAL.pdf"
                            )
                          }
                        >
                          Termos de Uso
                        </span>
                        e{" "}
                        <br />
                        <span
                          className={'cursor-pointer text-bold underline'}
                          onClick={() =>
                            window.open(
                              "https://s3.sa-east-1.amazonaws.com/dev.mem.publicread/static/Politica+de+privacidade+MEM+atualizado.pdf"
                            )
                          }
                        >
                          Políticas de privacidade
                        </span>
                        .
                      </div>
                    }
                  />
                </div>

                <Button className="w-full" disabled={load} type="submit">
                  {load ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
                <Button
                  variant={"outline"}
                  className="mt-2 mb-4 w-full"
                  onClick={() => route.replace("/auth/signin")}
                >
                  Voltar
                </Button>
              </ScrollArea>
            </form>
          </Form>
        </div>
      </CardContent>
    </div>
  );
}
