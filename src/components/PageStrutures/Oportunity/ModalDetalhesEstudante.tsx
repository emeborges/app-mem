import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { ApplicationsI } from "@/types/geralsI";
import { getPrimeiraLetra } from "@/utils/functions";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { FileDown, Loader2 } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface Props {
  aplication: ApplicationsI;
  idVaga?: string;
  oportunidadeAberta?: boolean;
  sendState: boolean;
  setSendState: Dispatch<SetStateAction<boolean>>;
  totalInscritos: number;
  maxInscritos: number;
}

export const ModalDetalhesEstudante = ({
  aplication,
  idVaga,
  oportunidadeAberta,
  sendState,
  setSendState,
  totalInscritos,
  maxInscritos,
}: Props) => {
  const estudante = aplication.student;
  const axiosAuth = useAxiosAuth();
  const maxInscritosValidation = totalInscritos <= maxInscritos - 1;

  const handleConfirmation = async () => {
    setSendState(true);

    await axiosAuth
      .put(`/opening/${idVaga}/application/${estudante.id}/select`)
      .then((e) => {
        toast({
          title: "Sucesso!",
          description:
            "Estudante selecionado, a página será atualizada em 3 segundos.",
        });

        setTimeout(() => window.location.reload(), 5000);
      })
      .catch((e) => window.location.reload());

    setTimeout(() => setSendState(false), 5000);
  };

  return (
    <div className="flex gap-2 justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Mais Detalhes</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Estagiario</DialogTitle>
          </DialogHeader>
          <div className="">
            <div className="flex gap-2 py-2 flex-col items-center">
              <Avatar className="h-[6rem] w-[6rem]">
                {estudante?.picture_url ? (
                  <AvatarImage src={estudante.picture_url.toString()} />
                ) : (
                  <AvatarFallback className="bg-primary text-5xl">
                    {getPrimeiraLetra(estudante?.name)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="text-xl">{estudante.name}</div>
              {aplication.status == "selected" && <Badge>Selecionado</Badge>}
            </div>
            <div className="flex flex-col w-full justify-between">
              {aplication.status == "selected" ? (
                <div className="flex w-full gap-10 justify-between py-2">
                  <div className="py-2 max-w-[45%]">
                    <div>
                      <div>
                        <p>Celular:</p>
                      </div>
                      <h3 className="text-md">{estudante.phone_number}</h3>
                    </div>
                  </div>
                  <div className="py-2 max-w-[45%]">
                    <div>
                      <div className="w-full">
                        <p className="break-words">Email:</p>
                      </div>
                      <h3 className="text-md break-words">{estudante.email}</h3>
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="flex w-full gap-10 justify-between py-2">
                <div className="py-2 max-w-[30%]">
                  <div>
                    <div>
                      <p>Faculdade:</p>
                    </div>
                    <h3 className="text-md">{estudante?.university?.name}</h3>
                  </div>
                </div>

                <div className="py-2">
                  <div>
                    <div>
                      <p>Período:</p>
                    </div>
                    <h3 className="text-md">{estudante.school_term}º</h3>
                  </div>
                </div>
              </div>
              {estudante?.curriculums && estudante?.curriculums?.length > 0 && (
                <div>
                  <div className="flex w-full gap-10 items-center py-2">
                    <div>
                      <p>Currículo:</p>
                    </div>
                    <Link href={`${estudante?.curriculums[0].url}`}>
                      <FileDown />
                    </Link>
                  </div>
                  <div className="flex flex-col flex w-full py-2">
                    <div>
                      <p>Descrição do Aluno:</p>
                    </div>
                    {estudante?.curriculums[0].description}
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {oportunidadeAberta &&
        !aplication.pre_selected &&
        maxInscritosValidation && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" disabled={sendState}>
                {sendState ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Selecionar"
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Confirma a seleção de {estudante.name}?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleConfirmation}
                  disabled={sendState}
                >
                  {sendState ? (
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
  );
};
