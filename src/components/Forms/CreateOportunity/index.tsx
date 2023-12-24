"use client";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import {
  Estados,
  Semestres,
  enumTypeObj,
  optionsSelects,
} from "@/utils/options";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  ActivityI,
  MedicI,
  ModalitysI,
  OpeningI,
  SpecialityI,
  StudentI,
  TypesI,
} from "@/types/geralsI";
import { useRouter } from "next/navigation";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/components/ui/use-toast";
import { Session } from "next-auth/core/types";
import { Switch } from "@/components/ui/switch";
import { InputForm } from "@/components/Inputs/InputForm";
import { InputSelectForm } from "@/components/Inputs/InputSelectForm";
import { InputMultiSelectForm } from "@/components/Inputs/InputMultiSelectForm";
import { InputMaskForm } from "@/components/Inputs/InputMaskForm";
import { InputSimpleDate } from "@/components/Inputs/InputDatePicker";
import { TextInput } from "@/components/Inputs/TextInput";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

interface Props {
  initialValues?: OpeningI;
  session: Session | undefined | null;
}

const formSchema = z
  .object({
    location: z
      .object({
        name: z.string({ required_error: "Nome é necessário" }),
        location_type: z.string({ required_error: "Selecione uma tipo" }),
        modality: z.string({ required_error: "Selecione uma modalidede" }),
        specialities: z
          .object(
            {
              label: z.string(),
              value: z.string(),
            },
            { required_error: "Selecione uma(s) Especialidade(s)" }
          )
          .array()
          .transform((id) => id.map((x) => x.label)),
        address: z.object({
          street: z.string({ required_error: "Rua é necessário" }),
          street_number: z.string({ required_error: "Número é necessário" }),
          complement: z.string().optional().nullable(),
          neighbourhood: z.string({ required_error: "Bairro é necessário" }),
          postal_code: z.string({ required_error: "CEP é necessário" }),
          city: z.string({ required_error: "Cidade é necessário" }),
          federative_unit_st: z.string({
            required_error: "Selecione um Estado",
          }),
        }),
      })
      .or(
        z.object({
          id: z.string({ required_error: "Selecione um local" }),
        })
      ),
    speciality: z
      .object(
        {
          label: z.string(),
          value: z.string(),
        },
        { required_error: "Selecione uma Especialidade" }
      )
      .array()
      .transform((id) => id[0].label),
    activities: z
      .object(
        {
          label: z.string(),
          value: z.string(),
        },
        { required_error: "Selecione uma Atividade" }
      )
      .array()
      .transform((id) => id.map((x) => x.label)),
    due_date: z.date({ required_error: "Data de vencimento é necessária" }).or(
      z.string({
        required_error: "Data de vencimento é necessária",
      })
    ),
    start_date: z.date({ required_error: "Data de início é necessário" }).or(
      z.string({
        required_error: "Data de início é necessário",
      })
    ),
    end_date: z.date({ required_error: "Data de término é necessário" }).or(
      z.string({
        required_error: "Data de término é necessário",
      })
    ),
    school_term_min: z
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
    school_term_max: z
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
      .transform((id) => Number(id[0].label)),
    total_hours: z
      .string({
        required_error: "Quantidade de horas é necessário",
      })
      .transform((x) => Number(x)),
    description: z.string().optional().nullable(),
  })
  .refine(
    (data) => Number(data.school_term_min) <= Number(data.school_term_max),
    {
      path: ["school_term_max"],
      message: "Semestre final não pode ser menor que semestre inicial.",
    }
  )
  .refine((data) => data.end_date > data.start_date, {
    path: ["end_date"],
    message: "A data final não pode ser maior que a data inicial.",
  })
  .refine((data) => data.due_date <= data.start_date, {
    path: ["due_date"],
    message: "A data final de inscrição não pode ser maior que a data inicial.",
  });

export const OportunidadeForm = ({ initialValues }: Props) => {
  const [modalities, setModalities] = useState<ModalitysI[]>();
  const [types, setTypes] = useState<TypesI[] | void[]>();
  const [specialities, setSpecialities] = useState<SpecialityI[]>();
  const [activities, setActivities] = useState<ActivityI[]>();
  const [novoEndereco, setNovoEndereco] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [me, setMe] = useState<MedicI | StudentI | any>();
  const router = useRouter();
  const axiosAuth = useAxiosAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: any) => {
    setLoading(true);

    const obj = {
      opening: {
        ...values,
        name: `Estágio em ${values.speciality}`,
      },
    };

    if (initialValues) {
      delete obj.opening.location;

      return axiosAuth
        .patch(`/opening/${initialValues.id}`, obj)
        .then((e) => {
          toast({
            title: "Sucesso!",
            description:
              "Excelente, a oportunidade foi editada! Você será redirecionado em 5 segundos",
          });

          return setTimeout(() => router.push("/app/"), 5000);
        })
        .catch((e) => {
          toast({
            title: "Erro!",
            description: "Contate o suporte e tente novamente mais tarde!",
          });
          setLoading(false);
          // return setTimeout(() => router.push("/app/"), 5000);
        });
    } else {
      return axiosAuth
        .post("/opening", obj)
        .then((e) => {
          toast({
            title: "Sucesso!",
            description:
              "Excelente, a oportunidade foi criada! Você será redirecionado em 5 segundos",
          });

          return setTimeout(() => router.push("/app/"), 5000);
        })
        .catch((e) => {
          toast({
            title: "Erro!",
            description: "Contate o suporte e tente novamente mais tarde!",
          });
          setLoading(false);
          // return setTimeout(() => router.push("/app/"), 5000);
        });
    }
  };

  async function getDados() {
    await Promise.all([
      axiosAuth.get("/location/defaults").then((e) => {
        setTypes(enumTypeObj(e.data.location_types));
        setModalities(enumTypeObj(e.data.modalities));
      }),
      axiosAuth.get("/activities").then((e) => {
        setActivities(enumTypeObj(e.data));
      }),
      axiosAuth.get("/specialities").then((e) => {
        setSpecialities(enumTypeObj(e.data));
      }),
      axiosAuth.get("/me").then((e) => {
        setMe(e.data);
      }),
    ]);
  }

  useEffect(() => {
    setTimeout(getDados, 2000);

    if (me?.locations && me?.locations.length > 0) setNovoEndereco(false);

    if (initialValues) {
      form.reset({
        location: { id: initialValues.location?.id },
        speciality: [
          {
            value: initialValues.speciality?.id?.toString(),
            label: initialValues.speciality?.name,
          },
        ],
        activities:
          initialValues.activities &&
          optionsSelects(initialValues.activities, "id", "name"),
        due_date: initialValues.due_date,
        end_date: initialValues.end_date,
        start_date: initialValues.start_date,
        school_term_min: [
          {
            label: initialValues.school_term_min?.toString(),
            value: initialValues.school_term_min?.toString(),
          },
        ],
        school_term_max: [
          {
            label: initialValues.school_term_max?.toString(),
            value: initialValues.school_term_max?.toString(),
          },
        ],
        total_hours: `${initialValues.total_hours}`,
        description: initialValues.description,
      });
      setNovoEndereco(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <div className="px-4 flex flex-col gap-2 flex-wrap">
            <div className="flex flex-wrap gap-2">
              <p>Em qual local será realizado?</p>
              <div className="flex items-center space-x-2">
                <Switch
                  id="airplane-mode"
                  disabled={
                    (me?.locations && me?.locations.length == 0) ||
                    !!initialValues
                  }
                  checked={novoEndereco}
                  onCheckedChange={() => {
                    form.setValue("location.id", undefined);
                    return setNovoEndereco(!novoEndereco);
                  }}
                />
                <Label
                  htmlFor="airplane-mode"
                  className={`${!novoEndereco && "text-slate-500"}`}
                >
                  Cadastrar Novo
                </Label>
              </div>
            </div>
            {novoEndereco ? (
              <div>
                <div className="m-w-[200px] w-full">
                  <InputForm
                    label="Qual será o apelido do local? "
                    className="w-full"
                    formControl={form.control}
                    name={`location.name`}
                  />
                </div>
                <div className="py-1 flex flex-col gap-2 max-w-[440px]">
                  <InputMultiSelectForm
                    formControl={form.control}
                    label={"Especialidade(s) do Local"}
                    placeholder="Selecione"
                    name={`location.specialities`}
                    className="w-full"
                    itens={
                      specialities && optionsSelects(specialities, "id", "name")
                    }
                  />
                </div>
                <div className="py-1 flex gap-2 flex-wrap">
                  <InputSelectForm
                    formControl={form.control}
                    placeholder="Selecione"
                    label={"Tipo"}
                    name={`location.location_type`}
                    className="max-w-[400px] min-w-[10rem]"
                    itens={types && optionsSelects(types, "id", "name")}
                  />
                  <InputSelectForm
                    formControl={form.control}
                    placeholder="Selecione"
                    label="Modalidade do Local"
                    name={`location.modality`}
                    className="max-w-[400px] min-w-[10rem]"
                    itens={
                      modalities && optionsSelects(modalities, "id", "name")
                    }
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <InputForm
                    formControl={form.control}
                    label="Rua"
                    name={`location.address.street`}
                  />
                  <InputForm
                    formControl={form.control}
                    label="Numero"
                    name={`location.address.street_number`}
                  />
                  <InputForm
                    formControl={form.control}
                    label="Complemento"
                    name={`location.address.complement`}
                  />
                  <InputForm
                    formControl={form.control}
                    label="Bairro"
                    name={`location.address.neighbourhood`}
                  />
                </div>

                <div className="flex gap-2 flex-wrap">
                  <InputMaskForm
                    formControl={form.control}
                    name={"location.address.postal_code"}
                    mask={"__.___-___"}
                    label="CEP"
                  />
                  <InputForm
                    formControl={form.control}
                    label="Cidade"
                    name={`location.address.city`}
                  />
                  <InputSelectForm
                    formControl={form.control}
                    label="Estado"
                    name={`location.address.federative_unit_st`}
                    className="max-w-[400px] min-w-[10rem]"
                    itens={optionsSelects(Estados, "value", "label")}
                  />
                </div>
              </div>
            ) : (
              <div>
                <InputSelectForm
                  formControl={form.control}
                  placeholder="Selecione o local cadastrado"
                  name={`location.id`}
                  className="max-w-[400px]"
                  disabled={!!initialValues}
                  itens={
                    me?.locations && optionsSelects(me?.locations, "id", "name")
                  }
                />
              </div>
            )}
          </div>

          <div className="px-4 flex flex-col gap-2 max-w-[440px]">
            <InputMultiSelectForm
              formControl={form.control}
              label={"Em qual área médica a oportunidade será voltada?"}
              placeholder="Selecione"
              name={`speciality`}
              className="w-full"
              maxItens={1}
              maxItensLabel={true}
              itens={specialities && optionsSelects(specialities, "id", "name")}
            />
          </div>
          <div className="px-4 flex flex-col gap-2 max-w-[440px]">
            <InputMultiSelectForm
              formControl={form.control}
              label={"Quais as atividades planejadas?"}
              placeholder="Selecione"
              name={`activities`}
              className="w-full"
              itens={activities && optionsSelects(activities, "id", "name")}
            />
          </div>

          <div className="px-4 flex items-center gap-2">
            <InputSimpleDate
              label="Data Final para Inscrições"
              formControl={form.control}
              name={"due_date"}
            />
          </div>
          <div className="px-4 flex items-center gap-2">
            <InputSimpleDate
              label="Data de Início da Oportunidade"
              formControl={form.control}
              name={"start_date"}
            />
          </div>
          <div className="px-4 flex items-center gap-2">
            <InputSimpleDate
              label="Data de Final da Oportunidade"
              formControl={form.control}
              name={"end_date"}
            />
          </div>
          <div className="px-4 flex flex-wrap  gap-3">
            <InputMultiSelectForm
              formControl={form.control}
              label={"Semestre Mínimo"}
              placeholder="Selecione"
              name={`school_term_min`}
              maxItens={1}
              className="max-w-[200px]"
              itens={optionsSelects(Semestres, "value", "label")}
            />

            <InputMultiSelectForm
              formControl={form.control}
              label={"Semestre Máximo"}
              placeholder="Selecione"
              name={`school_term_max`}
              className="max-w-[200px]"
              maxItens={1}
              itens={optionsSelects(Semestres, "value", "label")}
            />

            <InputForm
              label="Quantidade de Horas "
              formControl={form.control}
              placeholder="Horas"
              name={`total_hours`}
              type="number"
            />
          </div>

          <div className="px-4 flex w-full flex gap-2">
            <TextInput
              label="Descreva um pouco sobre a oportunidade:"
              formControl={form.control}
              name={`description`}
              placeholder={
                "Fale um pouco a oportunidade, qual será a rotina, quais as expectativas para o candidato e quais as suas expectativas da experiência prévia do candidato"
              }
            />
          </div>
          <Button type="submit" disabled={loading}>
            {" "}
            {initialValues ? 'Editar Estágio' : 'Criar Estágio'}
            {loading && <Loader2 className="mr-2 ml-4 h-4 w-4 animate-spin" />}
          </Button>
        </form>
      </Form>
    </div>
  );
};
