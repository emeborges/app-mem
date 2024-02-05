"use client";

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
import { UniversityI } from "@/types/geralsI";
import { FileCog, Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  scope?: string;
}

export const EspecialidadesAdmin = ({ scope }: Props) => {
  const axiosAuth = useAxiosAuth();
  const [load, setLoad] = useState(true);
  const route = useRouter();
  const [especialidades, setEspecialidades] = useState<UniversityI[]>();

  const getEspecialidades = async () => {
    await axiosAuth.get("/speciality").then((e) => setEspecialidades(e.data));

    setLoad(false);
    return;
  };

  useEffect(() => {
    setTimeout(getEspecialidades, 4000);
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
                Especialidades
              </h2>
            </div>
            <div>
              <Button
                onClick={() => route.push("/admin/especialidades/adicionar")}
              >
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
              {especialidades?.map((esp) => (
                <TableRow key={esp.id}>
                  <TableCell>
                    <Button
                      variant="outline"
                      disabled={!esp.is_active}
                      onClick={() =>
                        route.push(`/admin/especialidades/${esp.id}/editar`)
                      }
                    >
                      <FileCog className="text-muted-foreground text-sm" />
                    </Button>
                  </TableCell>
                  <TableCell className=" ">{esp.name}</TableCell>

                  <TableCell>
                    {" "}
                    {esp.is_active ? (
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
