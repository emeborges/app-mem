"use client";

import { SingleDate } from "@/components/Inputs/InputSingleDate";
import { MultiSelect } from "@/components/Inputs/MultiSelect";
import { SelectSimple } from "@/components/Inputs/Select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import axios from "@/lib/axios";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { OpeningI, SpecialityI } from "@/types/geralsI";
import { editarString } from "@/utils/functions";
import { differenceInDays, format, isBefore, toDate } from "date-fns";
import { Loader2, UserCog } from "lucide-react";
import { Session } from "next-auth/core/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  session: Session | undefined | null;
}

interface ItensI {
  label: string;
  id: string | any;
}

interface Map {
  [key: string]: string | undefined;
}

const StatusOpieNUM: Map = {
  Abertas: "active",
  Fechadas: "closed",
  Selecionadas: "selected",
  Canceladas: "canceled",
};

export const OportunidadesAdmin = ({ session }: Props) => {
  const [inicial, setInicial] = useState();
  const [final, setFinal] = useState();
  const [due, setDue] = useState();
  const [especialidades, setEspecialidades] = useState<SpecialityI[]>();
  const [espSelect, setEspSelect] = useState<ItensI[]>([]);
  const [status, setStatus] = useState<string>();
  const router = useRouter();

  const [oportunities, setOportunities] = useState<OpeningI[]>([]);
  const [filtredOpt, setFiltredOpt] = useState<OpeningI[]>([]);
  const [load, setLoad] = useState(true);
  const axiosAuth = useAxiosAuth();

  const fetchOpenings = async () => {
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
    setTimeout(fetchOpenings, 2000);

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

  function handleSit(e: string) {
    setStatus(e);

    return;
  }

  function handlerFilter() {
    let optsIniciais = oportunities;

    inicial &&
      (optsIniciais = optsIniciais.filter(
        (x) => x.start_date && isBefore(inicial, new Date(x.start_date))
      ));

    due &&
      (optsIniciais = optsIniciais.filter(
        (x) => x.due_date && !isBefore(due, new Date(x.due_date))
      ));

    espSelect.length > 0 &&
      (optsIniciais = optsIniciais.filter(
        (x) =>
          x.speciality?.name &&
          espSelect.some((y) => y.id === editarString(`${x.speciality?.name}`))
      ));

    status &&
      (optsIniciais = optsIniciais.filter(
        (x) => x.status === StatusOpieNUM[status]
      ));

    setFiltredOpt(optsIniciais);
  }

  return (
    <div className="rounded-lg full border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
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
                  <div className="flex gap-2 flex-wrap h-full">
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
                    <div className="py-1 sm:py-0 h-full ">
                      <SelectSimple
                        value={status}
                        label="Inscrições"
                        placeholder={"Selecione"}
                        itens={[
                          "Abertas",
                          "Fechadas",
                          "Selecionadas",
                          "Canceladas",
                        ]}
                        onChange={handleSit}
                      />
                    </div>
                  </div>
                  <div>
                    <Button onClick={handlerFilter} size={"sm"}>
                      Filtrar
                    </Button>
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      onClick={() => (
                        setDue(undefined),
                        setInicial(undefined),
                        setEspSelect([]),
                        setFiltredOpt([])
                      )}
                    >
                      Resetar Filtro
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="rounded-lg full border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
            {/*filtredOpt.length > 0
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
              ))*/}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]"></TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Início</TableHead>
                  <TableHead>Fim</TableHead>
                  <TableHead>Max Insc</TableHead>
                  <TableHead>Qtde Insc</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {oportunities?.map((opt) => (
                  <TableRow key={opt.id}>
                    <TableCell>
                      <Button
                        variant="outline"
                        onClick={() => router.push(`/admin/oportunidades/${opt.id}`)}
                      >
                        <UserCog className="text-muted-foreground text-sm" />
                      </Button>
                    </TableCell>
                    <TableCell>{opt.name}</TableCell>

                    <TableCell>
                      {opt.location?.name} - 
                      {opt.location?.address?.city} {" "}
                      {opt.location?.address?.federative_unit_st}
                    </TableCell>

                    <TableCell>
                      {opt.start_date &&
                        format(new Date(opt.start_date), "dd/MM/yyyy")}
                    </TableCell>

                    <TableCell>
                      {opt.end_date &&
                        format(new Date(opt.end_date), "dd/MM/yyyy")}
                    </TableCell>

                    <TableCell>
                      {" "}
                      {opt.due_date &&
                        format(new Date(opt.due_date), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell />

                    <TableCell>
                    {(() => {
                        switch (opt.status) {
                          case "active":
                            return (
                              <Badge > Abertas </Badge>
                            );
                          case "canceled":
                            return (
                              <Badge variant={"destructive"}> Cancelada </Badge>
                            );
                            case "finished":
                            return (
                              <Badge variant={"outline"}> Finalizada </Badge>
                            );
                          case "closed":
                            return (
                              <Badge variant={"secondary"}>
                                Fechadas
                              </Badge>
                            );
                          
                          default:
                            return null;
                        }
                      })()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};
