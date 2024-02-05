"use client";

import { UniversityForm } from "@/components/Forms/University/UniversityForm";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { MedicI } from "@/types/geralsI";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export const EditUniversidadeAdmin = () => {
  const axiosAuth = useAxiosAuth();

  const { id } = useParams();
  const [load, setLoad] = useState(true);
  const [universidade, setUniversidade] = useState<MedicI>();

  const getDetail = async () => {

      await axiosAuth.get(`/university/${id}`).then((e) => setUniversidade(e.data));

      setLoad(false);
      return;

  };

  useEffect(() => {
    setTimeout(getDetail, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full w-full ">
      {load ? (
        <div className="rounded-lg full border h-full w-full flex items-center justify-center mt-2">
          <Loader2 className="h-[4rem] w-[4rem] text-muted-foreground animate-spin" />
        </div>
      ) : (
        <div className="rounded-lg full border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
          <UniversityForm initialValues={universidade} />
        </div>
      )}
    </div>
  );
};
