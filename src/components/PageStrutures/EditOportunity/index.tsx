"use client";
import { OportunidadeForm } from "@/components/Forms/CreateOportunity";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { OpeningI } from "@/types/geralsI";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditOportunity() {
  const [vagaDetails, setvagaDetails] = useState<OpeningI>();
  const { vaga } = useParams();
  const [load, setLoad] = useState(true);
  const axiosAuth = useAxiosAuth();

  async function getDados() {
    await axiosAuth.get(`/opening/${vaga}`).then((e) => {
      setvagaDetails(e.data);
      setTimeout(() => setLoad(false), 3500);
    });
  }

  useEffect(() => {
    setTimeout(getDados, 2000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-lg w-full border bg-card text-card-foreground shadow-sm p-2 my-2">
      {load ? (
        <div className="h-full w-full flex items-center justify-center ">
          <Loader2 className="h-[4rem] w-[4rem] text-muted-foreground animate-spin" />
        </div>
      ) : (
        <OportunidadeForm  initialValues={vagaDetails} />
      )}
    </div>
  );
}
