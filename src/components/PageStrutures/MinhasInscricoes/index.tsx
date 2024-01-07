"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { StudentI } from "@/types/geralsI";
import { format } from "date-fns";
import { CircleEllipsis, Link, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const MinhasInscricoes = () => {
  const axiosAuth = useAxiosAuth();
  const [me, setMe] = useState<StudentI>();
  const route = useRouter();
  const [load, setLoad] = useState(true);

  const fetchMe = async () => {
    setLoad(true);
    const res = await axiosAuth.get("/me");
    const results = res.data;

    setMe(results);

    setTimeout(() => setLoad(false), 2000);
  };

  useEffect(() => {
    setTimeout(fetchMe, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(me);
  return (
    <div className="w-full h-full">
      {load ? (
        <div className="h-full w-full flex items-center justify-center ">
          <Loader2 className="h-[4rem] w-[4rem] text-muted-foreground animate-spin" />
        </div>
      ) : (
        <ScrollArea className="w-full">
          {me?.applications && me.applications.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Data Início</TableHead>
                  <TableHead>Data Final</TableHead>
                  <TableHead>Inscrições até</TableHead>
                  <TableHead>Status da Inscrição</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {me.applications.map((x) => (
                  <TableRow key={x.id}>
                    <TableCell className=" ">{x?.opening.name}</TableCell>
                    <TableCell>
                      {x?.opening?.start_date &&
                        format(new Date(x?.opening?.start_date), "dd/MM/yyyy")}
                    </TableCell>

                    <TableCell>
                      {x?.opening?.end_date &&
                        format(new Date(x?.opening?.end_date), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      {x?.opening?.due_date &&
                        format(new Date(x?.opening?.due_date), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      {(() => {
                        switch (x.status) {
                          case "active":
                            return (
                              <Badge variant={"outline"}> Inscrito </Badge>
                            );
                          case "canceled":
                            return (
                              <Badge variant={"destructive"}> Cancelado </Badge>
                            );
                          case "closed":
                            return (
                              <Badge variant={"outline"}>
                                {" "}
                                Não Selecionado{" "}
                              </Badge>
                            );
                          case "selected":
                            return (
                              <Badge variant={"default"}> Selecionado </Badge>
                            );
                          default:
                            return null;
                        }
                      })()}
                    </TableCell>
                    <TableCell>
                      <Link
                        className={"cursor-pointer"}
                        onClick={() =>
                          route.push(`/app/oportunidade/${x.opening.id}`)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div>Você não se inscreveu em nenhuma vaga.</div>
          )}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
};
