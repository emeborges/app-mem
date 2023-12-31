import { CentralizerContainer } from "@/components/CentralizerContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { StudentI } from "@/types/geralsI";
import { formatarCPF, getPrimeiraLetra } from "@/utils/functions";
import { format } from "date-fns";
import Link from "next/link";

interface Props {
  student?: StudentI;
}

export default function PerfilResumido({ student }: Props) {
  return (
    <div className="w-full">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full pt-2 my-2">
        <CardContent>
          <h2 className="text-3xl">Perfil</h2>
          <div className="p-2 flex flex-col md:flex-row w-full flax-wrap items-center">
            <div className="m-auto">
              <Avatar className="h-[10rem] w-[10rem] bg-red-500">
                {student?.picture_url ? (
                  <AvatarImage src={student.picture_url.toString()} />
                ) : (
                  <AvatarFallback className="bg-primary text-5xl">
                    {getPrimeiraLetra(student?.name)}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            <div className="flex flex-wrap w-full justify-between">
              <div className="flex flex-col w-full md:w-[35%] justify-between">
                <div className="px-4 py-2">
                  <div>
                    <div>
                      <p>Nome:</p>
                    </div>
                    <h3 className="text-3xl">{student?.name}</h3>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <div>
                    <div>
                      <p>Email:</p>
                    </div>
                    <h3 className="text-xl">{student?.email}</h3>
                  </div>
                </div>
                <div className="flex">
                  <div className="px-4 py-2">
                    <div>
                      <div>
                        <p>CPF:</p>
                      </div>
                      <h3 className="text-lg">
                        {student?.tax_document &&
                          formatarCPF(student.tax_document)}
                      </h3>
                    </div>
                  </div>
                  <div className="px-4 py-2">
                    <div>
                      <div>
                        <p>Data Nascimento:</p>
                      </div>
                      <h3 className="text-lg">
                        {student?.birthdate &&
                          format(new Date(student?.birthdate), "dd/MM/yyyy")}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full md:w-[35%]  justify-between">
                <div className="px-4 py-2">
                  <div>
                    <div>
                      <p>Faculdade:</p>
                    </div>
                    <h3 className="text-3xl">{student?.university?.name}</h3>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <div>
                    <div>
                      <p>Período:</p>
                    </div>
                    <h3 className="text-lg">{student?.school_term}</h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-dull md:w-[30%] items-center justify-center">
                <Link href={"/app/perfil"}>
                  <Button variant={"outline"} className="w-full">
                    Editar Perfil
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );
}
