"use client";

import { Badge } from "@/components/ui/badge";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { OpeningI, StudentI } from "@/types/geralsI";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth/core/types";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DetalhesMedico } from "./DetalhesVagaMedico";
import { Button } from "@/components/ui/button";
import { ModalConfirmSelect } from "./ModalConfirmSelect";
import { maior } from "@/utils/functions";
import { Label } from "@radix-ui/react-dropdown-menu";

interface Props {
  session?: Session | undefined | null;
}

export function Oportunity({ session }: Props) {
  const [vagaDetails, setvagaDetails] = useState<OpeningI>();
  const { vaga } = useParams();
  const [load, setLoad] = useState(true);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [me, setMe] = useState<StudentI>();

  async function getDados() {
    await axiosAuth
      .get(`/opening/${vaga}`)
      .then((e) => {
        console.log("data ");
        setvagaDetails(e.data);
      })
      .catch((e) => router.refresh());

    session?.scope === "student" &&
      (await axiosAuth.get("/me").then((e) => setMe(e.data)));

    setLoad(false);
  }

  useEffect(() => {
    setLoad(true);
    setTimeout(getDados, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(vagaDetails?.school_term_min, session?.school_term ,Number(vagaDetails?.school_term_min) > Number(session?.school_term))
  return (
    <div className="h-full w-full ">
      {load ? (
        <div className="rounded-lg full border h-full w-full flex items-center justify-center ">
          <Loader2 className="h-[4rem] w-[4rem] text-muted-foreground animate-spin" />
        </div>
      ) : (
        <div className="rounded-lg full border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
          <div className="py-2 max-w-[100%]">
            <div className="flex justify-between items-center w-full">
              <h2 className="font-bold text-3xl">{vagaDetails?.name}</h2>
              {session?.scope === "medic" &&
                vagaDetails?.status !== "finished" &&
                vagaDetails?.status !== "canceled" && (
                  <Link
                    className="rounded-lg border p-2"
                    href={`/app/oportunidade/${vagaDetails?.id}/edit`}
                  >
                    Editar
                  </Link>
                )}
            </div>
            {vagaDetails?.status == "canceled" ? (
              <Badge variant={"destructive"}>Vaga Cancelada</Badge>
            ) : vagaDetails?.status == "active" ? (
              <Badge>Inscrições Abertas</Badge>
            ) : (
              <Badge variant={"outline"}>Inscrições Fechadas</Badge>
            )}

            {vagaDetails?.status == "finished" && (
              <Badge variant={"outline"}>Seleção Finalizada</Badge>
            )}
          </div>
          <div className="flex flex-wrap w-full items-center gap-4">
            <div>
              <h3 className="text-lg">
                Cidade: {vagaDetails?.location?.address?.city} -{" "}
                {vagaDetails?.location?.address?.federative_unit_st}
              </h3>
            </div>
            <div>
              <h3 className="text-lg">
                Bairro: {vagaDetails?.location?.address?.neighbourhood}
              </h3>
            </div>
          </div>
          <div className="flex flex-wrap w-full items-center gap-4">
            <div>
              <h3 className="text-lg">
                De:{" "}
                {vagaDetails?.start_date &&
                  format(Date.parse(vagaDetails?.start_date), "dd/MM/yyyy")}
              </h3>
            </div>
            <div>
              <h3 className="text-lg">
                Até:{" "}
                {vagaDetails?.end_date &&
                  format(Date.parse(vagaDetails?.end_date), "dd/MM/yyyy")}
              </h3>
            </div>
            <div>
              <h3 className="text-lg">
                Carga Horária: {vagaDetails?.total_hours} horas
              </h3>
            </div>
          </div>
          <div className="pt-2 flex flex-wrap w-full items-center gap-4">
            <div>
              <h2 className="text-xl ">Descrição:</h2>
            </div>
          </div>
          <div>
            <p>{vagaDetails?.description}</p>
          </div>
          <div className=" w-full flex gap-2 flex-wrap">
            <div className="w-full md:w-[49%] rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 p-2 my-2">
              <div>
                <h2 className="text-xl ">Atividades Programadas:</h2>
              </div>
              <div className="flex gap-1">
                {vagaDetails?.activities?.map((x, idx) => (
                  <Badge key={idx} variant="outline" className="p-2">
                    {x.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="w-full md:w-[49%] rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 p-2 my-2">
              <div>
                <h2 className="text-xl ">Requisitos:</h2>
              </div>
              <div>
                <Badge variant="outline" className="p-2">
                  {vagaDetails?.school_term_min}º Semestre Mínimo
                </Badge>
                <Badge variant="outline" className="p-2">
                  {vagaDetails?.school_term_min}º Semestre Máximo
                </Badge>
              </div>
            </div>
          </div>
          {session?.scope === "medic" ? (
            <DetalhesMedico details={vagaDetails} />
          ) : (
            <div>
              {
                Number(vagaDetails?.school_term_min) >= Number(session?.school_term) ||
                Number(session?.school_term) > Number(vagaDetails?.school_term_max)
                ? 
                  <h2>Infelizmente, você não se enquadra nos requisitos mínimos deste estágio.</h2>
                :
                me?.curriculums && me?.curriculums?.length > 0 ? (
                  vagaDetails?.status === "active" && <ModalConfirmSelect />
                ) : (
                  <div >
                    <Label> Para se inscriver, é necessário ter um currículo cadastrado, cadastre-o já:</Label>
                    <Link href={'/app/curriculo'}>
                    <Button variant={'outline'}>Cadastrar Currículo</Button>
                    </Link>
                  </div>
                )
              }               
            </div>
          )}
        </div>
      )}
    </div>
  );
}
