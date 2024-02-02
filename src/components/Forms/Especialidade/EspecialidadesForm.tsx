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
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string({
    required_error: "É necessário um nome.",
  }),
});

interface Props {
  initialValues?: SpecialityI;
}

export function EspecialidadesForm({ initialValues }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const route = useRouter();
  const [load, setLoad] = useState(false);

  const onSubmit = (values: any) => {
    setLoad(true);

    if (initialValues) {
      axiosAuth
        .patch(`/speciality/${initialValues.id}`, { speciality: values })
        .then((e) => {
          toast({
            title: "Sucesso!",
            description:
              "Especialidade editada com sucesso, você será redirecionado em 3 segundos.",
          });

          return setTimeout(() => route.push("/admin/especialidades"), 3000);
        })
        .catch((e) => {
          toast({
            title: "Erro!",
            description: "Algo deu errado, por gentileza, tente mais tarde.",
          });
          setLoad(false);
          return;
        });
    } else {
      axiosAuth
        .post("/speciality", { speciality: values })
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
          setLoad(false);
          return;
        });
    }
  };

  useEffect(() => {
    initialValues &&
      form.reset({
        name: initialValues.name,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function deleteEspecialidade() {
    setLoad(true);
    axiosAuth
      .delete(`/speciality/${initialValues?.id}`)
      .then((e) => {
        toast({
          title: "Sucesso!",
          description:
            "Especialidade deletada com sucesso, você será redirecionado em 3 segundos.",
        });

        return setTimeout(() => route.push("/admin/especialidades"), 3000);
      })
      .catch((e) => {
        toast({
          title: "Erro!",
          description: "Algo deu errado, por gentileza, tente mais tarde.",
        });
        setLoad(false);
        return;
      });
  }

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

          <Button
            className="w-full"
            disabled={load || (initialValues && !initialValues.is_active)}
            type="submit"
          >
            {load ? (
              <Loader2 className="mr-2 ml-4 h-4 w-4 animate-spin" />
            ) : (
              "Enviar"
            )}
          </Button>
        </form>
      </Form>

      {initialValues && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={"outline"}
              className="w-full mt-2"
              disabled={load || !initialValues?.is_active}
              type="submit"
            >
              {load ? (
                <Loader2 className="mr-2 ml-4 h-4 w-4 animate-spin" />
              ) : (
                "Excluir"
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Você tem certeza que desejar apagar este registro??
              </AlertDialogTitle>
              <AlertDialogDescription>
                Apagando este registro, não será possível altera-lo novamente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={deleteEspecialidade}>
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
