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
  import { Button } from "@/components/ui/button";
  import { toast } from "@/components/ui/use-toast";
  import { axiosAuth } from "@/lib/axios";
  import { Loader2 } from "lucide-react";
  import { useRouter } from "next/navigation";
  import { useState } from "react";
  
  interface Props {
    id?: string;
  }
  
  export const ModalConfirmCancel = ({ id }: Props) => {
    const [load, setLoad] = useState<boolean>(false);
  
    function handleSubmition() {
      setLoad(true)
      axiosAuth
        .delete(`/opening/${id}/application`)
        .then((e) => {
          toast({
            title: "Cancelamento Realizado!",
            description:
              "Você será redirecionado em 3 segundos.",
          });
  
          return setTimeout(() => window.location.reload(), 5000);
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
          <Button variant={'ghost'} className="p-1 m-0" disabled={load}>
            {load ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Cancelar candidatura"
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirma a cancelamento da inscrição nesta vaga?
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
  