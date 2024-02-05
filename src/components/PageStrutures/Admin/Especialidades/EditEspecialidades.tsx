"use client";

import { EspecialidadesForm } from "@/components/Forms/Especialidade/EspecialidadesForm";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { SpecialityI } from "@/types/geralsI";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const EditEspecialidadesAdmin = () => {
  const axiosAuth = useAxiosAuth();
  const route = useRouter();
  const { id } = useParams();
  const [load, setLoad] = useState(true);
  const [especialidade, setEspecialidade] = useState<SpecialityI>();

  const getDetail = async () => {
    await axiosAuth
      .get(`/speciality/${id}`)
      .then((e) => setEspecialidade(e.data));

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
          <EspecialidadesForm initialValues={especialidade} />
        </div>
      )}
    </div>
  );
};
