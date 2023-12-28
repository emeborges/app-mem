"use client";

import { EditMedicoForm } from "@/components/Forms/EditProfile/EditMedicoForm";
import { MedicoSignup } from "@/components/Forms/Signup/MedicoForm";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { MedicI, StudentI } from "@/types/geralsI";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  scope?: string;
}

export const EditarPerfil = ({ scope }: Props) => {
  const axiosAuth = useAxiosAuth();
  const [load, setLoad] = useState(true);
  const [me, setMe] = useState<MedicI & StudentI>();

  const getMe = async () => {
    await axiosAuth.get("/me").then((e) => setMe(e.data));

    setLoad(false);
    return;
  };

  useEffect(() => {
    setTimeout(getMe, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(me);

  return (
    <div className="h-full w-full ">
      {load ? (
        <div className="rounded-lg full border h-full w-full flex items-center justify-center mt-2">
          <Loader2 className="h-[4rem] w-[4rem] text-muted-foreground animate-spin" />
        </div>
      ) : (
        <div className="rounded-lg full border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
          <EditMedicoForm initialValues={me}/>
        </div>
      )}
    </div>
  );
};