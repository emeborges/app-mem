"use client";

import { EditMedicoForm } from "@/components/Forms/EditProfile/EditMedicoForm";
import { EditStudentForm } from "@/components/Forms/EditProfile/EditStudentForm";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { StudentI } from "@/types/geralsI";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export const EstudanteEditAdmin = () => {
  const axiosAuth = useAxiosAuth();
  const { user } = useParams();
  const [load, setLoad] = useState(true);
  const [userData, setUserData] = useState<StudentI>();

  const getDetail = async () => {
      await axiosAuth.get(`/student/${user}`).then((e) => setUserData(e.data));

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
          <EditStudentForm admin initialValues={userData}/>
        </div>
      )}
    </div>
  );
};
