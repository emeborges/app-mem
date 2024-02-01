"use client";

import { EditMedicoForm } from "@/components/Forms/EditProfile/EditMedicoForm";
import { EditStudentForm } from "@/components/Forms/EditProfile/EditStudentForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command } from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { MedicI, StudentI } from "@/types/geralsI";
import { formatarCPF, getPrimeiraLetra } from "@/utils/functions";
import { format } from "date-fns";
import { Loader2, PenLine, UserCog } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  scope: string;
}

export const UserAdmin = ({ scope }: Props) => {
  const axiosAuth = useAxiosAuth();
  const route = useRouter();
  const { user } = useParams();
  const [load, setLoad] = useState(true);
  const [userData, setUserData] = useState<MedicI & StudentI>();

  const getDetail = async () => {
    if (scope == "medic") {
      await axiosAuth.get(`/medic/${user}`).then((e) => setUserData(e.data));

      setLoad(false);
      return;
    } else {
      await axiosAuth.get("/medic").then((e) => setUserData(e.data));

      setLoad(false);
      return;
    }
  };

  useEffect(() => {
    setTimeout(getDetail, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(userData);

  return (
    <div className="h-full w-full ">
      {load ? (
        <div className="rounded-lg full border h-full w-full flex items-center justify-center mt-2">
          <Loader2 className="h-[4rem] w-[4rem] text-muted-foreground animate-spin" />
        </div>
      ) : (
        <div className="rounded-lg full border bg-card text-card-foreground shadow-sm flex flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
          <div className="rounded-lg full border bg-card text-card-foreground shadow-sm w-full">
            <div>
              <h1 className="text-3xl text-muted-foreground p-2">
                Dados do usuário:
              </h1>
            </div>
            <div className=" flex flex-col md:justify-start md:flex-row gap-2 w-full p-2 my-2">
              <div className="m-auto">
                <Avatar className="h-[10rem] w-[10rem] bg-red-500">
                  {userData?.picture_url ? (
                    <AvatarImage src={userData.picture_url.toString()} />
                  ) : (
                    <AvatarFallback className="bg-primary text-5xl">
                      {getPrimeiraLetra(userData?.name)}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>

              <div className="flex items-center md:items-start  flex-col w-full justify-between">
                <div className="px-4 py-2 flex w-full justify-between">
                  <div>
                    <div>
                      <p>Nome:</p>
                    </div>
                    <h3 className="text-3xl">{userData?.name}</h3>
                  </div>
                  <div>
                    <div>
                      <p>Tipo de Usuário:</p>
                    </div>
                    <h3 className="text-3xl">
                      {userData?.scope === "medic" ? "Médico" : "Estudante"}
                    </h3>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <div>
                    <div>
                      <p>Email:</p>
                    </div>
                    <h3 className="text-xl">{userData?.email}</h3>
                  </div>
                </div>
                <div className="flex">
                  <div className="px-4 py-2">
                    <div>
                      <div>
                        <p>CPF:</p>
                      </div>
                      <h3 className="text-lg">
                        {userData?.tax_document &&
                          formatarCPF(userData.tax_document)}
                      </h3>
                    </div>
                  </div>
                  <div className="px-4 py-2">
                    <div>
                      <div>
                        <p>Data Nascimento:</p>
                      </div>
                      <h3 className="text-lg">
                        {userData?.birthdate &&
                          format(new Date(userData?.birthdate), "dd/MM/yyyy")}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <div>
                    <div>
                      <p>Telefone:</p>
                    </div>
                    <h3 className="text-lg">{userData?.phone_number}</h3>
                  </div>
                </div>

                {scope === "student" ? null : (
                  <div className="flex flex-col w-full items-center md:items-start  justify-between">
                    <div className="px-4 py-2">
                      <div>
                        <div>
                          <p>CRM:</p>
                        </div>
                        <h3 className="text-3xl">
                          {userData?.professional_certificate} -{" "}
                          {userData?.federative_unit_professional_certificate}
                        </h3>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full gap-2 items-center justify-center">
                <Button
                  className="w-[15rem]"
                  onClick={() =>
                    route.push(`/admin/medicos/${userData?.id}/editar`)
                  }
                >
                  Editar Perfil
                </Button>
              </div>
            </div>
          </div>
          {userData?.scope === "medic" && (
            <div className="rounded-lg full border bg-card text-card-foreground shadow-sm w-full">
              <ScrollArea className="h-[450px]">
                <div>
                  <h1 className="text-3xl text-muted-foreground p-2">
                    Localizações:
                  </h1>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]"></TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Localização</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userData?.locations && userData?.locations?.length > 0 ? (
                      userData?.locations?.map((local) => (
                        <TableRow key={local.id}>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline">
                                  <PenLine className="text-muted-foreground text-sm" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[505px]">
                                <DialogHeader>
                                  <DialogTitle>
                                    Detalhes do Estagiario
                                  </DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col gap-2">
                                  <div className="flex">
                                    <div>
                                      <p>Nome:</p>
                                      <p className="text-2xl">{local.name}</p>
                                    </div>
                                  </div>
                                  {local.description && (
                                    <div>
                                      <div>
                                        <p>Descrição:</p>
                                        <p className="text-2xl">
                                          {local.description}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                  <div className="flex justify-between">
                                    <div>
                                      <p>Rua:</p>
                                      <p className="text-2xl">
                                        {local.address?.street}
                                      </p>
                                    </div>
                                    <div className="w-[20%]">
                                      <p>Nº:</p>
                                      <p className="text-2xl">
                                        {local.address?.street_number}
                                      </p>
                                    </div>
                                  </div>
                                  {local.address?.complement && (
                                    <div>
                                      <div>
                                        <p>Complemento:</p>
                                        <p className="text-2xl">
                                          {local.address?.complement}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                  <div className="flex justify-between">
                                    <div>
                                      <p>CEP:</p>
                                      <p className="text-2xl">
                                        {local.address?.postal_code}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex justify-between">
                                    <div>
                                      <p>Cidade:</p>
                                      <p className="text-2xl">
                                        {local.address?.city}
                                      </p>
                                    </div>
                                    <div>
                                      <p>Estado:</p>
                                      <p className="text-2xl">
                                        {local.address?.federative_unit_st}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button
                                    onClick={() =>
                                      route.push(
                                        `/admin/locations/${local.id}/editar`
                                      )
                                    }
                                  >
                                    Editar Local
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                          <TableCell>{local.name}</TableCell>

                          <TableCell>Validar Enum</TableCell>

                          <TableCell>
                            {local.address?.city} -{" "}
                            {local?.address?.federative_unit_lg}
                          </TableCell>

                          <TableCell>
                            {local.is_active ? (
                              <Badge> Ativo </Badge>
                            ) : (
                              <Badge variant={"destructive"}>Desativado</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow className="h-10 text-center w-full">
                        <TableCell colSpan={5}>
                          Ainda não há locais cadastrados
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          )}

          <div className="rounded-lg full border bg-card text-card-foreground shadow-sm w-full">
            <ScrollArea className="h-[450px]">
              <div>
                <h1 className="text-3xl text-muted-foreground p-2">
                  Oportunidades:
                </h1>
              </div>
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]"></TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Início</TableHead>
                  <TableHead>Fim</TableHead>
                  <TableHead>Max Insc</TableHead>
                  <TableHead>Qtde Insc</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData?.openings?.map((opt) => (
                  <TableRow key={opt.id}>
                    <TableCell>
                      <Button
                        variant="outline"
                        onClick={() => route.push(`/admin/oportunidades/${opt.id}`)}
                      >
                        <UserCog className="text-muted-foreground text-sm" />
                      </Button>
                    </TableCell>
                    <TableCell>{opt.name}</TableCell>

                    <TableCell>
                      {opt.location?.name} - 
                      {opt.location?.address?.city} {" "}
                      {opt.location?.address?.federative_unit_st}
                    </TableCell>

                    <TableCell>
                      {opt.start_date &&
                        format(new Date(opt.start_date), "dd/MM/yyyy")}
                    </TableCell>

                    <TableCell>
                      {opt.end_date &&
                        format(new Date(opt.end_date), "dd/MM/yyyy")}
                    </TableCell>

                    <TableCell>
                      {" "}
                      {opt.due_date &&
                        format(new Date(opt.due_date), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell />

                    <TableCell>
                    {(() => {
                        switch (opt.status) {
                          case "active":
                            return (
                              <Badge > Abertas </Badge>
                            );
                          case "canceled":
                            return (
                              <Badge variant={"destructive"}> Cancelada </Badge>
                            );
                            case "finished":
                            return (
                              <Badge variant={"outline"}> Finalizada </Badge>
                            );
                          case "closed":
                            return (
                              <Badge variant={"secondary"}>
                                Fechadas
                              </Badge>
                            );
                          
                          default:
                            return null;
                        }
                      })()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
};
