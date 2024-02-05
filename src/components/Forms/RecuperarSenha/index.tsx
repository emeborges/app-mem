"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { InputForm } from "../../Inputs/InputForm";
import axios from "@/lib/axios";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const REG_Mai =
  /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g;

const formSchema = z
  .object({
    code: z.string({
      required_error: "É necessário um código",
    }),
    password: z
      .string({ required_error: "É necessário uma senha" })
      .min(8, { message: "Sua senha é muito curta" })
      .regex(new RegExp(REG_Mai), {
        message:
          "A senha deve conter pelo menos um caractere maiúsculo, um caractere especial e um número",
      }),
    confirmPassword: z
      .string({ required_error: "É necessário uma senha" })
      .min(8, { message: "Sua senha é muito curta" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não combinam",
  });

interface Props {
  email: string;
}

export function RecuperarForm({ email }: Props) {
  // ...
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [load, setLoad] = useState(false);
  const { toast } = useToast();
  const route = useRouter();

  const onSubmit = (values: any) => {
    setLoad(true);

    const newValues = {
      email,
      new_password: values.password,
      code: values.code,
    };

    axios
      .post("/auth/password/confirmation", newValues)
      .then((e) => {
        toast({
          title: "Sucesso!",
          description:
            "Senha trocada com sucesso, você será redirecionado para a área de login em 3 segundos.",
        });
        return route.push("/auth/signin");
      })
      .catch((e) =>
        toast({
          title: "Erro!",
          description:
            "Algo deu errado, espere um momento e tente novamente mais tarde.",
        })
      );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <InputForm
          formControl={form.control}
          type={"text"}
          placeholder={"Código"}
          name="code"
        />

        <InputForm
          formControl={form.control}
          name={"password"}
          type="password"
          placeholder="Digite uma nova senha"
        />

        <InputForm
          formControl={form.control}
          name={"confirmPassword"}
          type="password"
          placeholder="Confirme sua senha"
        />
        <Button disabled={load} type="submit">
          {load ? (
            <Loader2 className="mr-2 ml-4 h-4 w-4 animate-spin" />
          ) : (
            "Enviar"
          )}
        </Button>
      </form>
    </Form>
  );
}
