import { useState } from "react";
import { OpeningI } from "@/types/geralsI";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileDown, Loader2, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModalDetalhesEstudante } from "./ModalDetalhesEstudante";
import { ConfigsOportunity } from "./ConfigOportunity";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  details?: OpeningI;
}

export const DetalhesMedico = ({ details }: Props) => {
  const [send, setSend] = useState(false);
  const axiosAuth = useAxiosAuth();
  const [load, setLoad] = useState(false);

  const handleDesconsiderar = async (idEstudante: string) => {
    setLoad(true);

    await axiosAuth
      .put(`/opening/${details?.id}/application/${idEstudante}/reset`)
      .then((e) => {
        toast({
          title: "Sucesso!",
          description:
            "Estudante desconsiderado, sua página será atualizada em 3 segundos.",
        });

        setTimeout(() => window.location.reload(), 5000);
      })
      .catch((e) => window.location.reload());

    setTimeout(() => setLoad(false), 5000);
  };

  const handleFinalizar = async () => {
    setLoad(true);

    await axiosAuth
      .post(`/opening/${details?.id}/finish`)
      .then((e) => {
        toast({
          title: "Sucesso!",
          description:
            "Seleção finalizada, sua página será atualizada em 3 segundos.",
        });

        setTimeout(() => window.location.reload(), 5000);
      })
      .catch((e) => {
        toast({
          title: "Erro!",
          description: "Algo deu errado, tente novamente mais tarde.",
        });
      });

    setTimeout(() => setLoad(false), 5000);
  };

  const selecionados = details?.applications?.filter((aplic) => {
    return aplic.status == "selected" || aplic.pre_selected;
  });

  return (
    <div className=" w-full rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 p-2 my-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Inscrições:</h2>
        {details?.status != "canceled" &&
          (details?.status == "finished" ? (
            <div> </div>
          ) : (
            <ConfigsOportunity
              id={details?.id}
              status={details?.status}
              startDate={details?.start_date}
            />
          ))}
      </div>

      {details && selecionados && selecionados.length > 0 && (
        <div className="py-4">
          <div>
            <h2 className="text-md">
              Pré-selecionados: ({selecionados.length}/ {details.max_selection}
              ):
            </h2>
          </div>
          <div className="flex w-full  gap-2">
            {selecionados.map((selecionado) => (
              <div
                key={selecionado.id}
                className="rounded-lg border max-w-[250px] p-2 flex flex-col items-center justify-center "
              >
                <div className="py-2 flex justify-center">
                  <Avatar className="h-[4rem] w-[4rem]">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                </div>
                <div className="test text-sm max-w-[80%] text-center">
                  <p className="py-2">
                    Você selecionou, {selecionado.student.name}, para esta
                    experiência.
                  </p>
                  <p className="py-2">
                    Para maiores informações, verifique as informações pessoais
                    do estudante abaixo:
                  </p>
                  <div className="flex gap-2">
                    <ModalDetalhesEstudante
                      idVaga={details.id}
                      aplication={selecionado}
                      oportunidadeAberta={false}
                      sendState={send}
                      setSendState={setSend}
                      totalInscritos={selecionados?.length}
                      maxInscritos={Number(details.max_selection)}
                    />
                    {details.status === "finished" ? null : (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            <Settings />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 flex flex-col gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant={"destructive"} disabled={load}>
                                Desconsiderar Seleção
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Desconsiderar Seleção</DialogTitle>
                                <DialogDescription>
                                  Você tem certeza que deseja desconsiderar a
                                  inscrições de {selecionado.student.name}
                                  para esta oportunidade?
                                </DialogDescription>
                              </DialogHeader>

                              <DialogFooter>
                                <Button
                                  onClick={() =>
                                    selecionado.student.id &&
                                    handleDesconsiderar(selecionado.student.id)
                                  }
                                  disabled={load}
                                >
                                  Confirmar
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  {selecionado.status === "selected" && (
                    <p className="py-2">
                      Nos detalhes acima, você terá acesso aos dados para entrar em contato diretamente com o estagiário, e, caso precise, estaremos sempre à disposição no nosso canal de atendimento.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full pt-2 gap-2">
            {details.status === "finished" ? null : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" disabled={load}>
                    {load ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Finalizar Seleção"
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Confirma a finalização da seleção?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Após a confirmação, não será permitido a alteração dos
                      selecionados, tem certeza que deseja continuar assim
                      mesmo??
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleFinalizar}
                      disabled={load}
                    >
                      {load ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Continuar"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      )}
      {details?.applications && details?.applications?.length > 0 ? (
        <div>
          <div className="flex flex-wrap w-full items-center gap-4">
            <div>
              <h3 className="text-sm">
                Qtde Total de Inscritos: {details.applications.length}
              </h3>
            </div>
          </div>
          <div className="py-4">
            <div>
              <h2 className="text-md">Listagem de Inscritos:</h2>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Ordem</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Faculdade</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead>Currículo</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {details?.applications.map((aplicacao, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell className=" ">
                      {aplicacao.student.name}{" "}
                      {details.status == "finished" &&
                        aplicacao.status == "selected" && (
                          <Badge>Selecionado</Badge>
                        )}
                    </TableCell>
                    <TableCell>{aplicacao.student.university?.name}</TableCell>
                    <TableCell>{aplicacao.student.school_term}º Ano</TableCell>
                    <TableCell>
                      {aplicacao.student.curriculums ? (
                        <Link href={`${aplicacao.student.curriculums[0].url}`}>
                          <FileDown />
                        </Link>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <ModalDetalhesEstudante
                        idVaga={details.id}
                        aplication={aplicacao}
                        oportunidadeAberta={details.status == "active"}
                        sendState={send}
                        setSendState={setSend}
                        totalInscritos={selecionados ? selecionados.length : 0}
                        maxInscritos={1}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="w-full h-[10rem] flex justify-center items-center">
          <h3>Ainda não há inscritos.</h3>
        </div>
      )}
    </div>
  );
};
