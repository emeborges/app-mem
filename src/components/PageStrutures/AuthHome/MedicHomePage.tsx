"use client";

import { EstagioCard } from "@/components/EstagioCard";
import { SingleDate } from "@/components/Inputs/InputSingleDate";
import { toast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { MedicI } from "@/types/geralsI";
import { differenceInDays, toDate } from "date-fns";
import { Session } from "next-auth/core/types";
import { useEffect, useState } from "react";

interface Props {
  session: Session | undefined | null;
}

export const MedicHomePage = ({ session }: Props) => {
  const [filters, setFilters] = useState({
    initial: null,
    finish: null,
    semestre: null,
  });
  const [me, setMe] = useState<MedicI>();
  const axiosAuth = useAxiosAuth();

  const fetchMe = async () => {
    const res = await axiosAuth.get("/me");

    setMe(res.data);
  };

  useEffect(() => {
    setTimeout(fetchMe, 2000);
  }, [session]);

  console.log(me);

  function handleInitial(e: any) {
    setFilters({ ...filters, initial: e });
    return;
  }

  function handleFinal(e: any) {
    if (filters.initial) {
      const dataInicial = toDate(filters.initial);
      const dataFinal = toDate(e);
      console.log(differenceInDays(dataFinal, dataInicial));
      if (differenceInDays(dataFinal, dataInicial) >= 0) {
        setFilters({ ...filters, finish: e });
      } else {
        toast({
          title: "Data Final Incorreta!",
          description: "A data final deve ser maior que a data inicial",
        });
      }
    } else {
      setFilters({ ...filters, finish: e });
    }

    return;
  }

  return (
    <div className="w-full h-full">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex  flex-wrap items-center justify-around md:justify-start gap-2 w-full p-2 my-2">
        <div>
          <p>Filtros:</p>
        </div>
        <div className="py-1 sm:py-0">
          <SingleDate
            value={filters.initial}
            label="Data Inicial:"
            setValue={handleInitial}
          />
        </div>
        <div className="py-1 sm:py-0">
          <SingleDate
            value={filters.finish}
            label="Data Final:"
            setValue={handleFinal}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {me?.openings && me?.openings?.length > 0 ?
          me?.openings?.map((x) => (
            <EstagioCard
              key={x.id}
              opening={x}
              userType={session?.scope}
            />
          )): <div className=" w-full text-center pt-[10rem]">Você ainda não tem oportunidades cadastradas!</div>}
      </div>
    </div>
  );
};
