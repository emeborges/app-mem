"use client";

import { EditMedicoForm } from "@/components/Forms/EditProfile/EditMedicoForm";
import { EditStudentForm } from "@/components/Forms/EditProfile/EditStudentForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Command } from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Loader2, Menu, Pencil, UserCog, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  scope?: string;
}

export const MedicosAdmin = ({ scope }: Props) => {
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const [load, setLoad] = useState(true);
  const [medicos, setMedicos] = useState<MedicI[]>();

  const getMedicos = async () => {
    await axiosAuth.get("/medic").then((e) => setMedicos(e.data));

    setLoad(false);
    return;
  };

  useEffect(() => {
    setTimeout(getMedicos, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(medicos);

  return (
    <div className="h-full w-full ">
      {load ? (
        <div className="rounded-lg full border h-full w-full flex items-center justify-center mt-2">
          <Loader2 className="h-[4rem] w-[4rem] text-muted-foreground animate-spin" />
        </div>
      ) : (
        <div className="rounded-lg full border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
          <div className="w-full py-4 flex justify-between p-2 ">
            <div>
              <h2 className="text-3xl font-bold text-muted-foreground">
                Medicos
              </h2>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>CRM</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicos?.map((medico) => (
                <TableRow key={medico.id}>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/admin/medicos/${medico.id}`)}
                    >
                      <UserCog className="text-muted-foreground text-sm" />
                    </Button>
                  </TableCell>
                  <TableCell>{medico.name}</TableCell>

                  <TableCell>{medico.email}</TableCell>

                  <TableCell>
                    {medico.professional_certificate} -{" "}
                    {medico.federative_unit_professional_certificate}
                  </TableCell>

                  <TableCell>
                    {medico.is_active ? (
                      <Badge> Ativo </Badge>
                    ) : (
                      <Badge variant={"destructive"}>Desativado</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
