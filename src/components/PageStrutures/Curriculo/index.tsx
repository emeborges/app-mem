"use client";

import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { StudentI } from "@/types/geralsI";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import PerfilResumido from "./PerfilResumido";
import { CurriculoForm } from "@/components/Forms/Curriculo/CurriculoForm";
import ListaCurriculos from "./ListaCurriculos";

export const Curriculo = () => {
  const axiosAuth = useAxiosAuth();
  const [load, setLoad] = useState(true);
  const [me, setMe] = useState<StudentI>();

  const getMe = async () => {
    await axiosAuth.get("/me").then((e) => setMe(e.data));

    setLoad(false);
    return;
  };

  useEffect(() => {
    setTimeout(getMe, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full w-full ">
      {load ? (
        <div className="rounded-lg full border h-full w-full flex items-center justify-center mt-2">
          <Loader2 className="h-[4rem] w-[4rem] text-muted-foreground animate-spin" />
        </div>
      ) : (
        <div>
          <PerfilResumido student={me} />
          <div className="rounded-lg full border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
            {me?.curriculums && me?.curriculums?.length > 0 ? (
              <ListaCurriculos student={me} />
            ) : (
              <CurriculoForm />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
