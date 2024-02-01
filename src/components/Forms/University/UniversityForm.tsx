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
import {
  Estados,
  LocationsTypes,
  Modalidade,
  ModalitiesTypes,
  enumTypeObj,
  optionsSelects,
} from "@/utils/options";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ModalitysI, UniversityI } from "@/types/geralsI";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { InputMultiSelectForm } from "@/components/Inputs/InputMultiSelectForm";
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

const formSchema = z.object({
  name: z.string({
    required_error: "É necessário um nome.",
  }),
  description: z
    .string({
      required_error: "É necessário uma descrição.",
    })
    .nullable()
    .optional(),
  modality: z.array(
    z.object(
      {
        label: z.string(),
        value: z.string(),
      },
      { required_error: "Selecione uma Modalidade" }
    ),
    { required_error: "Selecione uma Modalidade" }
  ),
  address: z.object({
    street: z.string({ required_error: "Rua é necessário" }),
    street_number: z.string({ required_error: "Número é necessário" }),
    complement: z.string().optional().nullable(),
    neighbourhood: z.string({ required_error: "Bairro é necessário" }),
    postal_code: z.string({ required_error: "CEP é necessário" }),
    city: z.string({ required_error: "Cidade é necessário" }),
    federative_unit_st: z.array(
      z.object(
        {
          label: z.string(),
          value: z.string(),
        },
        { required_error: "Selecione uma Estado" }
      )
    ),
  }),
});

interface Props {
  initialValues?: UniversityI;
}

export function UniversityForm({ initialValues }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const route = useRouter();
  const [load, setLoad] = useState(false);
  const [modalities, setModalities] = useState<ModalitysI[]>();

  const onSubmit = (values: any) => {
    setLoad(true);

    const newValues = {
      university: {
        ...values,
        modality: values.modality[0].value,
        address: {
          ...values.address,
          federative_unit_st: values.address.federative_unit_st[0].value,
        },
      },
    };

    if (initialValues) {
      axiosAuth
        .patch(`/university/${initialValues.id}`, newValues)
        .then((e) => {
          toast({
            title: "Sucesso!",
            description:
              "Universidade editada com sucesso, você será redirecionado em 3 segundos.",
          });

          return setTimeout(() => route.push("/admin/universidades"), 3000);
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
        .post("/university", newValues)
        .then((e) => {
          toast({
            title: "Sucesso!",
            description:
              "Universidade adicionada com sucesso, você será redirecionado em 3 segundos.",
          });

          return setTimeout(() => route.push("/admin/universidades"), 3000);
        })
        .catch((e) => {
          toast({
            title: "Erro!",
            description: "Algo deu errado, por gentileza, tente mais tarde.",
          });

          return;
        });
    }
  };

  async function getDados() {
    await axiosAuth.get("/location/defaults").then((e) => {
      setModalities(enumTypeObj(e.data.modalities));
    });
  }

  async function deleteUniversity() {
    setLoad(true)

    console.log('excluir')
    setTimeout(() => setLoad(false), 2000)
  }

  useEffect(() => {
    setTimeout(getDados, 2000);
    console.log(initialValues);
    initialValues &&
      form.reset({
        name: initialValues.name,
        description: initialValues.description,
        modality: [
          ModalitiesTypes.find((x) => x.value === initialValues.modality),
        ],
        address: {
          street: initialValues.address?.street,
          street_number: initialValues.address?.street_number,
          complement: initialValues.address?.complement,
          neighbourhood: initialValues.address?.neighbourhood,
          city: initialValues.address?.city,
          postal_code: initialValues.address?.postal_code,
          federative_unit_st: [
            Estados.find(
              (x) => x.value === initialValues.address?.federative_unit_st
            ),
          ],
        },
      });
  }, []);

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
          <InputForm
            formControl={form.control}
            type={"text"}
            name="description"
            label={"Descrição"}
          />
          <InputMultiSelectForm
            formControl={form.control}
            placeholder="Selecione"
            label="Modalidade"
            name={`modality`}
            className="w-full"
            itens={modalities && optionsSelects(modalities, "id", "name")}
            maxItens={1}
          />
          <div className="flex gap-2 flex-wrap">
            <div className="w-full">
              <InputForm
                formControl={form.control}
                label="Rua"
                className="w-full"
                name={`address.street`}
              />
              <InputForm
                formControl={form.control}
                label="Numero"
                name={`address.street_number`}
              />
            </div>
            <div className="w-full flex gap-2">
              <InputForm
                formControl={form.control}
                label="Complemento"
                className="w-full"
                name={`address.complement`}
              />
            </div>
            <div className="flex w-full gap-2">
              <InputForm
                formControl={form.control}
                label="Bairro"
                name={`address.neighbourhood`}
              />
              <InputMaskForm
                formControl={form.control}
                name={"address.postal_code"}
                mask={"__.___-___"}
                label="CEP"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <InputForm
              formControl={form.control}
              label="Cidade"
              name={`address.city`}
            />
            <InputMultiSelectForm
              formControl={form.control}
              placeholder="Selecione"
              label="Estado"
              name={`address.federative_unit_st`}
              className="w-[50%]"
              itens={optionsSelects(Estados, "value", "label")}
              maxItens={1}
            />
          </div>
          <Button className="w-full" disabled={load || !initialValues?.is_active} type="submit">
            {load ? (
              <Loader2 className="mr-2 ml-4 h-4 w-4 animate-spin" />
            ) : (
              "Enviar"
            )}
          </Button>
        </form>
      </Form>
      {initialValues && initialValues.is_active && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant={"outline"} className="w-full mt-2">
              Excluir
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza que desejar apagar este registro??</AlertDialogTitle>
              <AlertDialogDescription>
                Apagando este registro, não será possível busca-lo novamente.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={deleteUniversity}>Excluir</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
