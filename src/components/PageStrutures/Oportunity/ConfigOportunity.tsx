"use client";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/components/ui/use-toast";

interface Props {
  status?: string;
  id?: string;
}

export function ConfigsOportunity({ status, id }: Props) {
  const route = useRouter();
  const axiosAuth = useAxiosAuth();
  const [load, setLoad] = useState(false);

  async function CancelarVaga() {
    setLoad(true);
    await axiosAuth.delete(`opening/${id}`).then((e) => {
      toast({
        title: "Ok!",
        description:
          "Sua vaga foi cancelada, iremos te encaminhar para a página inicial em 3 segundos",
      });

      return setTimeout(() => route.push("/app"), 3000);
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 flex flex-col gap-2">
        <Button variant={"outline"} onClick={() => route.refresh()}>
          {status == "active" ? "Fechar Inscrições" : "Abrir Inscrições"}
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-600/90">
              Cancelar Oportunidade
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Cancelar Oportunidade</DialogTitle>
              <DialogDescription>
                Você tem certeza que deseja cancelar esta oportunidade?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button onClick={CancelarVaga} disabled={load}>
                Confirmar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
