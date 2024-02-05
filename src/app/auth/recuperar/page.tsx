"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import axios from "@/lib/axios";
import { RecuperarForm } from "@/components/Forms/RecuperarSenha";

export default function RecuperarSenha() {
  const [email, setEmail] = useState<string>("");
  const [load, setLoad] = useState(false);
  const [send, setSend] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setLoad(true);

    axios.post("/auth/password/forgot", { email }).then((e) => setSend(true));
  }

  return (
    <div className="h-screen flex align-center " suppressHydrationWarning>
      <div className="m-auto">
        <Image
          src="/MEM_BLUE.svg"
          height={200}
          width={200}
          alt="usp"
          className="m-auto pb-5"
        />
        <Card className="max-w-md w-full m-auto">
          <CardDescription className="p-6">
            <CardTitle className="text-2xl pb-6">Recuperar Senha.</CardTitle>
            {!send && (
              <CardDescription className="pb-6">
                Preencha seu e-mail abaixo.
              </CardDescription>
            )}

            <form
              className="w-[400px] flex flex-col gap-6"
              onSubmit={handleSubmit}
            >
              {send ? (
                <div>
                  <p>Um e-mail com o código foi enviado para:</p>
                  <p className="font-bold py-1">{email}</p>
                  <p>Preencha-o abaixo:</p>
                </div>
              ) : (
                <input
                  className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
                  type="text"
                  name="email"
                  placeholder="Digite seu e-mail"
                  disabled={send}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
              {!send && (
                <Button disabled={load} type="submit">
                  {load ? (
                    <Loader2 className="mr-2 ml-4 h-4 w-4 animate-spin" />
                  ) : (
                    "Enviar"
                  )}
                </Button>
              )}
            </form>
          </CardDescription>
          {send && (
            <CardDescription className="p-6 pt-0">
              <RecuperarForm email={email} />
            </CardDescription>
          )}
        </Card>
      </div>
    </div>
  );
}
