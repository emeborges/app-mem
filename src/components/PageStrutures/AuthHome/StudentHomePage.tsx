"use client";

import { EstagioCard } from "@/components/EstagioCard";
import { SingleDate } from "@/components/Inputs/InputSingleDate";
import { MultiSelect } from "@/components/Inputs/MultiSelect";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import axios from "@/lib/axios";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { MedicI, OpeningI, SpecialityI } from "@/types/geralsI";
import { editarString } from "@/utils/functions";
import { optionsSelects } from "@/utils/options";
import { differenceInDays, isAfter, isBefore, toDate } from "date-fns";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth/core/types";
import { useEffect, useState } from "react";

interface Props {
  session: Session | undefined | null;
}

interface EspecialidadeI {
  label: string;
  id: string;
}

export const StudentHomePage = ({ session }: Props) => {
  const [inicial, setInicial] = useState();
  const [final, setFinal] = useState();
  const [due, setDue] = useState();
  const [especialidades, setEspecialidades] = useState<SpecialityI[]>();
  const [espSelect, setEspSelect] = useState<EspecialidadeI[]>([]);
  const [miniLoad, setMiniLoad] = useState(false);

  const [oportunities, setOportunities] = useState<OpeningI[]>([]);
  const [filtredOpt, setFiltredOpt] = useState<OpeningI[]>([]);
  const [load, setLoad] = useState(true);
  const axiosAuth = useAxiosAuth();

  const fetchMe = async () => {
    setLoad(true);
    const res = await axiosAuth.get("/opening", { params: {} });
    const results = res.data;

    setOportunities(results);

    setTimeout(() => setLoad(false), 2000);
  };

  const getItens = async () => {
    const res = await axios.get("/specialities");
    const results = res.data;

    setEspecialidades(results);

    setTimeout(() => setLoad(false), 2000);
  };

  useEffect(() => {
    getItens();
    setTimeout(fetchMe, 2000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  function handleInitial(e: any) {
    setInicial(e);
    return;
  }

  function handleFinal(e: any) {
    if (inicial) {
      const dataInicial = toDate(inicial);
      const dataFinal = toDate(e);
      console.log(differenceInDays(dataFinal, dataInicial));
      if (differenceInDays(dataFinal, dataInicial) >= 0) {
        setFinal(e);
      } else {
        toast({
          title: "Data Final Incorreta!",
          description: "A data final deve ser maior que a data inicial",
        });
      }
    } else {
      setFinal(e);
    }

    return;
  }

  function handleDue(e: any) {
    setDue(e);

    return;
  }

  function handleEsp(e: any) {
    if (espSelect.length > 0) {
      const validacao = espSelect.find((x) => x.id === editarString(e));

      if (validacao) {
        const newValues = espSelect.filter((x) => x.id !== editarString(e));

        setEspSelect(newValues);
        return;
      }

      const values = [...espSelect, { id: editarString(e), label: e }];
      setEspSelect(values);

      return;
    }

    setEspSelect([{ id: editarString(e), label: e }]);

    return;
  }

  function handlerFilter() {
    let optsIniciais = oportunities

    inicial &&  (
      optsIniciais = optsIniciais.filter(x => x.start_date && isBefore(inicial, new Date(x.start_date)))
    )

    due && (
      optsIniciais = optsIniciais.filter(x => x.due_date && !isBefore(due, new Date(x.due_date)))
    );

    espSelect.length > 0 && (
      optsIniciais = optsIniciais.filter(x => x.speciality?.name && espSelect.some( y => y.id === editarString(`${x.speciality?.name}`))
    ));

    setFiltredOpt(optsIniciais)
  }

  return (
    <div className="w-full h-full">
      {load ? (
        <div className="h-full w-full flex items-center justify-center ">
          <Loader2 className="h-[4rem] w-[4rem] text-muted-foreground animate-spin" />
        </div>
      ) : (
        <div className="w-full h-full">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm my-2">
            <Accordion type="multiple" className="w-full border-none py-2 px-4">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="text-muted-foreground">
                  Filtros
                </AccordionTrigger>
                <AccordionContent className="flex gap-2 wrap h-full flex-col ">
                  <div className="flex gap-2 wrap h-full">
                    <div className="py-1 sm:py-0">
                      <SingleDate
                        value={inicial}
                        label="Data Inicial da Oportunidade"
                        setValue={handleInitial}
                      />
                    </div>
                    {/* <div className="py-1 sm:py-0">
                    <SingleDate
                      value={final}
                      label="Data Final da Oportunidade"
                      setValue={handleFinal}
                    />
                      </div> */}
                    <div className="py-1 sm:py-0">
                      <SingleDate
                        value={due}
                        label="Data Limite de Inscrição"
                        setValue={handleDue}
                      />
                    </div>
                    <div className="py-1 sm:py-0 h-full ">
                      <MultiSelect
                        value={espSelect}
                        label="Especialidades"
                        placeholder={"Selecione"}
                        itens={especialidades}
                        onChange={handleEsp}
                      />
                    </div>
                  </div>
                  <div>
                    <Button onClick={handlerFilter} size={"sm"}>
                      Filtrar
                    </Button>
                    <Button variant={"ghost"} size={"sm"} onClick={() => (setDue(undefined), setInicial(undefined), setEspSelect([]), setFiltredOpt([]))}>
                      Resetar Filtro
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex flex-wrap gap-2">
            {filtredOpt.length > 0
              ? filtredOpt?.map((x) => (
                  <EstagioCard
                    key={x.id}
                    opening={x}
                    userType={session?.scope}
                  />
                ))
              : oportunities?.map((x) => (
                  <EstagioCard
                    key={x.id}
                    opening={x}
                    userType={session?.scope}
                  />
                ))}
          </div>
        </div>
      )}
    </div>
  );
};
