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
import { ActivityI, MedicI, StudentI, UniversityI } from "@/types/geralsI";
import { FileCog, Loader2, PlusCircle, UserCog } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  scope?: string;
}

export const AtividadesAdmin = ({ scope }: Props) => {
  const axiosAuth = useAxiosAuth();
  const [load, setLoad] = useState(true);
  const route = useRouter();
  const [atividades, setAtividades] = useState<ActivityI[]>();

  const getAtividades = async () => {
    await axiosAuth.get("/activity").then((e) => setAtividades(e.data));

    setLoad(false);
    return;
  };

  useEffect(() => {
    setTimeout(getAtividades, 4000);
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
                Atividades
              </h2>
            </div>
            <div>
              <Button onClick={() => route.push("/admin/atividades/adicionar")}>
                <PlusCircle />
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {atividades?.map((ativ, indx) => (
                <TableRow key={indx}>
                  <TableCell>
                    <Button
                      variant="outline"
                      disabled={!ativ.is_active}
                      onClick={() => route.push(`/admin/atividades/${ativ.id}/editar`)}
                    >
                      <FileCog className="text-muted-foreground text-sm" />
                    </Button>
                  </TableCell>
                  <TableCell className=" ">{ativ.name}</TableCell>
                  <TableCell>
                    {" "}
                    {ativ.is_active ? (
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
