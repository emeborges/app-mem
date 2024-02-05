"use client";

import { Label } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { CalendarIcon, Settings } from "lucide-react";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { differenceInDays, format, formatISO } from "date-fns";

interface Props {
  status?: string;
  id?: string;
  startDate?: string;
}

export function ConfigsOportunity({ status, id, startDate }: Props) {
  const route = useRouter();
  const axiosAuth = useAxiosAuth();
  const [load, setLoad] = useState(false);
  const [dueDate, setDueDate] = useState<any>();
  const [validation, setValidation] = useState(true);

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

  useEffect(() => {
    if (startDate && dueDate) {
      if (differenceInDays(new Date(startDate), new Date(dueDate)) > 0) {
        setValidation(false);
      }
    }
  }, [dueDate, startDate]);

  async function FecharInscricoes() {
    setLoad(true);
    await axiosAuth.patch(`opening/${id}/close`).then((e) => {
      toast({
        title: "Ok!",
        description:
          "As inscrições foram fechadas, sua página será atualizada em 3 segundos",
      });

      return setTimeout(() => location.reload(), 3000);
    });
  }

  async function ReabrirInscricoes() {
    setLoad(true);
    await axiosAuth
      .patch(`opening/${id}/reopen`, {
        opening: { due_date: dueDate },
      })
      .then((e) => {
        toast({
          title: "Ok!",
          description:
            "As inscrições foram reabertas, sua página será atualizada em 3 segundos",
        });

        return setTimeout(() => location.reload(), 3000);
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
        {status == "active" ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"} disabled={load}>
                Fechar Inscrições
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Fechar Inscrições</DialogTitle>
                <DialogDescription>
                  Você tem certeza que deseja fechar as inscrições para a
                  oportunidade?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button onClick={FecharInscricoes} disabled={load}>
                  Confirmar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"} disabled={load}>
                Abrir Inscrições
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Abrir Inscrições</DialogTitle>
                <DialogDescription>
                  <p>
                    Para reabrir as inscrições, será necessário indicar uma nova
                    data limite para estas.
                  </p>
                  <div className="my-2">
                    <Label>Qual a nova data de vencimento?</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dueDate && format(new Date(dueDate), "dd/MM/yyyy")}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          locale={ptBR}
                          mode="single"
                          selected={dueDate}
                          onSelect={(e) => {
                            return e && setDueDate(formatISO(e));
                          }}
                          initialFocus
                          className=" bg-white"
                        />
                      </PopoverContent>
                    </Popover>
                    {startDate &&
                      dueDate &&
                      (differenceInDays(
                        new Date(startDate),
                        new Date(dueDate)
                      ) > 0 ? null : (
                        <Label className="text-red-500 text-xs">
                          Data de Vencimento deve ser menor que a data de Início
                          do Estágio
                        </Label>
                      ))}
                  </div>
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button
                  onClick={ReabrirInscricoes}
                  disabled={validation || load}
                >
                  Confirmar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-red-600 hover:bg-red-600/90" disabled={load}>
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
