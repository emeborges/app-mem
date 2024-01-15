"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { MedicI, StudentI } from "@/types/geralsI";
import { formatarCPF, getPrimeiraLetra } from "@/utils/functions";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TrocarSenha } from "./ModalTrocarSenha";

interface Props {
  scope?: string;
}

export const Perfil = ({ scope }: Props) => {
  const axiosAuth = useAxiosAuth();
  const route = useRouter()
  const [load, setLoad] = useState(true);
  const [me, setMe] = useState<MedicI & StudentI>();

  const getMe = async () => {
    await axiosAuth.get("/me").then((e) => setMe(e.data));

    setLoad(false);
    return;
  };

  useEffect(() => {
    setTimeout(getMe, 4000);
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
          <div className="m-auto">
            <Avatar className="h-[10rem] w-[10rem] bg-red-500">
                {
                    me?.picture_url ?
                        <AvatarImage src={me.picture_url.toString()} />
                        : <AvatarFallback className="bg-primary text-5xl">{getPrimeiraLetra(me?.name)}</AvatarFallback>
                }
            </Avatar>
          </div>

          <div className="flex items-center flex-col w-full justify-between">
            <div className="px-4 py-2">
              <div>
                <div>
                  <p>Nome:</p>
                </div>
                <h3 className="text-3xl">{me?.name}</h3>
              </div>
            </div>
            <div className="px-4 py-2">
              <div>
                <div>
                  <p>Email:</p>
                </div>
                <h3 className="text-xl">{me?.email}</h3>
              </div>
            </div>
            <div className="flex">
              <div className="px-4 py-2">
                <div>
                  <div>
                    <p>CPF:</p>
                  </div>
                  <h3 className="text-lg">
                    {me?.tax_document && formatarCPF(me.tax_document)}
                  </h3>
                </div>
              </div>
              <div className="px-4 py-2">
                <div>
                  <div>
                    <p>Data Nascimento:</p>
                  </div>
                  <h3 className="text-lg">
                    {me?.birthdate &&
                      format(new Date(me?.birthdate), "dd/MM/yyyy")}
                  </h3>
                </div>
              </div>
            </div>
            <div className="px-4 py-2">
              <div>
                <div>
                  <p>Telefone:</p>
                </div>
                <h3 className="text-lg">{me?.phone_number}</h3>
              </div>
            </div>
          </div>
          {me?.scope === "student" ? null : (
            <div className="flex flex-col w-full items-center  justify-between">
              <div className="px-4 py-2">
                <div>
                  <div>
                    <p>CRM:</p>
                  </div>
                  <h3 className="text-3xl">{me?.professional_certificate} - {me?.federative_unit_professional_certificate}</h3>
                </div>
              </div>
              
            </div>
          )}
          <div className="flex flex-col w-full gap-2 items-center justify-center">
            <Button className="w-[15rem]" onClick={() => route.push('/app/perfil/editar')}>Editar Perfil</Button>
            <TrocarSenha />
          </div>
        </div>
      )}
    </div>
  );
};
