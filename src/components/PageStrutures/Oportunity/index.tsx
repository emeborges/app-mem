"use client";

import { Badge } from "@/components/ui/badge";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { OpeningI, StudentI } from "@/types/geralsI";
import { format } from "date-fns";
import { AlertCircle, Frown, Loader2, Medal, RocketIcon } from "lucide-react";
import { Session } from "next-auth/core/types";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DetalhesMedico } from "./DetalhesVagaMedico";
import { Button } from "@/components/ui/button";
import { ModalConfirmSelect } from "./ModalConfirmSelect";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { ModalConfirmCancel } from "./ModalConfirmCancel";

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
        setvagaDetails(e.data);
      })
      .catch((e) => router.refresh());

    session?.scope === "student" &&
      (await axiosAuth.get("/me").then((e) => setMe(e.data)));

    setTimeout(() => setLoad(false), 3000);
  }

  useEffect(() => {
    setLoad(true);
    setTimeout(getDados, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const AnoValidation =
    Number(me?.school_term) >= Number(vagaDetails?.school_term_min) &&
    Number(me?.school_term) <= Number(vagaDetails?.school_term_max);

  console.log(
    vagaDetails &&
      vagaDetails?.status !== "closed" &&
      vagaDetails.applications.length > 0
  );

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
              {session?.scope != "student" &&
                vagaDetails?.status !== "finished" &&
                vagaDetails?.status !== "canceled" && (
                  <Link
                    className="rounded-lg border p-2"
                    href={
                      session?.scope === "medic"
                        ? `/app/oportunidade/${vagaDetails?.id}/edit`
                        : `/admin/oportunidades/${vagaDetails?.id}/edit`
                    }
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
          <div className="flex flex-wrap w-full items-center gap-4">
            <div>
              <h3 className="text-lg">
                Quantidade Máxima de Selecionados: {vagaDetails?.max_selection}{" "}
                {Number(vagaDetails?.max_selection) > 1 ? "alunos" : "aluno"}
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
                  {vagaDetails?.school_term_min}º Ano Mínimo
                </Badge>
                <Badge variant="outline" className="p-2">
                  {vagaDetails?.school_term_max}º Ano Máximo
                </Badge>
              </div>
            </div>
          </div>

          {session?.scope === "medic" || session?.scope === "admin" ? (
            <DetalhesMedico details={vagaDetails} />
          ) : (
            vagaDetails?.status !== "canceled" && (
              <div>
                <div className="flex items-center">
                  <p>Área do Aluno</p>
                  <Separator className="my-4 ml-2 max-w-[80%]" />
                </div>
                {!AnoValidation ? (
                  <Alert variant="default">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Requisitos não compatíveis</AlertTitle>
                    <AlertDescription>
                      Infelizmente, você não se enquadra nos requisitos mínimos
                      para essa vaga, tente outra vaga.
                    </AlertDescription>
                  </Alert>
                ) : me?.curriculums && me?.curriculums?.length > 0 ? (
                  vagaDetails &&
                  vagaDetails?.status !== "closed"  ? (
                    vagaDetails.applications.find(
                      (x) => x.status !== "canceled"
                    ) ? (
                      vagaDetails.applications.find(
                        (x) => x.status === "selected"
                      ) ? (
                        <Alert>
                          <Medal className="h-4 w-4" />
                          <AlertTitle>Você foi selecionado!</AlertTitle>
                          <AlertDescription>
                            <div>
                              <p>
                                Parabéns, você foi SELECIONADO!! Fique atento
                                aos seus contatos cadastrados, o médico entrará
                                em contato diretamente por lá!
                              </p>
                              <p>
                                Agora é só esperar e se dedicar ao máximo ao
                                estágio!
                              </p>
                            </div>
                          </AlertDescription>
                        </Alert>
                      ) : vagaDetails.applications.find(
                          (x) => x.status === "closed"
                        ) ? (
                        <Alert>
                          <Frown className="h-4 w-4" />
                          <AlertTitle>Vaga Finalizada!</AlertTitle>
                          <AlertDescription>
                            <div>
                              <p>Infelizmente, não foi desta vez!</p>
                              <p>
                                Mas não desanime, existem várias outras
                                oportunidades. Sua hora irá chegar!
                              </p>
                            </div>
                          </AlertDescription>
                        </Alert>
                      ) : (
                        <Alert>
                          <RocketIcon className="h-4 w-4" />
                          <AlertTitle>Candidatura Realizada!</AlertTitle>
                          <AlertDescription>
                            <div>
                              <p>
                                Parabéns, você foi cadastrado com sucesso! Fique
                                atento aos seus contatos cadastrados, qualquer
                                novidade, te comunicaremos por lá!
                              </p>
                            </div>
                            <div>
                              Você também pode desistir da vaga,{" "}
                              <ModalConfirmCancel id={vagaDetails?.id} />
                            </div>
                          </AlertDescription>
                        </Alert>
                      )
                    ) : (
                      <ModalConfirmSelect id={vagaDetails?.id} />
                    )
                  ) : (
                    <div>
                      <Label> Inscrições fechadas no momento. </Label>
                    </div>
                  )
                ) : (
                  <div>
                    <Label>
                      {" "}
                      Para se inscrever, é necessário ter um currículo cadastrado. Cadastre-o agora mesmo!
                    </Label>
                    <Link href={"/app/curriculo"}>
                      <Button variant={"outline"}>Cadastrar Currículo</Button>
                    </Link>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
