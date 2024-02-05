"use client";

import { EditMedicoForm } from "@/components/Forms/EditProfile/EditMedicoForm";
import { EditStudentForm } from "@/components/Forms/EditProfile/EditStudentForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { format } from "date-fns";
import { Loader2, UserCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  scope?: string;
}

export const EstudantesAdmin = ({ scope }: Props) => {
  const axiosAuth = useAxiosAuth();
  const [load, setLoad] = useState(true);
  const [estudantes, setEstudantes] = useState<StudentI[]>();
  const router = useRouter();

  const getEstudantes = async () => {
    await axiosAuth.get("/student").then((e) => setEstudantes(e.data));

    setLoad(false);
    return;
  };

  useEffect(() => {
    setTimeout(getEstudantes, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                Estudantes
              </h2>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Semestre</TableHead>
                <TableHead>Faculdade</TableHead>
                <TableHead>Cadastro em:</TableHead>
                <TableHead>Atualizado em:</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estudantes?.map((est) => (
                <TableRow key={est.id}>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/admin/estudantes/${est.id}`)}
                    >
                      <UserCog className="text-muted-foreground text-sm" />
                    </Button>
                  </TableCell>
                  <TableCell className=" ">{est.name}</TableCell>
                  <TableCell>{est.school_term}</TableCell>

                  <TableCell>{est.university?.name}</TableCell>

                  <TableCell>
                    {format(new Date(est.created_at), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(est.updated_at), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {est.is_active ? (
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
