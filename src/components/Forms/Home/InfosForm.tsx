"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { InputForm } from "../../Inputs/InputForm";
import { TextInput } from "../../Inputs/TextInput";
import axios from "@/lib/axios";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string({ required_error: "É necessário um nome." }).min(2, {
    message: "É necessário ao menos 2 caracters.",
  }),
  email: z
    .string({ required_error: "É necessário um email para prosseguir." })
    .email("É necessário um e-mail válido."),
  message: z.string({ required_error: "É necessário uma mensagem." }),
});

export function InfosForm() {
  const [load, setLoad] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: any) => {
    setLoad(true);

    axios
      .post("/contactus", { contact: values })
      .then((e) => {
        toast({
          title: "Sucesso!",
          description: "Mensagem enviada com sucesso, respondemos em até 24 horas úteis.",
        });

        setLoad(false);
        return;
      })
      .catch((e) => {
        toast({
          title: "Erro!",
          description: "Algo deu errado, tente novamente mais tarde.",
        });

        setLoad(false);
        return;
      });

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <InputForm
          formControl={form.control}
          type={"text"}
          placeholder={"Nome"}
          name="name"
        />
        <InputForm
          formControl={form.control}
          type={"email"}
          name="email"
          placeholder={"E-mail"}
        />
        <TextInput
          formControl={form.control}
          name="message"
          placeholder={"Mensagem"}
        />
        <Button disabled={load} type="submit">
          {load ? (
            <Loader2 className="mr-2 ml-4 h-4 w-4 animate-spin" />
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
    </Form>
  );
}
