"use client";

import { EstagioCard } from "@/components/EstagioCard";
import { SingleDate } from "@/components/Inputs/InputSingleDate";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { MedicI, OpeningI } from "@/types/geralsI";
import { differenceInDays, toDate } from "date-fns";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth/core/types";
import { useEffect, useState } from "react";

interface Props {
  session: Session | undefined | null;
}

export const StudentHomePage = ({ session }: Props) => {
  const [inicial, setInicial] = useState();
  const [final, setFinal] = useState();
  const [oportunities, setOportunities] = useState<OpeningI[]>();
  const [load, setLoad] = useState(true);
  const axiosAuth = useAxiosAuth();

  const fetchMe = async () => {
    const res = await axiosAuth.get("/opening", { params: {} });
    const results = res.data;
    const filters = results.filter(
      (x: any) => differenceInDays(new Date(), x.due_date) < 0
    );
    console.log("filtrados", filters);
    setOportunities(filters);

    setTimeout(() => setLoad(false), 2000);
  };

  useEffect(() => {
    setTimeout(fetchMe, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  function handleInitial(e: any) {

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
      setFinal(e)
    }

    return;
  }

  return (
    <div className="w-full h-full">
      {load ? (
        <div className="h-full w-full flex items-center justify-center ">
          <Loader2 className="h-[4rem] w-[4rem] text-muted-foreground animate-spin" />
        </div>
      ) : (
        <div className="w-full h-full">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm  p-2 my-2">
            <Accordion type="multiple" className="w-full border-none">
              <AccordionItem value="item-1" className="border-none">
                <AccordionTrigger className="text-muted-foreground">Filtros</AccordionTrigger>
                <AccordionContent className="flex gap-2 ">
                  <div className="py-1 sm:py-0">
                    <SingleDate
                      value={inicial}
                      label="Data Inicial da Oportunidade"
                      setValue={handleInitial}
                    />
                  </div>
                  <div className="py-1 sm:py-0">
                    <SingleDate
                      value={final}
                      label="Data Inicial da Oportunidade"
                      setValue={handleFinal}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex flex-wrap gap-2">
            {oportunities?.map((x) => (
              <EstagioCard key={x.id} opening={x} userType={session?.scope} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
