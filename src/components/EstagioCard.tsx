"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import format from "date-fns/format";
import { differenceInDays, sub } from "date-fns";
import { ActivityI, OpeningI } from "@/types/geralsI";
import { Badge } from "./ui/badge";

interface Props {
  opening: OpeningI;
  userType?: string;
}

export function EstagioCard({ opening, userType }: Props) {
  const router = useRouter();

  return (
    <Card
      className={cn(
        "w-full sm:min-w-[380px] md:min-w-[314px] sm:max-w-[380px] md:max-w-[314px]  flex flex-col justify-between text-muted-foreground"
      )}
    >
      {/* {situation === "selected" && (
        <div className="w-full bg-green-200 h-[4rem] flex flex-col items-center justify-center">
          <p className="font-bold">Você foi selecionado!</p>
          <p>Clique e entre em contato agora!</p>
        </div>
      )}
      {situation === "notSelected" && (
        <div className="w-full bg-gray-200 h-[4rem] flex flex-col items-center justify-center">
          <p className="font-bold">Não foi desta vez..</p>
          <p>Sentimos muito por isso.</p>
        </div>
      )}
      {situation === "closed" && (
        <div className="w-full bg-gray-400 h-[4rem] flex flex-col items-center justify-center">
          <p className="font-bold">Inscrições encerradas!</p>
          <p>Últimos dias para se inscrever!</p>
        </div>
      )} */}
      {/* {situation == null &&
        dueDate &&
        differenceInDays(new Date(), sub(dueDate, { days: 14 })) >= 0 && (
          <div className="w-full bg-red-100 h-[4rem] flex flex-col items-center justify-center">
            {userType == "medic" ? (
              <div>
                <p className="font-bold">Últimos dias para inscrição!</p>
              </div>
            ) : (
              <div>
                <p className="font-bold">Inscreva-se já!</p>
                <p>Últimos dias para se inscrever!</p>
              </div>
            )}
          </div>
        )} */}
      <CardHeader>
        <CardTitle>{opening.name}</CardTitle>
        <CardDescription className="flex gap-2">
          <Badge>{opening.total_hours} hrs</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="mb-1 items-start pb-2 last:mb-0 last:pb-0">
            <p className="text-sm font-bold leading-none">Localização</p>
            <div>
              <p className="text-lg  text-muted-foreground">
                {opening.location?.address?.neighbourhood} -{" "}
                {opening.location?.address?.city} -{" "}
                {opening.location?.address?.federative_unit_st}
              </p>
            </div>
          </div>
          <div className="mb-1 items-start pb-2 last:mb-0 last:pb-0">
            <p className="text-sm font-bold leading-none">Semestre Mínimo:</p>
            <div>
              <p className="text-lg  text-muted-foreground">
                {opening.school_term_min}º Semestre
              </p>
            </div>
          </div>
          <div className="flex flex-row mb-1 pb-2 ">
            <div className="w-[49%]">
              <p className="text-sm font-bold leading-none">De</p>
              <div>
                <p className="text-lg  text-muted-foreground">
                  {opening.start_date &&
                    format(new Date(opening.start_date), "dd/MM/yyyy")}
                </p>
              </div>
            </div>
            <div className="w-[49%]">
              <p className="text-sm font-bold leading-none">Ate</p>
              <div>
                <p className="text-lg  text-muted-foreground">
                  {opening.end_date &&
                    format(new Date(opening.end_date), "dd/MM/yyyy")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row mb-1 pb-2 ">
            <div className="w-[49%]">
              <p className="text-sm font-bold leading-none">
                Status das Inscrições:
              </p>
              <div>
                {opening.status === "canceled" ? 
                 <Badge variant={"destructive"}>Cancelada</Badge> :
                opening.status === "active" ? (
                  <Badge>Abertas</Badge>
                ) : (
                  <Badge variant={"outline"}>Fechadas</Badge>
                )}
              </div>
            </div>
            <div className="w-[49%]">
              <p className="text-sm font-bold leading-none">Inscrições Até:</p>
              <div>
                <Badge variant={"outline"}>
                  {" "}
                  {opening.due_date &&
                    format(new Date(opening.due_date), "dd/MM/yyyy")}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => router.push(`/app/oportunidade/${opening.id}`)}
        >
          Ver mais informações
        </Button>
      </CardFooter>
    </Card>
  );
}
