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
import { OpeningI } from "@/types/geralsI";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface Props {
  details?: OpeningI;
}

export const ModalConfirmSelect = ({ details }: Props) => {
  const [load, setLoad] = useState<boolean>(false);

  function handleSubmition() {
    
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
