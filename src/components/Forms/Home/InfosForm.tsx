"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { InputForm } from "../../Inputs/InputForm";
import { TextInput } from "../../Inputs/TextInput";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "É necessário ao menos 2 caracters.",
  }),
  email: z.string().email('É necessário um e-mail válido'),
  text: z.string(),

});

export function InfosForm() {
  // ...
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (values: any) => {
    console.log(values)
  }

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
          name="text"
          placeholder={"Mensagem"}
        />
        <Button type="submit" className="w-full">Enviar</Button>
      </form>
    </Form>
  );
}
