import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { InputForm } from "@/components/Inputs/InputForm";
import { Loader2 } from "lucide-react";

const REG_Mai =
  /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/g;

const formSchema = z
  .object({
    password: z.string({ required_error: "É necessário uma senha" }),
    newPassword: z
      .string({ required_error: "É necessário uma senha" })
      .regex(new RegExp(REG_Mai), {
        message:
          "A senha deve conter pelo menos um caractere maiúsculo, um caractere especial e um número",
      }),
    confirmNewPassword: z
      .string({
        required_error: "É necessário uma confirmação",
      })
      .regex(new RegExp(REG_Mai), {
        message:
          "A senha deve conter pelo menos um caractere maiúsculo, um caractere especial e um número",
      }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "As senhas não combinam",
  });

export function TrocarSenha() {
  const { toast } = useToast();
  const route = useRouter();
  const [load, setLoad] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const axiosAuth = useAxiosAuth();

  const onSubmit = async (values: any) => {
    setLoad(true)
    const newValues = {
      new_password: values.newPassword,
      password: values.password,
    };

    axiosAuth
      .post("/auth/password/change", newValues)
      .then((e) => {
        toast({
          title: "Sucesso!",
          description:
            "Senha altarada com sucesso! Você será redirecionado em 3 segundos.",
        });

        return setTimeout(() => route.replace('/app'), 3000)
      })
      .catch((e) => {
        if(e.response.data.Message === 'An error occurred (NotAuthorizedException) when calling the ChangePassword operation: Incorrect username or password.'){
          toast({
            title: "Erro!",
            description:
              "A senha atual esta incorreta, revise-a e tente novamente",
          });
          setLoad(false)
        }
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-[15rem]"
        
        >
          Trocar Senha
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Trocar Senha</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="full max-w-[350px] m-auto text-card-foreground flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2"
              encType="multipart/form-data"
            >
              <InputForm
                formControl={form.control}
                name={"password"}
                label="Senha Atual"
                className="py-2"
                type="password"
              />
              <InputForm
                formControl={form.control}
                name={"newPassword"}
                label="Nova Senha"
                className="py-2"
                type="password"
              />
              <InputForm
                formControl={form.control}
                name={"confirmNewPassword"}
                label="Confirme a Nova Senha"
                className="py-2"
                type="password"
              />
              <DialogFooter>
                <Button type="submit" disabled={load}>{load ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Salvar senha'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
