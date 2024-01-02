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
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { axiosAuth } from "@/lib/axios";
import { OpeningI } from "@/types/geralsI";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  details?: OpeningI;
}

export const ModalConfirmSelect = ({ details }: Props) => {
  const [load, setLoad] = useState<boolean>(false);
  const route = useRouter()

  function handleSubmition() {
    axiosAuth
      .post(`/opening/${details?.id}/application`)
      .then((e) => {
        toast({
          title: "Parabéns!",
          description:
            "Você se candidatou a esta oportunidade, fique atento aos seus contatos cadastrados no seu perfil. Você será redirecionado em 3 segundos.",
        });

        return setTimeout(() => route.push("/app"), 5000);
      })
      .catch((e) => {
        toast({
          title: "Erro!",
          description: "Algo deu errado, por gentileza, tente mais tarde.",
        });
      });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button  disabled={load}>
          {load ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Inscrever-se"
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirma a seleção a inscrição nesta vaga?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmition} disabled={load}>
            {load ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Continuar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
