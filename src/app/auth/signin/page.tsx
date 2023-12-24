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

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [load, setLoad] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setLoad(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {

      toast({
        title: "Email ou senha incorreto!",
        description: "Revise-os e tente novamente!",
      });

      setLoad(false);
      return;
    }

    router.replace("/app");
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
            <CardTitle className="text-2xl pb-6">Seja bem vindo.</CardTitle>
            <CardDescription className="pb-6">
              Entre com seu email e senha ou crie sua conta.
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

              <input
                className="h-12 rounded-md p-2 bg-transparent border border-gray-300"
                type="password"
                name="password"
                placeholder="Digite sua senha"
                onChange={(e) => setPassword(e.target.value)}
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
          <CardFooter className="flex-col gap-2 py-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou registre-se já
                </span>
              </div>
            </div>

            <Button
              className="w-full text-white"
              variant={"secondary"}
              disabled={load}
              onClick={() => router.push("/auth/signup")}
            >
              Criar Conta
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
