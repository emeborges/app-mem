"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { InputForm } from "../../Inputs/InputForm";
import { InputMaskForm } from "@/components/Inputs/InputMaskForm";
import {
  Estados,
  LocationsTypes,
  ModalitiesTypes,
  enumTypeObj,
  optionsSelects,
} from "@/utils/options";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { LocationsI, ModalitysI, SpecialityI, TypesI } from "@/types/geralsI";
import { useEffect, useState } from "react";
import { InputMultiSelectForm } from "@/components/Inputs/InputMultiSelectForm";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string({ required_error: "Nome é necessário" }),
  specialities: z.array(
    z.object(
      {
        label: z.string(),
        value: z.string(),
      },
      { required_error: "Selecione uma Especialidade" }
    )
  ),
  location_type: z.array(
    z.object(
      {
        label: z.string(),
        value: z.string(),
      },
      { required_error: "Selecione uma Especialidade" }
    )
  ),
  modality: z.array(
    z.object(
      {
        label: z.string(),
        value: z.string(),
      },
      { required_error: "Selecione uma Modalidade" }
    )
  ),
  address: z.object({
    street: z.string({ required_error: "Rua é necessário" }),
    street_number: z.string({ required_error: "Número é necessário" }),
    complement: z.string({ required_error: "Complemento é necessário" }),
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
  initialValues?: LocationsI;
}

export function LocationForm({ initialValues }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [types, setTypes] = useState<TypesI[] | void[]>();
  const [specialities, setSpecialities] = useState<SpecialityI[]>();
  const [modalities, setModalities] = useState<ModalitysI[]>();
  const axiosAuth = useAxiosAuth();
  const { toast } = useToast();
  const route = useRouter();
  const [load, setLoad] = useState(false);

  const onSubmit = (values: any) => {
    setLoad(true)

    const newValues = {
      ...values,
      location_type: values.location_type[0].value,
      modality: values.modality[0].value,
      specialities: values.specialities.map((x: any) => x.label),
      address: {
        ...values.address,
        federative_unit_st: values.address.federative_unit_st[0].value,
      },
    };

    initialValues &&
      axiosAuth
        .patch(`/location/${initialValues.id}`, { location: newValues })
        .then((e) => {
          toast({
            title: "Sucesso!",
            description:
              "Local editado com sucesso. Você será redirecionado em 3 segundos.",
          });
          return setTimeout(() => route.back(), 3000);
        })
        .catch((e) => {
          toast({
            title: "Erro!",
            description: "Algo deu errado, por gentileza, tente mais tarde.",
          });
          setLoad(false)
          return;
        });
  };

  async function getDados() {
    await Promise.all([
      axiosAuth.get("/location/defaults").then((e) => {
        setTypes(enumTypeObj(e.data.location_types));
        setModalities(enumTypeObj(e.data.modalities));
      }),
      axiosAuth.get("/specialities").then((e) => {
        setSpecialities(enumTypeObj(e.data));
      }),
    ]);
  }

  useEffect(() => {
    setTimeout(getDados, 2000);

    initialValues &&
      form.reset({
        name: initialValues.name,
        specialities:
          initialValues.specialities &&
          initialValues.specialities.map((x) => {
            return {
              value: x.id?.toString(),
              label: x.name,
            };
          }),
        location_type: [
          LocationsTypes.find((x) => x.value === initialValues.location_type),
        ],
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full m-auto max-w-[450px]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div>
            <div className="m-w-[200px] w-full">
              <InputForm
                label="Qual será o apelido do local? "
                className="w-full"
                formControl={form.control}
                name={`name`}
              />
            </div>
            <div className="py-1 flex flex-col gap-2 max-w-[440px]">
              <InputMultiSelectForm
                formControl={form.control}
                label={"Especialidade(s)"}
                placeholder="Selecione"
                name={`specialities`}
                className="w-full"
                itens={
                  specialities && optionsSelects(specialities, "id", "name")
                }
              />
            </div>
            <div className="py-1 flex gap-2 flex-wrap">
              <InputMultiSelectForm
                formControl={form.control}
                placeholder="Selecione"
                label={"Tipo"}
                name={`location_type`}
                className="w-full"
                itens={types && optionsSelects(types, "id", "name")}
                maxItens={1}
              />

              <InputMultiSelectForm
                formControl={form.control}
                placeholder="Selecione"
                label="Modalidade do Local"
                name={`modality`}
                className="w-full"
                itens={modalities && optionsSelects(modalities, "id", "name")}
                maxItens={1}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <InputForm
                formControl={form.control}
                label="Rua"
                name={`address.street`}
              />
              <InputForm
                formControl={form.control}
                label="Numero"
                name={`address.street_number`}
              />
              <InputForm
                formControl={form.control}
                label="Complemento"
                name={`address.complement`}
              />
              <InputForm
                formControl={form.control}
                label="Bairro"
                name={`address.neighbourhood`}
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              <InputMaskForm
                formControl={form.control}
                name={"address.postal_code"}
                mask={"__.___-___"}
                label="CEP"
              />
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
                className="w-full"
                itens={optionsSelects(Estados, "value", "label")}
                maxItens={1}
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={load}>
            {load ? (
              <Loader2 className="mr-2 ml-4 h-4 w-4 animate-spin" />
            ) : (
              "Enviar"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
