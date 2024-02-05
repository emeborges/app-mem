"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import axios from "@/lib/axios";

export default function RecuperarSenha() {
  const [email, setEmail] = useState<string>("");
  const [load, setLoad] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setLoad(true);

    axios.post("/auth/password/forgot", { email }).then((e) => console.log(e));
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
            <CardDescription className="pb-6">
              Preencha seu e-mail abaixo.
            </CardDescription>

            <form
              className="w-[400px] flex flex-col gap-6"
              onSubmit={handleSubmit}
            >
              <input
                className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
                type="text"
                name="email"
                placeholder="Digite seu e-mail"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button disabled={load} type="submit">
                {load ? (
                  <Loader2 className="mr-2 ml-4 h-4 w-4 animate-spin" />
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </CardDescription>
        </Card>
      </div>
    </div>
  );
}
